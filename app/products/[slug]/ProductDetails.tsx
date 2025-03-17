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
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SocialShareButton } from "@/components/SocialShareButton";

type ProductDetailsProps = {
  product: Product;
};

// Default image to use when no product image is available
const DEFAULT_PRODUCT_IMAGE = "/images/product-placeholder.jpg";

export function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial values from URL if available
  const initialSize = searchParams.get("size") || "100g";
  const initialQuantity = Number(searchParams.get("qty")) || 1;
  const initialImageIndex = Number(searchParams.get("img")) || 0;
  const initialExpandedSection = searchParams.get("section") || null;

  const [quantity, setQuantity] = useState(initialQuantity);
  const [activeImage, setActiveImage] = useState(initialImageIndex);
  const [isAdding, setIsAdding] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    initialExpandedSection
  );
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);
  const { addItem } = useCart();
  const { addToast } = useToast();

  // Function to update URL with current selections
  const updateURLWithOptions = (
    size: string,
    qty: number,
    imgIndex: number = activeImage,
    section: string | null = expandedSection
  ) => {
    // Create new URLSearchParams instance from current params
    const params = new URLSearchParams(searchParams.toString());

    // Update or add size parameter
    params.set("size", size);

    // Only add quantity if it's different from default (1)
    if (qty > 1) {
      params.set("qty", qty.toString());
    } else {
      params.delete("qty");
    }

    // Add image index if not 0 (default)
    if (imgIndex > 0) {
      params.set("img", imgIndex.toString());
    } else {
      params.delete("img");
    }

    // Add expanded section if any
    if (section) {
      params.set("section", section);
    } else {
      params.delete("section");
    }

    // Generate new URL with updated search params
    const newURL = `${pathname}?${params.toString()}`;

    // Update the URL without a page reload
    router.replace(newURL, { scroll: false });
  };

  // Effect to update URL when options change
  useEffect(() => {
    updateURLWithOptions(selectedSize, quantity, activeImage, expandedSection);
  }, [selectedSize, quantity, activeImage, expandedSection]);

  // Ensure product has images array to prevent errors
  const productImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [DEFAULT_PRODUCT_IMAGE];

  // Load previously selected size from localStorage if not in URL
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined" && !searchParams.has("size")) {
      const savedSize = localStorage.getItem(`product-size-${product.id}`);
      if (savedSize) {
        setSelectedSize(savedSize);
      }
    }
  }, [product.id, searchParams]);

  // Save selected size to localStorage when changed
  useEffect(() => {
    localStorage.setItem(`product-size-${product.id}`, selectedSize);
  }, [selectedSize, product.id]);

  // Custom handlers for changing size and quantity
  const handleSizeChange = (size: string) => {
    // Add a gentle animation for size change
    const sizeButtons = document.querySelectorAll('[role="radio"]');
    sizeButtons.forEach((button) => {
      if (button.getAttribute("aria-checked") === "true") {
        button.classList.add("scale-95", "opacity-70");
        setTimeout(() => {
          button.classList.remove("scale-95", "opacity-70");
          setSelectedSize(size);
        }, 150);
      }
    });

    if (!sizeButtons.length) {
      setSelectedSize(size);
    }
    // URL will be updated via the effect
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (!isNaN(newQuantity) && newQuantity > 0 && newQuantity <= 99) {
      setQuantity(newQuantity);
      // URL will be updated via the effect
    }
  };

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

    try {
      setTimeout(() => {
        const cartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || DEFAULT_PRODUCT_IMAGE,
          size: selectedSize,
          quantity: quantity,
        };

        // Add item to cart
        addItem(cartItem);

        // Show success toast
        addToast({
          title: "Added to cart",
          description: `${quantity} × ${product.name} (${selectedSize}) has been added to your cart.`,
          type: "success",
          action: {
            label: "View Cart",
            onClick: () => (window.location.href = "/cart"),
          },
        });

        setIsAdding(false);
      }, 500);
    } catch (error) {
      console.error("Error adding item to cart:", error);

      // Show error toast
      addToast({
        title: "Something went wrong",
        description:
          "We couldn't add this item to your cart. Please try again.",
        type: "error",
        action: {
          label: "Try Again",
          onClick: () => handleAddToCart(),
        },
      });

      setIsAdding(false);
    }
  };

  // Update the setActiveImage function to consider URL updates
  const handleImageChange = (index: number) => {
    setActiveImage(index);
    // URL will be updated via the effect
  };

  // Update the toggleSection function to consider URL updates
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
    // URL will be updated via the effect
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
            <div
              className="flex space-x-4 overflow-x-auto pb-2"
              role="region"
              aria-label="Product image gallery"
            >
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={cn(
                    "relative h-20 w-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sweet-orange focus-visible:ring-offset-2",
                    activeImage === index
                      ? "border-sweet-orange shadow-md scale-110"
                      : "border-sweet-brown/10 hover:border-sweet-orange/50"
                  )}
                  onClick={() => handleImageChange(index)}
                  onKeyDown={(e) => {
                    // Handle arrow keys for gallery navigation
                    if (e.key === "ArrowLeft" && index > 0) {
                      handleImageChange(index - 1);
                    } else if (
                      e.key === "ArrowRight" &&
                      index < productImages.length - 1
                    ) {
                      handleImageChange(index + 1);
                    }
                  }}
                  aria-label={`View image ${index + 1} of ${
                    productImages.length
                  }`}
                  aria-pressed={activeImage === index}
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
          <div className="space-y-3 mt-8">
            <h3 className="font-logo text-lg text-sweet-brown" id="size-label">
              Select Size
            </h3>
            <div
              className="flex gap-3"
              role="radiogroup"
              aria-labelledby="size-label"
            >
              {["100g", "200g", "500g"].map((size) => (
                <button
                  key={size}
                  className={cn(
                    "min-w-[80px] py-3 px-4 rounded-lg font-serif transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sweet-orange focus-visible:ring-offset-2",
                    selectedSize === size
                      ? "bg-white text-sweet-orange border border-sweet-orange"
                      : "border border-sweet-brown/20 text-sweet-brown/80 hover:border-sweet-orange/50 bg-white/50"
                  )}
                  onClick={() => handleSizeChange(size)}
                  aria-checked={selectedSize === size}
                  role="radio"
                  aria-label={`Select ${size} size`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="space-y-3 mt-8">
            <h3
              className="font-logo text-lg text-sweet-brown"
              id="quantity-label"
            >
              Quantity
            </h3>
            <div className="flex items-center gap-4">
              <div
                className="flex items-center border border-sweet-brown/20 rounded-lg overflow-hidden bg-white shadow-sm"
                role="group"
                aria-labelledby="quantity-label"
              >
                <button
                  className="p-3 text-sweet-brown hover:bg-sweet-orange/10 active:bg-sweet-orange/20 transition-colors disabled:opacity-50 focus:outline-none focus-visible:bg-sweet-orange/20"
                  onClick={() =>
                    handleQuantityChange(Math.max(1, quantity - 1))
                  }
                  disabled={isAdding || quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} className="text-sweet-brown" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value)) {
                      handleQuantityChange(value);
                    }
                  }}
                  className="px-2 py-2 text-sweet-brown w-10 text-center font-serif bg-transparent border-0 focus:outline-none focus:ring-1 focus:ring-sweet-orange"
                  aria-label="Quantity"
                  style={{ appearance: "textfield" }}
                />
                <style jsx>{`
                  input::-webkit-outer-spin-button,
                  input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                  }
                  input[type="number"] {
                    -moz-appearance: textfield;
                  }
                `}</style>
                <button
                  className="p-3 text-sweet-brown hover:bg-sweet-orange/10 active:bg-sweet-orange/20 transition-colors disabled:opacity-50 focus:outline-none focus-visible:bg-sweet-orange/20"
                  onClick={() =>
                    handleQuantityChange(Math.min(99, quantity + 1))
                  }
                  disabled={isAdding || quantity >= 99}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} className="text-sweet-brown" />
                </button>
              </div>

              <Button
                className="flex-1 bg-sweet-brown hover:bg-sweet-orange text-white py-6 rounded-lg font-logo tracking-wide transition-all disabled:opacity-70"
                onClick={handleAddToCart}
                disabled={isAdding || product.inventory === 0}
                aria-label={
                  isAdding
                    ? "Adding to cart"
                    : product.inventory === 0
                    ? "Out of stock"
                    : `Add ${quantity} ${
                        quantity === 1 ? "item" : "items"
                      } to cart`
                }
              >
                {isAdding
                  ? "Adding to Cart..."
                  : product.inventory === 0
                  ? "Out of Stock"
                  : "Add to Royal Collection"}
              </Button>
            </div>
          </div>

          {/* Social Sharing Section - Moved outside of button container */}
          <div className="pt-6 mt-6 border-t border-sweet-brown/10">
            <h3 className="font-logo text-lg text-sweet-brown mb-3">
              Share this Royal Experience
            </h3>
            <div className="flex gap-3">
              <SocialShareButton
                platform="facebook"
                url={`${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com"
                }/products/${product.slug}?size=${selectedSize}`}
                title={`Check out ${product.name} from Rajawadu`}
              />
              <SocialShareButton
                platform="twitter"
                url={`${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com"
                }/products/${product.slug}?size=${selectedSize}`}
                title={`I just discovered ${product.name} from Rajawadu's Royal Collection!`}
              />
              <SocialShareButton
                platform="whatsapp"
                url={`${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com"
                }/products/${product.slug}?size=${selectedSize}`}
                title={`Check out ${product.name} from Rajawadu`}
              />
              <SocialShareButton
                platform="email"
                url={`${
                  process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com"
                }/products/${product.slug}?size=${selectedSize}`}
                title={`Check out ${product.name} from Rajawadu`}
                body={`I thought you might be interested in ${product.name} from Rajawadu's Royal Collection!`}
              />
              <button
                className="p-3 bg-white/80 text-sweet-brown hover:text-sweet-orange rounded-full border border-sweet-brown/20 hover:border-sweet-orange transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sweet-orange focus-visible:ring-offset-2"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${
                      process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com"
                    }/products/${product.slug}?size=${selectedSize}`
                  );
                  addToast({
                    title: "Link copied",
                    description: "Product link has been copied to clipboard",
                    type: "success",
                  });
                }}
                aria-label="Copy link to clipboard"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
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
