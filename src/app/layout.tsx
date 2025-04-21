// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "JF Portfolio", // Update title
  description: "Portfolio website for Juan Francisco Marcenaro A.", // Update description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ensure no whitespace before/after suppressHydrationWarning or lang
    <html lang="en" suppressHydrationWarning={true}>
      {/* Ensure no whitespace before/after body tag */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      {/* Ensure no whitespace after closing body tag */}
    </html>
  );
}
