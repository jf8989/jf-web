/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/Header.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import motion

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Workflow", href: "#workflow" }, // Added Workflow link
    { name: "Contact", href: "#contact" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    // Wrap header content with motion.div for initial fade-in
    <motion.header
      initial={{ opacity: 0, y: -20 }} // Start hidden and slightly above
      animate={{ opacity: 1, y: 0 }} // Animate to visible and original position
      transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration
      className="bg-gray-900/95 backdrop-blur-sm text-white fixed top-0 left-0 w-full z-50 shadow-lg"
    >
      <nav className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-header-height flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex-shrink-0">
          <a
            href="#home"
            onClick={handleMobileLinkClick}
            aria-label="Homepage Logo"
          >
            <Image
              src="/images/logo1.png" // Your Logo Path
              alt="Juan Francisco Marcenaro A. Logo"
              width={80} // Your Logo Width
              height={80} // Your Logo Height
              className="h-12 w-12" // Display size
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
                className="text-sm font-medium text-gray-300 hover:text-white focus:outline-none focus:text-white transition duration-300 ease-in-out"
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
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                onClick={handleMobileLinkClick}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.header>
  );
};

// --- SVG Icons --- (Assume correct paths)
const PlayIcon = () => <svg>...</svg>;
const PauseIcon = () => <svg>...</svg>;
const SpeakerLoudIcon = () => <svg>...</svg>;
const SpeakerMutedIcon = () => <svg>...</svg>;

export default Header;
