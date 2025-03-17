"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        this.props.fallback || (
          <div className="p-8 text-center bg-white/80 backdrop-blur-sm rounded-lg border border-sweet-orange/20 shadow-sm">
            <div className="text-sweet-orange text-4xl mb-4">✧</div>
            <h2 className="text-2xl font-serif text-sweet-brown mb-4">
              We encountered an issue
            </h2>
            <p className="text-sweet-brown/80 mb-6">
              We&apos;re having trouble displaying this content right now.
              Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-sweet-orange text-white rounded-md font-logo hover:bg-sweet-orange/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Custom hook for functional components
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  // Set display name for debugging purposes
  const displayName = Component.displayName || Component.name || "Component";
  WrappedComponent.displayName = `withErrorBoundary(${displayName})`;

  return WrappedComponent;
}
