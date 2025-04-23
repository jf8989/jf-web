// src/components/AboutSection.tsx
"use client";

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv";
import { motion } from "framer-motion";
// --- Icon Imports (Ensure these are correct for your skills) ---
import {
  FaReact,
  FaAngular,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaJsSquare,
  FaServer,
  FaMobileAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiVercel,
  SiMusicbrainz,
  SiProtools,
  SiTon, // Icon for Studio One
  SiFirebase,
} from "react-icons/si";
import {
  LuBrainCircuit, // Placeholder - find specific icons
  LuIterationCw, // Placeholder
  LuTestTubeDiagonal, // Placeholder
} from "react-icons/lu";
import { HiOutlineSpeakerWave } from "react-icons/hi2"; // Placeholder
// --- END Icon Imports ---

const AboutSection: React.FC = () => {
  const skillCategories = [
    {
      title: "Web & Mobile Development",
      skills: [
        { name: "React", icon: <FaReact /> },
        { name: "Angular", icon: <FaAngular /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "Node.js", icon: <FaNodeJs /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "JavaScript (ES6+)", icon: <FaJsSquare /> },
        { name: "HTML5", icon: <FaHtml5 /> },
        { name: "CSS3", icon: <FaCss3Alt /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
        { name: "React Native", icon: <FaMobileAlt /> },
        { name: "REST APIs", icon: <FaServer /> },
        { name: "Firebase", icon: <SiFirebase /> },
      ],
      iconColor: "text-sky-500 dark:text-sky-400",
    },
    {
      title: "Audio Production",
      skills: [
        { name: "Music Mixing", icon: <SiMusicbrainz /> }, // Example
        { name: "Mastering", icon: <HiOutlineSpeakerWave /> }, // Example
        { name: "Sound Design", icon: <HiOutlineSpeakerWave /> }, // Example
        { name: "Pro Tools", icon: <SiProtools /> },
        { name: "Studio One", icon: <SiTon /> }, // Use appropriate icon
      ],
      iconColor: "text-purple-500 dark:text-purple-400",
    },
    {
      title: "Tools & Concepts",
      skills: [
        { name: "Git", icon: <FaGitAlt /> },
        { name: "GitHub", icon: <FaGithub /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Mongoose", icon: <SiMongodb /> }, // Reuse or find specific
        { name: "PWAs", icon: <LuBrainCircuit /> }, // Placeholder
        { name: "TDD", icon: <LuTestTubeDiagonal /> }, // Placeholder
        { name: "Agile Methodologies", icon: <LuIterationCw /> }, // Placeholder
        { name: "Vercel", icon: <SiVercel /> },
      ],
      iconColor: "text-emerald-500 dark:text-emerald-400",
    },
  ];

  // Animation variants
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.3, staggerChildren: 0.15 },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="py-20 sm:py-24 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* --- About Me Section --- */}
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900 dark:text-white tracking-tight">
            About Me
          </h2>
        </AnimatedDiv>
        <AnimatedDiv delay={0.1}>
          {/* Removed container styling, adjusted text size/spacing */}
          <div
            className="
            max-w-3xl mx-auto mb-16             /* Reduced bottom margin */
            text-gray-700 dark:text-gray-400    /* Adjusted dark text color */
            text-lg md:text-xl                 /* Increased base size */
            leading-relaxed md:leading-loose
            text-left
            font-body
          "
          >
            <p className="mb-6">
              {" "}
              {/* Increased paragraph spacing */}
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
        {/* --- End About Me Section --- */}

        {/* --- Skillset Section --- */}
        <AnimatedDiv delay={0.2}>
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-12 text-gray-900 dark:text-white tracking-tight">
            My Skillset
          </h3>
        </AnimatedDiv>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.title}
              className={`
                p-6 rounded-xl shadow-lg border transition-all duration-300 ease-in-out
                bg-white dark:bg-gray-800/60 backdrop-blur-sm
                border-gray-200 dark:border-gray-700/80
                hover:shadow-xl hover:-translate-y-1.5 hover:border-gray-300 dark:hover:border-gray-600
                dark:shadow-gray-900/50
              `}
              variants={cardVariants}
            >
              {/* Card Title */}
              <h4
                className={`text-lg font-semibold mb-6 text-center ${category.iconColor} tracking-wide`}
              >
                {category.title}
              </h4>
              {/* Skills List */}
              <ul className="space-y-4">
                {" "}
                {/* Increased spacing */}
                {category.skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="flex items-center text-gray-700 dark:text-gray-300 text-base font-body group" // Increased text size
                  >
                    <span
                      className={`w-5 h-5 mr-3 ${category.iconColor} opacity-80 group-hover:opacity-100 transition-opacity`}
                    >
                      {/* Use fallback icon if specific one isn't provided */}
                      {skill.icon || <LuBrainCircuit />}
                    </span>
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        {/* --- END Skillset Section --- */}
      </div>
    </section>
  );
};

export default AboutSection;
