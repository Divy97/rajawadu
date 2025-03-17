import { createClient } from "@/lib/supabase";
import { Product } from "@/types/product";
import type { ProductRow } from "@/types/product";

// Default image to use when no product image is available
const DEFAULT_PRODUCT_IMAGE = "/images/product-placeholder.jpg";

/**
 * Get all products from the database
 */
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }

  return data.map(transformProductData);
}

/**
 * Helper function to transform product data from Supabase
 */
function transformProductData(
  item: ProductRow & { categories?: { name: string } }
): Product {
  // Ensure we always have a valid image URL
  const primaryImage =
    item.images && item.images.length > 0 && item.images[0]
      ? item.images[0]
      : DEFAULT_PRODUCT_IMAGE;

  return {
    ...item,
    category: item.categories?.name || "",
    image: primaryImage,
  };
}

/**
 * Get a product by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Code PGRST116 means no rows returned
      return null;
    }

    console.error("Error fetching product by slug:", error);
    throw new Error("Failed to fetch product by slug");
  }

  return transformProductData(data);
}

/**
 * Get featured products for the home page
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("products")
      .select("*, categories(name)")
      .eq("featured", true)
      .order("name");

    if (error) {
      console.error("Error fetching featured products:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });
      return []; // Return empty array instead of throwing
    }

    return data ? data.map(transformProductData) : [];
  } catch (error) {
    console.error("Unexpected error in getFeaturedProducts:", error);
    return []; // Return empty array for any unexpected errors
  }
}

/**
 * Get products by category ID
 */
export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("category_id", categoryId)
    .order("name");

  if (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("Failed to fetch products by category");
  }

  return data.map(transformProductData);
}

/**
 * Search products by name
 */
export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .ilike("name", `%${query}%`)
    .order("name");

  if (error) {
    console.error("Error searching products:", error);
    throw new Error("Failed to search products");
  }

  return data.map(transformProductData);
}
