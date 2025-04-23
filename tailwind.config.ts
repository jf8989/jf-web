// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    // Root directory (keep if needed, but might be redundant with src)
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // "./app/**/*.{js,ts,jsx,tsx,mdx}",
    // Src directory (Primary paths for Next.js App Router)
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enables dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // System colors for light/dark mode
        background: "var(--background)",
        foreground: "var(--foreground)",

        // Common color scheme
        primary: {
          DEFAULT: "#4A90E2",
          hover: "#3A7BC8",
        },
        // Professional color palette
        navy: {
          100: "#E6E8ED",
          200: "#BFC5D4",
          300: "#99A3BA",
          400: "#4D5E80",
          500: "#273B60",
          600: "#1E2E4D",
          700: "#16223A",
          800: "#0E1627",
          900: "#070B13",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        beige: {
          50: "#fff5e6",
          100: "#ffeeda",
          200: "#ffe7cb",
          300: "#f7d6b8",
          400: "#eec4a5",
          500: "#e5b292",
          600: "#d69f7f",
          700: "#c78c6c",
          800: "#b8795a",
          900: "#a96747",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Menlo", "monospace"],
        inter: ["var(--font-inter)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        roboto: ["var(--font-roboto)", "sans-serif"],
        openSans: ["var(--font-open-sans)", "sans-serif"],
        lato: ["var(--font-lato)", "sans-serif"],
        raleway: ["var(--font-raleway)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        // Existing animations
        fadeIn: "fadeIn 0.8s ease-out forwards",
        fadeOut: "fadeOut 0.8s ease-in forwards",
        pulse: "pulse 2s infinite", // Keep pulse if used elsewhere
        float: "float 3s ease-in-out infinite",

        // === ADDED AURA ANIMATIONS ===
        "aura-glow-outer": "aura-glow-outer 6s ease-in-out infinite",
        "aura-glow-inner": "aura-glow-inner 5s ease-in-out infinite",
        // === END ADDED AURA ANIMATIONS ===
      },
      keyframes: {
        // Existing keyframes
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        pulse: {
          // Keep pulse if used elsewhere
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },

        // === ADDED AURA KEYFRAMES ===
        "aura-glow-outer": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.08)", opacity: "0.5" },
        },
        "aura-glow-inner": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "0.6" },
        },
        // === END ADDED AURA KEYFRAMES ===
      },
      spacing: {
        "header-height": "4rem",
        "footer-height": "12rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
        content: "1240px",
      },
      transitionProperty: {
        width: "width",
        all: "all",
      },
      transitionDuration: {
        "2000": "2000ms",
        "1000": "1000ms",
        "500": "500ms",
        "300": "300ms",
      },
      transitionTimingFunction: {
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
