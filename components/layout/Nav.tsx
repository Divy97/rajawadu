"use client";

import Link from "next/link";
import { CartButton } from "@/components/products/CartButton";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for nav background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b ${
        isScrolled ? "bg-[#FDF5ED]/95" : "bg-[#FDF5ED]"
      } border-sweet-orange/5 transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="group">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-logo italic text-sweet-orange hover:text-sweet-orange/90 transition-colors tracking-wider">
            Rajawadu
          </h1>
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex items-center text-sweet-brown"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <Link
            href="/products"
            className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sweet-orange after:transition-all"
          >
            Mukhwas
          </Link>

          <a
            href="/contact"
            className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-sweet-orange after:transition-all"
          >
            Contact
          </a>
          <CartButton />
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#FDF5ED] border-b border-sweet-orange/10 shadow-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              href="/products"
              className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Mukhwas
            </Link>

            <a
              href="/contact"
              className="text-sweet-brown hover:text-sweet-orange transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div className="py-2">
              <CartButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
