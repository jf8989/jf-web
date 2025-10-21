/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/ContactSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const ContactSection: React.FC = () => {
  const items = [
    {
      label: "Email Me",
      href: "mailto:juanfrajf.contacto@gmail.com",
      icon: <FaEnvelope />,
      gradient: "from-gray-600 to-gray-700",
      hoverGradient: "hover:from-gray-700 hover:to-gray-800",
      className: "text-white",
      description: "Direct line",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jfmarcenaroa/",
      icon: <FaLinkedin />,
      gradient: "from-sky-500 to-blue-600",
      hoverGradient: "hover:from-sky-600 hover:to-blue-700",
      className: "text-white",
      description: "Connect professionally",
    },
    {
      label: "GitHub",
      href: "https://github.com/jf8989",
      icon: <FaGithub />,
      gradient: "from-gray-700 to-gray-900",
      hoverGradient: "hover:from-gray-800 hover:to-black",
      className: "text-white dark:from-gray-600 dark:to-gray-800",
      description: "Check my code",
    },
  ];

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="relative pt-28 md:pt-32 pb-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-sky-400/5 dark:bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(148 163 184 / 0.15) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white tracking-tight">
            Let&apos;s Connect
          </h2>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Questions, collaboration ideas, or interesting problems—I&apos;m
            open to them.
          </p>
        </motion.div>

        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-800/30 px-5 py-2.5 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
            </span>
            <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
              Available for freelance & full-time opportunities
            </span>
          </div>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="group relative"
            >
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  item.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="block"
              >
                {/* Glow effect on hover */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300`}
                />

                {/* Card */}
                <div
                  className={`relative h-full bg-gradient-to-br ${item.gradient} ${item.hoverGradient} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  {/* Icon */}
                  <motion.div
                    className="mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm text-white text-3xl shadow-lg">
                      {item.icon}
                    </div>
                  </motion.div>

                  {/* Label */}
                  <h3 className={`text-xl font-bold mb-1 ${item.className}`}>
                    {item.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-white/80 font-medium">
                    {item.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="absolute top-6 right-6 text-white/60 group-hover:text-white/90 transition-colors">
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-sm text-gray-500 dark:text-gray-500"
        >
          <p>Response time: Usually within 24 hours</p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
