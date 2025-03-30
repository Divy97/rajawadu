"use client";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-sweet-orange text-6xl mb-6">✧</div>

        <h1 className="text-4xl md:text-5xl font-logo text-sweet-brown mb-4">
          Page Not Found
        </h1>

        <div className="flex items-center justify-center gap-6 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
          <div className="text-sweet-orange">❖</div>
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-sweet-brown/20 to-transparent"></div>
        </div>

        <p className="text-xl font-serif text-sweet-brown/80 mb-10">
          We couldn&apos;t find the page you were looking for. It might have
          been moved, deleted, or perhaps never existed.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 px-8 py-3 bg-sweet-brown text-white rounded-md font-logo hover:bg-sweet-brown/90 transition-colors w-full md:w-auto justify-center"
          >
            <Home size={18} />
            <span>Return Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-8 py-3 bg-white border border-sweet-orange/30 text-sweet-brown rounded-md font-logo hover:bg-sweet-orange/5 transition-colors w-full md:w-auto justify-center"
          >
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </main>
  );
}
