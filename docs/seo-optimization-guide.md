# SEO Optimization Guide for Raja Wadu E-commerce

This document outlines comprehensive SEO strategies and implementation guidelines to ensure Raja Wadu e-commerce platform achieves optimal search engine visibility and crawler-friendliness.

## Technical SEO Checklist

### Meta Tags Implementation

- [ ] **Title Tags**

  - Unique title for each page (60-65 characters)
  - Include primary keyword near the beginning
  - Follow format: `Primary Keyword | Secondary Keyword | Brand Name`
  - Example: `Handcrafted Jute Bags | Eco-friendly Shopping | Raja Wadu`

- [ ] **Meta Descriptions**

  - Unique description for each page (150-160 characters)
  - Include primary and secondary keywords naturally
  - Include a call-to-action where appropriate
  - Example: `Discover our eco-friendly handcrafted jute bags. Sustainable, stylish, and durable. Free shipping on orders over $50. Shop now!`

- [ ] **Canonical Tags**

  - Implement on all pages to prevent duplicate content issues
  - Example: `<link rel="canonical" href="https://rajawadu.com/products/jute-bag" />`

- [ ] **Robots Meta Tags**
  - Configure specific crawl directives where needed
  - Example for non-indexable but crawlable page: `<meta name="robots" content="noindex,follow" />`

### Structured Data Implementation

- [ ] **Product Schema**

  - Implement JSON-LD for all product pages
  - Include: name, image, description, SKU, brand, offers, aggregateRating, review
  - Example:

  ```json
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Handcrafted Jute Shopping Bag",
    "image": "https://rajawadu.com/images/jute-bag.jpg",
    "description": "Eco-friendly shopping bag made from sustainable jute material",
    "sku": "JB1001",
    "brand": {
      "@type": "Brand",
      "name": "Raja Wadu"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://rajawadu.com/products/jute-bag",
      "priceCurrency": "USD",
      "price": "29.99",
      "availability": "https://schema.org/InStock"
    }
  }
  ```

- [ ] **BreadcrumbList Schema**

  - Implement for all category and product pages
  - Example:

  ```json
  {
    "@context": "https://schema.org/",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://rajawadu.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Bags",
        "item": "https://rajawadu.com/products/category/bags"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Jute Bags",
        "item": "https://rajawadu.com/products/category/bags/jute-bags"
      }
    ]
  }
  ```

- [ ] **Organization Schema**

  - Implement on homepage
  - Include logo, social profiles, contact information

- [ ] **FAQ Schema**
  - Implement on product pages and FAQ sections
  - Example:
  ```json
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I care for my jute bag?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spot clean with a damp cloth. Do not machine wash or bleach."
        }
      }
    ]
  }
  ```

### URL Structure

- [ ] **Implement SEO-friendly URLs**

  - Use hyphens to separate words
  - Keep URLs short and descriptive
  - Include relevant keywords
  - Follow pattern: `/category/subcategory/product-name`
  - Example: `/products/bags/handcrafted-jute-shopping-bag`

- [ ] **Create a logical site hierarchy**
  - Home > Category > Subcategory > Product
  - Ensure consistent URL structure across the site

### Image Optimization

- [ ] **Implement descriptive file names**

  - Use keywords in image filenames
  - Example: `handcrafted-jute-shopping-bag-green.jpg`

- [ ] **Add comprehensive alt text**

  - Describe the image content
  - Include relevant keywords naturally
  - Example: `"Handcrafted green jute shopping bag with cotton handles"`

- [ ] **Implement lazy loading**

  - Use Next.js Image component with priority for above-the-fold images
  - Lazy load below-the-fold images

- [ ] **Optimize image file sizes**
  - Implement WebP format with fallbacks
  - Set appropriate quality settings
  - Serve responsive images with srcset

### Mobile Optimization

- [ ] **Ensure responsive design**

  - Test on multiple device sizes
  - Implement mobile-friendly navigation
  - Use appropriate font sizes for mobile

- [ ] **Optimize for Core Web Vitals**

  - Largest Contentful Paint (LCP): < 2.5 seconds
  - First Input Delay (FID): < 100 milliseconds
  - Cumulative Layout Shift (CLS): < 0.1

- [ ] **Implement proper viewport settings**
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

## Content SEO Checklist

### Product Pages

- [ ] **Write unique product descriptions**

  - Minimum 300 words
  - Include primary and secondary keywords naturally
  - Highlight unique features and benefits
  - Address potential customer questions

- [ ] **Use proper heading hierarchy**

  - H1: Product name
  - H2: Section headings (Description, Features, Specifications)
  - H3: Subsections as needed

