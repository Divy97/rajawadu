import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { payuClient } from '@/lib/api/payu/client';
import { PayUPaymentResponse } from '@/types/payu';

export async function POST(request: NextRequest) {
  try {
    // Get form data from PayU callback
    const formData = await request.formData();
    
    // Convert FormData to PayUPaymentResponse object
    const payuResponse: PayUPaymentResponse = {
      mihpayid: formData.get('mihpayid') as string,
      mode: formData.get('mode') as string,
      status: formData.get('status') as 'success' | 'failure' | 'pending',
      key: formData.get('key') as string,
      txnid: formData.get('txnid') as string,
      amount: formData.get('amount') as string,
      addedon: formData.get('addedon') as string,
      productinfo: formData.get('productinfo') as string,
      firstname: formData.get('firstname') as string,
      lastname: formData.get('lastname') as string,
      address1: formData.get('address1') as string,
      address2: formData.get('address2') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      country: formData.get('country') as string,
      zipcode: formData.get('zipcode') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      udf1: formData.get('udf1') as string,
      udf2: formData.get('udf2') as string,
      udf3: formData.get('udf3') as string,
      udf4: formData.get('udf4') as string,
      udf5: formData.get('udf5') as string,
      udf6: formData.get('udf6') as string,
      udf7: formData.get('udf7') as string,
      udf8: formData.get('udf8') as string,
      udf9: formData.get('udf9') as string,
      udf10: formData.get('udf10') as string,
      hash: formData.get('hash') as string,
      field1: formData.get('field1') as string,
      field2: formData.get('field2') as string,
      field3: formData.get('field3') as string,
      field4: formData.get('field4') as string,
      field5: formData.get('field5') as string,
      field6: formData.get('field6') as string,
      field7: formData.get('field7') as string,
      field8: formData.get('field8') as string,
      field9: formData.get('field9') as string,
      payment_source: formData.get('payment_source') as string,
      PG_TYPE: formData.get('PG_TYPE') as string,
      bank_ref_no: formData.get('bank_ref_no') as string,
      bank_ref_num: formData.get('bank_ref_num') as string,
      bankcode: formData.get('bankcode') as string,
      error: formData.get('error') as string,
      error_Message: formData.get('error_Message') as string,
      name_on_card: formData.get('name_on_card') as string,
      cardnum: formData.get('cardnum') as string,
      cardhash: formData.get('cardhash') as string,
      net_amount_debit: formData.get('net_amount_debit') as string,
      unmappedstatus: formData.get('unmappedstatus') as string,
      cardToken: formData.get('cardToken') as string,
      easypayid: formData.get('easypayid') as string,
      surl: formData.get('surl') as string,
      furl: formData.get('furl') as string,
    };

    // Log the payment response for debugging
    console.log('PayU Success Callback received:', {
      txnid: payuResponse.txnid,
      mihpayid: payuResponse.mihpayid,
      status: payuResponse.status,
      amount: payuResponse.amount,
    });

    // Verify payment using PayU client
    const verificationResult = await payuClient.verifyPayment(payuResponse);

    if (!verificationResult.isValid) {
      console.error('Payment verification failed:', verificationResult.error);
      
      // Redirect to failure page with error
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=verification_failed&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(failureUrl);
    }

    const supabase = await createClient();

    // Get order ID from udf1 (we stored it there during payment initiation)
    const orderId = payuResponse.udf1;

    if (!orderId) {
      console.error('Order ID not found in PayU response');
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=order_not_found&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(failureUrl);
    }

    // Fetch order to verify it exists
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, total, customer_email, payment_status')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      console.error('Order not found in database:', orderId);
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=order_not_found&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(failureUrl);
    }

    // Verify amount matches
    const orderAmount = parseFloat(order.total.toString());
    const paymentAmount = parseFloat(payuResponse.amount);
    
    if (Math.abs(orderAmount - paymentAmount) > 0.01) {
      console.error('Amount mismatch:', { orderAmount, paymentAmount });
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=amount_mismatch&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(failureUrl);
    }

    // Determine final payment status based on PayU response
    let finalStatus = 'failure';
    if (verificationResult.transactionStatus === 'success' && payuResponse.status === 'success') {
      finalStatus = 'success';
    } else if (verificationResult.transactionStatus === 'pending' || payuResponse.status === 'pending') {
      finalStatus = 'pending';
    }

    // Update order payment status using database function
    const { error: updateError } = await supabase
      .rpc('update_order_payment_status', {
        p_order_id: orderId,
        p_payu_txnid: payuResponse.txnid,
        p_payu_mihpayid: payuResponse.mihpayid,
        p_payment_status: finalStatus,
        p_payment_method: payuResponse.mode,
        p_raw_response: payuResponse,
      });

    if (updateError) {
      console.error('Error updating order payment status:', updateError);
      // Continue to success page anyway, as payment was verified
    }

    // Log successful payment
    console.log('Payment processed successfully:', {
      orderId,
      txnid: payuResponse.txnid,
      mihpayid: payuResponse.mihpayid,
      amount: payuResponse.amount,
      status: finalStatus,
    });

    // Redirect based on final status
    if (finalStatus === 'success') {
      const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?orderId=${orderId}&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(successUrl);
    } else if (finalStatus === 'pending') {
      const pendingUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending?orderId=${orderId}&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(pendingUrl);
    } else {
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?orderId=${orderId}&txnid=${payuResponse.txnid}&error=payment_failed`;
      return NextResponse.redirect(failureUrl);
    }

  } catch (error) {
    console.error('Error in payment success handler:', error);
    
    // Redirect to failure page with generic error
    const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=processing_error`;
    return NextResponse.redirect(failureUrl);
  }
}

// GET method for testing/debugging (should not be used in production)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const txnid = searchParams.get('txnid');
  
  if (!txnid) {
    return NextResponse.json(
      { error: 'Transaction ID is required' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, payu_txnid, payment_status, total')
      .eq('payu_txnid', txnid)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        txnid: order.payu_txnid,
        status: order.payment_status,
        amount: order.total,
      },
    });

  } catch (error) {
    console.error('Error in payment status check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 