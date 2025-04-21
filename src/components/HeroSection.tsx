// src/components/HeroSection.tsx
"use client";

import React, { useState, useRef, useEffect } from "react"; // Import useRef, useEffect
import Image from "next/image";

// --- Configuration ---
const videoSources = [
  "/videos/background1.mp4",
  "/videos/background2.mp4",
  "/videos/background3.mp4",
  "/videos/background4.mp4",
  "/videos/background5.mp4",
];
const transitionDurationMs = 1000;
const defaultOpacity = 0.4;
const defaultBrightness = 0.8;
// --- End Configuration ---

const HeroSection: React.FC = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  // Create a ref to hold an array of video element refs
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Function to advance to the next video
  const handleVideoEnd = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
  };

  // Effect to play the new current video when index changes
  useEffect(() => {
    const currentVideo = videoRefs.current[currentVideoIndex];
    const previousVideoIndex =
      (currentVideoIndex - 1 + videoSources.length) % videoSources.length;
    const previousVideo = videoRefs.current[previousVideoIndex];

    if (currentVideo) {
      // Attempt to play the current video
      currentVideo.play().catch((error) => {
        // Autoplay was prevented, log error or handle silently
        console.error("Autoplay prevented for video:", currentVideo.src, error);
      });
    }

    // Optionally pause and reset the previous video
    if (previousVideo && previousVideo !== currentVideo) {
      previousVideo.pause();
      previousVideo.currentTime = 0; // Reset time
    }
  }, [currentVideoIndex]); // Dependency array ensures this runs when index changes

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
            // Assign ref to the corresponding index in the array
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={src}
            // autoPlay is only truly effective for the very first video load
            autoPlay={index === 0} // Only attempt autoplay on the initial video
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

      {/* Rest of the component remains the same... */}
      <div className="absolute inset-0 bg-black/40 -z-10"></div>
      <div className="relative z-10 container mx-auto px-4">
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
        <a
          href="#projects"
          className="inline-block bg-sky-600 text-white text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black/50 transform hover:-translate-y-0.5 transition duration-300 ease-in-out"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