- [ ] **Add product features and specifications in list format**

  - Use bullet points for scanability
  - Include material, dimensions, weight, etc.

- [ ] **Implement product reviews**
  - Encourage customer reviews
  - Display star ratings
  - Implement review schema markup

### Category Pages

- [ ] **Create unique category descriptions**

  - Minimum 200 words
  - Explain the category and its products
  - Include relevant keywords

- [ ] **Implement proper heading hierarchy**

  - H1: Category name
  - H2: Subcategory sections
  - H3: Featured products or themes

- [ ] **Add internal links to related categories**
  - Cross-link related categories naturally in content
  - Use descriptive anchor text

## Technical Implementation

### Next.js Implementation

- [ ] **Implement Next.js Head component**

  - Create a reusable SEO component:

  ```tsx
  interface SEOProps {
    title: string;
    description: string;
    canonicalUrl?: string;
    ogImage?: string;
    noIndex?: boolean;
  }

  export const SEO: React.FC<SEOProps> = ({
    title,
    description,
    canonicalUrl,
    ogImage,
    noIndex = false,
  }) => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com";
    const fullUrl = canonicalUrl
      ? canonicalUrl
      : `${siteUrl}${useRouter().asPath}`;
    const ogImageUrl = ogImage ? ogImage : `${siteUrl}/images/default-og.jpg`;

    return (
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={fullUrl} />

        {noIndex && <meta name="robots" content="noindex,follow" />}

        <meta property="og:type" content="website" />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImageUrl} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImageUrl} />
      </Head>
    );
  };
  ```

- [ ] **Implement dynamic metadata**

  - Use Next.js 13 app directory metadata API for static and dynamic metadata
  - Example for a product page:

  ```tsx
  export async function generateMetadata({
    params,
  }: {
    params: { productId: string };
  }): Promise<Metadata> {
    const product = await getProduct(params.productId);

    if (!product) {
      return {
        title: "Product Not Found | Raja Wadu",
        description: "The product you are looking for could not be found.",
      };
    }

    return {
      title: `${product.name} | Raja Wadu`,
      description: product.description.substring(0, 160),
      openGraph: {
        title: `${product.name} | Raja Wadu`,
        description: product.description.substring(0, 160),
        images: [{ url: product.images[0], alt: product.name }],
      },
    };
  }
  ```

### XML Sitemap

- [ ] **Implement dynamic sitemap generation**

  - Create `app/sitemap.ts` file
  - Include all important URLs (homepage, category pages, product pages)
  - Example:

  ```tsx
  import { MetadataRoute } from "next";

  export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rajawadu.com";

    // Get all products from the database
    const products = await getAllProducts();
    const productUrls = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Get all categories
    const categories = await getAllCategories();
    const categoryUrls = categories.map((category) => ({
      url: `${baseUrl}/products/category/${category.slug}`,
      lastModified: new Date(category.updatedAt),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      // Add other static pages
    ];

    return [...staticPages, ...categoryUrls, ...productUrls];
  }
  ```

### Robots.txt

- [ ] **Implement robots.txt**

  - Create `app/robots.ts` file
  - Define allowed/disallowed paths
  - Add sitemap URL
  - Example:

  ```tsx
  import { MetadataRoute } from "next";

  export default function robots(): MetadataRoute.Robots {
    return {
      rules: {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/checkout/"],
      },
      sitemap: "https://rajawadu.com/sitemap.xml",
    };
  }
  ```

## Monitoring and Measurement

- [ ] **Implement Google Analytics 4**

  - Track user behavior
  - Set up e-commerce tracking
  - Create conversion goals

- [ ] **Set up Google Search Console**

  - Submit sitemap
  - Monitor search performance
  - Identify and fix crawl errors

- [ ] **Implement Core Web Vitals monitoring**
  - Use Lighthouse in CI/CD pipeline
  - Add real user monitoring (RUM)
  - Set up alerts for performance degradation

## Content Strategy

- [ ] **Create blog content for keyword targeting**

  - Develop content calendar
  - Target long-tail keywords
  - Implement proper internal linking

- [ ] **Implement content freshness strategy**
  - Regularly update product descriptions
  - Add seasonal content
  - Refresh outdated information

## Additional SEO Enhancements

- [ ] **Implement faceted navigation SEO**

  - Use rel="nofollow" for filter links
  - Canonicalize filtered pages to main category page
  - Consider indexing key filter combinations

- [ ] **Add FAQ sections to product pages**

  - Answer common customer questions
  - Implement FAQ schema
  - Target long-tail keywords in questions and answers

- [ ] **Implement accelerated mobile pages (AMP) if needed**
  - Consider for blog posts and key landing pages
  - Ensure proper tracking and analytics
