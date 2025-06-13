import { NextRequest, NextResponse } from 'next/server';
import { PayUPaymentResponse } from '@/types/payu';
import { verifyResponseHash, getPayUConfig } from '@/lib/api/payu/hash';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.formData();
    
    // Helper function to safely get string from FormData
    const getString = (key: string): string => {
      const value = body.get(key);
      return typeof value === 'string' ? value : '';
    };

    // Get required fields first
    const status = getString('status');
    const txnid = getString('txnid');
    const amount = getString('amount');
    const hash = getString('hash');
    
          // Convert FormData to PayUPaymentResponse (with proper type handling)
      const responseData: PayUPaymentResponse = {
        status: status as 'success' | 'failure' | 'pending',
        txnid: txnid,
        amount: amount,
        productinfo: getString('productinfo'),
        firstname: getString('firstname'),
        email: getString('email'),
        phone: getString('phone'),
        hash: hash,
        key: getString('key'),
        lastname: getString('lastname'),
        address1: getString('address1'),
        address2: getString('address2'),
        city: getString('city'),
        state: getString('state'),
        country: getString('country'),
        zipcode: getString('zipcode'),
        udf1: getString('udf1'),
        udf2: getString('udf2'),
        udf3: getString('udf3'),
        udf4: getString('udf4'),
        udf5: getString('udf5'),
        udf6: getString('udf6'),
        udf7: getString('udf7'),
        udf8: getString('udf8'),
        udf9: getString('udf9'),
        udf10: getString('udf10'),
        mihpayid: getString('mihpayid'),
        mode: getString('mode'),
        bankcode: getString('bankcode'),
        bank_ref_no: getString('bank_ref_no'),
        bank_ref_num: getString('bank_ref_num'),
        field1: getString('field1'),
        field2: getString('field2'),
        field3: getString('field3'),
        field4: getString('field4'),
        field5: getString('field5'),
        field6: getString('field6'),
        field7: getString('field7'),
        field8: getString('field8'),
        field9: getString('field9'),
        payment_source: getString('payment_source'),
        PG_TYPE: getString('PG_TYPE'),
        error: getString('error'),
        error_Message: getString('error_Message'),
        net_amount_debit: getString('net_amount_debit'),
        unmappedstatus: getString('unmappedstatus'),
        addedon: getString('addedon'),
        surl: getString('surl'),
        furl: getString('furl'),
      };

    // Validate required fields
    if (!responseData.txnid || !responseData.status || !responseData.hash) {
      console.error('PayU webhook: Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate the hash
    try {
      const config = getPayUConfig();
      if (!config.salt) {
        throw new Error('PayU salt not configured');
      }
      const isValidHash = verifyResponseHash(responseData, config.salt);
      if (!isValidHash) {
        console.error('PayU webhook: Invalid hash', {
          txnid: responseData.txnid,
          status: responseData.status,
        });
        return NextResponse.json(
          { error: 'Invalid hash' },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error('PayU webhook: Hash validation error:', error);
      return NextResponse.json(
        { error: 'Hash validation failed' },
        { status: 400 }
      );
    }

    // Initialize Supabase client
    const supabase = createClient();

    // Get order ID from UDF1 (we store order ID there)
    const orderId = responseData.udf1;
    if (!orderId) {
      console.error('PayU webhook: No order ID found in UDF1');
      return NextResponse.json(
        { error: 'Order ID not found' },
        { status: 400 }
      );
    }

    // Log the webhook call
    await supabase
      .from('payment_transactions')
      .insert({
        order_id: orderId,
        txn_id: responseData.txnid,
        payment_status: responseData.status,
        amount: parseFloat(responseData.amount),
        payment_method: responseData.mode || 'unknown',
        gateway_response: JSON.stringify(responseData),
        processed_at: new Date().toISOString(),
        webhook_source: 'payu_webhook',
      });

    // Process the payment status
    let orderStatus: string;
    let paymentStatus: string;

    switch (responseData.status.toLowerCase()) {
      case 'success':
        orderStatus = 'confirmed';
        paymentStatus = 'completed';
        break;
      case 'failure':
        orderStatus = 'payment_failed';
        paymentStatus = 'failed';
        break;
      case 'pending':
        orderStatus = 'payment_pending';
        paymentStatus = 'pending';
        break;
      default:
        orderStatus = 'payment_failed';
        paymentStatus = 'failed';
    }

    // Update the order status
    const { error: orderUpdateError } = await supabase
      .from('orders')
      .update({
        order_status: orderStatus,
        payment_status: paymentStatus,
        payment_method: responseData.mode || 'unknown',
        payment_transaction_id: responseData.txnid,
        payment_gateway_id: responseData.mihpayid || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', orderId);

    if (orderUpdateError) {
      console.error('PayU webhook: Error updating order:', orderUpdateError);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }

    // For successful payments, update inventory
    if (responseData.status.toLowerCase() === 'success') {
      try {
        // Get order items
        const { data: orderItems, error: orderItemsError } = await supabase
          .from('order_items')
          .select('product_id, quantity')
          .eq('order_id', orderId);

        if (orderItemsError) {
          console.error('PayU webhook: Error fetching order items:', orderItemsError);
        } else if (orderItems) {
          // Update inventory for each product
          for (const item of orderItems) {
            await supabase.rpc('update_product_inventory', {
              p_product_id: item.product_id,
              p_quantity_sold: item.quantity,
            });
          }
        }
      } catch (inventoryError) {
        console.error('PayU webhook: Error updating inventory:', inventoryError);
        // Don't fail the webhook for inventory errors
      }
    }

    console.log(`PayU webhook processed successfully for txnid: ${responseData.txnid}, status: ${responseData.status}`);

    // Return success response
    return NextResponse.json(
      { 
        message: 'Webhook processed successfully',
        txnid: responseData.txnid,
        status: responseData.status,
        orderId: orderId,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('PayU webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for webhook verification if needed)
export async function GET() {
  return NextResponse.json(
    { message: 'PayU webhook endpoint is active' },
    { status: 200 }
  );
} 