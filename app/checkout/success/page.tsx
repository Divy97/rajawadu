"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Package, Mail, Loader2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState<{
    orderId?: string;
    txnid?: string;
    amount?: string;
    email?: string;
  }>({});

  useEffect(() => {
    // Extract order details from URL parameters (PayU success callback)
    const details = {
      orderId: searchParams.get('orderId') || searchParams.get('udf1') || undefined,
      txnid: searchParams.get('txnid') || undefined,
      amount: searchParams.get('amount') || undefined,
      email: searchParams.get('email') || undefined,
    };
    
    setOrderDetails(details);
    setIsLoading(false);

    // Clear cart from localStorage if it exists
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rajawadu-cart');
      localStorage.removeItem('rajawadu-checkout-data');
    }

    // Redirect to home after 15 seconds
    const timer = setTimeout(() => {
      router.push("/");
    }, 15000);

    return () => clearTimeout(timer);
  }, [router, searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-sweet-orange mx-auto mb-4" />
          <p className="text-sweet-brown font-serif">Loading order confirmation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
      <div className="container mx-auto py-24">
        <div className="max-w-screen-xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              Payment Successful
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              Thank You for Your Order!
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
          </div>

          {/* Success Message */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
              <div className="p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-8">
                  <CheckCircle2 size={40} />
                </div>
                
                <h2 className="font-logo text-2xl text-sweet-brown mb-4">
                  Your Payment Has Been Processed Successfully
                </h2>
                
                <p className="font-serif text-sweet-brown/80 mb-8">
                  We&apos;ve received your payment and your order is now being processed. 
                  You&apos;ll receive a confirmation email shortly with your order details and tracking information.
                </p>

                {/* Order Details */}
                {(orderDetails.orderId || orderDetails.txnid || orderDetails.amount) && (
                  <div className="bg-sweet-brown/5 rounded-lg p-6 mb-8 text-left">
                    <h3 className="font-logo text-lg text-sweet-brown mb-4 text-center">Order Summary</h3>
                    <div className="space-y-3 text-sm">
                      {orderDetails.orderId && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Order ID:</span>
                          <span className="text-sweet-brown font-mono">{orderDetails.orderId}</span>
                        </div>
                      )}
                      {orderDetails.txnid && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Transaction ID:</span>
                          <span className="text-sweet-brown font-mono">{orderDetails.txnid}</span>
                        </div>
                      )}
                      {orderDetails.amount && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Amount Paid:</span>
                          <span className="text-sweet-brown font-semibold">₹{orderDetails.amount}</span>
                        </div>
                      )}
                      {orderDetails.email && (
                        <div className="flex justify-between">
                          <span className="text-sweet-brown/60">Confirmation sent to:</span>
                          <span className="text-sweet-brown">{orderDetails.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* What's Next */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-logo text-lg text-blue-900 mb-3 text-center">What Happens Next?</h3>
                  <div className="space-y-3 text-sm text-blue-800">
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email Confirmation</p>
                        <p className="text-blue-700">You&apos;ll receive an order confirmation email within 5 minutes</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Package className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Order Processing</p>
                        <p className="text-blue-700">Your order will be packaged and shipped within 1-2 business days</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Delivery Updates</p>
                        <p className="text-blue-700">Track your order progress via SMS and email notifications</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <p className="font-serif text-sweet-brown/60 text-sm">
                    You will be redirected to the home page in 15 seconds.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="min-w-[200px] bg-transparent border-sweet-brown text-sweet-brown hover:bg-sweet-brown/5"
                      >
                        <span className="font-logo tracking-wide">Return Home</span>
                      </Button>
                    </Link>
                    
                    <Link href="/products">
                      <Button className="min-w-[200px] bg-sweet-brown hover:bg-sweet-orange text-white">
                        <span className="font-logo tracking-wide">Continue Shopping</span>
                      </Button>
                    </Link>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sweet-brown/60 hover:text-sweet-brown transition-colors text-sm"
                    >
                      <Mail size={16} />
                      <span>Need help? Contact Support</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 text-center">
              <p className="text-sweet-brown/60 text-sm mb-4">
                Thank you for choosing Rajawadu for your premium mukhwas and mouth fresheners!
              </p>
              <div className="flex items-center justify-center gap-2 text-sweet-brown/40 text-xs">
                <span>Secure Payment</span>
                <span>•</span>
                <span>Fast Delivery</span>
                <span>•</span>
                <span>Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
