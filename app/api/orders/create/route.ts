import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { z } from 'zod';

// Order item validation schema
const orderItemSchema = z.object({
  productId: z.string().uuid('Invalid product ID'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  price: z.number().min(0, 'Price cannot be negative'),
});

// Order creation validation schema
const createOrderSchema = z.object({
  userId: z.string().uuid('Invalid user ID').optional(),
  guestUserId: z.string().uuid('Invalid guest user ID').optional(),
  items: z.array(orderItemSchema).min(1, 'Order must have at least one item'),
  customerDetails: z.object({
    name: z.string().min(1, 'Customer name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(10, 'Valid phone number is required'),
  }),
  shippingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipcode: z.string().min(1, 'ZIP code is required'),
    country: z.string().default('India'),
  }),
  billingAddress: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipcode: z.string().min(1, 'ZIP code is required'),
    country: z.string().default('India'),
  }),
  shippingCost: z.number().min(0, 'Shipping cost cannot be negative').default(0),
  taxAmount: z.number().min(0, 'Tax amount cannot be negative').default(0),
  discountAmount: z.number().min(0, 'Discount amount cannot be negative').default(0),
  orderNotes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    // Ensure either userId or guestUserId is provided
    if (!validatedData.userId && !validatedData.guestUserId) {
      return NextResponse.json(
        { error: 'Either userId or guestUserId must be provided' },
        { status: 400 }
      );
    }

    // Ensure both are not provided
    if (validatedData.userId && validatedData.guestUserId) {
      return NextResponse.json(
        { error: 'Cannot provide both userId and guestUserId' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify user exists (either regular user or guest user)
    if (validatedData.userId) {
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('id', validatedData.userId)
        .single();

      if (userError || !user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
    } else if (validatedData.guestUserId) {
      const { data: guestUser, error: guestUserError } = await supabase
        .from('guest_users')
        .select('id')
        .eq('id', validatedData.guestUserId)
        .single();

      if (guestUserError || !guestUser) {
        return NextResponse.json(
          { error: 'Guest user not found' },
          { status: 404 }
        );
      }
    }

    // Verify all products exist and get their current details
    const productIds = validatedData.items.map(item => item.productId);
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, name, price, inventory')
      .in('id', productIds);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      return NextResponse.json(
        { error: 'Failed to verify products' },
        { status: 500 }
      );
    }

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'One or more products not found' },
        { status: 404 }
      );
    }

    // Create product lookup map
    const productMap = new Map(products.map(p => [p.id, p]));

    // Validate inventory and prices
    const errors: string[] = [];
    let subtotal = 0;

    for (const item of validatedData.items) {
      const product = productMap.get(item.productId);
      if (!product) {
        errors.push(`Product ${item.productId} not found`);
        continue;
      }

      // Check stock availability
      if (product.inventory < item.quantity) {
        errors.push(`Insufficient stock for ${product.name}. Available: ${product.inventory}, Requested: ${item.quantity}`);
      }

      // Verify price (allow some tolerance for price changes)
      const priceDifference = Math.abs(product.price - item.price);
      if (priceDifference > 0.01) {
        errors.push(`Price mismatch for ${product.name}. Current price: ₹${product.price}, Provided: ₹${item.price}`);
      }

      subtotal += item.price * item.quantity;
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Order validation failed', 
          details: errors 
        },
        { status: 400 }
      );
    }

    // Calculate total
    const total = subtotal + validatedData.shippingCost + validatedData.taxAmount - validatedData.discountAmount;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: validatedData.userId || null,
        guest_user_id: validatedData.guestUserId || null,
        total: total,
        customer_name: validatedData.customerDetails.name,
        customer_email: validatedData.customerDetails.email,
        customer_phone: validatedData.customerDetails.phone,
        shipping_address: validatedData.shippingAddress,
        billing_address: validatedData.billingAddress,
        shipping_cost: validatedData.shippingCost,
        tax_amount: validatedData.taxAmount,
        discount_amount: validatedData.discountAmount,
        order_notes: validatedData.orderNotes,
        order_status: 'pending',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    // Create order items
    const orderItems = validatedData.items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity,
    }));

    const { error: orderItemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (orderItemsError) {
      console.error('Error creating order items:', orderItemsError);
      
      // Rollback: delete the created order
      await supabase
        .from('orders')
        .delete()
        .eq('id', order.id);

      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      );
    }

    // Update inventory (reserve stock)
    for (const item of validatedData.items) {
      const product = productMap.get(item.productId);
      if (product) {
        const newInventory = product.inventory - item.quantity;
        
        const { error: inventoryError } = await supabase
          .from('products')
          .update({
            inventory: newInventory,
            updated_at: new Date().toISOString(),
          })
          .eq('id', item.productId);

        if (inventoryError) {
          console.error(`Error updating inventory for product ${item.productId}:`, inventoryError);
          // Log but don't fail the order - we can handle inventory adjustments later
        }
      }
    }

    // Update user's last order timestamp
    if (validatedData.guestUserId) {
      await supabase
        .from('guest_users')
        .update({ 
          last_order_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', validatedData.guestUserId);
    } else if (validatedData.userId) {
      await supabase
        .from('users')
        .update({ 
          last_order_at: new Date().toISOString(),
        })
        .eq('id', validatedData.userId);
    }

    // Return the created order with items
    const orderWithItems = {
      ...order,
      items: orderItems.map(item => {
        const product = productMap.get(item.product_id);
        return {
          ...item,
          product_name: product?.name || 'Unknown Product',
        };
      }),
      subtotal,
      user_type: validatedData.userId ? 'registered' : 'guest',
    };

    return NextResponse.json({
      success: true,
      order: orderWithItems,
    });

  } catch (error) {
    console.error('Error in create order API:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: 'Validation failed', 
          details: error.errors.map((e: z.ZodIssue) => ({ path: e.path, message: e.message }))
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method to retrieve order by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items:order_items(
          id,
          product_id,
          quantity,
          price,
          product:product_id(
            id,
            name,
            slug,
            images
          )
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching order:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        userId: order.user_id,
        total: order.total,
        status: order.status,
        paymentStatus: order.payment_status,
        customerName: order.customer_name,
        customerEmail: order.customer_email,
        customerPhone: order.customer_phone,
        shippingAddress: order.shipping_address,
        billingAddress: order.billing_address,
        payuTxnid: order.payu_txnid,
        payuMihpayid: order.payu_mihpayid,
        paymentMethod: order.payment_method,
        items: order.order_items?.map((item: {
          id: string;
          product_id: string;
          quantity: number;
          price: number;
          product?: {
            id: string;
            name: string;
            slug: string;
            images: string[];
          } | null;
        }) => ({
          id: item.id,
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price,
          product: item.product ? {
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            images: item.product.images,
          } : null,
        })) || [],
        createdAt: order.created_at,
      },
    });

  } catch (error) {
    console.error('Error in get order API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 