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
    console.log('PayU Failure Callback received:', {
      txnid: payuResponse.txnid,
      mihpayid: payuResponse.mihpayid,
      status: payuResponse.status,
      amount: payuResponse.amount,
      error: payuResponse.error,
      error_Message: payuResponse.error_Message,
    });

    // Verify payment hash even for failures to ensure data integrity
    const verificationResult = await payuClient.verifyPayment(payuResponse);

    if (!verificationResult.isValid) {
      console.error('Payment hash verification failed for failure callback:', verificationResult.error);
      
      // Still redirect to failure page but with hash verification error
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=verification_failed&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(failureUrl);
    }

    const supabase = await createClient();

    // Get order ID from udf1
    const orderId = payuResponse.udf1;

    if (!orderId) {
      console.error('Order ID not found in PayU failure response');
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
      console.error('Order not found in database for failure:', orderId);
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?error=order_not_found&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(failureUrl);
    }

    // Determine failure reason and status
    let failureReason = 'payment_failed';
    let finalStatus = 'failure';

    if (payuResponse.error && payuResponse.error !== 'E000') {
      failureReason = 'payment_error';
    }

    if (payuResponse.status === 'pending') {
      finalStatus = 'pending';
      failureReason = 'payment_pending';
    }

    // Update order payment status using database function
    const { error: updateError } = await supabase
      .rpc('update_order_payment_status', {
        p_order_id: orderId,
        p_payu_txnid: payuResponse.txnid,
        p_payu_mihpayid: payuResponse.mihpayid || null,
        p_payment_status: finalStatus,
        p_payment_method: payuResponse.mode || null,
        p_raw_response: payuResponse,
      });

    if (updateError) {
      console.error('Error updating order payment status for failure:', updateError);
    }

    // Also record the failure in payment_transactions table with error details
    const { error: transactionError } = await supabase
      .from('payment_transactions')
      .upsert({
        order_id: orderId,
        payu_txnid: payuResponse.txnid,
        payu_mihpayid: payuResponse.mihpayid || null,
        amount: parseFloat(payuResponse.amount),
        status: finalStatus,
        payment_method: payuResponse.mode || null,
        payment_source: payuResponse.payment_source || null,
        bank_ref_no: payuResponse.bank_ref_no || null,
        bank_ref_num: payuResponse.bank_ref_num || null,
        error_code: payuResponse.error || null,
        error_message: payuResponse.error_Message || null,
        raw_response: payuResponse,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'payu_txnid'
      });

    if (transactionError) {
      console.error('Error recording payment transaction:', transactionError);
    }

    // Log failed payment
    console.log('Payment failure processed:', {
      orderId,
      txnid: payuResponse.txnid,
      mihpayid: payuResponse.mihpayid,
      amount: payuResponse.amount,
      status: finalStatus,
      error: payuResponse.error,
      errorMessage: payuResponse.error_Message,
      failureReason,
    });

    // Redirect based on status
    if (finalStatus === 'pending') {
      const pendingUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/pending?orderId=${orderId}&txnid=${payuResponse.txnid}`;
      return NextResponse.redirect(pendingUrl);
    } else {
      const failureUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/failure?orderId=${orderId}&txnid=${payuResponse.txnid}&error=${failureReason}&errorCode=${payuResponse.error}&errorMessage=${encodeURIComponent(payuResponse.error_Message || '')}`;
      return NextResponse.redirect(failureUrl);
    }

  } catch (error) {
    console.error('Error in payment failure handler:', error);
    
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
    
    // Get failed payment details
    const { data: transaction, error } = await supabase
      .from('payment_transactions')
      .select('*')
      .eq('payu_txnid', txnid)
      .eq('status', 'failure')
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: {
        id: transaction.id,
        orderId: transaction.order_id,
        txnid: transaction.payu_txnid,
        amount: transaction.amount,
        status: transaction.status,
        errorCode: transaction.error_code,
        errorMessage: transaction.error_message,
        paymentMethod: transaction.payment_method,
        createdAt: transaction.created_at,
      },
    });

  } catch (error) {
    console.error('Error in payment failure status check:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 