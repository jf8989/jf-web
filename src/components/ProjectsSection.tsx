// src/components/ProjectsSection.tsx
"use client";

import React from "react";
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

const ProjectsSection: React.FC = () => {
  return (
    // Added subtle sky background
    <section
      id="projects"
      className="py-16 sm:py-20 bg-sky-50 dark:bg-gray-900/30"
    >
      <div className="container mx-auto px-4">
        <AnimatedDiv>
          {/* Heading uses global h2 style (Playfair) */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900 dark:text-white tracking-tight">
            My Work
          </h2>
        </AnimatedDiv>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
