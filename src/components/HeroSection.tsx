// src/components/HeroSection.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import AnimatedDiv from "@/components/utils/AnimatedDiv"; // Import AnimatedDiv

// --- Configuration --- (Assuming 5 videos now)
const videoSources = [
  "/videos/background1.mp4",
  "/videos/background2.mp4",
  "/videos/background3.mp4",
  "/videos/background4.mp4",
  "/videos/background5.mp4",
  "/videos/background6.mp4",
  "/videos/background7.mp4",
  "/videos/background8.mp4",
  "/videos/background9.mp4",
  "/videos/background10.mp4",
];
const transitionDurationMs = 1000;
const defaultOpacity = 0.5;
const defaultBrightness = 0.8;
// --- End Configuration ---

const HeroSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [pulseState, setPulseState] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    const previousVideoIndex =
      (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    const previousVideo = videoRefs.current[previousVideoIndex];

    if (currentVideo) {
      currentVideo.play().catch((error) => {
        console.debug(
          "Autoplay prevented for video:",
          currentVideo.src,
          error.message
        );
      });
    }

    if (previousVideo && previousVideo !== currentVideo) {
      previousVideo.pause();
      previousVideo.currentTime = 0;
    }
  }, [currentVideoIndex]);

  // Effect for neon pulsing
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setPulseState((prev) => !prev);
    }, 2000); // Change pulse state every 2 seconds

    return () => clearInterval(pulseInterval);
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
              opacity: index === currentVideoIndex ? defaultOpacity : 0,
              filter: `brightness(${defaultBrightness})`,
            }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-${transitionDurationMs} ease-in-out ${
              index === currentVideoIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Animate Image with Neon Effect */}
        <AnimatedDiv delay={0.1} className="mb-8">
          <div
            className={`relative mx-auto w-48 h-48 rounded-full ${
              pulseState ? "animate-pulse" : ""
            }`}
          >
            {/* First glow layer */}
            <div className="absolute inset-0 rounded-full bg-cyan-400 blur-md opacity-70"></div>

            {/* Second glow layer */}
            <div
              className={`absolute inset-0 rounded-full bg-blue-300 blur-sm opacity-80 ${
                pulseState ? "scale-105" : "scale-100"
              } transition-transform duration-1000 ease-in-out`}
            ></div>

            {/* Main image */}
            <div className="relative w-full h-full p-1 rounded-full overflow-hidden">
              <Image
                src="/images/jf-profile-picture.jpg"
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

        {/* Animate Name */}
        <AnimatedDiv delay={0.2}>
          <h1 className="hero-name text-5xl sm:text-6xl md:text-7xl font-bold mb-3 text-white [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
            Juan Francisco Marcenaro A.
          </h1>
        </AnimatedDiv>

        {/* Animate Subtitle */}
        <AnimatedDiv delay={0.3}>
          <p className="font-body text-xl md:text-2xl text-sky-300 font-medium mb-6 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">
            Full-Stack Web & Mobile Developer | Sound Engineer
          </p>
        </AnimatedDiv>

        {/* Animate Description */}
        <AnimatedDiv delay={0.4}>
          <p className="font-body font-serif text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
            Passionate about building impactful digital solutions and creating
            immersive audio experiences. Bridging technology and creativity.
          </p>
        </AnimatedDiv>

        {/* Animate Button */}
        <AnimatedDiv delay={0.5}>
          <a
            href="#projects"
            className="font-body inline-block bg-sky-600 text-white text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:-translate-y-0.5 transition duration-300 ease-in-out"
          >
            View My Work
          </a>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default HeroSection;
