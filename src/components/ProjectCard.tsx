// src/components/ProjectCard.tsx
"use client"; // Needs to be client component for motion

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion"; // Import motion and Variants
import { ProjectType } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectType;
}

// Define variants for individual card animation (triggered by parent stagger)
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 }, // Start slightly lower and faded out
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    // Apply motion.div wrapper and variants
    <motion.div
      variants={cardVariants} // Use the defined item variants
      // No need for initial/whileInView here as parent triggers 'visible' state
      className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-shadow duration-300 ease-in-out transform hover:-translate-y-1" // Removed transition-all, rely on motion + shadow transition
    >
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Content Area */}
      <div className="p-5 md:p-6">
        {/* Title uses global h3 style (Playfair) - Apply Tailwind size/margin utilities */}
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
          {project.title}
        </h3>
        {/* Description uses body font (Geist), ensure text-sm */}
        <p className="font-body text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Badges use body font (Geist) */}
        <div className="mb-5 flex flex-wrap gap-2 font-body">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-block bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 self-center ml-1">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Links use body font (Geist) - Modified to look more like buttons */}
        <div className="font-body flex flex-wrap gap-3 pt-3 border-t border-gray-100 dark:border-gray-700/60">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-300 hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300 flex items-center gap-1"
            aria-label={`View ${project.title} on GitHub`}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub Repo
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-300 hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300 flex items-center gap-1"
              aria-label={`View live demo of ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
              </svg>
              Live Demo
            </a>
          )}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-300 hover:border-sky-300 dark:hover:border-sky-700 transition-all duration-300 flex items-center gap-1"
              aria-label={`Watch video demo of ${project.title}`}
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
              </svg>
              Video Demo
            </a>
          )}
        </div>
      </div>
    </motion.div> // Close motion.div
  );
};

export default ProjectCard;
