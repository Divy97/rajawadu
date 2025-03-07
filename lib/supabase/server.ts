import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { createClient as createBrowserClient } from "@supabase/supabase-js";

// Don't import cookies directly to avoid build errors
// import { cookies } from "next/headers";

export const createClient = () => {
  try {
    // Use a conditional function to make sure this only executes at runtime
    // This prevents bundling the next/headers import
    let cookiesModule;
    try {
      // This will throw if we're not in a server context
      cookiesModule = require("next/headers");
    } catch (e) {
      throw new Error("next/headers is not available in this context");
    }

    const { cookies } = cookiesModule;
    const cookieStore = cookies();

    return createServerComponentClient<Database>({
      cookies: () => cookieStore,
    });
  } catch (error) {
    console.error("Error creating server Supabase client:", error);

    // Fallback to direct client if we're not in a server component
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Supabase URL and Anon Key must be defined in environment variables"
      );
    }

    return createBrowserClient<Database>(supabaseUrl, supabaseKey);
  }
};
