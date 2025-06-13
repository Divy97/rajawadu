"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { useCheckout } from "@/lib/hooks/useCheckout";
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
import { ArrowLeft, CreditCard, MapPin, Truck, Loader2 } from "lucide-react";
import { PayUForm } from "@/components/PayUForm";

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();
  const checkout = useCheckout();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "India",
    },
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
      country: "India",
    },
    orderNotes: "",
  });

  // Redirect to cart if empty
  if (!checkout.hasItems) {
    router.push("/cart");
    return null;
  }

  // Show PayU form if payment data is ready
  if (checkout.currentStep === "payment" && checkout.paymentData) {
    return (
      <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
        <div className="container mx-auto py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-logo text-sweet-brown mb-6">
              Redirecting to Payment
            </h1>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 p-8">
              <div className="flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-sweet-orange" />
              </div>
              <p className="text-sweet-brown/80 mb-6">
                Please wait while we redirect you to the secure payment gateway...
              </p>
              <PayUForm
                paymentUrl={checkout.paymentData.paymentUrl}
                formData={checkout.paymentData.formData}
                onSubmit={checkout.onPaymentSubmit}
                autoSubmit={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: string, section?: "shippingAddress" | "billingAddress") => {
    setFormData(prev => {
      if (section) {
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const checkoutData = {
      ...formData,
      billingAddress: sameAsShipping ? formData.shippingAddress : formData.billingAddress,
      sameAsShipping,
    };

    await checkout.processCheckout(checkoutData);
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
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sweet-orange text-white">
                  <Truck size={16} />
                </div>
                <span className="font-logo text-sweet-brown">
                  Customer Details
                </span>
              </div>
              <div className="w-16 h-px bg-sweet-brown/20"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-sweet-orange/20 text-sweet-orange">
                  <CreditCard size={16} />
                </div>
                <span className="font-logo text-sweet-brown/60">
                  Payment
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Customer Information */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                  <div className="p-6 border-b border-sweet-brown/10">
                    <div className="flex items-center gap-2">
                      <MapPin size={20} className="text-sweet-orange" />
                      <h2 className="font-logo text-xl text-sweet-brown">
                        Customer Information
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="fullName"
                        className="font-logo text-sweet-brown"
                      >
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                        className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                      />
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
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
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
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                  <div className="p-6 border-b border-sweet-brown/10">
                    <div className="flex items-center gap-2">
                      <Truck size={20} className="text-sweet-orange" />
                      <h2 className="font-logo text-xl text-sweet-brown">
                        Shipping Address
                      </h2>
                    </div>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="street"
                        className="font-logo text-sweet-brown"
                      >
                        Street Address
                      </Label>
                      <Input
                        id="street"
                        value={formData.shippingAddress.street}
                        onChange={(e) => handleInputChange("street", e.target.value, "shippingAddress")}
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
                          value={formData.shippingAddress.city}
                          onChange={(e) => handleInputChange("city", e.target.value, "shippingAddress")}
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
                        <Select 
                          value={formData.shippingAddress.state}
                          onValueChange={(value) => handleInputChange("state", value, "shippingAddress")}
                          required
                        >
                          <SelectTrigger className="font-serif border-sweet-brown/20 focus:border-sweet-orange">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                            <SelectItem value="kerala">Kerala</SelectItem>
                            <SelectItem value="andhra pradesh">Andhra Pradesh</SelectItem>
                            <SelectItem value="telangana">Telangana</SelectItem>
                            <SelectItem value="west bengal">West Bengal</SelectItem>
                            <SelectItem value="odisha">Odisha</SelectItem>
                            <SelectItem value="bihar">Bihar</SelectItem>
                            <SelectItem value="jharkhand">Jharkhand</SelectItem>
                            <SelectItem value="chhattisgarh">Chhattisgarh</SelectItem>
                            <SelectItem value="madhya pradesh">Madhya Pradesh</SelectItem>
                            <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
                            <SelectItem value="uttarakhand">Uttarakhand</SelectItem>
                            <SelectItem value="himachal pradesh">Himachal Pradesh</SelectItem>
                            <SelectItem value="jammu and kashmir">Jammu and Kashmir</SelectItem>
                            <SelectItem value="ladakh">Ladakh</SelectItem>
                            <SelectItem value="punjab">Punjab</SelectItem>
                            <SelectItem value="haryana">Haryana</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="zipcode"
                          className="font-logo text-sweet-brown"
                        >
                          PIN Code
                        </Label>
                        <Input
                          id="zipcode"
                          value={formData.shippingAddress.zipcode}
                          onChange={(e) => handleInputChange("zipcode", e.target.value, "shippingAddress")}
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

                {/* Billing Address */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                  <div className="p-6 border-b border-sweet-brown/10">
                    <div className="flex items-center gap-2">
                      <CreditCard size={20} className="text-sweet-orange" />
                      <h2 className="font-logo text-xl text-sweet-brown">
                        Billing Address
                      </h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
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
                    
                    {!sameAsShipping && (
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="billingStreet"
                            className="font-logo text-sweet-brown"
                          >
                            Street Address
                          </Label>
                          <Input
                            id="billingStreet"
                            value={formData.billingAddress.street}
                            onChange={(e) => handleInputChange("street", e.target.value, "billingAddress")}
                            required
                            className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="billingCity"
                              className="font-logo text-sweet-brown"
                            >
                              City
                            </Label>
                            <Input
                              id="billingCity"
                              value={formData.billingAddress.city}
                              onChange={(e) => handleInputChange("city", e.target.value, "billingAddress")}
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="billingState"
                              className="font-logo text-sweet-brown"
                            >
                              State
                            </Label>
                            <Select 
                              value={formData.billingAddress.state}
                              onValueChange={(value) => handleInputChange("state", value, "billingAddress")}
                              required
                            >
                              <SelectTrigger className="font-serif border-sweet-brown/20 focus:border-sweet-orange">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gujarat">Gujarat</SelectItem>
                                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                <SelectItem value="rajasthan">Rajasthan</SelectItem>
                                {/* Add other states as needed */}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="billingZipcode"
                              className="font-logo text-sweet-brown"
                            >
                              PIN Code
                            </Label>
                            <Input
                              id="billingZipcode"
                              value={formData.billingAddress.zipcode}
                              onChange={(e) => handleInputChange("zipcode", e.target.value, "billingAddress")}
                              required
                              className="font-serif border-sweet-brown/20 focus:border-sweet-orange"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label
                              htmlFor="billingCountry"
                              className="font-logo text-sweet-brown"
                            >
                              Country
                            </Label>
                            <Input
                              id="billingCountry"
                              value="India"
                              disabled
                              className="font-serif border-sweet-brown/20 bg-sweet-brown/5"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Notes */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                  <div className="p-6 border-b border-sweet-brown/10">
                    <h2 className="font-logo text-xl text-sweet-brown">
                      Order Notes (Optional)
                    </h2>
                  </div>
                  <div className="p-6">
                    <textarea
                      value={formData.orderNotes}
                      onChange={(e) => handleInputChange("orderNotes", e.target.value)}
                      placeholder="Any special instructions for your order..."
                      rows={3}
                      className="w-full font-serif border border-sweet-brown/20 rounded-lg p-3 focus:border-sweet-orange focus:outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Error Display */}
                {checkout.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-serif">{checkout.error}</p>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 text-sweet-brown hover:text-sweet-orange transition-colors font-medium"
                  >
                    <ArrowLeft size={16} />
                    <span>Back to Cart</span>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-sweet-brown hover:bg-sweet-orange text-white px-8 py-6 rounded-full transition-all"
                    disabled={checkout.isProcessing}
                  >
                    {checkout.isProcessing ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="font-logo tracking-wide">Processing...</span>
                      </div>
                    ) : (
                      <span className="font-logo tracking-wide">
                        Continue to Payment
                      </span>
                    )}
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
                      <span>₹{checkout.orderTotals.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-serif text-sweet-brown/80">
                      <span>Shipping</span>
                      <span>
                        {checkout.orderTotals.shippingCost === 0
                          ? "Free"
                          : `₹${checkout.orderTotals.shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-sweet-brown/10">
                      <div className="flex justify-between font-logo text-xl text-sweet-brown">
                        <span>Total</span>
                        <span>₹{checkout.orderTotals.total.toFixed(2)}</span>
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
