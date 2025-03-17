"use client";

import React, { useState } from "react";
import { useAccessibility } from "./AccessibilityProvider";

export function AccessibilityToolbar() {
  const { highContrastMode, toggleHighContrastMode } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Toolbar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-sweet-brown text-white shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sweet-orange"
        aria-label={
          isOpen ? "Close accessibility menu" : "Open accessibility menu"
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="block"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="4" />
          <line x1="21.17" y1="8" x2="12" y2="8" />
          <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
          <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
        </svg>
      </button>

      {/* Toolbar Panel */}
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-2 w-64 border border-sweet-brown/20">
          <h2 className="font-serif text-lg font-medium text-sweet-brown mb-4">
            Accessibility Options
          </h2>

          <div className="space-y-4">
            {/* High Contrast Toggle */}
            <div className="flex items-center justify-between">
              <label
                htmlFor="high-contrast"
                className="font-serif text-sweet-brown"
              >
                High Contrast
              </label>
              <button
                id="high-contrast"
                onClick={toggleHighContrastMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sweet-orange focus:ring-offset-2 ${
                  highContrastMode === "high-contrast"
                    ? "bg-sweet-brown"
                    : "bg-sweet-brown/30"
                }`}
                role="switch"
                aria-checked={highContrastMode === "high-contrast"}
              >
                <span
                  className={`${
                    highContrastMode === "high-contrast"
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>

            {/* Text Size Controls */}
            <div className="flex flex-col">
              <span className="font-serif text-sweet-brown mb-2">
                Text Size
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    (document.documentElement.style.fontSize = "0.9rem")
                  }
                  className="flex-1 py-1 px-2 border border-sweet-brown/20 rounded-md font-serif text-sweet-brown hover:bg-sweet-brown/10"
                  aria-label="Small text size"
                >
                  A<span className="sr-only">Small text size</span>
                </button>
                <button
                  onClick={() =>
                    (document.documentElement.style.fontSize = "1rem")
                  }
                  className="flex-1 py-1 px-2 border border-sweet-brown/20 rounded-md font-serif text-sweet-brown hover:bg-sweet-brown/10"
                  aria-label="Medium text size"
                >
                  A<span className="sr-only">Medium text size</span>
                </button>
                <button
                  onClick={() =>
                    (document.documentElement.style.fontSize = "1.2rem")
                  }
                  className="flex-1 py-1 px-2 border border-sweet-brown/20 rounded-md font-serif text-sweet-brown hover:bg-sweet-brown/10"
                  aria-label="Large text size"
                >
                  A<span className="sr-only">Large text size</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
