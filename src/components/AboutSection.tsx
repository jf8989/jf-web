// src/components/AboutSection.tsx
import React from "react";

const AboutSection: React.FC = () => {
  return (
    // Added id="about" for navigation linking
    <section id="about" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          About Me
        </h2>
        <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <p className="mb-4">
            As a passionate web developer and sound engineer from Lima, I have
            embarked on a journey to create impactful digital solutions and
            mesmerizing audio experiences.
          </p>
          <p className="mb-4">
            With a keen interest in the latest web technologies and audio
            production tools, I strive to build experiences that resonate with
            users worldwide. Graduated from Full Sail in 2013, my journey has
            been filled with continuous learning and professional growth.
          </p>
          <h3 className="text-2xl font-semibold mt-8 mb-4 text-center text-gray-900 dark:text-white">
            Skills
          </h3>
          {/* Placeholder for Skills - Improve visualization later */}
          <div className="text-center">
            <p>
              Web & Mobile: React, Angular, Node.js, Next.js, TypeScript,
              JavaScript, HTML, CSS, Tailwind, React Native, APIs
            </p>
            <p>Audio: Music Mixing, Mastering, Pro Tools, Studio One</p>
            <p>Tools & Concepts: Git, MongoDB, Firebase, PWA, TDD, Agile</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
