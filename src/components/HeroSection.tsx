// src/components/HeroSection.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedDiv from "@/components/utils/AnimatedDiv";

// --- Configuration ---
const videoSources = [
  "/videos/background7.mp4",
  "/videos/background11.mp4",
  "/videos/background2.mp4",
  "/videos/background4.mp4",
  "/videos/background5.mp4",
  "/videos/background12.mp4",
  "/videos/background1.mp4",
  "/videos/background8.mp4",
  "/videos/background9.mp4",
  "/videos/background10.mp4",
  "/videos/background13.mp4",
];
const transitionDurationMs = 600;
const defaultOpacity = 0.7; // Slightly increased opacity
const defaultBrightness = 0.85; // Slightly reduced brightness for more contrast
// --- End Configuration ---

// Scroll Indicator Component
const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.5 }}
    className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
  >
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center"
    >
      <span className="text-gray-300 text-sm font-light mb-2 tracking-wider">
        SCROLL
      </span>
      <svg
        className="w-6 h-6 text-sky-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </motion.div>
  </motion.div>
);

const HeroSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); // for initial fade‑in

  // set after first paint to trigger fade‑in
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  // Video switching logic
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    const previousVideoIndex =
      (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
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
      // reset frame AFTER fade‑out to avoid flash
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
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative overflow-hidden py-0 text-center min-h-screen flex items-center justify-center"
    >
      {/* Video Container */}
      <div className="absolute inset-0 w-full h-full -z-20 bg-black">
        {videoSources.map((src, index) => (
          <video
            key={src}
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={src}
            autoPlay={index === 0}
            loop={false}
            muted
            playsInline
            onEnded={handleVideoEnd}
            preload="auto"
            style={{
              position: "absolute",
              inset: "0",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity:
                index === currentVideoIndex
                  ? hasMounted
                    ? defaultOpacity
                    : 0 // fade‑in on first load
                  : 0,
              filter: `brightness(${defaultBrightness})`,
              transition: `opacity ${transitionDurationMs}ms ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Noise Overlay with reduced intensity */}
      <div className="noise-overlay opacity-30"></div>

      {/* Gradient overlay instead of simple dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70 -z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <AnimatedDiv delay={0.1} className="mb-10">
          <div className="relative mx-auto w-44 h-44 md:w-52 md:h-52">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-blue-400 to-sky-300 blur-md opacity-60 animate-pulse"></div>

            {/* Profile border */}
            <div className="absolute inset-0 rounded-full border-2 border-sky-400/30 p-1"></div>

            {/* Profile image container */}
            <div className="relative w-full h-full p-2 rounded-full overflow-hidden backdrop-blur-sm bg-white/10">
              <Image
                src="/images/jf-profile-picture3.jpg"
                alt="Juan Francisco Marcenaro A."
                width={208}
                height={208}
                className="rounded-full object-cover w-full h-full shadow-lg"
                quality={95}
                priority={true}
              />
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <h1 className="hero-name font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-200 tracking-tight">
            Juan Francisco Marcenaro A.
          </h1>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-7">
            <p className="font-sans text-xl md:text-2xl text-sky-300 font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">
              Full-Stack Web & Mobile Developer
            </p>
            <span className="hidden sm:block text-gray-400">|</span>
            <p className="font-sans text-xl md:text-2xl text-sky-300 font-medium [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">
              Sound Engineer
            </p>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <p className="font-serif text-base md:text-lg text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
            Passionate about building impactful digital solutions and creating
            immersive audio experiences. Bridging technology and creativity.
          </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <div className="flex justify-center gap-4">
            <a
              href="#projects"
              className="font-sans inline-flex items-center gap-2 bg-gradient-to-br from-sky-500 to-blue-600 text-white text-lg font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>View My Work</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#contact"
              className="font-sans inline-flex items-center gap-2 bg-transparent text-white/90 border border-sky-400/30 backdrop-blur-sm text-lg font-medium py-3 px-6 rounded-lg shadow-md hover:bg-sky-900/20 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Contact Me</span>
            </a>
          </div>
        </AnimatedDiv>

        {/* Social icons */}
        <AnimatedDiv delay={0.6} className="mt-12">
          <div className="flex justify-center space-x-6">
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/jfmarcenaroa/"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="#"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            {/* Twitter/X */}
            <a
              href="#"
              className="text-gray-400 hover:text-sky-400 transition-colors duration-300"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
          </div>
        </AnimatedDiv>
      </div>

      <AnimatePresence>
        {showScrollIndicator && <ScrollIndicator />}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
