// src/components/ProjectsSection.tsx
"use client"; // Needs to be client component for motion

import React from "react";
import { motion, Variants } from "framer-motion"; // Import motion
import { projectsData } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import AnimatedDiv from "@/components/utils/AnimatedDiv"; // Import the utility component

// Define variants for the container to stagger children
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger delay between each card
    },
  },
};

const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Animate the heading */}
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900 dark:text-white tracking-tight">
            My Work
          </h2>
        </AnimatedDiv>

        {/* Convert grid div to motion.div and apply variants */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Trigger children stagger when grid enters view
          viewport={{ once: true, amount: 0.1 }} // Adjust amount as needed
        >
          {projectsData.map((project) => (
            // Pass project data to ProjectCard - animation variants will be handled inside ProjectCard
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
