// src/components/Header.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image"; // <-- Import next/image

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand - Now using next/image */}
        <div className="text-xl font-bold">
          <a
            href="#home"
            onClick={handleMobileLinkClick}
            aria-label="Homepage Logo"
          >
            {" "}
            {/* Added aria-label */}
            {/* Replace src, width, height with your actual logo details */}
            <Image
              src="/images/logo1.png" // <-- **UPDATE THIS PATH**
              alt="Juan Francisco Marcenaro A. Logo" // <-- Update alt text if needed
              width={60} // <-- **UPDATE WIDTH** (e.g., 40 or your logo's width)
              height={60} // <-- **UPDATE HEIGHT** (e.g., 40 or your logo's height)
              className="h-auto" // Maintain aspect ratio if needed, adjust classes
              priority // Add priority if logo is critical for LCP
            />
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="hover:text-sky-300 transition-colors duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button aria-label="Toggle menu" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - Conditionally Rendered */}
      <div
        className={`absolute top-full left-0 w-full bg-gray-800 md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col items-center py-4">
          {navItems.map((item) => (
            <li key={item.name} className="w-full text-center">
              <a
                href={item.href}
                className="block py-2 hover:bg-gray-700 w-full transition-colors duration-300"
                onClick={handleMobileLinkClick}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
