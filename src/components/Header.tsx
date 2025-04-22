// src/components/Header.tsx
"use client";

import React, { useState, useEffect, useRef } from "react"; // Added useRef
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // State to store the target href temporarily for scrolling after animation
  const [targetHref, setTargetHref] = useState<string | null>(null);
  // Ref to the header element to get its height accurately
  const headerRef = useRef<HTMLElement>(null);

  const navItems = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "Projects", href: "#projects", icon: "🔧" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Workflow", href: "#workflow", icon: "📋" },
  ];

  // Handle scroll event to change header appearance & manage body scroll for mobile menu
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Add/Remove overflow style management for mobile menu based on state
    // This useEffect now ONLY handles the overflow based on menu state
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      // Reset overflow ONLY when menu state changes to closed
      // We will handle the immediate reset during scroll separately if needed
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      // Ensure overflow is reset on unmount/cleanup regardless of state
      document.body.style.overflow = "";
    };
  }, [scrolled, isMobileMenuOpen]); // Dependency remains the same

  const toggleMobileMenu = () => {
    // If closing the menu manually, clear any pending scroll target
    if (isMobileMenuOpen) {
      setTargetHref(null);
    }
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // --- REFINED FUNCTION V5 (Store Target, Scroll on Exit) ---
  const handleMobileLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default jump always
    console.log("Mobile link clicked (v5)");

    const href = e.currentTarget.getAttribute("href");
    if (!href || !href.startsWith("#")) {
      console.error("Invalid href (v5):", href);
      setTargetHref(null); // Clear target
      setIsMobileMenuOpen(false); // Close menu immediately on error
      return;
    }

    console.log("Storing targetHref (v5):", href);
    // 1. Store the target href
    setTargetHref(href);
    // 2. Trigger the menu close (this starts the exit animation)
    setIsMobileMenuOpen(false);
    // *** SCROLLING LOGIC MOVED TO handleExitComplete ***
  };
  // --- END REFINED FUNCTION V5 ---

  // --- Function to handle scroll AFTER menu exit animation ---
  const handleExitComplete = () => {
    console.log("handleExitComplete triggered. TargetHref:", targetHref); // DEBUG
    if (targetHref) {
      const targetId = targetHref.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        console.log("Target element found on exit (v5):", targetElement);

        // Use ref for header height if available, otherwise estimate
        const headerHeight = headerRef.current
          ? headerRef.current.offsetHeight
          : 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerHeight - 10; // Buffer

        console.log(
          `Scrolling instantly on exit (v5): ${offsetPosition} (Header height: ${headerHeight})`
        );

        // Ensure body overflow is reset BEFORE scrolling (belt-and-suspenders)
        document.body.style.overflow = "";

        window.scrollTo({
          top: offsetPosition,
          // behavior: 'smooth' // Keep instant for reliability
        });
      } else {
        console.error("Target element NOT found on exit (v5):", targetId);
      }
      // IMPORTANT: Clear the target href after attempting scroll
      setTargetHref(null);
    } else {
      console.log("No targetHref to scroll to on exit.");
    }
  };

  // Variants remain the same...
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
    // Add ref to the header element
    <motion.header
      ref={headerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-2"
          : "bg-gray-900/80 backdrop-blur-sm py-4"
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
                // Use V5 handler only when mobile menu is open
                if (isMobileMenuOpen) {
                  handleMobileLinkClick(e);
                }
                // Allow default behavior if menu is closed
              }}
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
              </motion.div>
            ))}
            <motion.a
              href="#contact"
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
              onClick={toggleMobileMenu} // Use toggle which now also clears targetHref if closing
              className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
        </nav>
      </div>

      {/* Mobile Menu Panel with AnimatePresence */}
      {/* *** KEY CHANGE: Added onExitComplete prop *** */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
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
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 focus:outline-none focus:text-white focus:bg-gray-700 transition-all duration-300"
                    onClick={handleMobileLinkClick} // Uses V5 handler
                  >
                    <span className="text-blue-400" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </a>
                </motion.li>
              ))}
              <motion.li variants={mobileItemVariants}>
                <a
                  href="#contact"
                  className="block mt-6 mx-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium text-center shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all duration-300"
                  onClick={handleMobileLinkClick} // Uses V5 handler
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
