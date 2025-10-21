// src/components/ProjectCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ProjectType } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectType;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8 }}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800/90 backdrop-blur-sm shadow-lg hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 flex flex-col h-full"
    >
      {/* Gradient glow on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-300" />

      {/* Card content */}
      <div className="relative h-full flex flex-col">
        {/* Image container with enhanced overlay */}
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

          {/* Top badges row */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            {/* Featured badge */}
            {project.featured && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm flex items-center gap-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Featured
              </motion.div>
            )}

            {/* Primary tech badge */}
            {project.techStack.length > 0 && (
              <div className="ml-auto bg-sky-500/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                {project.techStack[0]}
              </div>
            )}
          </div>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {project.year && (
              <div className="inline-flex items-center gap-1.5 bg-black/80 text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {project.year}
              </div>
            )}
          </div>
        </div>

        {/* Content Area with gradient top border */}
        <div className="relative flex-grow flex flex-col p-6 md:p-7">
          {/* Gradient accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-sky-600 group-hover:to-blue-600 dark:group-hover:from-sky-400 dark:group-hover:to-blue-400 transition-all duration-300">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-300 mb-5 leading-relaxed line-clamp-3 flex-grow text-sm md:text-base">
            {project.description}
          </p>

          {/* Tech Stack with improved styling */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 5).map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="inline-flex items-center bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 text-sky-700 dark:text-sky-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sky-200/50 dark:border-sky-800/50 hover:border-sky-400 dark:hover:border-sky-600 transition-colors"
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 5 && (
                <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium px-2 py-1.5">
                  +{project.techStack.length - 5} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons with enhanced styling */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            {/* GitHub Button */}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-w-[120px] group/btn relative overflow-hidden text-center text-sm font-semibold px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-600"
              aria-label={`View ${project.title} on GitHub`}
            >
              <svg
                className="w-4 h-4 relative z-10"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="relative z-10">Code</span>
            </motion.a>

            {/* Live Demo Button */}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 min-w-[120px] group/btn relative overflow-hidden text-center text-sm font-semibold px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/30"
                aria-label={`View live demo of ${project.title}`}
              >
                <svg
                  className="w-4 h-4 relative z-10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 4h-13v18h20v-11h1v12h-22v-20h14v1zm10 5h-1v-6.293l-11.646 11.647-.708-.708 11.647-11.646h-6.293v-1h8v8z" />
                </svg>
                <span className="relative z-10">Live Demo</span>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </motion.a>
            )}

            {/* Video Button */}
            {project.videoUrl && (
              <motion.a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 min-w-[120px] text-center text-sm font-semibold px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
                aria-label={`Watch video demo of ${project.title}`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z" />
                </svg>
                Video
              </motion.a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
