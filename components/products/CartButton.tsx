"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";

export function CartButton() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  // Only show cart count after client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const itemCount = totalItems();

  return (
    <Link href="/cart">
      <Button
        variant="outline"
        className="relative bg-white/80 hover:bg-sweet-orange/10 text-sweet-brown hover:text-sweet-orange border-sweet-orange hover:border-sweet-orange rounded-full px-6 py-6 font-logo tracking-wide transition-all group"
      >
        <span className="flex items-center gap-2">
          <ShoppingBag
            size={18}
            className="transition-transform group-hover:scale-110"
          />
          <span>Cart</span>
        </span>
        {mounted && itemCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-sweet-orange text-white text-xs font-medium flex items-center justify-center">
            {itemCount > 99 ? "99+" : itemCount}
          </div>
        )}
      </Button>
    </Link>
  );
}
