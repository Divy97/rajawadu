"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw, Mail, Phone } from "lucide-react";

export default function CheckoutFailurePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isRetrying, setIsRetrying] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    txnid?: string;
    amount?: string;
    reason?: string;
    orderId?: string;
  }>({});

  useEffect(() => {
    // Extract payment details from URL parameters
    const details = {
      txnid: searchParams.get('txnid') || undefined,
      amount: searchParams.get('amount') || undefined,
      reason: searchParams.get('error_Message') || searchParams.get('failure_reason') || 'Payment failed due to technical reasons',
      orderId: searchParams.get('udf1') || undefined,
    };
    setPaymentDetails(details);
  }, [searchParams]);

  const handleRetryPayment = async () => {
    if (!paymentDetails.orderId) {
      // If no order ID, redirect to checkout
      router.push('/checkout');
      return;
    }

    setIsRetrying(true);
    
    try {
      // Reinitiate payment for the same order
      const response = await fetch('/api/payu/initiate-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId: paymentDetails.orderId }),
      });

      if (response.ok) {
        const result = await response.json();
        // Redirect to payment page
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = result.payment.paymentUrl;
        
        Object.entries(result.payment.formData).forEach(([key, value]) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = value as string;
          form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
      } else {
        throw new Error('Failed to initiate payment');
      }
    } catch (error) {
      console.error('Retry payment error:', error);
      // Fallback to checkout page
      router.push('/checkout');
    } finally {
      setIsRetrying(false);
    }
  };

  const getFailureReason = () => {
    const reason = paymentDetails.reason?.toLowerCase() || '';
    
    if (reason.includes('cancelled') || reason.includes('user cancelled')) {
      return 'You cancelled the payment process. Your order has been saved and you can retry the payment anytime.';
    } else if (reason.includes('insufficient') || reason.includes('balance')) {
      return 'Payment failed due to insufficient balance. Please check your account balance and try again.';
    } else if (reason.includes('expired') || reason.includes('timeout')) {
      return 'Payment session expired. Please try again with a fresh payment session.';
    } else if (reason.includes('network') || reason.includes('connection')) {
      return 'Payment failed due to network issues. Please check your internet connection and try again.';
    } else if (reason.includes('declined') || reason.includes('blocked')) {
      return 'Payment was declined by your bank. Please contact your bank or try a different payment method.';
    } else {
      return 'Payment failed due to technical reasons. Please try again or contact our support team if the issue persists.';
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
      <div className="container mx-auto py-24">
        <div className="max-w-screen-xl mx-auto">
          {/* Failure Header */}
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              Payment Failed
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              Oops! Something Went Wrong
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
          </div>

          {/* Failure Message */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-8">
                  <XCircle size={40} />
                </div>
                
                <h2 className="font-logo text-2xl text-sweet-brown mb-4">
                  Payment Could Not Be Processed
                </h2>
                
                <p className="font-serif text-sweet-brown/80 mb-8">
                  {getFailureReason()}
                </p>

                {/* Payment Details */}
                {(paymentDetails.txnid || paymentDetails.amount) && (
                  <div className="bg-sweet-brown/5 rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-logo text-lg text-sweet-brown mb-4">Payment Details</h3>
                    <div className="space-y-2 text-sm">
                      {paymentDetails.txnid && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Transaction ID:</span>
                          <span className="text-sweet-brown font-mono">{paymentDetails.txnid}</span>
                        </div>
                      )}
                      {paymentDetails.amount && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Amount:</span>
                          <span className="text-sweet-brown">₹{paymentDetails.amount}</span>
                        </div>
                      )}
                      {paymentDetails.orderId && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Order ID:</span>
                          <span className="text-sweet-brown font-mono">{paymentDetails.orderId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      onClick={handleRetryPayment}
                      disabled={isRetrying}
                      className="min-w-[200px] bg-sweet-brown hover:bg-sweet-orange text-white"
                    >
                      {isRetrying ? (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span className="font-logo tracking-wide">Retrying...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <RefreshCw className="h-4 w-4" />
                          <span className="font-logo tracking-wide">Retry Payment</span>
                        </div>
                      )}
                    </Button>
                    
                    <Link href="/cart">
                      <Button
                        variant="outline"
                        className="min-w-[200px] bg-transparent border-sweet-brown text-sweet-brown hover:bg-sweet-brown/5"
                      >
                        <div className="flex items-center gap-2">
                          <ArrowLeft className="h-4 w-4" />
                          <span className="font-logo tracking-wide">Back to Cart</span>
                        </div>
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sweet-brown/60 hover:text-sweet-brown transition-colors text-sm"
                    >
                      <Mail size={16} />
                      <span>Email Support</span>
                    </Link>
                    <span className="text-sweet-brown/40">•</span>
                    <a
                      href="tel:+91-XXXXXXXXXX"
                      className="inline-flex items-center gap-2 text-sweet-brown/60 hover:text-sweet-brown transition-colors text-sm"
                    >
                      <Phone size={16} />
                      <span>Call Support</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Help */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-logo text-lg text-blue-900 mb-3">Need Help?</h3>
              <div className="text-sm text-blue-800 space-y-2">
                <p>• Your order has been saved and you can retry payment anytime</p>
                <p>• Try using a different payment method or card</p>
                <p>• Ensure you have sufficient balance in your account</p>
                <p>• Contact your bank if the payment is repeatedly declined</p>
                <p>• Reach out to our support team for assistance</p>
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-8">
              <Link href="/products">
                <Button variant="ghost" className="text-sweet-brown hover:text-sweet-orange">
                  <span className="font-logo tracking-wide">Continue Shopping</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 