"use client";

import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
};

type ProductGridProps = {
  products: Product[];
  title?: string;
};

export function ProductGrid({ products, title }: ProductGridProps) {
  return (
    <div className="w-full">
      {title && (
        <div className="text-center mb-12">
          {/* Royal Ornament */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-sweet-brown/20"></div>
            <div className="text-sweet-orange text-xl">◆</div>
            <div className="h-px w-12 bg-sweet-brown/20"></div>
          </div>

          <h2 className="text-4xl font-serif text-sweet-brown font-bold mb-4">
            {title}
          </h2>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-8 bg-sweet-orange/30"></div>
            <div className="text-sweet-orange text-sm">❖</div>
            <div className="h-px w-8 bg-sweet-orange/30"></div>
          </div>
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              category={product.category}
              image={product.image}
              featured={product.featured}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-16">
          <div className="text-sweet-orange text-4xl mb-4">✧</div>
          <h3 className="text-2xl font-serif text-sweet-brown mb-2">
            No Products Found
          </h3>
          <p className="text-sweet-brown/60">
            Please try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
