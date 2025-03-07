"use client";

import { createContext } from "react";

export const ThemeContext = createContext({});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Add providers here: Theme, Auth, Cart etc */}
      {children}
    </>
  );
}
