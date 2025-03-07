import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductsContent } from "@/components/products/ProductsContent";

export const metadata = {
  title: "Royal Collection | Mukhawas",
  description: "Explore our royal collection of traditional mukhawas products",
};

export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return <ProductsContent products={products} categories={categories} />;
}
