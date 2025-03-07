export const theme = {
  colors: {
    primary: {
      DEFAULT: "#FF6B6B",
      50: "#FFF0F0",
      // ... other shades from tailwind config
    },
    accent: {
      DEFAULT: "#4ECDC4",
      50: "#DEFAF8",
      // ... other shades from tailwind config
    },
  },
  spacing: {
    container: "2rem",
    section: "4rem",
  },
  borderRadius: {
    DEFAULT: "0.5rem",
    lg: "1rem",
    full: "9999px",
  },
  animation: {
    duration: {
      fast: "0.2s",
      normal: "0.3s",
      slow: "0.5s",
    },
    easing: {
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
};

export type Theme = typeof theme;
