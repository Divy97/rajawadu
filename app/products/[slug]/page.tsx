import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import { ProductDetails } from "./ProductDetails";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600; // Revalidate this page every hour

export async function generateMetadata({ params }: ProductPageProps) {
  // Destructure slug from params to avoid the warning
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Mukhawas",
      description: "The requested product could not be found",
    };
  }

  return {
    title: `${product.name} | Mukhawas`,
    description: product.description || "",
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Destructure slug from params to avoid the warning
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-screen-xl mx-auto">
        {/* Breadcrumb navigation */}
        <div className="mb-8 text-sweet-brown/60 text-sm">
          <Link href="/" className="hover:text-sweet-orange transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link
            href="/products"
            className="hover:text-sweet-orange transition-colors"
          >
            Products
          </Link>{" "}
          / <span className="text-sweet-brown">{product.name}</span>
        </div>

        <ProductDetails product={product} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // Pre-generate routes for all products at build time
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
