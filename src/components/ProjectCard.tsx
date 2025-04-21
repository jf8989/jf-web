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

        {/* Links use body font (Geist) */}
        <div className="font-body flex justify-start space-x-4 pt-3 border-t border-gray-100 dark:border-gray-700/60">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            GitHub Repo
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
              aria-label={`View live demo of ${project.title}`}
            >
              Live Demo
            </a>
          )}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
              aria-label={`Watch video demo of ${project.title}`}
            >
              Video Demo
            </a>
          )}
        </div>
      </div>
    </motion.div> // Close motion.div
  );
};

export default ProjectCard;
