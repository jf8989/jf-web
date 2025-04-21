// src/components/ProjectCard.tsx
import React from "react";
import Image from "next/image"; // Import the Image component from Next.js
import { ProjectType } from "@/data/projects"; // Import the interface

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-300 hover:scale-105">
      <Image
        src={project.imageUrl}
        alt={`${project.title} screenshot`}
        width={800} // Replace with the actual width of the image
        height={400} // Replace with the actual height of the image
        className="w-full h-48 object-cover" // Basic styling
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          {project.description}
        </p>

        {/* Tech Stack Badges */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map(
            (
              tech // Show first 4 techs
            ) => (
              <span
                key={tech}
                className="bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {tech}
              </span>
            )
          )}
          {project.techStack.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex justify-start space-x-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
          >
            GitHub Repo
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              Live Demo
            </a>
          )}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              Video Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
