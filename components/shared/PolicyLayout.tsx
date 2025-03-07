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
    <div className="bg-[#eeeee0] min-h-screen pt-24 pb-16">
      <div className="container max-w-4xl mx-auto px-4">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center text-sweet-brown hover:text-sweet-orange transition-colors mb-6"
        >
          <ChevronLeft size={16} className="mr-1" />
          <span>Back to Home</span>
        </Link>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#6b5130] uppercase tracking-wide">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-gray-600 text-sm mt-4">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="bg-white px-6 md:px-12 py-10 md:py-16 shadow-sm border border-gray-100">
          <div className="policy-content prose prose-headings:font-serif prose-headings:text-[#6b5130] prose-p:text-gray-700 prose-a:text-sweet-brown prose-a:no-underline hover:prose-a:underline prose-strong:text-[#6b5130] max-w-none prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed">
            {children}
          </div>
        </div>

        {/* Navigation between policies */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/privacy-policy"
            className="bg-white p-4 text-center text-sweet-brown hover:bg-[#f8f8f0] transition-colors border border-gray-100"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="bg-white p-4 text-center text-sweet-brown hover:bg-[#f8f8f0] transition-colors border border-gray-100"
          >
            Terms of Service
          </Link>
          <Link
            href="/refund-policy"
            className="bg-white p-4 text-center text-sweet-brown hover:bg-[#f8f8f0] transition-colors border border-gray-100"
          >
            Refund Policy
          </Link>
          <Link
            href="/shipping-policy"
            className="bg-white p-4 text-center text-sweet-brown hover:bg-[#f8f8f0] transition-colors border border-gray-100"
          >
            Shipping Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
