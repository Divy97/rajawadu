import { Database } from "./supabase";

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];

export interface Product extends Omit<ProductRow, "categories"> {
  category: string;
  image: string;
  categories?: {
    name: string;
  };
}
