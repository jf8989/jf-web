// src/components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Type for link click events
  // Removed - No longer needed as we use React.MouseEvent<HTMLAnchorElement> directly
  // type LinkClickEvent = React.MouseEvent<HTMLAnchorElement>;

  const navItems = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "Projects", href: "#projects", icon: "🔧" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Workflow", href: "#workflow", icon: "📋" },
  ];

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // --- MODIFIED FUNCTION ---
  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // 1. Prevent the default anchor link behavior
    e.preventDefault();

    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) return; // Basic check

    const targetId = href.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // 2. Manually scroll to the target element
      targetElement.scrollIntoView({
        behavior: "smooth", // Use smooth scrolling
      });
    }

    // 3. Close the mobile menu *after* initiating the scroll
    setIsMobileMenuOpen(false);
  };
  // --- END MODIFICATION ---

  // Variants for animations (kept as is)
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        // Add a small delay before starting exit animation if needed,
        // but usually scrollIntoView is fast enough.
        // when: "afterChildren" // Might help ensure children exit first
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gray-900/80 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo with animation */}
          <motion.div
            className="flex-shrink-0"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            {/* --- MODIFICATION: Applied the same handler to the logo link --- */}
            <a
              href="#home"
              onClick={handleMobileLinkClick} // Use the same handler for consistency
              className="flex items-center space-x-2"
              aria-label="Homepage Logo"
            >
              <div className="relative overflow-hidden rounded-full border-2 border-blue-400 shadow-lg shadow-blue-400/20">
                <Image
                  src="/images/logo1.png"
                  alt="Juan Francisco Marcenaro A. Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover transition-all duration-300 hover:scale-110"
                  priority
                />
              </div>
              <span className="hidden sm:block font-bold text-white text-lg">
                <span className="text-blue-400">J</span>uan
              </span>
            </a>
            {/* --- END MODIFICATION --- */}
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                {/* --- MODIFICATION: Use smooth scroll for desktop too (optional but consistent) --- */}
                {/* You might want a separate handler or just let default work for desktop */}
                {/* Keeping default for desktop for now unless specified */}
                <a
                  href={item.href}
                  // onClick={(e) => { /* Add similar logic if needed for desktop */ }}
                  className="relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span
                    className="absolute inset-0 bg-blue-600/20 rounded-lg -z-0 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.85 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </a>
                {/* --- END MODIFICATION --- */}
              </motion.div>
            ))}
            <motion.a
              href="#contact"
              // onClick={(e) => { /* Add similar logic if needed for desktop */ }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-300"
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Panel with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800 overflow-hidden"
          >
            <motion.ul className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  custom={index}
                  variants={mobileItemVariants}
                >
                  {/* --- MODIFICATION: Using the updated handler --- */}
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 focus:outline-none focus:text-white focus:bg-gray-700 transition-all duration-300"
                    onClick={handleMobileLinkClick} // Use the updated handler
                  >
                    <span className="text-blue-400">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                  {/* --- END MODIFICATION --- */}
                </motion.li>
              ))}
              <motion.li variants={mobileItemVariants}>
                {/* --- MODIFICATION: Using the updated handler --- */}
                <a
                  href="#contact"
                  className="block mt-6 mx-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-center shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-300"
                  onClick={handleMobileLinkClick} // Use the updated handler
                >
                  Hire Me
                </a>
                {/* --- END MODIFICATION --- */}
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
