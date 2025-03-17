import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/api/products";
import Script from "next/script";
import { Metadata } from "next";
import { ProductDetailsWithErrorBoundary } from "./ProductDetailsWithErrorBoundary";

type ProductPageProps = {
  params: {
    slug: string;
  };
};

export const revalidate = 3600; // Revalidate this page every hour

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  // Destructure slug from params to avoid the warning
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Rajawadu",
      description: "The requested product could not be found",
    };
  }

  // Base URL for canonical URLs and images
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com";
  const productUrl = `${baseUrl}/products/${slug}`;
  const imageUrl = product.image || `${baseUrl}/images/product-placeholder.jpg`;

  return {
    title: `${product.name} | Premium Royal Mukhwas | Rajawadu`,
    description:
      product.description?.substring(0, 160) ||
      `Premium quality ${product.name} from Rajawadu. Authentic, handcrafted royal Mukhwas blend made with century-old family recipes.`,
    keywords: `${product.name}, mukhwas, mouth freshener, premium mukhwas, royal mukhwas, rajawadu, indian spices`,
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Rajawadu`,
      description:
        product.description?.substring(0, 160) ||
        `Premium quality ${product.name} from Rajawadu.`,
      url: productUrl,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Rajawadu`,
      description:
        product.description?.substring(0, 160) ||
        `Premium quality ${product.name} from Rajawadu.`,
      images: [imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Destructure slug from params to avoid the warning
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Product structured data
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.image || "/images/product-placeholder.jpg",
    description:
      product.description || `Premium quality ${product.name} from Rajawadu.`,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Rajawadu",
    },
    offers: {
      "@type": "Offer",
      url: `https://rajawadu.com/products/${slug}`,
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.inventory > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Rajawadu",
      },
    },
  };

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://rajawadu.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://rajawadu.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `https://rajawadu.com/products/${slug}`,
      },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      {/* JSON-LD structured data */}
      <Script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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

        <ProductDetailsWithErrorBoundary product={product} />
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
