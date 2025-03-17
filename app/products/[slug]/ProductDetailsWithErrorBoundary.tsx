"use client";

import { ProductDetails } from "./ProductDetails";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { type ReactNode } from "react";
import { type Product } from "@/types/product";
import Link from "next/link";

type ProductDetailsWithErrorBoundaryProps = {
  product: Product;
};

export function ProductDetailsWithErrorBoundary({
  product,
}: ProductDetailsWithErrorBoundaryProps) {
  // Custom fallback UI specifically for product details errors
  const productDetailsFallback: ReactNode = (
    <div className="w-full p-8 text-center bg-white/80 backdrop-blur-sm rounded-lg border border-sweet-orange/20 shadow-sm">
      <div className="text-sweet-orange text-4xl mb-4">✧</div>
      <h2 className="text-2xl font-serif text-sweet-brown mb-4">
        Unable to display product details
      </h2>
      <p className="text-sweet-brown/80 mb-6">
        We&apos;re having trouble loading this product&apos;s details right now.
        Please try again later.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-sweet-orange text-white rounded-md font-logo hover:bg-sweet-orange/90 transition-colors"
        >
          Refresh Page
        </button>
        <Link
          href="/products"
          className="px-6 py-2 bg-sweet-brown text-white rounded-md font-logo hover:bg-sweet-brown/90 transition-colors"
        >
          Back to Products
        </Link>
      </div>
    </div>
  );

  return (
    <ErrorBoundary fallback={productDetailsFallback}>
      <ProductDetails product={product} />
    </ErrorBoundary>
  );
}
