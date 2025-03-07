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
        <div className="container mx-auto py-24">
          <div className="max-w-screen-xl mx-auto">
            {/* Empty Cart Content */}
            <div className="text-center mb-12">
              <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
                Shopping Cart
              </span>
              <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
                Your Royal Collection
              </h1>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                <div className="text-sweet-orange">❖</div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              </div>
            </div>

            <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 p-12 text-center relative overflow-hidden">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-sweet-orange/20 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-sweet-orange/20 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-sweet-orange/20 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-sweet-orange/20 rounded-br-xl"></div>

              <div className="mb-6 text-sweet-orange">
                <ShoppingBag size={48} className="mx-auto" />
              </div>
              <h2 className="text-2xl font-logo text-sweet-brown mb-4">
                Your cart awaits your royal selection
              </h2>
              <p className="font-serif text-sweet-brown/80 mb-8">
                Explore our exquisite collection of traditional mukhwas and
                begin your royal journey.
              </p>
              <Link href="/products">
                <Button className="bg-sweet-brown hover:bg-sweet-orange text-white px-8 py-6 rounded-full transition-all">
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
      <div className="container mx-auto py-24">
        <div className="max-w-screen-xl mx-auto">
          {/* Cart Header */}
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              Shopping Cart
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              Your Royal Collection
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden">
                <div className="p-6 border-b border-sweet-brown/10">
                  <div className="flex justify-between items-center">
                    <h2 className="font-logo text-xl text-sweet-brown">
                      Selected Items ({items.length})
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-sweet-brown/60 hover:text-sweet-orange transition-colors inline-flex items-center gap-2 text-sm font-medium"
                    >
                      <Trash2 size={16} />
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
                className="inline-flex items-center gap-2 text-sweet-brown hover:text-sweet-orange transition-colors font-medium"
              >
                <ArrowLeft size={16} />
                <span>Continue Shopping</span>
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-sweet-brown/10 overflow-hidden sticky top-24">
                <div className="p-6 border-b border-sweet-brown/10">
                  <h2 className="font-logo text-xl text-sweet-brown">
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
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
                    {cartTotal < 500 && (
                      <div className="mt-2 text-sweet-orange text-sm font-serif">
                        Add ₹{(500 - cartTotal).toFixed(2)} more for free
                        shipping
                      </div>
                    )}
                  </div>

                  <Link href="/checkout" className="block mt-8">
                    <Button className="w-full bg-sweet-brown hover:bg-sweet-orange text-white py-7 rounded-full transition-all">
                      <span className="font-logo tracking-wide">
                        Proceed to Checkout
                      </span>
                    </Button>
                  </Link>

                  <div className="text-sweet-brown/60 text-sm text-center mt-4 font-serif">
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
    <div className="p-6 flex items-center gap-6">
      {/* Product Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Product Info */}
      <div className="flex-grow">
        <h3 className="font-serif text-lg text-sweet-brown mb-1">
          {item.name}
        </h3>
        <div className="font-logo text-sweet-brown/80">
          ₹{item.price.toFixed(2)}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center border border-sweet-brown/20 rounded-lg overflow-hidden bg-white/80">
        <button
          className="p-2 text-sweet-brown hover:bg-sweet-orange/10 transition-colors disabled:opacity-50"
          onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
          disabled={isUpdating}
        >
          <Minus size={16} />
        </button>
        <span className="px-4 py-2 text-sweet-brown min-w-[40px] text-center font-serif">
          {item.quantity}
        </span>
        <button
          className="p-2 text-sweet-brown hover:bg-sweet-orange/10 transition-colors disabled:opacity-50"
          onClick={() => onUpdateQuantity(item.quantity + 1)}
          disabled={isUpdating}
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Total & Remove */}
      <div className="text-right">
        <div className="font-logo text-lg text-sweet-brown">
          ₹{(item.price * item.quantity).toFixed(2)}
        </div>
        <button
          className="text-sweet-brown/60 hover:text-sweet-orange transition-colors text-sm mt-1"
          onClick={onRemove}
          disabled={isUpdating}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
