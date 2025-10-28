/// Path: src/app/layout.tsx
/// Role: Root layout wiring fonts + theme init/toggle; keep everything and add light base + bg/text tokens

import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import AudioPlayer from "@/components/AudioPlayer";
import ThemeInitScript from "@/components/ThemeInitScript";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Juan Francisco Marcenaro A. | Full-Stack Developer Portfolio",
  description:
    "Explore the portfolio of Juan Francisco Marcenaro A., showcasing projects in React, Angular, Node.js, Next.js, and more. Full-stack developer blending web technology and audio engineering.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Set theme before hydration to avoid flash */}
        <ThemeInitScript />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} antialiased text-base leading-relaxed text-gray-900 dark:text-gray-100 bg-[var(--background)] text-[var(--foreground)]`}
      >
        {/* SVG noise filter (kept) */}
        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            overflow: "hidden",
          }}
          aria-hidden="true"
        >
          <defs>
            <filter id="noiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
          </defs>
        </svg>

        {/* Global theme toggle (mobile-friendly, fixed) */}
        <ThemeToggle />

        {children}
        <AudioPlayer />
      </body>
    </html>
  );
}
