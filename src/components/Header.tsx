/// Path: src/components/Header.tsx
/// Role: Header shows theme toggle on all routes (desktop + mobile), outside filtered nav items

"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import RouteLoader from "@/components/RouteLoader";
import ThemeToggle from "@/components/ThemeToggle";

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const isBlog = pathname === "/blog";

  const navItems = [
    { name: "Home", href: "#home", icon: "🏠" },
    { name: "About", href: "#about", icon: "👤" },
    { name: "Projects", href: "#projects", icon: "🔧" },
    { name: "Workflow", href: "#workflow", icon: "📋" },
    { name: "Blog", href: "/blog", icon: "📝" },
  ];
  const visibleNavItems = isBlog
    ? navItems.filter((i) => i.name === "Home")
    : navItems;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const next = window.scrollY > 20;
        setScrolled((prev) => (prev !== next ? next : prev));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!event.target) return;
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) setTargetHref(null);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    const hrefValue = event.currentTarget.getAttribute("href") || "";
    if (hrefValue.startsWith("#")) {
      if (pathname !== "/") {
        setIsNavigating(true); // Blog -> Home
        setTargetHref(null);
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "";
        router.push("/" + hrefValue);
        return;
      }
      setTargetHref(hrefValue);
      setIsMobileMenuOpen(false);
      return;
    }
    if (hrefValue === "/blog" && pathname === "/") setIsNavigating(true);
    setTargetHref(null);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
    router.push(hrefValue);
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
              onClick={(event) => {
                if (pathname !== "/") {
                  event.preventDefault();
                  setIsNavigating(true);
                  router.push("/#home");
                } else if (isMobileMenuOpen) {
                  handleMobileLinkClick(
                    event as unknown as React.MouseEvent<HTMLAnchorElement>
                  );
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
                <span className="text-blue-400">J</span>F
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-1">
            {visibleNavItems.map((item, index) => (
              <motion.div
                key={item.name}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                {item.href.startsWith("/") ? (
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.href === "/blog" && pathname === "/")
                        setIsNavigating(true);
                    }}
                    className="font-geist relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white group"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <motion.span
                      className="absolute inset-0 bg-green-600/20 rounded-lg -z-0 opacity-0 group-hover:opacity-100"
                      initial={{ scale: 0.85 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={(event) => {
                      if (pathname !== "/") {
                        event.preventDefault();
                        setIsNavigating(true);
                        router.push("/" + item.href);
                      }
                    }}
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
                )}
              </motion.div>
            ))}

            {/* Theme toggle is always visible */}
            <div className="ml-2">
              <ThemeToggle variant="inline" />
            </div>

            {/* Hide CTA on blog */}
            {!isBlog && (
              <motion.a
                href="#contact"
                onClick={(event) => {
                  if (pathname !== "/") {
                    event.preventDefault();
                    setIsNavigating(true);
                    router.push("/#contact");
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="font-geist ml-4 px-4 py-2 bg-blue-600 text-white rounded-full font-medium shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all duration-300"
              >
                Hire Me
              </motion.a>
            )}
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle variant="inline" />
            <motion.button
              ref={mobileButtonRef}
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
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence onExitComplete={handleExitComplete}>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            key="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800 overflow-hidden"
          >
            <motion.ul className="px-4 py-2 space-y-1">
              {visibleNavItems.map((item, index) => (
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
              {!isBlog && (
                <motion.li variants={mobileItemVariants}>
                  <a
                    href="#contact"
                    className="font-geist block mt-6 mx-2 px-4 py-3 bg-green-600 text-white rounded-lg font-medium text-center shadow-lg shadow-green-600/20 hover:bg-green-500 transition-all duration-300"
                    onClick={handleMobileLinkClick}
                  >
                    Hire Me
                  </a>
                </motion.li>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>

      <RouteLoader visible={isNavigating} />
    </motion.header>
  );
};

export default Header;
