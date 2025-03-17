"use client";

import { ProductGrid } from "./ProductGrid";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { type ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
};

type ProductGridWithErrorBoundaryProps = {
  products: Product[];
  title?: string;
};

export function ProductGridWithErrorBoundary({
  products,
  title,
}: ProductGridWithErrorBoundaryProps) {
  // Custom fallback UI specifically for product grid errors
  const productGridFallback: ReactNode = (
    <div className="w-full p-8 text-center bg-white/80 backdrop-blur-sm rounded-lg border border-sweet-orange/20 shadow-sm">
      <div className="text-sweet-orange text-4xl mb-4">✧</div>
      <h2 className="text-2xl font-serif text-sweet-brown mb-4">
        Unable to display products
      </h2>
      <p className="text-sweet-brown/80 mb-6">
        We&apos;re having trouble loading our products right now. Please try
        again later.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-sweet-orange text-white rounded-md font-logo hover:bg-sweet-orange/90 transition-colors"
      >
        Refresh Page
      </button>
    </div>
  );

  return (
    <ErrorBoundary fallback={productGridFallback}>
      <ProductGrid products={products} title={title} />
    </ErrorBoundary>
  );
}
