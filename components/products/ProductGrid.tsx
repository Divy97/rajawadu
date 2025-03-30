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
    <div className="w-full px-2 sm:px-4">
      {title && (
        <div className="text-center mb-8 sm:mb-12">
          {/* Royal Ornament */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 sm:w-12 bg-sweet-brown/20"></div>
            <div className="text-sweet-orange text-lg sm:text-xl">◆</div>
            <div className="h-px w-8 sm:w-12 bg-sweet-brown/20"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-sweet-brown font-bold mb-2 sm:mb-4">
            {title}
          </h2>

          {/* Bottom Ornament */}
          <div className="flex items-center justify-center gap-2 mt-2 sm:mt-4">
            <div className="h-px w-6 sm:w-8 bg-sweet-orange/30"></div>
            <div className="text-sweet-orange text-xs sm:text-sm">❖</div>
            <div className="h-px w-6 sm:w-8 bg-sweet-orange/30"></div>
          </div>
        </div>
      )}

      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-8"
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
        <div className="text-center py-8 sm:py-16">
          <div className="text-sweet-orange text-3xl sm:text-4xl mb-3 sm:mb-4">
            ✧
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-sweet-brown mb-2">
            No Products Found
          </h3>
          <p className="text-sm sm:text-base text-sweet-brown/60">
            Please try adjusting your filters or search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
