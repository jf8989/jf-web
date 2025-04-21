// src/components/ContactSection.tsx
"use client"; // Needs to be client component for animation

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv"; // Import the utility component

const ContactSection: React.FC = () => {
  return (
    // Applied alternating background color
    <section
      id="contact"
      className="py-16 sm:py-20 bg-gray-100 dark:bg-gray-800 overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center">
        {/* Animate heading */}
        <AnimatedDiv>
          {/* Heading uses global h2 style (Playfair) */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight">
            Let&apos;s Connect
          </h2>
        </AnimatedDiv>

        {/* Animate paragraph */}
        <AnimatedDiv delay={0.1}>
          {/* Paragraph uses body font (Geist), text-lg */}
          <p className="font-body text-lg mb-10 text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
            Interested in collaborating or have a question? Feel free to reach
            out!
          </p>
        </AnimatedDiv>

        {/* Animate button container */}
        <AnimatedDiv delay={0.2}>
          {/* Buttons use body font (Geist) */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 font-body">
            <a
              href="https://www.linkedin.com/in/jfmarcenaroa/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-sky-600 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out w-full sm:w-auto"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/jf8989?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-gray-700 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out w-full sm:w-auto"
            >
              GitHub
            </a>
            <a
              href="mailto:juanfrajf.contacto@gmail.com"
              className="inline-flex items-center justify-center bg-gray-500 text-white text-base sm:text-lg font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transform hover:-translate-y-0.5 transition duration-300 ease-in-out w-full sm:w-auto"
            >
              Email Me
            </a>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default ContactSection;
