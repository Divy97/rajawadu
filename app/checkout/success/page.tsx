"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  // Redirect to home if accessed directly
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
      <div className="container mx-auto py-24">
        <div className="max-w-screen-xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              Order Confirmed
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              Thank You for Your Order
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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sweet-orange/10 text-sweet-orange mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="font-logo text-2xl text-sweet-brown mb-4">
                  Your Order Has Been Placed Successfully
                </h2>
                <p className="font-serif text-sweet-brown/80 mb-8">
                  We&apos;ve received your order and will begin processing it
                  right away. You&apos;ll receive a confirmation email shortly
                  with your order details.
                </p>
                <div className="space-y-4">
                  <p className="font-serif text-sweet-brown/60 text-sm">
                    You will be redirected to the home page in 10 seconds.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/">
                      <Button
                        variant="outline"
                        className="min-w-[200px] bg-transparent border-sweet-brown text-sweet-brown hover:bg-sweet-brown/5"
                      >
                        <span className="font-logo tracking-wide">
                          Return Home
                        </span>
                      </Button>
                    </Link>
                    <Link href="/products">
                      <Button className="min-w-[200px] bg-sweet-brown hover:bg-sweet-orange text-white">
                        <span className="font-logo tracking-wide">
                          Continue Shopping
                        </span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
