import { createClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";

export type Category = Database["public"]["Tables"]["categories"]["Row"];

/**
 * Get all categories from the database
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }

  return data;
}

/**
 * Get a category by its slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Code PGRST116 means no rows returned
      return null;
    }

    console.error("Error fetching category by slug:", error);
    throw new Error("Failed to fetch category by slug");
  }

  return data;
}

/**
 * Get a category by its ID
 */
export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // Code PGRST116 means no rows returned
      return null;
    }

    console.error("Error fetching category by ID:", error);
    throw new Error("Failed to fetch category by ID");
  }

  return data;
}
