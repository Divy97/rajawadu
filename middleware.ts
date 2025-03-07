import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simple pass-through middleware that doesn't use any server-only APIs
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

// No routes matched to avoid any Edge runtime issues
export const config = {
  matcher: [], // Empty array means no routes are matched
};
