import { createClient } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { Address } from "@/types/supabase";

export type UserRow = Database["public"]["Tables"]["users"]["Row"];
export type User = UserRow;

/**
 * Get user profile by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user profile");
  }

  return data;
}

/**
 * Create or update a user profile
 */
export async function upsertUser(
  userId: string,
  userData: {
    full_name?: string;
    avatar_url?: string;
    billing_address?: Address;
    shipping_address?: Address;
  }
): Promise<User> {
  const supabase = await createClient();

  // Check if user exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  const now = new Date().toISOString();

  if (existingUser) {
    // Update existing user
    const { data, error } = await supabase
      .from("users")
      .update({
        ...userData,
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Error updating user profile:", error);
      throw new Error("Failed to update user profile");
    }

    return data;
  } else {
    // Create new user
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          ...userData,
          created_at: now,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating user profile:", error);
      throw new Error("Failed to create user profile");
    }

    return data;
  }
}

/**
 * Update user's billing address
 */
export async function updateBillingAddress(
  userId: string,
  address: Address
): Promise<User> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      billing_address: address,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating billing address:", error);
    throw new Error("Failed to update billing address");
  }

  return data;
}

/**
 * Update user's shipping address
 */
export async function updateShippingAddress(
  userId: string,
  address: Address
): Promise<User> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("users")
    .update({
      shipping_address: address,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating shipping address:", error);
    throw new Error("Failed to update shipping address");
  }

  return data;
}
