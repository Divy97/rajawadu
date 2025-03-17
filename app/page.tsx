import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductGridWithErrorBoundary } from "@/components/products/ProductGridWithErrorBoundary";
import { getFeaturedProducts } from "@/lib/api/products";
import Script from "next/script";
import { NewsletterForm } from "@/components/NewsletterForm";

export const revalidate = 3600; // Revalidate this page every hour

export default async function Home() {
  // Fetch featured products from Supabase
  const featuredProducts = await getFeaturedProducts();

  // Organization structured data
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Raja Wadu",
    url: "https://rajawadu.com",
    logo: "https://rajawadu.com/images/logo.png",
    sameAs: [
      "https://facebook.com/rajawadu",
      "https://instagram.com/rajawadu",
      "https://twitter.com/rajawadu",
    ],
    description:
      "Premium royal Mukhwas and traditional Indian mouth fresheners crafted with century-old family recipes.",
    foundingDate: "2025",
    founders: [
      {
        "@type": "Person",
        name: "Vansh Shah",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "India",
      addressRegion: "Gujarat",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "info@rajawadu.com",
    },
  };

  // Website structured data
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://rajawadu.com",
    name: "Rajawadu",
    description:
      "Premium royal Mukhwas and traditional Indian mouth fresheners.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://rajawadu.com/products/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main>
      {/* JSON-LD structured data */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      <div className="min-h-screen bg-[#FDF5ED] bg-grain-texture">
        {/* Hero Section - Clean Minimal Design */}
        <section className="relative bg-[#FDF5ED] overflow-hidden pt-16 pb-24">
          {/* Background Elements */}
          <div className="absolute inset-0">
            {/* Elegant Mandala Pattern */}
            <div
              className="absolute top-0 right-0 w-[800px] h-[800px] opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cg fill='%23C84C21'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='currentColor' stroke-width='0.5'/%3E%3Cpath d='M50,5 Q95,50 50,95 Q5,50 50,5 Z' fill='none' stroke='currentColor' stroke-width='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          {/* Content Container */}
          <div className="container mx-auto relative z-10 px-4">
            <div className="mx-auto">
              {/* Two Column Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Refined Typography */}
                <div className="max-w-xl mt-3">
                  <h1 className="text-sweet-brown font-serif">
                    <div className="space-y-2 mb-4">
                      <span className="block text-3xl md:text-4xl tracking-wide">
                        DISCOVER THE
                      </span>
                      <span className="block text-3xl md:text-4xl tracking-wide">
                        QUALITY OF A ROYAL
                      </span>
                      <span className="block text-2xl md:text-3xl tracking-wider"></span>
                    </div>
                    <span className="block text-6xl md:text-8xl font-bold text-sweet-orange tracking-tight leading-none">
                      MUKHWAS
                    </span>
                  </h1>

                  <p className="font-serif text-lg text-sweet-brown/70 mt-8 mb-10 leading-relaxed max-w-md">
                    A blend of exotic spices, nuts, and seeds — crafted with
                    recipes passed down through generations for the perfect
                    after-meal experience.
                  </p>

                  <button className="font-serif bg-sweet-brown text-white px-8 py-4 rounded-full text-lg tracking-wide hover:bg-sweet-orange transition-all hover:shadow-lg">
                    Explore Collection
                  </button>
                </div>

                {/* Right Column - Royal Mukhwas Showcase */}
                <div className="relative h-[600px]">
                  {/* Main Product Showcase */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
                    {/* Decorative Circles */}
                    <div className="absolute inset-0 rounded-full border-2 border-sweet-brown/10 animate-spin-slow"></div>
                    <div className="absolute inset-[30px] rounded-full border-2 border-sweet-orange/10"></div>
                    <div className="absolute inset-[60px] rounded-full border-2 border-sweet-brown/10"></div>

                    {/* Central Product Image */}
                    <div className="absolute inset-[90px] rounded-full bg-white shadow-lg overflow-hidden">
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-sweet-orange/5 to-sweet-brown/10">
                        {/* Hero product image
                        <div className="relative w-full h-full">
                          <Image
                            src="/images/hero-product.webp"
                            alt="Premium Royal Mukhwas Collection"
                            fill
                            priority
                            className="object-cover rounded-full"
                            sizes="(max-width: 768px) 200px, 220px"
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-[20%] right-[20%] animate-float-slow">
                    <span className="text-4xl">🌿</span>
                  </div>
                  <div className="absolute bottom-[30%] left-[25%] animate-float-medium">
                    <span className="text-4xl">✨</span>
                  </div>

                  {/* Product Cards - Refined Typography */}
                  <div className="absolute top-[15%] right-[10%] bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg transform rotate-6 hover:rotate-0 transition-transform">
                    <div className="font-serif text-xl text-sweet-brown">
                      Royal Mukhwas
                    </div>
                    <div className="font-serif text-sm text-sweet-brown/60 tracking-wide">
                      Premium Blend
                    </div>
                    <div className="font-serif text-lg text-sweet-orange font-medium mt-1">
                      ₹299
                    </div>
                  </div>

                  <div className="absolute bottom-[20%] right-[25%] bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
                    <div className="font-serif text-xl text-sweet-brown">
                      Heritage Collection
                    </div>
                    <div className="font-serif text-sm text-sweet-brown/60 tracking-wide">
                      Special Edition
                    </div>
                    <div className="font-serif text-lg text-sweet-orange font-medium mt-1">
                      ₹399
                    </div>
                  </div>

                  {/* Royal Corner Ornaments */}
                  <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-sweet-orange/20 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-sweet-orange/20 rounded-bl-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-24 container mx-auto">
          <div className="max-w-screen-xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
                Our Collection
              </span>
              <h2 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
                Discover Featured Flavors
              </h2>
              <div className="flex items-center justify-center gap-6 mb-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                <div className="text-sweet-orange">❖</div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              </div>
              <p className="text-xl font-serif text-sweet-brown/80 max-w-3xl mx-auto">
                Explore our handcrafted collection of premium mukhwas and mouth
                fresheners, made with rare herbs and spices.
              </p>
            </div>

            {/* Featured Products with Error Boundary */}
            <ProductGridWithErrorBoundary
              products={featuredProducts.slice(0, 4)}
            />

            <div className="text-center mt-16">
              <Link href="/products">
                <Button className="bg-sweet-brown hover:bg-sweet-brown/90 text-white rounded-lg px-12 py-7">
                  <span className="font-logo tracking-wide">
                    View All Products
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Heritage Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#FDF5ED]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C84C21' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px",
              }}
            ></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
                Our Legacy
              </span>
              <h2 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
                A Royal Legacy
              </h2>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                <div className="text-sweet-orange">❖</div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              </div>
              <p className="text-xl font-serif text-sweet-brown/80 leading-relaxed max-w-2xl mx-auto">
                Experience the essence of royal Indian hospitality through our
                carefully crafted Mukhwas blends
              </p>
            </div>

            {/* Heritage Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {[
                {
                  icon: "🌿",
                  title: "Royal Craftsmanship",
                  description:
                    "Each blend is meticulously crafted using traditional methods passed down through generations",
                },
                {
                  icon: "✨",
                  title: "Finest Ingredients",
                  description:
                    "Sourced from the most prestigious spice gardens and orchards across India",
                },
                {
                  icon: "👑",
                  title: "Century of Excellence",
                  description:
                    "A hundred years of perfecting the art of creating premium Mukhwas",
                },
              ].map((card, index) => (
                <div key={index} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-b from-sweet-brown/5 to-sweet-orange/5 rounded-xl transform -rotate-1 transition-transform group-hover:rotate-0"></div>
                  <div className="relative bg-white p-8 rounded-xl border border-sweet-brown/10 shadow-sm hover:shadow-md transition-all">
                    <div className="w-20 h-20 mb-6 mx-auto">
                      <div className="w-full h-full rounded-full bg-sweet-orange/10 flex items-center justify-center">
                        <span className="text-3xl">{card.icon}</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-logo text-sweet-brown text-center mb-4">
                      {card.title}
                    </h3>
                    <p className="text-sweet-brown/70 text-center font-serif">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-sweet-orange/5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { number: "1920", label: "Est. Year", emoji: "✤" },
                { number: "100+", label: "Family Recipes", emoji: "✦" },
                { number: "4.9", label: "Customer Rating", emoji: "❖" },
                { number: "3", label: "Generations", emoji: "✦" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-4 text-sweet-orange">
                    {stat.emoji}
                  </div>
                  <div className="text-3xl font-logo text-sweet-brown mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sweet-brown/70 font-serif tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
                Stay Connected
              </span>
              <h2 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
                Join Our Culinary Journey
              </h2>
              <div className="flex items-center justify-center gap-6 mb-8">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                <div className="text-sweet-orange">❖</div>
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
              </div>
              <p className="text-xl font-serif text-sweet-brown/80 mb-12">
                Subscribe to receive updates about our seasonal specials, family
                recipes, and exclusive dining experiences.
              </p>

              {/* Accessible Newsletter Form with Toast Notifications */}
              <NewsletterForm />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-24 bg-sweet-brown/5 border-y border-sweet-brown/10"
        >
          <div className="container mx-auto">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-sm uppercase tracking-[0.2em] text-sweet-brown/60 font-medium mb-6 block">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-6">
                  A Century of Tradition
                </h2>
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                  <div className="text-sweet-orange">❖</div>
                  <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
                </div>
                <div className="space-y-6 text-sweet-brown/80 font-serif">
                  <p className="leading-relaxed">
                    Founded in 1920 by our great-grandfather in Gujarat, Raja
                    Wadu has been crafting premium mukhwas for over a century
                    using time-honored recipes and techniques.
                  </p>
                  <p className="leading-relaxed">
                    What began as a small family business has grown into a
                    beloved brand, while still maintaining the authenticity and
                    quality that set us apart. Each blend is handcrafted with
                    carefully selected ingredients and balanced flavors.
                  </p>
                  <p className="leading-relaxed">
                    Today, the fourth generation of our family continues this
                    legacy, bringing traditional Indian mouth fresheners to
                    homes around the world.
                  </p>
                </div>
                <Button className="mt-12 bg-sweet-brown hover:bg-sweet-orange text-white px-8 py-6 rounded-full transition-colors">
                  <Link href="/about" className="font-logo tracking-wide">
                    Learn More About Us
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-sweet-cream border border-sweet-brown/10 relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-sweet-brown/10 to-transparent" />
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: "url('/images/about-image.webp')",
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-sweet-cream p-6 rounded-lg border border-sweet-brown/10 shadow-xl">
                  <p className="text-sweet-brown font-serif italic text-lg">
                    &ldquo;Our mukhwas recipes have been passed down through
                    four generations, preserving authentic flavors for over a
                    century.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
