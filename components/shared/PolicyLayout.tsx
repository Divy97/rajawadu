import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({
  title,
  lastUpdated,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="bg-gradient-to-b from-[#FDF5ED] to-[#f9f1e8] min-h-screen pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-sweet-brown hover:text-sweet-orange transition-colors mb-6 text-sm sm:text-base"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 sm:w-12 bg-sweet-orange/30"></div>
            <span className="text-sweet-orange text-sm uppercase tracking-widest font-medium">
              Official Document
            </span>
            <div className="h-px w-8 sm:w-12 bg-sweet-orange/30"></div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-sweet-brown mb-4">
            {title}
          </h1>

          {lastUpdated && (
            <p className="text-sweet-brown/60 text-sm mt-2">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 sm:px-8 md:px-12 py-8 sm:py-10 md:py-16 shadow-md border border-sweet-brown/10">
          <div className="policy-content prose prose-sm sm:prose prose-headings:font-serif prose-headings:text-sweet-brown prose-headings:font-semibold prose-p:text-sweet-brown/80 prose-a:text-sweet-orange prose-a:no-underline hover:prose-a:underline prose-strong:text-sweet-brown max-w-none prose-p:leading-relaxed prose-li:text-sweet-brown/80 prose-li:leading-relaxed">
            {children}
          </div>
        </div>

        {/* Navigation between policies */}
        <div className="mt-8 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <Link
            href="/privacy-policy"
            className="bg-white/80 py-3 sm:py-4 px-3 text-center text-sweet-brown hover:bg-white hover:text-sweet-orange hover:shadow-md transition-all rounded-xl border border-sweet-brown/10 text-sm sm:text-base"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="bg-white/80 py-3 sm:py-4 px-3 text-center text-sweet-brown hover:bg-white hover:text-sweet-orange hover:shadow-md transition-all rounded-xl border border-sweet-brown/10 text-sm sm:text-base"
          >
            Terms of Service
          </Link>
          <Link
            href="/refund-policy"
            className="bg-white/80 py-3 sm:py-4 px-3 text-center text-sweet-brown hover:bg-white hover:text-sweet-orange hover:shadow-md transition-all rounded-xl border border-sweet-brown/10 text-sm sm:text-base"
          >
            Refund Policy
          </Link>
          <Link
            href="/shipping-policy"
            className="bg-white/80 py-3 sm:py-4 px-3 text-center text-sweet-brown hover:bg-white hover:text-sweet-orange hover:shadow-md transition-all rounded-xl border border-sweet-brown/10 text-sm sm:text-base"
          >
            Shipping Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
