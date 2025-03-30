"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CreditCard, MapPin, Truck } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment">(
    "shipping"
  );
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const cartTotal = totalPrice();
  const shippingCost = cartTotal >= 500 ? 0 : 50;
  const orderTotal = cartTotal + shippingCost;

  // Redirect to cart if empty
  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === "shipping") {
      setCurrentStep("payment");
      // Safely use window.scrollTo by checking if running in browser
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
      }
    } else {
      setIsProcessing(true);
      // TODO: Implement payment processing
      setTimeout(() => {
        clearCart();
        router.push("/checkout/success");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
      <div className="container mx-auto py-24">
        <div className="max-w-screen-xl mx-auto">
          {/* Checkout Header */}
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              Checkout
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              Complete Your Order
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
          </div>

          {/* Checkout Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "shipping"
                      ? "bg-sweet-orange text-white"
                      : "bg-sweet-orange/20 text-sweet-orange"
                  }`}
                >
                  <Truck size={16} />
                </div>
                <span
                  className={`font-logo ${
                    currentStep === "shipping"
                      ? "text-sweet-brown"
                      : "text-sweet-brown/60"
                  }`}
                >
                  Shipping
                </span>
              </div>
              <div className="w-16 h-px bg-sweet-brown/20"></div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === "payment"
                      ? "bg-sweet-orange text-white"
                      : "bg-sweet-orange/20 text-sweet-orange"
                  }`}
                >
                  <CreditCard size={16} />
                </div>
                <span
                  className={`font-logo ${
                    currentStep === "payment"
                      ? "text-sweet-brown"
                      : "text-sweet-brown/60"
                  }`}
                >
                  Payment
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {currentStep === "shipping" ? (
                  <div className="space-y-8">
                    {/* Shipping Information */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                      <div className="p-6 border-b border-sweet-brown/10">
                        <div className="flex items-center gap-2">
                          <MapPin size={20} className="text-sweet-orange" />
                          <h2 className="font-logo text-xl text-sweet-brown">
                            Shipping Information
                          </h2>
                        </div>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="firstName"
                              className="font-logo text-sweet-brown"
                            >
                              First Name
                            </Label>
                            <Input
                              id="firstName"
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="lastName"
                              className="font-logo text-sweet-brown"
                            >
                              Last Name
                            </Label>
                            <Input
                              id="lastName"
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="email"
                            className="font-logo text-sweet-brown"
                          >
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="phone"
                            className="font-logo text-sweet-brown"
                          >
                            Phone Number
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            required
                            className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="address"
                            className="font-logo text-sweet-brown"
                          >
                            Street Address
                          </Label>
                          <Input
                            id="address"
                            required
                            className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="city"
                              className="font-logo text-sweet-brown"
                            >
                              City
                            </Label>
                            <Input
                              id="city"
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="state"
                              className="font-logo text-sweet-brown"
                            >
                              State
                            </Label>
                            <Select required>
                              <SelectTrigger className="font-serif border-sweet-brown/20 focus:border-sweet-orange">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gujarat">Gujarat</SelectItem>
                                <SelectItem value="maharashtra">
                                  Maharashtra
                                </SelectItem>
                                <SelectItem value="rajasthan">
                                  Rajasthan
                                </SelectItem>
                                {/* Add more states */}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="pincode"
                              className="font-logo text-sweet-brown"
                            >
                              PIN Code
                            </Label>
                            <Input
                              id="pincode"
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="country"
                              className="font-logo text-sweet-brown"
                            >
                              Country
                            </Label>
                            <Input
                              id="country"
                              value="India"
                              disabled
                              className="font-serif border-sweet-brown/20 bg-sweet-brown/5"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {/* Payment Information */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                      <div className="p-6 border-b border-sweet-brown/10">
                        <div className="flex items-center gap-2">
                          <CreditCard size={20} className="text-sweet-orange" />
                          <h2 className="font-logo text-xl text-sweet-brown">
                            Payment Information
                          </h2>
                        </div>
                      </div>
                      <div className="p-6 space-y-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="cardName"
                            className="font-logo text-sweet-brown"
                          >
                            Name on Card
                          </Label>
                          <Input
                            id="cardName"
                            required
                            className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="cardNumber"
                            className="font-logo text-sweet-brown"
                          >
                            Card Number
                          </Label>
                          <Input
                            id="cardNumber"
                            required
                            className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="expiry"
                              className="font-logo text-sweet-brown"
                            >
                              Expiry Date
                            </Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="cvv"
                              className="font-logo text-sweet-brown"
                            >
                              CVV
                            </Label>
                            <Input
                              id="cvv"
                              type="password"
                              maxLength={4}
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Address */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                      <div className="p-6 border-b border-sweet-brown/10">
                        <div className="flex items-center gap-2">
                          <MapPin size={20} className="text-sweet-orange" />
                          <h2 className="font-logo text-xl text-sweet-brown">
                            Billing Address
                          </h2>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id="sameAsShipping"
                            checked={sameAsShipping}
                            onCheckedChange={(checked: boolean) =>
                              setSameAsShipping(checked)
                            }
                          />
                          <label
                            htmlFor="sameAsShipping"
                            className="font-serif text-sweet-brown cursor-pointer"
                          >
                            Same as shipping address
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {currentStep === "payment" ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep("shipping")}
                      className="inline-flex items-center gap-2 text-sweet-brown hover:text-sweet-orange transition-colors font-medium"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Shipping</span>
                    </button>
                  ) : (
                    <Link
                      href="/cart"
                      className="inline-flex items-center gap-2 text-sweet-brown hover:text-sweet-orange transition-colors font-medium"
                    >
                      <ArrowLeft size={16} />
                      <span>Back to Cart</span>
                    </Link>
                  )}
                  <Button
                    type="submit"
                    className="bg-sweet-brown hover:bg-sweet-orange text-white px-8 py-6 rounded-full transition-all"
                    disabled={isProcessing}
                  >
                    <span className="font-logo tracking-wide">
                      {isProcessing
                        ? "Processing..."
                        : currentStep === "shipping"
                        ? "Continue to Payment"
                        : "Place Order"}
                    </span>
                  </Button>
                </div>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-sweet-brown/10">
                  <h2 className="font-logo text-xl text-sweet-brown">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-serif text-sweet-brown">
                            {item.name}
                          </h3>
                          <div className="text-sweet-brown/60 text-sm">
                            Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="font-logo text-sweet-brown">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-sweet-brown/10">
                    <div className="flex justify-between font-serif text-sweet-brown/80">
                      <span>Subtotal</span>
                      <span>₹{cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-serif text-sweet-brown/80">
                      <span>Shipping</span>
                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : `₹${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-sweet-brown/10">
                      <div className="flex justify-between font-logo text-xl text-sweet-brown">
                        <span>Total</span>
                        <span>₹{orderTotal.toFixed(2)}</span>
                      </div>
                    </div>
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
