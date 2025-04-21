// src/components/HeroSection.tsx
"use client"; // Keep for potential future client needs, though not strictly required now

import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  // Default values - Adjust these directly in the style attribute below as needed
  const defaultOpacity = 0.4;
  const defaultBrightness = 0.8;

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-28 pb-20 md:pt-32 md:pb-24 text-center h-screen flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        // === CHECK THIS PATH CAREFULLY ===
        src="/videos/background.mp4"
        // === Autoplay attributes ===
        autoPlay // Tells the browser to attempt playing automatically
        loop // Loop the video
        muted // ESSENTIAL for autoplay in most browsers
        playsInline // Helps with playback on iOS devices
        // === Hardcoded styles for development tuning ===
        style={{
          opacity: defaultOpacity, // Adjust value here (e.g., 0.3, 0.5)
          filter: `brightness(${defaultBrightness})`, // Adjust value here (e.g., 0.7, 1.0)
        }}
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />

      {/* Semi-Transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        {/* Image */}
        <div className="mb-8">
          <Image
            src="/images/jf-profile-picture.jpg"
            alt="Juan Francisco Marcenaro A."
            width={192}
            height={192}
            className="rounded-full mx-auto border-4 border-sky-400 shadow-lg"
            quality={95}
            priority={true}
          />
        </div>

        {/* Text Content */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-white tracking-tight [text-shadow:_0_1px_3px_rgb(0_0_0_/_40%)]">
          Juan Francisco Marcenaro A.
        </h1>
        <p className="text-xl md:text-2xl text-sky-300 font-medium mb-6 [text-shadow:_0_1px_2px_rgb(0_0_0_/_30%)]">
          Full-Stack Developer | Sound Engineer
        </p>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
          Passionate about building impactful digital solutions and creating
          immersive audio experiences. Bridging technology and creativity.
        </p>

        {/* Button */}
        <a
          href="#projects"
          className="inline-block bg-sky-600 text-white text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:-translate-y-0.5 transition duration-300 ease-in-out"
        >
          View My Work
        </a>
      </div>

      {/* Controls removed */}
    </section>
  );
};

export default HeroSection;
