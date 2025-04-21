// src/components/ProjectCard.tsx
import React from "react";
import Image from "next/image";
import { ProjectType } from "@/data/projects";

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    // Enhanced container styling with smoother transition and slightly increased shadow on hover
    <div className="group rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
      {/* Image container */}
      <div className="relative w-full h-48 overflow-hidden">
        {" "}
        {/* Ensure image is contained */}
        <Image
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          fill // Use fill to cover the container
          style={{ objectFit: "cover" }} // Ensure image covers the area
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Help browser optimize image loading
          className="transition-transform duration-500 ease-in-out group-hover:scale-105" // Subtle zoom on hover
        />
      </div>

      {/* Content Area - Increased padding */}
      <div className="p-5 md:p-6">
        {/* Refined Title */}
        <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">
          {project.title}
        </h3>
        {/* Refined Description with line clamping */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-3">
          {" "}
          {/* Limits to 3 lines */}
          {project.description}
        </p>

        {/* Refined Tech Stack Badges */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="inline-block bg-sky-100 dark:bg-sky-900/50 text-sky-800 dark:text-sky-300 text-xs font-medium px-3 py-1 rounded-full" // Pill shape, adjusted padding/colors
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

        {/* Refined Links - Added slight visual separation */}
        <div className="flex justify-start space-x-4 pt-3 border-t border-gray-100 dark:border-gray-700/60">
          {/* GitHub Link */}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
            aria-label={`View ${project.title} on GitHub`}
          >
            {/* Optional: Add GitHub Icon here later if desired */}
            GitHub Repo
          </a>

          {/* Live Demo Link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
              aria-label={`View live demo of ${project.title}`}
            >
              {/* Optional: Add External Link Icon here later */}
              Live Demo
            </a>
          )}

          {/* Video Demo Link */}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
              aria-label={`Watch video demo of ${project.title}`}
            >
              {/* Optional: Add Play Icon here later */}
              Video Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
