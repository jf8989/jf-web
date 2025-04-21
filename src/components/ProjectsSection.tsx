// src/components/ProjectsSection.tsx
import React from "react";
import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      {" "}
      {/* Changed background slightly for contrast */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900 dark:text-white tracking-tight">
          {" "}
          {/* Adjusted heading styles */}
          My Work
        </h2>
        {/* Adjusted gap for different screen sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
