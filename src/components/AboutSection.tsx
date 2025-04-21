// src/components/AboutSection.tsx
"use client"; // Needs to be client component for animation

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv"; // Import the utility component

const AboutSection: React.FC = () => {
  const skillCategories = [
    {
      title: "Web & Mobile Development",
      skills: [
        "React",
        "Angular",
        "Next.js",
        "Node.js",
        "TypeScript",
        "JavaScript (ES6+)",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "React Native",
        "REST APIs",
        "Firebase",
      ],
    },
    {
      title: "Audio Production",
      skills: [
        "Music Mixing",
        "Mastering",
        "Sound Design",
        "Pro Tools",
        "Studio One",
      ],
    },
    {
      title: "Tools & Concepts",
      skills: [
        "Git",
        "GitHub",
        "MongoDB",
        "Mongoose",
        "PWAs",
        "TDD",
        "Agile Methodologies",
        "Vercel",
      ],
    },
  ];

  return (
    // Kept background white/dark grey for contrast
    <section
      id="about"
      className="py-16 sm:py-20 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AnimatedDiv>
          {/* Heading uses global h2 style (Playfair) */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white tracking-tight">
            About Me
          </h2>
        </AnimatedDiv>

        <AnimatedDiv delay={0.1}>
          {/* Body text uses global body font (Geist) */}
          <div className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-16">
            {" "}
            {/* Ensure text-base or md:text-lg */}
            <p className="mb-4">
              As a passionate web developer and sound engineer from Lima, I have
              embarked on a journey to create impactful digital solutions and
              mesmerizing audio experiences.
            </p>
            <p>
              With a keen interest in the latest web technologies and audio
              production tools, I strive to build experiences that resonate with
              users worldwide. Graduated from Full Sail in 2013, my journey has
              been filled with continuous learning and professional growth.
            </p>
          </div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          {/* Heading uses global h3 style (Playfair) */}
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
            My Skillset
          </h3>
        </AnimatedDiv>

        <AnimatedDiv delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
              >
                {/* Heading uses global h4 style (Playfair) */}
                <h4 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
                  {category.title}
                </h4>
                {/* List uses body font (Geist) */}
                <ul className="space-y-2 text-center sm:text-left">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-gray-600 dark:text-gray-400 text-sm"
                    >
                      {" "}
                      {/* Keep skill text potentially smaller */}
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default AboutSection;
