# Performance Optimization Guide

This document outlines strategies and implementation details to ensure Raja Wadu e-commerce platform performs optimally across all devices and network conditions.

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)

- [ ] **Optimize Hero Images**
  - Use Next.js Image component with priority prop for above-the-fold images
  - Implement proper image sizing (responsive sizes)
  - Serve WebP format with fallbacks
  - Preload critical hero images

```tsx
// Example of optimized hero image
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative h-[500px] w-full">
      <Image
        src="/images/hero.webp"
        alt="Raja Wadu eco-friendly products"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        quality={85}
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-6xl font-bold">
            Handcrafted with Love
          </h1>
          <p className="mt-4 text-xl">
            Sustainable products for a better world
          </p>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Reduce Render-Blocking Resources**
  - Move non-critical CSS to separate files loaded with lower priority
  - Defer non-critical JavaScript
  - Implement critical CSS extraction

```tsx
// Example of critical CSS inlining in app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### First Input Delay (FID) / Interaction to Next Paint (INP)

- [ ] **Optimize JavaScript Execution**
  - Break long tasks into smaller chunks
  - Implement code splitting for routes and components
  - Add useCallback and useMemo for expensive operations

```tsx
// Example of route-based code splitting
import dynamic from "next/dynamic";

// Dynamically import heavy components
const ProductReviews = dynamic(
  () => import("@/components/products/ProductReviews"),
  {
    loading: () => <ProductReviewsSkeleton />,
    ssr: false, // Disable SSR for components not needed for initial render
  }
);
```

- [ ] **Implement Event Delegation**
  - Use event delegation patterns for lists with many interactive elements
  - Throttle or debounce frequent events (scroll, resize, input)

```tsx
// Example of debounced search input
import { useState, useEffect } from "react";
import { debounce } from "lodash-es";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Create a debounced function once on mount
  useEffect(() => {
    const handleDebouncedSearch = debounce((value) => {
      setDebouncedQuery(value);
    }, 300);

    if (query !== debouncedQuery) {
      handleDebouncedSearch(query);
    }

    return () => {
      handleDebouncedSearch.cancel();
    };
  }, [query, debouncedQuery]);

  useEffect(() => {
    if (debouncedQuery) {
      // Perform search operation
      searchProducts(debouncedQuery);
    }
  }, [debouncedQuery]);

  return (
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search products..."
      className="w-full p-2 border rounded"
    />
  );
}
```

### Cumulative Layout Shift (CLS)

- [ ] **Reserve Space for Dynamic Content**
  - Pre-allocate space for images with specific aspect ratios
  - Use skeleton loaders that match final content dimensions
  - Define explicit width and height for all media elements

```tsx
// Example of aspect ratio container for product images
export function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="relative pt-[100%]">
        {" "}
        {/* 1:1 aspect ratio */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover absolute inset-0"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-lg font-bold mt-1">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
```

- [ ] **Fix Layout Shifts from Web Fonts**
  - Use `next/font` with fallback fonts and proper size-adjust
  - Add font-display: swap to prevent FOIT

```tsx
// Example in app/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
});
```

## Network Optimizations

- [ ] **Implement HTTP/2 or HTTP/3**

  - Configure server to use HTTP/2 or HTTP/3
  - Group small requests using React.lazy and dynamic imports

- [ ] **Optimize API Requests**
  - Batch related API calls
  - Use SWR or React Query for efficient data fetching
  - Implement request deduplication

