"use client";

import { ProductGrid } from "./ProductGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: string;
  image: string;
  featured?: boolean;
  inventory: number;
  created_at: string;
};

type ProductsContentProps = {
  products: Product[];
  categories: Category[];
};

type SortOption = "price-asc" | "price-desc" | "newest" | "popular";

export function ProductsContent({
  products,
  categories,
}: ProductsContentProps) {
  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  // Memoized filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case "popular":
        // Implement popularity sorting if you have a popularity/sales field
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      // You could add additional logic here if needed
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
      {/* Hero Section with Royal Design */}
      <section className="relative py-24 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-mandala-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-32 h-32 bg-sweet-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-sweet-brown/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center relative">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              Our Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              Royal Collection
            </h1>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
            <p className="text-xl font-serif text-sweet-brown/80 leading-relaxed max-w-2xl mx-auto mb-12">
              Discover our exquisite range of traditional mukhwas, handcrafted
              with century-old recipes and finest ingredients. Each blend is a
              royal experience for your palate.
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-8 border-y border-sweet-brown/10 bg-white/50 backdrop-blur-sm sticky top-20 z-30">
        <div className="container mx-auto px-4">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                className={cn(
                  "text-sweet-brown hover:text-sweet-orange hover:bg-sweet-orange/10 transition-all font-logo tracking-wide",
                  selectedCategory === "all" &&
                    "bg-sweet-orange/10 text-sweet-orange"
                )}
                onClick={() => setSelectedCategory("all")}
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="ghost"
                  className={cn(
                    "text-sweet-brown hover:text-sweet-orange hover:bg-sweet-orange/10 transition-all font-logo tracking-wide",
                    selectedCategory === category.name &&
                      "bg-sweet-orange/10 text-sweet-orange"
                  )}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search and Sort */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
            <div className="flex-1 relative w-full">
              <Input
                placeholder="Search products..."
                className="w-full border-sweet-brown/20 focus:border-sweet-orange pl-10 font-serif"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sweet-brown/40">
                🔍
              </span>
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sweet-brown/40 hover:text-sweet-orange transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  ×
                </button>
              )}
            </div>
            <Select
              value={sortBy}
              onValueChange={(value) => setSortBy(value as SortOption)}
            >
              <SelectTrigger className="w-[200px] border-sweet-brown/20 bg-white/50 backdrop-blur-sm font-logo tracking-wide">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest" className="font-logo">
                  Newest First
                </SelectItem>
                <SelectItem value="price-asc" className="font-logo">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-desc" className="font-logo">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="popular" className="font-logo">
                  Most Popular
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== "all") && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {searchQuery && (
                <Badge
                  variant="outline"
                  className="bg-sweet-orange/5 text-sweet-brown border-sweet-brown/20 font-serif"
                >
                  Search: {searchQuery}
                  <button
                    className="ml-2 hover:text-sweet-orange"
                    onClick={() => setSearchQuery("")}
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedCategory !== "all" && (
                <Badge
                  variant="outline"
                  className="bg-sweet-orange/5 text-sweet-brown border-sweet-brown/20 font-serif"
                >
                  Category: {selectedCategory}
                  <button
                    className="ml-2 hover:text-sweet-orange"
                    onClick={() => setSelectedCategory("all")}
                  >
                    ×
                  </button>
                </Badge>
              )}
            </motion.div>
          )}

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ProductGrid products={filteredProducts} />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
