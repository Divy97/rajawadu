"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { type Product } from "@/types/product";
import { getProductsByCategory } from "@/lib/api/products";
import { cn } from "@/lib/utils";

type ProductDetailsProps = {
  product: Product;
};

// Default image to use when no product image is available
const DEFAULT_PRODUCT_IMAGE = "/images/product-placeholder.jpg";

export function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addItem } = useCart();

  // Ensure product has images array to prevent errors
  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [DEFAULT_PRODUCT_IMAGE];

  // Fetch related products
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        if (product.category_id) {
          const categoryProducts = await getProductsByCategory(
            product.category_id
          );
          // Filter out the current product and limit to 4 items
          setRelatedProducts(
            categoryProducts.filter((p) => p.id !== product.id).slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [product.id, product.category_id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      setIsAdding(false);
    }, 500);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-sweet-brown/10 bg-white/80 backdrop-blur-sm shadow-sm">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-sweet-orange/20 rounded-tl-xl"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-sweet-orange/20 rounded-tr-xl"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-sweet-orange/20 rounded-bl-xl"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-sweet-orange/20 rounded-br-xl"></div>

            <Image
              src={productImages[activeImage] || DEFAULT_PRODUCT_IMAGE}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
          </div>

          {/* Thumbnail Images */}
          {productImages.length > 1 && (
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "relative h-20 w-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all",
                    activeImage === index
                      ? "border-sweet-orange shadow-md scale-110"
                      : "border-sweet-brown/10 hover:border-sweet-orange/50"
                  )}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={image || DEFAULT_PRODUCT_IMAGE}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover p-2"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-8">
          {/* Category and Title */}
          <div>
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
              {product.name}
            </h1>
            <div className="flex items-center justify-start gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>

            {/* Price Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-sweet-brown/10 p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-logo text-sweet-brown">
                  ₹{product.price.toFixed(2)}
                </span>
                <span className="text-sweet-brown/60 line-through text-sm font-serif">
                  MRP ₹{(product.price * 1.15).toFixed(2)}
                </span>
                <span className="bg-sweet-orange/10 text-sweet-orange text-xs px-3 py-1 rounded-full font-medium">
                  SAVE 15%
                </span>
              </div>
              <div className="text-sweet-brown/60 text-sm font-serif">
                Inclusive of all taxes
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-4">
            <h3 className="font-logo text-lg text-sweet-brown">Select Size</h3>
            <div className="flex gap-4">
              {["100g", "200g", "500g"].map((size) => (
                <button
                  key={size}
                  className={cn(
                    "px-6 py-3 rounded-lg font-serif transition-all",
                    size === "100g"
                      ? "bg-sweet-orange/10 text-sweet-orange border-2 border-sweet-orange"
                      : "border border-sweet-brown/20 text-sweet-brown/80 hover:border-sweet-orange/50"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-4">
            <h3 className="font-logo text-lg text-sweet-brown">Quantity</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center border border-sweet-brown/20 rounded-lg overflow-hidden bg-white/80">
                <button
                  className="p-3 text-sweet-brown hover:bg-sweet-orange/10 transition-colors disabled:opacity-50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={isAdding || quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-6 py-2 text-sweet-brown min-w-[60px] text-center font-serif">
                  {quantity}
                </span>
                <button
                  className="p-3 text-sweet-brown hover:bg-sweet-orange/10 transition-colors disabled:opacity-50"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={isAdding}
                >
                  <Plus size={16} />
                </button>
              </div>

              <Button
                className="flex-1 bg-sweet-brown hover:bg-sweet-orange text-white py-7 rounded-lg font-logo tracking-wide transition-all disabled:opacity-70"
                onClick={handleAddToCart}
                disabled={isAdding || product.inventory === 0}
              >
                {isAdding
                  ? "Adding to Cart..."
                  : product.inventory === 0
                  ? "Out of Stock"
                  : "Add to Royal Collection"}
              </Button>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6 pt-6 border-t border-sweet-brown/10">
            <p className="font-serif text-sweet-brown/80 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Benefits Section */}
          <div className="space-y-4">
            <h3 className="font-logo text-lg text-sweet-brown">
              Royal Benefits
            </h3>
            <ul className="space-y-3 font-serif">
              {[
                "Packed with protein, fiber, vitamins, and essential minerals",
                "Helps improve digestion and alleviate bloating",
                "Enhances hair health and skin radiance",
                "Rich in iron and fatty acids for strong bones",
                "A thoughtful and healthy gift for loved ones",
              ].map((benefit, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sweet-brown/80"
                >
                  <span className="text-sweet-orange mt-1">❖</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-4 pt-6 border-t border-sweet-brown/10">
            {/* Ingredients Section */}
            <div className="border-b border-sweet-brown/10">
              <button
                className="w-full flex items-center justify-between py-4 text-sweet-brown font-logo"
                onClick={() => toggleSection("ingredients")}
              >
                <span>Ingredients</span>
                {expandedSection === "ingredients" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {expandedSection === "ingredients" && (
                <div className="pb-4 font-serif text-sweet-brown/80 space-y-2">
                  <p>
                    Premium quality fennel seeds, coriander seeds, sesame seeds,
                    dill seeds, and natural sweeteners.
                  </p>
                  <p className="text-sm">
                    * Ingredients may vary based on the variant selected
                  </p>
                </div>
              )}
            </div>

            {/* Storage Instructions */}
            <div className="border-b border-sweet-brown/10">
              <button
                className="w-full flex items-center justify-between py-4 text-sweet-brown font-logo"
                onClick={() => toggleSection("storage")}
              >
                <span>Storage Instructions</span>
                {expandedSection === "storage" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {expandedSection === "storage" && (
                <div className="pb-4 font-serif text-sweet-brown/80">
                  Store in a cool, dry place away from direct sunlight. Keep in
                  an airtight container after opening.
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className="border-b border-sweet-brown/10">
              <button
                className="w-full flex items-center justify-between py-4 text-sweet-brown font-logo"
                onClick={() => toggleSection("shipping")}
              >
                <span>Shipping Information</span>
                {expandedSection === "shipping" ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>
              {expandedSection === "shipping" && (
                <div className="pb-4 font-serif text-sweet-brown/80">
                  Free shipping on orders above ₹499. Standard delivery within
                  5-7 business days.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-24">
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
              You May Also Like
            </span>
            <h2 className="text-4xl font-logo text-sweet-brown mb-6">
              Related Products
            </h2>
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              <div className="text-sweet-orange">❖</div>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group relative block"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-sweet-brown/10 transition-all duration-500 group-hover:border-sweet-orange/20">
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-sweet-orange/20 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-sweet-orange/20 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-sweet-orange/20 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-sweet-orange/20 rounded-br-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image */}
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || DEFAULT_PRODUCT_IMAGE}
                      alt={product.name}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Price Tag */}
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="font-logo text-sweet-brown">
                      ₹{product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  {/* Category */}
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="h-px w-8 bg-sweet-brown/20"></div>
                    <span className="text-xs uppercase tracking-widest text-sweet-brown/60">
                      {product.category}
                    </span>
                    <div className="h-px w-8 bg-sweet-brown/20"></div>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-serif text-lg text-sweet-brown group-hover:text-sweet-orange transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Ornamental Separator */}
                  <div className="flex items-center justify-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="h-px w-4 bg-sweet-orange/30"></div>
                    <div className="text-sweet-orange text-xs">❖</div>
                    <div className="h-px w-4 bg-sweet-orange/30"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
