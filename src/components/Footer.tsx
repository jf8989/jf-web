/// Path: src/components/Footer.tsx
/// Role: On /blog, animate immediately (no whileInView) so footer UI always renders; elsewhere unchanged.

"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const isBlog = pathname === "/blog";

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/jfmarcenaroa/",
      icon: <FaLinkedin className="w-6 h-6" />,
      color: "hover:text-sky-400 hover:scale-110",
      ariaLabel: "LinkedIn Profile",
    },
    {
      name: "GitHub",
      url: "https://github.com/jf8989",
      icon: <FaGithub className="w-6 h-6" />,
      color: "hover:text-gray-300 hover:scale-110",
      ariaLabel: "GitHub Profile",
    },
    {
      name: "Email",
      url: "mailto:juanfrajf.contacto@gmail.com",
      icon: <FaEnvelope className="w-6 h-6" />,
      color: "hover:text-blue-400 hover:scale-110",
      ariaLabel: "Send Email",
    },
  ];

  // Helpers to conditionally apply reveal behavior
  const sectionReveal = (delay = 0) =>
    isBlog
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6, delay },
        };

  const scaleReveal = (delay = 0) =>
    isBlog
      ? {
          initial: { opacity: 0, scale: 0.5 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.4, delay },
        }
      : {
          initial: { opacity: 0, scale: 0.5 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.4, delay },
        };

  const growLine = () =>
    isBlog
      ? {
          initial: { scaleX: 0 },
          animate: { scaleX: 1 },
          transition: { duration: 0.8, delay: 0.3 },
        }
      : {
          initial: { scaleX: 0 },
          whileInView: { scaleX: 1 },
          viewport: { once: true },
          transition: { duration: 0.8, delay: 0.3 },
        };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black dark:from-gray-950 dark:via-black dark:to-black border-t border-gray-800/50 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(100 116 139 / 0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Social Links Section */}
        <motion.div {...sectionReveal(0)} className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-6 tracking-wider uppercase font-semibold">
            Connect With Me
          </p>

          <div className="flex justify-center items-center gap-6">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target={link.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.url.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={link.ariaLabel}
                {...scaleReveal(index * 0.1)}
                whileHover={{ y: -4 }}
                className={`group relative p-3 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-gray-400 transition-all duration-300 ${link.color}`}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-sky-500/0 to-blue-500/0 group-hover:from-sky-500/10 group-hover:to-blue-500/10 transition-all duration-300" />
                <div className="relative">{link.icon}</div>
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          {...growLine()}
          className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"
        />

        {/* Bottom Section */}
        <motion.div {...sectionReveal(0.5)} className="text-center space-y-3">
          <p className="text-sm text-gray-500">
            © {currentYear}{" "}
            <span className="text-gray-400 font-semibold">
              Juan Francisco Marcenaro A.
            </span>{" "}
            All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
          <motion.p
            {...(isBlog
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { delay: 0.8 },
                }
              : {
                  initial: { opacity: 0 },
                  whileInView: { opacity: 1 },
                  viewport: { once: true },
                  transition: { delay: 0.8 },
                })}
            className="text-xs text-gray-600 italic"
          >
            Crafting digital experiences with precision and care
          </motion.p>
        </motion.div>

        {/* Back to top */}
        <motion.div
          {...(isBlog
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { delay: 0.9 },
              }
            : {
                initial: { opacity: 0 },
                whileInView: { opacity: 1 },
                viewport: { once: true },
                transition: { delay: 0.9 },
              })}
          className="mt-8 text-center"
        >
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 text-gray-400 hover:text-gray-200 text-sm transition-all duration-300"
            aria-label="Back to top"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
            Back to Top
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
