import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple pass-through middleware that doesn't use any server-only APIs
export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl;

  // Define valid path prefixes that should be allowed
  const validPathPrefixes = [
    "/_next",
    "/api",
    "/products",
    "/cart",
    "/checkout",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
    "/shipping-policy",
    "/contact",
    "/images",
    "/fonts",
    "/favicon.ico",
    "/robots.txt",
    "/sitemap.xml",
  ];

  // Check if the current path is the root path
  if (pathname === "/") {
    return NextResponse.next();
  }

  // Check if the current path starts with any of the valid prefixes
  const isValidPath = validPathPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  // If it's not a valid path, redirect to the 404 page
  if (!isValidPath) {
    // Instead of using notFound() which redirects to /not-found internally,
    // we'll rewrite the request to /not-found
    return NextResponse.rewrite(new URL("/not-found", request.url));
  }

  return NextResponse.next();
}

// Configure the matcher to include all routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
