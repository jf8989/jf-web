import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google"; // Added Playfair
import AudioPlayer from "@/components/AudioPlayer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Add Playfair Display for headings and name
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased text-base text-gray-900 dark:text-gray-100 leading-relaxed`}
      >
        {/* === ADDED SVG Noise Filter Definition === */}
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
                baseFrequency="0.85" /* Adjust frequency for noise grain size */
                numOctaves="3" /* Complexity */
                stitchTiles="stitch"
              />
            </filter>
          </defs>
        </svg>
        {/* === END SVG Noise Filter Definition === */}
        {children}
        <AudioPlayer /> {/* <-- AudioPlayer remains */}
      </body>
    </html>
  );
}