```tsx
// Example of efficient data fetching with SWR
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function ProductPage({ productId }) {
  // This request will be cached and deduplicated
  const { data, error, isLoading } = useSWR(
    `/api/products/${productId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  // Prefetch related data when product data is available
  const { data: relatedProducts } = useSWR(
    data ? `/api/products/related?category=${data.categoryId}` : null,
    fetcher
  );

  if (isLoading) return <ProductSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  return (
    <div>
      <ProductDetails product={data} />
      {relatedProducts && <RelatedProducts products={relatedProducts} />}
    </div>
  );
}
```

- [ ] **Implement Server-Side Caching**
  - Set up proper cache control headers
  - Utilize Redis for frequent data requests
  - Implement stale-while-revalidate pattern

```tsx
// Example API route with caching headers
export async function GET(request: Request) {
  try {
    const products = await getProducts();

    // Set proper cache headers for static data
    return new Response(JSON.stringify({ products }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

## Rendering Optimizations

- [ ] **Implement Proper Rendering Strategies**
  - Use Static Generation (SSG) for static pages (about, policy pages)
  - Implement Incremental Static Regeneration (ISR) for product pages
  - Use Server Components for data-heavy components

```tsx
// Example of ISR for a product page
// app/products/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductDetails product={product} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <ProductReviews productId={product.id} />
      </Suspense>
    </div>
  );
}

// Generate static paths for popular products
export async function generateStaticParams() {
  const popularProducts = await getPopularProducts();

  return popularProducts.map((product) => ({
    slug: product.slug,
  }));
}
```

- [ ] **Lazy Load Components**
  - Implement intersection observer for lazy loading content
  - Lazy load below-the-fold sections
  - Defer rendering of offscreen content

```tsx
// Custom hook for lazy loading with Intersection Observer
import { useRef, useEffect, useState } from "react";

export function useLazyLoad() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Start loading when within 200px of viewport
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return { ref, isVisible };
}

// Usage example
export function ProductReviews({ productId }) {
  const { ref, isVisible } = useLazyLoad();

  return (
    <div ref={ref} className="mt-8">
      {isVisible ? (
        <ReviewsList productId={productId} />
      ) : (
        <div className="h-40" /> // Placeholder with height
      )}
    </div>
  );
}
```

## Asset Optimization

- [ ] **Optimize Images**
  - Implement WebP format with fallbacks
  - Set appropriate quality settings (80-85% typically sufficient)
  - Use correct image dimensions for each viewport
  - Implement blur placeholders for images

```tsx
// Next.js Image component with blur placeholder
import Image from "next/image";

export function OptimizedProductImage({ product }) {
  return (
    <Image
      src={product.imageUrl}
      alt={product.name}
      width={600}
      height={600}
      placeholder="blur"
      blurDataURL={product.blurDataUrl || "data:image/png;base64,iVBORw0KGg..."}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className="rounded-lg object-cover"
    />
  );
}
```

- [ ] **Optimize Fonts**
  - Subset fonts to include only used characters
  - Self-host critical fonts
  - Use variable fonts where possible

```tsx
// Using variable font with next/font
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/MyFont-Variable.woff2",
      style: "normal",
    },
  ],
  variable: "--font-myfont",
});

export function MyApp({ children }) {
  return <div className={`${myFont.variable} font-sans`}>{children}</div>;
}
```

- [ ] **Implement Icon Sprites or Icon Fonts**
  - Use SVG sprites for multiple icon usage
  - Consider using icon fonts for simple icons
  - Lazy load icon sets that aren't used immediately

```tsx
// SVG Sprite implementation
export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      <symbol id="icon-cart" viewBox="0 0 24 24">
        <path d="M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm8 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-8-18h10l-.1.1L16 9h-5.6l-.3-2H3V5h4.3zm10.4-2H8L7.6 2H1v4h5l1.3 8h9.3l3.3-12z" />
      </symbol>

      <symbol id="icon-heart" viewBox="0 0 24 24">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </symbol>

      {/* Add other icons as needed */}
    </svg>
  );
}

// Usage of icon
export function CartIcon() {
  return (
    <svg className="w-6 h-6">
      <use xlinkHref="#icon-cart" />
    </svg>
  );
}

// Add IconSprite to layout.tsx
```

## Bundle Optimization

- [ ] **Analyze Bundle Size**
  - Use `next bundle-analyzer` to identify large dependencies
  - Replace large libraries with smaller alternatives
  - Import only used functions from utility libraries

```jsx
// Instead of importing the entire library
// import _ from 'lodash';

// Import only what you need
import debounce from "lodash/debounce";
import throttle from "lodash/throttle";
```

- [ ] **Implement Tree Shaking**

  - Ensure build process is configured for proper tree shaking
  - Use ES modules (`import`/`export`) syntax
  - Avoid side effects in imported modules

- [ ] **Configure Module/NoModule Pattern**
  - Serve modern JavaScript to modern browsers
  - Provide legacy bundles only to older browsers
  - Implement differential loading

## Performance Monitoring

- [ ] **Implement Real User Monitoring (RUM)**
  - Set up Web Vitals tracking
  - Track user interactions and page transitions
  - Monitor API request performance

```tsx
// lib/vitals.ts
import { onCLS, onFID, onLCP, onTTFB, onINP } from "web-vitals";

const reportWebVitals = (metric) => {
  // Analytics provider specific code
  console.log(metric);

  // Example of sending to your analytics
  const body = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    page: window.location.pathname,
  };

  fetch("/api/vitals", {
    method: "POST",
    body: JSON.stringify(body),
    keepalive: true,
  });
};

export function initVitals() {
  onCLS(reportWebVitals);
  onFID(reportWebVitals);
  onLCP(reportWebVitals);
  onTTFB(reportWebVitals);
  onINP(reportWebVitals);
}
```

- [ ] **Set Up Performance Budgets**
  - Define maximum bundle sizes
  - Set thresholds for Core Web Vitals
  - Configure alerts for performance regressions

```js
// next.config.js
module.exports = {
  experimental: {
    // Enable React strict mode
    reactStrictMode: true,
  },

  // Setup performance budget
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Add Webpack bundle analyzer in non-dev mode
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "bundle-analysis.html",
          openAnalyzer: false,
        })
      );

      // Add performance hints
      config.performance = {
        hints: "error",
        maxEntrypointSize: 400000, // 400kb
        maxAssetSize: 300000, // 300kb
      };
    }

    return config;
  },
};
```

## Mobile Optimization

- [ ] **Implement Mobile-First CSS**
  - Start with mobile styles and add complexity for larger screens
  - Optimize tap targets (min 44x44px)
  - Ensure proper font sizes on mobile (16px minimum)

```css
/* Example of mobile-first CSS */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

- [ ] **Optimize for Low-End Devices**
  - Test on low-end devices and throttled networks
  - Implement reduced motion for animations
  - Consider device memory before loading heavy resources

```tsx
// Example of checking for device memory
export function ProductGallery({ product }) {
  // Check if the browser supports the deviceMemory API
  const hasLowMemory =
    typeof navigator !== "undefined" &&
    "deviceMemory" in navigator &&
    (navigator as any).deviceMemory < 4;

  // Adjust image quality or number of images based on memory
  const imageSizes = hasLowMemory
    ? {
        width: 400,
        height: 400,
        quality: 70,
      }
    : {
        width: 800,
        height: 800,
        quality: 85,
      };

  return (
    <div className="product-gallery">
      {product.images
        .slice(0, hasLowMemory ? 3 : product.images.length)
        .map((image, index) => (
          <Image
            key={index}
            src={image.url}
            alt={image.alt || product.name}
            width={imageSizes.width}
            height={imageSizes.height}
            quality={imageSizes.quality}
          />
        ))}
    </div>
  );
}
```

## Progressive Enhancement

- [ ] **Implement Offline Support**
  - Add service worker for essential assets
  - Implement offline fallbacks for critical pages
  - Cache API responses for offline access

```tsx
// app/sw.js (service worker file)
const CACHE_NAME = "raja-wadu-v1";

const STATIC_ASSETS = [
  "/",
  "/offline",
  "/fonts/inter-var.woff2",
  "/images/logo.svg",
  // Add other critical assets
];

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  // Skip for browser extension requests and API calls
  if (
    event.request.url.startsWith("chrome-extension") ||
    event.request.url.includes("/api/")
  ) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((fetchResponse) => {
            // Cache successful responses of static assets
            if (
              fetchResponse.ok &&
              (event.request.url.match(/\.(js|css|woff2)$/) ||
                event.request.mode === "navigate")
            ) {
              const clonedResponse = fetchResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, clonedResponse);
              });
            }
            return fetchResponse;
          })
        );
      })
      .catch(() => {
        // If both cache and network fail and it's a navigation request,
        // return the offline page
        if (event.request.mode === "navigate") {
          return caches.match("/offline");
        }
        return new Response("Network error");
      })
  );
});
```

- [ ] **Implement Critical CSS**
  - Inline critical CSS for above-the-fold content
  - Defer non-critical CSS loading
  - Use link rel="preload" for critical assets

```tsx
// Example usage in layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <link
          rel="preload"
          href="/fonts/inter-var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/styles/non-critical.css"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link rel="stylesheet" href="/styles/non-critical.css" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Implementation Checklist

1. **Initial Audit**

   - [ ] Run Lighthouse performance audit
   - [ ] Identify largest performance bottlenecks
   - [ ] Establish performance baseline and goals

2. **Image Optimization**

   - [ ] Convert images to WebP with fallbacks
   - [ ] Implement responsive image sizes
   - [ ] Add image lazy loading

3. **JavaScript Optimization**

   - [ ] Analyze and reduce bundle size
   - [ ] Implement code splitting
   - [ ] Defer non-critical JavaScript

4. **CSS Optimization**

   - [ ] Extract and inline critical CSS
   - [ ] Remove unused CSS
   - [ ] Implement proper loading strategies

5. **Font Optimization**

   - [ ] Optimize font loading
   - [ ] Subset fonts where possible
   - [ ] Add proper font fallbacks

6. **Server Optimization**

   - [ ] Implement HTTP/2 or HTTP/3
   - [ ] Add proper caching headers
   - [ ] Configure compression

7. **Monitoring and Continuous Improvement**
   - [ ] Set up real user monitoring
   - [ ] Configure performance budgets
   - [ ] Implement regular performance audits
