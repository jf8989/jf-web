// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-base text-gray-900 dark:text-gray-100 leading-relaxed`}
      >
        {children}
        <AudioPlayer /> {/* <-- Add AudioPlayer here */}
      </body>
    </html>
  );
}
