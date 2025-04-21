// src/components/ProjectsSection.tsx
import React from "react";
import { projectsData } from "@/data/projects"; // Import project data
import ProjectCard from "./ProjectCard"; // Import the card component

const ProjectsSection: React.FC = () => {
  return (
    // Added id="projects" for navigation linking
    <section id="projects" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          My Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
