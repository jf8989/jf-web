// src/components/ProjectsSection.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import AnimatedDiv from "@/components/utils/AnimatedDiv";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Extract all unique tech stacks for filter options
const getAllTechStacks = () => {
  const techSet = new Set<string>();
  projectsData.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const techOptions = ["All", ...getAllTechStacks()];

  // Handle filter change
  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(projectsData);
    } else if (filter === "Featured") {
      setFilteredProjects(projectsData.filter((project) => project.featured));
    } else {
      setFilteredProjects(
        projectsData.filter((project) => project.techStack.includes(filter))
      );
    }
  }, [filter]);

  return (
    <section
      id="projects"
      className="py-20 sm:py-24 relative bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230ea5e9' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <AnimatedDiv className="mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white tracking-tight">
            My Work
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            A collection of projects showcasing my skills and experience in web
            development
          </p>
        </AnimatedDiv>

        {/* Filter controls */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            <button
              onClick={() => setFilter("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  filter === "All"
                    ? "bg-sky-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter("Featured")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  filter === "Featured"
                    ? "bg-sky-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                }`}
            >
              Featured
            </button>
            {techOptions.slice(0, 5).map((tech) => {
              if (tech === "All") return null;
              return (
                <button
                  key={tech}
                  onClick={() => setFilter(tech)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                    ${
                      filter === tech
                        ? "bg-sky-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                    }`}
                >
                  {tech}
                </button>
              );
            })}

            {/* More filters dropdown */}
            {techOptions.length > 6 && (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-300"
                >
                  More...
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                    <div className="py-1 max-h-60 overflow-auto">
                      {techOptions.slice(5).map((tech) => {
                        if (tech === "All") return null;
                        return (
                          <button
                            key={tech}
                            onClick={() => {
                              setFilter(tech);
                              setShowDropdown(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-sky-50 dark:hover:bg-sky-900/20"
                          >
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          key={filter} // Re-render animation when filter changes
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects match the selected filter. Try another category.
              </p>
            </div>
          )}
        </motion.div>

        {/* GitHub link */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/jf8989"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-white dark:bg-gray-800 border border-sky-300 dark:border-sky-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 font-medium"
          >
            See more on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
