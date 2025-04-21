// src/components/HeroSection.tsx
import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      // Increased vertical padding, subtle gradient background
      className="pt-28 pb-20 md:pt-32 md:pb-24 text-center bg-gradient-to-b from-gray-50 via-gray-100 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800"
    >
      {/* Container remains centered */}
      <div className="container mx-auto px-4">
        {/* Added margin below image */}
        <div className="mb-8">
          <Image
            src="/images/jf-profile-picture.jpg" // Ensure this path is correct
            alt="Juan Francisco Marcenaro A."
            width={192}
            height={192}
            className="rounded-full mx-auto border-4 border-sky-500 shadow-lg"
            quality={95}
            priority={true}
          />
        </div>

        {/* Refined Heading styles */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">
          Juan Francisco Marcenaro A.
        </h1>

        {/* Refined Subtitle styles */}
        <p className="text-xl md:text-2xl text-sky-700 dark:text-sky-400 font-medium mb-6">
          {" "}
          {/* Slightly adjusted color/weight */}
          Full-Stack Developer | Sound Engineer
        </p>

        {/* Refined Description styles */}
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {" "}
          {/* Adjusted color, line-height */}
          Passionate about building impactful digital solutions and creating
          immersive audio experiences. Bridging technology and creativity.
        </p>

        {/* Refined Button styles */}
        <a
          href="#projects"
          className="inline-block bg-sky-600 text-white text-lg font-semibold py-3 px-10 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out" // Adjusted padding, size, added focus, transform
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
