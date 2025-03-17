# Error Handling Implementation Guide

This document outlines the approach to implement robust error handling throughout the Raja Wadu e-commerce platform according to industry standards.

## Error Handling Principles

1. **User-Friendly Messages**: Display friendly, non-technical error messages to users
2. **Comprehensive Logging**: Log detailed error information for debugging
3. **Graceful Degradation**: Ensure the application continues to function when parts fail
4. **Consistent Error UI**: Maintain consistent error presentation across the application
5. **Actionable Solutions**: Whenever possible, suggest actions users can take to resolve issues

## Frontend Error Handling

### React Error Boundaries

- [ ] **Implement Global Error Boundary**
  - Create a root-level error boundary that catches unhandled errors
  - Example implementation:

```tsx
// components/shared/ErrorBoundary.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Caught in error boundary:", error);
      setError(error.error);
      setHasError(true);

      // Log to monitoring service
      // logErrorToService(error);
    };

    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (hasError) {
    return (
      fallback || (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
          <div className="mb-4 p-4 bg-red-100 rounded-full">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            We're sorry, but we encountered an unexpected error.
          </p>
          <Button
            onClick={() => {
              setHasError(false);
              setError(null);
              window.location.reload();
            }}
          >
            Try Again
          </Button>
        </div>
      )
    );
  }

  return <>{children}</>;
}
```

- [ ] **Implement Component-Level Error Boundaries**
  - Add error boundaries around critical sections of the application
  - Create specialized error displays for specific components

```tsx
// Example usage
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";

export default function ProductPage() {
  return (
    <div>
      <Header />

      <ErrorBoundary fallback={<ProductErrorFallback />}>
        <ProductDetails id={productId} />
      </ErrorBoundary>

      <ErrorBoundary>
        <RelatedProducts categoryId={categoryId} />
      </ErrorBoundary>

      <Footer />
    </div>
  );
}
```

### API Request Error Handling

- [ ] **Create Error Response Handling Utility**

```tsx
// lib/api-error.ts
export interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error
  );
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred";
}

export function getApiErrorCode(error: unknown): string | undefined {
  if (isApiError(error) && error.code) {
    return error.code;
  }
  return undefined;
}

export function mapErrorToUserMessage(error: unknown): string {
  // Network errors
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // API errors
  if (isApiError(error)) {
    switch (error.status) {
      case 400:
        return "The request was invalid. Please correct the information and try again.";
      case 401:
        return "You need to be logged in to perform this action.";
      case 403:
        return "You don't have permission to perform this action.";
      case 404:
        return "The requested resource could not be found.";
      case 409:
        return "This action conflicts with the current state of the resource.";
      case 422:
        return "The provided information is invalid. Please check your inputs.";
      case 429:
        return "You've made too many requests. Please try again later.";
      case 500:
      case 502:
      case 503:
      case 504:
        return "We're experiencing technical difficulties. Please try again later.";
      default:
        return error.message || "An unexpected error occurred";
    }
  }

  // Fallback
  return "An unexpected error occurred. Please try again later.";
}
```

- [ ] **Implement Custom API Client with Error Handling**

```tsx
// lib/api/client.ts
import { ApiError, mapErrorToUserMessage } from "@/lib/api-error";
import { toast } from "@/components/ui/use-toast";

interface FetchOptions extends RequestInit {
  skipErrorToast?: boolean;
}

async function handleApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  if (!response.ok) {
    const errorData = isJson
      ? await response.json()
      : { message: response.statusText };
    const apiError: ApiError = {
      status: response.status,
      message: errorData.message || response.statusText,
      code: errorData.code,
      details: errorData.details,
    };

    throw apiError;
  }

  if (isJson) {
    return response.json();
  }

  return {} as T;
}

export async function apiClient<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const { skipErrorToast = false, ...fetchOptions } = options || {};

  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(fetchOptions?.headers || {}),
      },
      ...fetchOptions,
    });

    return await handleApiResponse<T>(response);
  } catch (error) {
    // Log the detailed error for debugging
    console.error("API request failed:", url, error);

    // Only show toast if not explicitly skipped
    if (!skipErrorToast) {
      toast({
        title: "Error",
        description: mapErrorToUserMessage(error),
        variant: "destructive",
      });
    }

    throw error;
  }
}
```

