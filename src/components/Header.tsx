// src/components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react"; // Keep useRef
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  // --- NEW: Refs for click outside detection ---
  const mobileMenuRef = useRef<HTMLDivElement>(null); // Ref for the mobile menu panel
  const mobileButtonRef = useRef<HTMLButtonElement>(null); // Ref for the mobile menu button
  // --- END NEW ---

  const navItems = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Projects", href: "#projects", icon: "🔧" },
    { name: "Workflow", href: "#workflow", icon: "📋" },
  ];

  useEffect(() => {
    // rAF-throttled scroll handler
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        // Avoid extra renders
        setScrolled((prev) => (prev !== next ? next : prev));
        ticking = false;
      });
    };

    // passive listener to avoid blocking scroll
    window.addEventListener("scroll", onScroll, { passive: true });

    // lock body scroll only when the mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Effect for handling clicks outside the mobile menu ---
  useEffect(() => {
    // Only add listener if menu is open
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click target exists
      if (!event.target) return;

      // Check if click is outside the menu panel AND outside the toggle button
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        // If click is outside both, close the menu
        setIsMobileMenuOpen(false);
      }
    };

    // Add event listener for mousedown (fires slightly before click)
    document.addEventListener("mousedown", handleClickOutside);
    // Add touchstart listener for mobile devices
    document.addEventListener("touchstart", handleClickOutside);

    // Cleanup function to remove listener when menu closes or component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]); // Re-run this effect only when isMobileMenuOpen changes
  // --- END NEW ---

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setTargetHref(null);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      console.error("Invalid href (v5):", href);
      setTargetHref(null);
      setIsMobileMenuOpen(false);
      return;
    }
    setTargetHref(href);
    setIsMobileMenuOpen(false);
  };

  const handleExitComplete = () => {
    if (targetHref) {
      const targetId = targetHref.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerHeight = headerRef.current
          ? headerRef.current.offsetHeight
          : 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight - 10;
        document.body.style.overflow = "";
        window.scrollTo({ top: offsetPosition });
      } else {
        console.error("Target element NOT found on exit (v5):", targetId);
      }
      setTargetHref(null);
    }
  };

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
      transition: { delay: custom * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };
  const mobileMenuVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
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
    open: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-gray-900/35 backdrop-blur-md shadow-lg py-2"
          : "bg-gray-900/25 backdrop-blur-sm py-4"
      } ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            <a
              href="#home"
              onClick={(e) => {
                if (isMobileMenuOpen) {
                  handleMobileLinkClick(e);
                }
              }}
              className="flex items-center space-x-2"
              aria-label="Homepage Logo"
            >
              <div className="relative overflow-hidden rounded-full border-2 border-green-400 shadow-lg shadow-green-400/20">
                <Image
                  src="/images/logo1.png"
                  alt="Juan Francisco Marcenaro A. Logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-cover transition-all duration-300 hover:scale-110"
                  priority
                />
              </div>
              <span className="hidden sm:block font-bold font-mono text-white text-lg">
                <span className="text-green-400">J</span>F
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <a
                  href={item.href}
                  className="font-geist relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white group"
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.span
                    className="absolute inset-0 bg-green-600/20 rounded-lg -z-0 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.85 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </a>
              </motion.div>
            ))}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-geist ml-4 px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all duration-300"
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          {/* --- NEW: Assign ref to the button --- */}
          <div className="md:hidden">
            <motion.button
              ref={mobileButtonRef} // Assign ref here
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
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
          {/* --- END NEW --- */}
        </nav>
      </div>

      {/* Mobile Menu Panel with AnimatePresence */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isMobileMenuOpen && (
          // --- NEW: Assign ref to the menu panel ---
          <motion.div
            ref={mobileMenuRef} // Assign ref here
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800 overflow-hidden"
          >
            {/* --- END NEW --- */}
            <motion.ul className="px-4 py-2 space-y-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  custom={index}
                  variants={mobileItemVariants}
                >
                  <a
                    href={item.href}
                    className="font-geist flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 focus:outline-none focus:text-white focus:bg-gray-700 transition-all duration-300"
                    onClick={handleMobileLinkClick}
                  >
                    <span className="text-green-400" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li variants={mobileItemVariants}>
                <a
                  href="#contact"
                  className="font-geist block mt-6 mx-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium text-center shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all duration-300"
                  onClick={handleMobileLinkClick}
                >
                  Hire Me
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
