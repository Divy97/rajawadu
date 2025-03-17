"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type HighContrastMode = "default" | "high-contrast";

interface AccessibilityContextType {
  highContrastMode: HighContrastMode;
  toggleHighContrastMode: () => void;
}

const defaultContextValue: AccessibilityContextType = {
  highContrastMode: "default",
  toggleHighContrastMode: () => {},
};

const AccessibilityContext =
  createContext<AccessibilityContextType>(defaultContextValue);

export const useAccessibility = () => useContext(AccessibilityContext);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({
  children,
}: AccessibilityProviderProps) {
  const [highContrastMode, setHighContrastMode] =
    useState<HighContrastMode>("default");

  const toggleHighContrastMode = () => {
    const newMode =
      highContrastMode === "default" ? "high-contrast" : "default";
    setHighContrastMode(newMode);

    // Add high-contrast class to the document body to enable CSS for high contrast mode
    if (newMode === "high-contrast") {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  };

  // Initialize on the client side only
  React.useEffect(() => {
    // Check for user preference (could be saved in localStorage)
    const savedMode = localStorage.getItem("high-contrast-mode");
    if (savedMode === "high-contrast") {
      setHighContrastMode("high-contrast");
      document.documentElement.classList.add("high-contrast");
    }

    // Check for prefers-contrast media query
    const prefersContrastMedia = window.matchMedia("(prefers-contrast: more)");
    if (prefersContrastMedia.matches && !savedMode) {
      setHighContrastMode("high-contrast");
      document.documentElement.classList.add("high-contrast");
    }

    // Listen for changes in prefers-contrast media query
    const handlePrefersContrastChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setHighContrastMode("high-contrast");
        document.documentElement.classList.add("high-contrast");
      } else {
        setHighContrastMode("default");
        document.documentElement.classList.remove("high-contrast");
      }
    };

    prefersContrastMedia.addEventListener(
      "change",
      handlePrefersContrastChange
    );
    return () => {
      prefersContrastMedia.removeEventListener(
        "change",
        handlePrefersContrastChange
      );
    };
  }, []);

  // Save preference when it changes
  React.useEffect(() => {
    localStorage.setItem("high-contrast-mode", highContrastMode);
  }, [highContrastMode]);

  const value = { highContrastMode, toggleHighContrastMode };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}
