// src/components/HeroSection.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import AnimatedDiv from "@/components/utils/AnimatedDiv";

/* ---------- Configuration ---------- */
const videoNames = [
  "background7",
  "background2",
  "background4",
  "background5",
  "background12",
  "background1",
  "background8",
  "background9",
  "background10",
  "background13",
];
const transitionDurationMs = 600;
const defaultOpacity = 0.7;
const defaultBrightness = 0.85;
const particleCount = 12;
/* ---------- End Configuration ---------- */

// Enhanced Scroll Indicator Component
const ScrollIndicator: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute bottom-8 inset-x-0 z-20 pointer-events-none"
    >
      <div className="w-full flex justify-center">
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : { y: [0, 8, 0], opacity: [0.85, 1, 0.85] }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : {
                  duration: 1.6,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
          }
          className="flex flex-col items-center group"
        >
          {/* Scroll text with subtle glow */}
          <motion.span
            className="text-gray-200/80 text-xs font-light mb-3 tracking-[0.2em] uppercase relative"
            initial={{ letterSpacing: "0.2em" }}
            animate={
              prefersReducedMotion
                ? {}
                : { letterSpacing: ["0.2em", "0.25em", "0.2em"] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 3, repeat: Infinity, repeatType: "mirror" }
            }
          >
            <span className="relative z-10">Scroll</span>
            <motion.div
              className="absolute inset-0 text-sky-300/60 blur-sm"
              animate={prefersReducedMotion ? {} : { opacity: [0.3, 0.7, 0.3] }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2, repeat: Infinity, repeatType: "mirror" }
              }
            >
              Scroll
            </motion.div>
          </motion.span>

          {/* Arrow with layered accent */}
          <div className="relative">
            <motion.svg
              className="w-6 h-6 text-sky-300 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              animate={
                prefersReducedMotion ? {} : { strokeWidth: [1.5, 2, 1.5] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2, repeat: Infinity, repeatType: "mirror" }
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
            <motion.svg
              className="w-6 h-6 text-sky-400/40 absolute inset-0 blur-sm"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={
                prefersReducedMotion
                  ? {}
                  : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.08, 1] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { duration: 2, repeat: Infinity, repeatType: "mirror" }
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </div>

          {/* Animated line */}
          <motion.div
            className="w-px bg-gradient-to-b from-sky-400/60 to-transparent mt-2"
            initial={prefersReducedMotion ? { height: 12 } : { height: 0 }}
            animate={prefersReducedMotion ? {} : { height: [0, 24, 0] }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 2,
                    repeat: Infinity,
                    delay: 0.4,
                    ease: "easeInOut",
                  }
            }
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const HeroSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => setHasMounted(true), []);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videoNames.length);
  };

  // Video switching logic
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    const previousVideoIndex =
      (currentVideoIndex - 1 + videoNames.length) % videoNames.length;
    const previousVideo = videoRefs.current[previousVideoIndex];

    if (currentVideo) {
      currentVideo.play().catch((error) => {
        console.debug("Autoplay prevented:", error.message);
      });
      currentVideo.style.opacity = `${defaultOpacity}`;
    }

    if (previousVideo && previousVideo !== currentVideo) {
      previousVideo.pause();
      previousVideo.style.opacity = "0";
      setTimeout(() => {
        if (previousVideo) previousVideo.currentTime = 0;
      }, transitionDurationMs);
    }
  }, [currentVideoIndex]);

  // Scroll indicator logic
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY <= 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden py-0 text-center min-h-screen flex items-center justify-center"
    >
      {/* ——— Background Video Container ——— */}
      <div className="absolute inset-0 w-full h-full -z-20 bg-black">
        {videoNames.map((name, index) => {
          const isActive = index === currentVideoIndex;

          return (
            <video
              key={name}
              ref={(el) => {
                videoRefs.current[index] = el;
              }}
              /* ★ Load strategy: eager for the first clip, lazy for the rest */
              preload={isActive ? "auto" : "none"} // ★
              // loading attribute removed as it is not valid for <video> elements
              autoPlay={index === 0}
              loop={false}
              muted
              playsInline
              poster={`/images/posters/${name}.jpg`} // ★ optional visual polish
              onEnded={handleVideoEnd}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: isActive && hasMounted ? defaultOpacity : 0,
                filter: `brightness(${defaultBrightness}) saturate(1.1) contrast(1.05)`,
                transition: `opacity ${transitionDurationMs}ms ease-in-out, filter 1000ms ease-in-out`,
              }}
            >
              {/* flat layout – single MP4 source */}
              <source src={`/videos/${name}.mp4`} type="video/mp4" />
            </video>
          );
        })}
      </div>

      {/* Enhanced Noise Overlay */}
      <div className="noise-overlay opacity-25 hidden md:block"></div>

      {/* Dynamic gradient overlay with animation */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 0.9, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `
            radial-gradient(ellipse at center top, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at center bottom, rgba(59, 130, 246, 0.1) 0%, transparent 60%),
            linear-gradient(180deg, 
              rgba(0, 0, 0, 0.6) 0%, 
              rgba(0, 0, 0, 0.4) 30%, 
              rgba(0, 0, 0, 0.5) 70%, 
              rgba(0, 0, 0, 0.8) 100%
            )
          `,
        }}
      />

      {/* ——— FLOATING PARTICLES ——— */}
      {hasMounted && ( // ★ hydration-safe
        <div className="absolute inset-0 -z-15 pointer-events-none">
          {[...Array(particleCount)].map((_, i) => {
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const duration = 8 + Math.random() * 4;
            const delay = Math.random() * 5;
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-sky-400/20 rounded-full"
                style={{ left: `${left}%`, top: `${top}%` }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Enhanced Profile Section */}
        <AnimatedDiv delay={0.1} className="mb-12">
          <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56">
            {/* Enhanced Multi-layer Glow Effects */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-60"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.5, 1],
              }}
              style={{
                background:
                  "conic-gradient(from 0deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
              }}
            />

            <motion.div
              className="absolute inset-2 rounded-full opacity-40"
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "conic-gradient(from 180deg, #14b8a6, #06b6d4, #3b82f6, #14b8a6)",
                filter: "blur(8px)",
              }}
            />

            {/* Pulsing inner glow */}
            <motion.div
              className="absolute inset-1 rounded-full bg-gradient-to-r from-cyan-400/30 to-green-500/30"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [0.95, 1.05, 0.95],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ filter: "blur(12px)" }}
            />

            {/* Profile border with enhanced styling */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-sky-300/40 p-1"
              animate={{
                borderColor: [
                  "rgba(125, 211, 252, 0.4)",
                  "rgba(56, 189, 248, 0.6)",
                  "rgba(125, 211, 252, 0.4)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* Profile image container with enhanced backdrop */}
            <motion.div
              className="relative w-full h-full p-3 mt-14 rounded-full overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src="/images/jf-profile-picture3.jpg"
                alt="Juan Francisco Marcenaro A."
                width={224}
                height={224}
                className="rounded-full object-cover w-full h-full shadow-2xl"
                quality={95}
                priority={true}
              />
            </motion.div>
          </div>
        </AnimatedDiv>

        {/* Enhanced Name with advanced text effects */}
        <AnimatedDiv delay={0.2}>
          <motion.h1
            className="hero-name font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-sky-200">
              Juan Francisco Marcenaro A.
            </span>
            {/* Subtle glow effect for the text */}
            <motion.span
              className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-sky-300/40 to-green-300/40 blur-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Juan Francisco Marcenaro A.
            </motion.span>
          </motion.h1>
        </AnimatedDiv>

        {/* Enhanced Role Description */}
        <AnimatedDiv delay={0.3}>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.p
              className="font-body text-xl md:text-2xl text-green-300 font-medium relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                Full-Stack Web & Mobile Developer
              </span>
              <motion.span
                className="absolute inset-0 text-sky-400/30 blur-sm"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Full-Stack Web & Mobile Developer
              </motion.span>
            </motion.p>

            <motion.span
              className="hidden sm:block text-gray-400 text-2xl"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              |
            </motion.span>

            <motion.p
              className="font-body text-xl md:text-2xl text-sky-300 font-medium relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="relative z-10 [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
                Audio Engineer
              </span>
              <motion.span
                className="absolute inset-0 text-sky-400/30 blur-sm"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                Audio Engineer
              </motion.span>
            </motion.p>
          </motion.div>
        </AnimatedDiv>

        {/* Enhanced Description */}
        <AnimatedDiv delay={0.4}>
          <motion.p
            className="font-body text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="[text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
              Passionate about building impactful digital solutions and creating
              immersive audio experiences. Bridging technology and creativity.
            </span>
          </motion.p>
        </AnimatedDiv>

        {/* Enhanced CTA Buttons */}
        <AnimatedDiv delay={0.5}>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.a
              className="font-body inline-flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700 text-white text-lg font-medium py-4 px-10 rounded-xl shadow-2xl hover:shadow-sky-500/40 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 20px 40px rgba(14, 165, 233, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">View My Work</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 relative z-10"
                viewBox="0 0 20 20"
                fill="currentColor"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </motion.a>

            <motion.a
              href="#contact"
              className="font-body inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-500 text-white text-lg font-medium py-4 px-10 rounded-xl shadow-2xl hover:shadow-sky-500/40 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "rgba(12, 74, 110, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {/* Subtle glow on hover */}
              <motion.div
                className="absolute inset-0 bg-sky-400/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10">Contact Me</span>
            </motion.a>
          </motion.div>
        </AnimatedDiv>

        {/* Enhanced Social Icons */}
        <AnimatedDiv delay={0.6} className="mt-16">
          <motion.div
            className="flex justify-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/jfmarcenaroa/"
              className="text-gray-400 hover:text-sky-400 transition-all duration-300 relative group"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">LinkedIn</span>
              <motion.div
                className="absolute -inset-2 bg-sky-400/20 rounded-full opacity-0 blur-md"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <svg
                className="h-7 w-7 relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/jf8989"
              className="text-gray-400 hover:text-sky-400 transition-all duration-300 relative group"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">GitHub</span>
              <motion.div
                className="absolute -inset-2 bg-sky-400/20 rounded-full opacity-0 blur-md"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <svg
                className="h-7 w-7 relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </motion.a>

            {/* Twitter/X */}
            <motion.a
              href="https://x.com/PriestAi_jf"
              className="text-gray-400 hover:text-sky-400 transition-all duration-300 relative group"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Twitter</span>
              <motion.div
                className="absolute -inset-2 bg-sky-400/20 rounded-full opacity-0 blur-md"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <svg
                className="h-7 w-7 relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </motion.a>
          </motion.div>
        </AnimatedDiv>
      </div>

      <AnimatePresence>
        {showScrollIndicator && <ScrollIndicator />}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
