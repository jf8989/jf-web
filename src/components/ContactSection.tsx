// src/components/ContactSection.tsx
"use client";

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

const ContactSection: React.FC = () => {
  const items = [
    {
      label: "Email Me",
      href: "mailto:juanfrajf.contacto@gmail.com",
      icon: <FaEnvelope />,
      className:
        "bg-gray-700 text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jfmarcenaroa/",
      icon: <FaLinkedin />,
      className: "bg-sky-600 text-white hover:bg-sky-700",
    },
    {
      label: "GitHub",
      href: "https://github.com/jf8989",
      icon: <FaGithub />,
      className:
        "bg-white text-gray-900 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700",
    },
  ];

  return (
    <section
      id="contact"
      className="pt-28 md:pt-32 pb-20 bg-gray-50 dark:bg-gray-800/60"
    >
      <div className="container mx-auto px-4 text-center">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white tracking-tight">
            Let&apos;s Connect
          </h2>
        </AnimatedDiv>

        <AnimatedDiv delay={0.05}>
          <p className="font-body text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Questions, collaboration ideas, or interesting problems — I’m open
            to them. Pick what’s easiest:
          </p>
        </AnimatedDiv>

        {/* availability pill */}
        <AnimatedDiv delay={0.1}>
          <div className="mb-10 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 px-3 py-1 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Currently available for freelance & full-time
            </span>
          </div>
        </AnimatedDiv>

        {/* CTA buttons */}
        <AnimatedDiv delay={0.15}>
          <div className="flex flex-col sm:flex-row justify-center items-stretch gap-3 sm:gap-4 max-w-2xl mx-auto">
            {items.map((it) => (
              <motion.a
                key={it.label}
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  it.href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold transition-colors ${it.className}`}
              >
                <span className="text-lg">{it.icon}</span>
                <span>{it.label}</span>
              </motion.a>
            ))}
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default ContactSection;
