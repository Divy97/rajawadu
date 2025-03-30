"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, CartItem } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    setIsUpdating(true);
    setTimeout(() => {
      updateQuantity(id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };

  const cartTotal = totalPrice();
  const shippingCost = cartTotal >= 500 ? 0 : 50;
  const orderTotal = cartTotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-[#FDF5ED] bg-grain-texture">
        <div className="container mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6">
          <div className="max-w-screen-xl mx-auto">
            {/* Empty Cart Content */}
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-4 sm:mb-6 block">
                Shopping Cart
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-logo text-sweet-brown mb-4 sm:mb-6">
                Your Royal Collection
              </h1>
              <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                <div className="text-sweet-orange">❖</div>
                <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              </div>
            </div>

            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 p-6 sm:p-12 text-center relative overflow-hidden">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-l-2 border-sweet-orange/20 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-r-2 border-sweet-orange/20 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-l-2 border-sweet-orange/20 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-r-2 border-sweet-orange/20 rounded-br-xl"></div>

              <div className="mb-4 sm:mb-6 text-sweet-orange">
                <ShoppingBag size={36} className="mx-auto sm:hidden" />
                <ShoppingBag size={48} className="mx-auto hidden sm:block" />
              </div>
              <h2 className="text-xl sm:text-2xl font-logo text-sweet-brown mb-2 sm:mb-4">
                Your cart awaits your royal selection
              </h2>
              <p className="text-sm sm:text-base font-serif text-sweet-brown/80 mb-6 sm:mb-8">
                Explore our exquisite collection of traditional mukhwas and
                begin your royal journey.
              </p>
              <Link href="/products">
                <Button className="bg-sweet-brown hover:bg-sweet-orange text-white px-6 sm:px-8 py-2 sm:py-6 rounded-full transition-all text-sm sm:text-base">
                  <span className="font-logo tracking-wide">
                    Explore Collection
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
      <div className="container mx-auto py-12 sm:py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          {/* Cart Header */}
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-4 sm:mb-6 block">
              Shopping Cart
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-logo text-sweet-brown mb-4 sm:mb-6">
              Your Royal Collection
            </h1>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                <div className="p-4 sm:p-6 border-b border-sweet-brown/10">
                  <div className="flex justify-between items-center">
                    <h2 className="font-logo text-lg sm:text-xl text-sweet-brown">
                      Selected Items ({items.length})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sweet-brown/60 hover:text-sweet-orange transition-colors inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium"
                    >
                      <Trash2 size={14} className="sm:size-[16px]" />
                      <span>Clear Cart</span>
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-sweet-brown/10">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                      onUpdateQuantity={(qty) =>
                        handleQuantityChange(item.id, qty)
                      }
                      isUpdating={isUpdating}
                    />
                  ))}
                </div>
              </div>

              <Link
                href="/products"
                className="inline-flex items-center gap-1 sm:gap-2 text-sweet-brown hover:text-sweet-orange transition-colors font-medium text-sm sm:text-base"
              >
                <ArrowLeft size={14} className="sm:size-[16px]" />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden lg:sticky lg:top-24">
                <div className="p-4 sm:p-6 border-b border-sweet-brown/10">
                  <h2 className="font-logo text-lg sm:text-xl text-sweet-brown">
                    Order Summary
                  </h2>
                </div>

                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="flex justify-between font-serif text-sm sm:text-base text-sweet-brown/80">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-serif text-sm sm:text-base text-sweet-brown/80">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `₹${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-sweet-brown/10">
                    <div className="flex justify-between font-logo text-lg sm:text-xl text-sweet-brown">
                      <span>Total</span>
                      <span>₹{orderTotal.toFixed(2)}</span>
                    </div>
                    {cartTotal < 500 && (
                      <div className="mt-1 sm:mt-2 text-sweet-orange text-xs sm:text-sm font-serif">
                        Add ₹{(500 - cartTotal).toFixed(2)} more for free
                        shipping
                      </div>
                    )}
                  </div>

                  {/* <Link href="/checkout" className="block mt-8"> */}
                  <Button
                    className="w-full bg-sweet-brown hover:bg-sweet-orange text-white py-2 sm:py-7 rounded-full transition-all mt-4 sm:mt-6 text-sm sm:text-base"
                    disabled
                  >
                    <span className="font-logo tracking-wide">
                      Proceed to Checkout
                    </span>
                  </Button>
                  {/* </Link> */}

                  <div className="text-sweet-brown/60 text-xs sm:text-sm text-center mt-2 sm:mt-4 font-serif">
                    Secure checkout powered by Stripe
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

function CartItemRow({
  item,
  onRemove,
  onUpdateQuantity,
  isUpdating,
}: {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
  isUpdating: boolean;
}) {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Product Image */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-contain p-2"
            sizes="(max-width: 640px) 64px, 80px"
          />
        </div>

        {/* Product Info */}
        <div className="flex-grow">
          <h3 className="font-serif text-base sm:text-lg text-sweet-brown mb-0.5 sm:mb-1">
            {item.name}
          </h3>
          <div className="font-logo text-sm sm:text-base text-sweet-brown/80">
            ₹{item.price.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-normal gap-4 sm:gap-6 mt-2 sm:mt-0 sm:ml-auto">
        {/* Quantity */}
        <div className="flex items-center border border-sweet-brown/20 rounded-lg overflow-hidden bg-white/80">
          <button
            className="p-1.5 sm:p-2 text-sweet-brown hover:bg-sweet-orange/10 transition-colors disabled:opacity-50"
            onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            disabled={isUpdating}
          >
            <Minus size={14} className="sm:size-[16px]" />
          </button>
          <span className="px-2 sm:px-4 py-1 sm:py-2 text-sweet-brown min-w-[32px] sm:min-w-[40px] text-center font-serif text-sm sm:text-base">
            {item.quantity}
          </span>
          <button
            className="p-1.5 sm:p-2 text-sweet-brown hover:bg-sweet-orange/10 transition-colors disabled:opacity-50"
            onClick={() => onUpdateQuantity(item.quantity + 1)}
            disabled={isUpdating}
          >
            <Plus size={14} className="sm:size-[16px]" />
          </button>
        </div>

        {/* Total & Remove */}
        <div className="text-right">
          <div className="font-logo text-base sm:text-lg text-sweet-brown">
            ₹{(item.price * item.quantity).toFixed(2)}
          </div>
          <button
            className="text-sweet-brown/60 hover:text-sweet-orange transition-colors text-xs sm:text-sm mt-1"
            onClick={onRemove}
            disabled={isUpdating}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
