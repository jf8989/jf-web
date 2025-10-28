/// Path: tailwind.config.ts
/// Role: Map Tailwind families to Next font variables; enable and customize Typography + dark mode class

import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: { DEFAULT: "#4A90E2", hover: "#3A7BC8" },
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
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        geist: ["var(--font-sans)", "system-ui", "sans-serif"],
        geistMono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
        fadeOut: "fadeOut 0.8s ease-in forwards",
        pulse: "pulse 2s infinite",
        float: "float 3s ease-in-out infinite",
        "aura-glow-outer": "aura-glow-outer 6s ease-in-out infinite",
        "aura-glow-inner": "aura-glow-inner 5s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        fadeOut: { "0%": { opacity: "1" }, "100%": { opacity: "0" } },
        pulse: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "aura-glow-outer": {
          "0%,100%": { transform: "scale(1)", opacity: "0.7" },
          "50%": { transform: "scale(1.08)", opacity: "0.5" },
        },
        "aura-glow-inner": {
          "0%,100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "0.6" },
        },
      },
      spacing: { "header-height": "4rem", "footer-height": "12rem" },
      maxWidth: { "8xl": "88rem", "9xl": "96rem", content: "1240px" },
      transitionProperty: { width: "width", all: "all" },
      transitionDuration: {
        2000: "2000ms",
        1000: "1000ms",
        500: "500ms",
        300: "300ms",
      },
      transitionTimingFunction: {
        "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      // Typography tuned for light/dark
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            a: {
              color: theme("colors.sky.700"),
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
                color: theme("colors.sky.800"),
              },
            },
            "h2, h3": {
              color: theme("colors.gray.900"),
              fontWeight: "700",
              lineHeight: "1.2",
              scrollMarginTop: theme("spacing.header-height"),
            },
            h2: { marginTop: "2.25rem", marginBottom: "1rem" },
            h3: { marginTop: "1.75rem", marginBottom: "0.75rem" },
            p: { color: theme("colors.gray.800"), lineHeight: "1.75" },
            strong: { color: theme("colors.gray.900") },
            blockquote: {
              color: theme("colors.gray.800"),
              borderLeftColor: theme("colors.gray.300"),
              fontStyle: "italic",
              quotes: "none",
            },
            hr: { borderColor: theme("colors.gray.200") },
            "ul > li::marker, ol > li::marker": {
              color: theme("colors.gray.500"),
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              padding: "0.15rem 0.35rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            pre: {
              backgroundColor: theme("colors.gray.100"),
              padding: "1rem",
              borderRadius: "0.5rem",
            },
            "figure figcaption": {
              color: theme("colors.gray.600"),
              fontStyle: "italic",
              textAlign: "center",
            },
          },
        },
        invert: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.sky.400"),
              textDecoration: "none",
              fontWeight: "500",
              "&:hover": {
                textDecoration: "underline",
                color: theme("colors.sky.300"),
              },
            },
            "h2, h3": { color: theme("colors.gray.100") },
            p: { color: theme("colors.gray.300") },
            strong: { color: theme("colors.gray.100") },
            blockquote: {
              color: theme("colors.gray.300"),
              borderLeftColor: theme("colors.gray.700"),
              fontStyle: "italic",
              quotes: "none",
            },
            hr: { borderColor: theme("colors.gray.700") },
            "ul > li::marker, ol > li::marker": {
              color: theme("colors.gray.500"),
            },
            code: {
              backgroundColor: "rgba(255,255,255,0.06)",
              padding: "0.15rem 0.35rem",
              borderRadius: "0.25rem",
              fontWeight: "500",
            },
            pre: {
              backgroundColor: "rgba(255,255,255,0.06)",
              padding: "1rem",
              borderRadius: "0.5rem",
            },
            "figure figcaption": {
              color: theme("colors.gray.400"),
              fontStyle: "italic",
              textAlign: "center",
            },
          },
        },
      }),
    },
  },
  plugins: [typography],
} satisfies Config;
