"use client";

import Link from "next/link";
import { CartButton } from "@/components/products/CartButton";

export function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FDF5ED] backdrop-blur-sm border-b border-sweet-orange/5">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="text-5xl font-logo italic text-sweet-orange hover:text-sweet-orange/90 transition-colors tracking-wider">
            Rajawadu
          </h1>
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sweet-orange after:transition-all"
          >
            Mukhwas
          </Link>
          <a
            href="#about"
            className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sweet-orange after:transition-all"
          >
            About
          </a>
          <a
            href="#contact"
            className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sweet-orange after:transition-all"
          >
            Contact
          </a>
          <CartButton />
        </div>
      </div>
    </nav>
  );
}
