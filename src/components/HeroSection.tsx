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
const defaultOpacity = 0.6;
const defaultBrightness = 0.9;
// --- End Configuration ---

// Scroll Indicator Component
const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 10 }}
    transition={{ duration: 0.5 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
  >
    <motion.svg
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-6 h-6 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </motion.svg>
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
      className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24 text-center h-screen flex items-center justify-center"
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

      {/* Noise Overlay */}
      <div className="noise-overlay"></div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <AnimatedDiv delay={0.1} className="mb-8">
          <div className="relative mx-auto w-48 h-48 rounded-full">
            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md opacity-70 animate-aura-glow-outer"></div>
            <div className="absolute inset-0 rounded-full bg-blue-300 blur-sm opacity-80 animate-aura-glow-inner"></div>
            <div className="relative w-full h-full p-1 rounded-full overflow-hidden">
              <Image
                src="/images/jf-profile-picture3.jpg"
                alt="Juan Francisco Marcenaro A."
                width={192}
                height={192}
                className="rounded-full object-cover w-full h-full"
                quality={95}
                priority={true}
              />
            </div>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <h1 className="hero-name text-5xl sm:text-6xl md:text-7xl font-bold mb-3 text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
            Juan Francisco Marcenaro A.
          </h1>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <p className="font-body text-xl md:text-2xl text-sky-300 font-medium mb-6 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">
            Full-Stack Web & Mobile Developer | Sound Engineer
          </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.4}>
          <p className="font-body font-serif text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
            Passionate about building impactful digital solutions and creating
            immersive audio experiences. Bridging technology and creativity.
          </p>
        </AnimatedDiv>

        <AnimatedDiv delay={0.5}>
          <a
            href="#projects"
            className="font-body inline-block bg-sky-600 text-white text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:-translate-y-0.5 transition-all duration-300 hover:shadow-[0_0_15px_rgba(2,132,199,0.6)]"
          >
            View My Work
          </a>
        </AnimatedDiv>
      </div>

      <AnimatePresence>
        {showScrollIndicator && <ScrollIndicator />}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