### Form Error Handling

- [ ] **Implement Client-Side Validation**
  - Use zod for schema validation
  - Display inline validation errors
  - Example implementation:

```tsx
// components/forms/CheckoutForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { apiClient } from "@/lib/api/client";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be less than 50 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  zip: z
    .string()
    .min(5, { message: "Zip code must be at least 5 characters." })
    .regex(/^\d+$/, { message: "Zip code must contain only numbers." }),
});

type FormValues = z.infer<typeof formSchema>;

export function CheckoutForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      zip: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await apiClient("/api/checkout", {
        method: "POST",
        body: JSON.stringify(data),
      });

      toast({
        title: "Success",
        description: "Your order has been placed.",
      });

      // Redirect to order confirmation
    } catch (error) {
      // API error is handled by apiClient

      // Handle validation errors from the server
      if (error.status === 422 && error.details) {
        Object.entries(error.details).forEach(([field, message]) => {
          form.setError(field as keyof FormValues, {
            type: "server",
            message: Array.isArray(message) ? message[0] : message,
          });
        });
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other form fields */}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Processing..." : "Place Order"}
        </Button>
      </form>
    </Form>
  );
}
```

## Backend Error Handling (API Routes)

- [ ] **Implement Structured Error Responses**

```tsx
// app/api/error.ts
export class ApiError extends Error {
  status: number;
  code?: string;
  details?: Record<string, any>;

  constructor({
    message,
    status,
    code,
    details,
  }: {
    message: string;
    status: number;
    code?: string;
    details?: Record<string, any>;
  }) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = "ApiError";
  }
}

export function createErrorResponse(error: unknown) {
  console.error("API Error:", error);

  if (error instanceof ApiError) {
    return Response.json(
      {
        message: error.message,
        code: error.code,
        details: error.details,
      },
      { status: error.status }
    );
  }

  // For other types of errors, return a generic 500 response
  return Response.json(
    {
      message: "An unexpected error occurred.",
    },
    { status: 500 }
  );
}
```

- [ ] **Use Error Handler in API Routes**

```tsx
// app/api/products/route.ts
import { createErrorResponse, ApiError } from "../error";

export async function GET(request: Request) {
  try {
    // Get query parameters
    const url = new URL(request.url);
    const category = url.searchParams.get("category");

    // Validate inputs
    if (category && !isValidCategory(category)) {
      throw new ApiError({
        message: "Invalid category specified",
        status: 400,
        code: "INVALID_CATEGORY",
      });
    }

    // Fetch products
    const products = await fetchProducts(category);

    return Response.json({ products });
  } catch (error) {
    return createErrorResponse(error);
  }
}
```

## Loading States and Skeletons

- [ ] **Implement Loading Skeletons**
  - Create skeleton components for common content types
  - Use conditional rendering based on loading state

```tsx
// components/products/ProductCardSkeleton.tsx
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden border shadow animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded w-1/4 mt-2" />
      </div>
    </div>
  );
}

// components/products/ProductGrid.tsx
export function ProductGrid({ categoryId }: { categoryId?: string }) {
  const { data: products, isLoading, error } = useProducts(categoryId);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load products</p>
        <Button onClick={() => refetch()} variant="outline" className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## Empty States

- [ ] **Implement Empty State Components**
  - Create consistent empty state UI for various scenarios
  - Include call-to-action buttons where appropriate

```tsx
// components/shared/EmptyState.tsx
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-lg">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

