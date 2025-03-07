import defaultTheme from "tailwindcss/defaultTheme";
import animatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sweet: {
          yellow: "#FFFFFF",
          orange: "#FF6B35",
          cream: "#FFF1E6",
          brown: "#C84C21",
          green: "#FF8B5E",
          blue: "#E65D35",
        },
      },
      backgroundImage: {
        "sweet-gradient": "linear-gradient(135deg, var(--tw-gradient-stops))",
        "dots-pattern":
          "radial-gradient(circle, #00000011 1px, transparent 1px)",
      },
      borderRadius: {
        bubble: "6rem",
        card: "2rem",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.sans],
        serif: ["Playfair Display", "serif"],
        logo: ["var(--font-bodoni)", "Bodoni MT", "Bodoni", "serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "text-slide-up": {
          "0%": { transform: "translateY(15px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "text-slide-down": {
          "0%": { transform: "translateY(-15px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "text-fade": {
          "0%": { opacity: "0" },
          "10%": { opacity: "0" },
          "20%": { opacity: "1" },
          "40%": { opacity: "1" },
          "60%": { opacity: "0" },
          "100%": { opacity: "0" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "bounce-slight": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(10px, -10px)" },
        },
        "float-medium": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-8px, -12px)" },
        },
        "float-fast": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(12px, -8px)" },
        },
        "slide-left": {
          "0%": { transform: "translateX(100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-right": {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        textFade: {
          "0%, 45%, 100%": { opacity: "0" },
          "50%, 95%": { opacity: "1" },
        },
        textSlideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        textSlideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "text-slide-up": "text-slide-up 0.8s ease-out",
        "text-slide-down": "text-slide-down 0.8s ease-out",
        "text-fade": "text-fade 10s ease-in-out infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "bounce-slight": "bounce-slight 3s ease-in-out infinite",
        "scale-up": "scale-up 0.4s ease-out",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-medium": "float-medium 5s ease-in-out infinite",
        "float-fast": "float-fast 4s ease-in-out infinite",
        "slide-left": "slide-left 0.6s ease-out",
        "slide-right": "slide-right 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "text-slide-up": "textSlideUp 0.5s ease-out",
        "text-slide-down": "textSlideDown 0.5s ease-out",
      },
      backgroundSize: {
        "dots-sm": "24px 24px",
        "dots-lg": "32px 32px",
      },
    },
  },
  plugins: [animatePlugin],
};
