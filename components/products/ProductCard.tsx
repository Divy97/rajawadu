"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/cart";
import { motion } from "framer-motion";

type ProductCardProps = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
};

export function ProductCard({
  id,
  name,
  slug,
  price,
  category,
  image,
  featured = false,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-sweet-brown/10 hover:border-sweet-orange/20 transition-all duration-500">
        {/* Ornamental Corner Elements */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-sweet-orange/20 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-sweet-orange/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-sweet-orange/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-sweet-orange/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <Link href={`/products/${slug}`} className="block">
          <div className="relative aspect-square overflow-hidden">
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-sweet-brown/5 to-transparent z-10"></div>

            <Image
              src={image}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {featured && (
              <Badge className="absolute top-4 right-4 bg-sweet-orange text-white border-none z-20 px-3 py-1 rounded-full shadow-lg">
                Featured
              </Badge>
            )}

            {/* Price Tag */}
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20">
              <span className="text-sweet-brown font-bold">
                ₹{price.toFixed(2)}
              </span>
            </div>
          </div>

          <CardContent className="p-6 text-center">
            {/* Category with Ornamental Divider */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-sweet-brown/20"></div>
              <span className="text-xs uppercase tracking-widest text-sweet-brown/60">
                {category}
              </span>
              <div className="h-px w-8 bg-sweet-brown/20"></div>
            </div>

            {/* Product Name */}
            <h3 className="font-serif text-xl font-medium text-sweet-brown mb-4 line-clamp-1 group-hover:text-sweet-orange transition-colors duration-300">
              {name}
            </h3>

            {/* Ornamental Separator */}
            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="h-px w-4 bg-sweet-orange/30"></div>
              <div className="text-sweet-orange text-xs">◆</div>
              <div className="h-px w-4 bg-sweet-orange/30"></div>
            </div>
          </CardContent>
        </Link>

        <CardFooter className="p-6 pt-0">
          <Button
            className="w-full bg-sweet-brown hover:bg-sweet-orange text-white rounded-full py-6 text-sm font-medium tracking-wide shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            onClick={handleAddToCart}
          >
            <span className="relative z-10">Add to Royal Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-sweet-orange to-sweet-brown opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