// Example usage for empty cart
export function EmptyCart() {
  const router = useRouter();

  return (
    <EmptyState
      title="Your cart is empty"
      description="Looks like you haven't added any products to your cart yet."
      icon={<ShoppingCart className="h-12 w-12 text-gray-400" />}
      action={{
        label: "Continue Shopping",
        onClick: () => router.push("/products"),
      }}
    />
  );
}
```

## Retry Mechanisms

- [ ] **Implement Exponential Backoff Retry**

```tsx
// lib/api/retry.ts
interface RetryOptions {
  maxRetries?: number;
  initialDelay?: number;
  maxDelay?: number;
  shouldRetry?: (error: unknown) => boolean;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 300,
    maxDelay = 5000,
    shouldRetry = (error) => {
      // Retry on network errors and 5xx server errors
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        return true;
      }

      if (typeof error === "object" && error !== null && "status" in error) {
        const status = (error as { status: number }).status;
        return status >= 500 && status < 600;
      }

      return false;
    },
  } = options;

  let retries = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      retries++;

      if (retries > maxRetries || !shouldRetry(error)) {
        throw error;
      }

      // Exponential backoff with jitter
      delay = Math.min(maxDelay, delay * 2 * (0.8 + Math.random() * 0.4));

      console.log(
        `Retrying API request (${retries}/${maxRetries}) after ${delay}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// Usage
export async function fetchProductWithRetry(productId: string) {
  return withRetry(() => apiClient(`/api/products/${productId}`));
}
```

## Error Monitoring and Logging

- [ ] **Implement Error Logging Service**

```tsx
// lib/error-logger.ts
interface ErrorLogData {
  message: string;
  stack?: string;
  url: string;
  user?: string;
  context?: Record<string, any>;
}

export async function logError(error: unknown, context?: Record<string, any>) {
  // Don't log in development
  if (process.env.NODE_ENV === "development") {
    console.error("Error logged (dev only):", error);
    return;
  }

  try {
    const errorData: ErrorLogData = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      url: typeof window !== "undefined" ? window.location.href : "",
      user: getUserId(), // Implement to get current user ID if available
      context,
    };

    // Could be replaced with a call to a monitoring service like Sentry
    await fetch("/api/error-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(errorData),
      // Use keepalive to ensure the request completes even if the page is unloading
      keepalive: true,
    });
  } catch (loggingError) {
    // Fail silently in production, log in development
    if (process.env.NODE_ENV === "development") {
      console.error("Failed to log error:", loggingError);
    }
  }
}

// Capture unhandled errors
if (typeof window !== "undefined") {
  window.addEventListener("error", (event) => {
    logError(event.error || event.message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    logError(event.reason);
  });
}
```

## Offline Handling

- [ ] **Implement Offline Detection and Recovery**

```tsx
// hooks/useOffline.ts
"use client";

import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

export function useOffline() {
  const [isOffline, setIsOffline] = useState<boolean>(
    typeof navigator !== "undefined" ? !navigator.onLine : false
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast({
        title: "You're back online",
        description: "Your connection has been restored.",
        variant: "default",
      });
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: "You're offline",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOffline;
}

// components/shared/OfflineBanner.tsx
("use client");

import { useOffline } from "@/hooks/useOffline";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-500 text-white p-2 text-center flex items-center justify-center">
      <WifiOff className="h-4 w-4 mr-2" />
      <span>You are currently offline. Some features may be unavailable.</span>
    </div>
  );
}
```

## Implementation Plan

1. **Set up error monitoring service**

   - Implement error logging
   - Configure alerts for critical errors

2. **Implement global error handling**

   - Create error boundary components
   - Set up global error listeners

3. **Enhance API client**

   - Add error handling middleware
   - Implement retry mechanisms

4. **Improve form validation**

   - Standardize validation schemas
   - Implement consistent error presentation

5. **Create loading and empty states**

   - Design skeleton components
   - Implement empty state components

6. **Handle offline scenarios**

   - Detect and notify about connectivity issues
   - Implement offline fallbacks where possible

7. **Test error scenarios**
   - Create test cases for various error conditions
   - Ensure proper error recovery
