import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { z } from 'zod';
import { payuClient } from '@/lib/api/payu/client';
import { OrderData } from '@/types/payu';

// Input validation schema
const initiatePaymentSchema = z.object({
  orderId: z.string().uuid('Valid order ID is required'),
});

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const { orderId } = initiatePaymentSchema.parse(body);

    const supabase = await createClient();

    // Fetch order details with items
    const { data: order, error: orderError } = await supabase
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
            slug
          )
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError) {
      if (orderError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching order:', orderError);
      return NextResponse.json(
        { error: 'Failed to fetch order details' },
        { status: 500 }
      );
    }

    // Validate order status
    if (order.payment_status !== 'pending') {
      return NextResponse.json(
        { 
          error: 'Order payment is not in pending status',
          currentStatus: order.payment_status,
        },
        { status: 400 }
      );
    }

    // Validate required order data
    if (!order.customer_name || !order.customer_email || !order.customer_phone) {
      return NextResponse.json(
        { error: 'Order missing required customer information' },
        { status: 400 }
      );
    }

    if (!order.order_items || order.order_items.length === 0) {
      return NextResponse.json(
        { error: 'Order has no items' },
        { status: 400 }
      );
    }

    // Create product info string for PayU
    const productNames = order.order_items
      .map((item: {
        quantity: number;
        product?: {
          name: string;
        } | null;
      }) => `${item.product?.name || 'Product'} (${item.quantity})`)
      .join(', ');

    const productInfo = productNames.length > 100 
      ? `${productNames.substring(0, 97)}...` 
      : productNames;

    // Prepare order data for PayU
    const orderData: OrderData = {
      orderId: order.id,
      amount: order.total,
      productInfo,
      customerDetails: {
        firstName: order.customer_name.split(' ')[0] || order.customer_name,
        lastName: order.customer_name.split(' ').slice(1).join(' ') || '',
        email: order.customer_email,
        phone: order.customer_phone,
        address: order.shipping_address ? {
          street: order.shipping_address.street,
          city: order.shipping_address.city,
          state: order.shipping_address.state,
          zipcode: order.shipping_address.zipcode,
          country: order.shipping_address.country || 'India',
        } : undefined,
      },
      orderItems: order.order_items.map((item: {
        product_id: string;
        quantity: number;
        price: number;
        product?: {
          id: string;
          name: string;
        } | null;
      }) => ({
        productId: item.product_id,
        name: item.product?.name || 'Product',
        quantity: item.quantity,
        price: item.price,
      })),
    };

    // Prepare payment request using PayU client
    const paymentResult = await payuClient.preparePaymentRequest(orderData);

    if (!paymentResult.success) {
      console.error('PayU payment preparation failed:', paymentResult.error);
      return NextResponse.json(
        { 
          error: 'Failed to prepare payment request',
          details: paymentResult.error?.message,
        },
        { status: 500 }
      );
    }

    // Update order with PayU transaction ID
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payu_txnid: paymentResult.data?.formData.txnid,
        payment_status: 'processing',
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Error updating order with transaction ID:', updateError);
      // Continue anyway, as the payment can still proceed
    }

    // Log payment initiation for audit
    console.log('Payment initiated:', {
      orderId,
      txnid: paymentResult.data?.formData.txnid,
      amount: order.total,
      customerEmail: order.customer_email,
    });

    return NextResponse.json({
      success: true,
      payment: {
        paymentUrl: paymentResult.data?.paymentUrl,
        formData: paymentResult.data?.formData,
        orderId,
        txnid: paymentResult.data?.formData.txnid,
        amount: order.total,
      },
    });

  } catch (error) {
    console.error('Error in initiate payment API:', error);

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

// GET method to retrieve payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const txnid = searchParams.get('txnid');

    if (!orderId && !txnid) {
      return NextResponse.json(
        { error: 'Order ID or Transaction ID is required' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    let query = supabase
      .from('orders')
      .select('id, payu_txnid, payment_status, total, customer_email');

    if (orderId) {
      query = query.eq('id', orderId);
    } else if (txnid) {
      query = query.eq('payu_txnid', txnid);
    }

    const { data: order, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      console.error('Error fetching payment status:', error);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      payment: {
        orderId: order.id,
        txnid: order.payu_txnid,
        status: order.payment_status,
        amount: order.total,
      },
    });

  } catch (error) {
    console.error('Error in get payment status API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 