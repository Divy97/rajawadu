import { createClient as createBrowserClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

/**
 * Universal Supabase client that works in any context
 *
 * This implementation avoids any runtime errors by using
 * the direct Supabase client which works anywhere.
 */
export async function createClient() {
  // Use direct Supabase client which is safe in all environments
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase URL and Anon Key must be defined in environment variables"
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
