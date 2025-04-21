// src/components/Header.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

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
    // Slightly reduced vertical padding for a sleeker look
    <header className="bg-gray-900/95 backdrop-blur-sm text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      {/* Centered container with max-width for content alignment */}
      <nav className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-header-height flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <a
            href="#home"
            onClick={handleMobileLinkClick}
            aria-label="Homepage Logo"
          >
            <Image
              src="/images/logo1.png"
              alt="Juan Francisco Marcenaro A. Logo"
              width={80}
              height={80}
              className="h-12 w-12"
              priority
            />
          </a>
        </div>
        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="text-sm font-medium tracking-wide text-gray-300 hover:text-white focus:outline-none focus:text-white transition duration-300 ease-in-out"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block h-6 w-6"
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
                className="block h-6 w-6"
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

      {/* Mobile Menu Panel */}
      <div
        className={`absolute top-full left-0 w-full bg-gray-900 md:hidden transition-all duration-300 ease-in-out overflow-hidden shadow-lg ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 border-t border-gray-700"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium tracking-wide text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
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
