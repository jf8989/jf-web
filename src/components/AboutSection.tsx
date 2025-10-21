/* eslint-disable @typescript-eslint/no-unused-vars */
// src/components/AboutSection.tsx
"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaMusic,
  FaBolt,
  FaCode,
  FaDatabase,
  FaMobile,
  FaPalette,
} from "react-icons/fa";

const AboutSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const sectionStyle = {
    backgroundImage: `url('/images/about-background.png')`,
  };

  const factItems = [
    {
      icon: <FaBolt />,
      label: "Projects shipped",
      value: "30+",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: <FaReact />,
      label: "Frontend focus",
      value: "React / Next.js",
      gradient: "from-sky-500 to-blue-600",
    },
    {
      icon: <FaNodeJs />,
      label: "Backend stack",
      value: "Node + Firebase",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: <FaMusic />,
      label: "Audio cred",
      value: "Mix & Mastering",
      gradient: "from-purple-500 to-pink-600",
    },
  ];

  const skills = [
    { icon: <FaCode />, text: "Accessible, responsive UI by default" },
    { icon: <FaDatabase />, text: "TypeScript-first, predictable state" },
    { icon: <FaMobile />, text: "Edge-friendly where it helps performance" },
    { icon: <FaPalette />, text: "Animations tuned for reduced-motion users" },
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
      id="about"
      className="relative bg-cover bg-center bg-no-repeat overflow-hidden pt-28 md:pt-32 pb-20"
      style={sectionStyle}
    >
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-gray-50/90 dark:from-gray-900/95 dark:via-gray-900/85 dark:to-gray-950/90 backdrop-blur-[3px] z-0" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-sky-400/10 dark:bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(148 163 184 / 0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white tracking-tight">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Story Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative group">
              {/* Gradient border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-300" />

              <div className="relative rounded-2xl bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-xl p-6 md:p-8">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500/10 to-transparent rounded-bl-full" />

                <div className="relative">
                  <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-5">
                    I build fast, expressive web apps and I care about the
                    little things: motion that earns its keep, readable type,
                    and clean data paths. My lane is{" "}
                    <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 dark:from-sky-400 dark:to-blue-400">
                      React/Next.js
                    </span>
                    — with enough backend to ship end-to-end.
                  </p>

                  <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-6">
                    Parallel to code, I&apos;m an audio engineer. That
                    sensibility shows up in my work: dynamic but balanced,
                    opinionated without being loud. I like products that feel
                    alive without asking for attention.
                  </p>

                  {/* Skills List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      Core Principles
                    </h3>
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="mt-1 p-2 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 group-hover/item:scale-110 transition-transform">
                          {skill.icon}
                        </div>
                        <span className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                          {skill.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              {factItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="group relative"
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-xl opacity-0 group-hover:opacity-75 blur transition duration-300`}
                  />

                  <div className="relative h-full rounded-xl bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-lg p-5 transition-all">
                    {/* Icon with gradient background */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${item.gradient} text-white text-xl mb-3 shadow-lg`}
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {item.icon}
                    </motion.div>

                    <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
                      {item.label}
                    </div>
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {item.value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-50 group-hover:opacity-75 blur transition duration-300" />

              <div className="relative rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/60 shadow-lg p-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                    <FaMusic className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                      Audio Engineering
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Professional mixing & mastering engineer with years of
                      experience working with music producers
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                    * Click the speaker icon to hear my audio work.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            ></motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
