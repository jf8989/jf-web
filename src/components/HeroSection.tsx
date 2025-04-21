// src/components/HeroSection.tsx
import React from "react";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    // Added id="home" for navigation linking
    <section
      id="home"
      className="pt-24 pb-16 text-center bg-gray-100 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <Image
          src="/images/jf-profile-picture.jpg"
          alt="Juan Francisco Marcenaro A."
          width={192} // Adjust width as needed
          height={192} // Adjust height as needed
          className="rounded-full mx-auto border-4 border-sky-500 shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">
          Juan Francisco Marcenaro A.
        </h1>
        <p className="text-xl md:text-2xl text-sky-600 dark:text-sky-400 font-semibold mb-4">
          Full-Stack Developer | Sound Engineer
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-6">
          Passionate about building impactful digital solutions and creating
          immersive audio experiences. Bridging technology and creativity.
        </p>
        {/* Placeholder CTA Button */}
        <a
          href="#projects"
          className="inline-block bg-sky-600 text-white font-bold py-3 px-8 rounded-md shadow-md hover:bg-sky-700 transition duration-300"
        >
          View My Work
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
