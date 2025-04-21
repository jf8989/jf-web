// src/components/WorkflowSection.tsx
"use client";

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv";

const workflowSteps = [
  {
    id: 1,
    title: "Discovery & Planning",
    description:
      "Understanding requirements, defining scope, user stories, and initial planning using Agile principles.",
  },
  {
    id: 2,
    title: "Design & Architecture",
    description:
      "System design, component architecture, data modeling, and technology selection for robust solutions.",
  },
  {
    id: 3,
    title: "Development",
    description:
      "Coding with best practices, Test-Driven Development (TDD) where applicable, and version control via Git.",
  },
  {
    id: 4,
    title: "Testing & QA",
    description:
      "Comprehensive testing including unit, integration, E2E tests, and accessibility checks.",
  },
  {
    id: 5,
    title: "Deployment & CI/CD",
    description:
      "Optimized builds, seamless deployment via Vercel, and setting up CI/CD pipelines.",
  },
  {
    id: 6,
    title: "Review & Iteration",
    description:
      "Gathering feedback, monitoring application performance, and planning iterative improvements.",
  },
];

// WorkflowCard definition within WorkflowSection
const WorkflowCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 h-full flex flex-col">
    {/* Title uses global h4 style (Playfair) */}
    <h4 className="text-base md:text-lg font-semibold mb-2 text-sky-700 dark:text-sky-400">
      {title}
    </h4>
    {/* Description uses body font (Geist), ensure text-sm */}
    <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
      {description}
    </p>
  </div>
);

const WorkflowSection: React.FC = () => {
  return (
    // Changed background slightly
    <section
      id="workflow"
      className="py-16 sm:py-20 bg-gray-100 dark:bg-gray-900/50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AnimatedDiv>
          {/* Heading uses global h2 style (Playfair) */}
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900 dark:text-white tracking-tight">
            My Development Workflow
          </h2>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <div className="overflow-x-auto pb-4 -mb-4 scrollbar-hide">
            <div className="flex space-x-4 px-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-6 sm:space-x-0 sm:px-0 min-w-max sm:min-w-full">
              {workflowSteps.map((step) => (
                <div
                  key={step.id}
                  className="w-64 sm:w-auto flex-shrink-0 sm:flex-shrink"
                >
                  <WorkflowCard
                    title={step.title}
                    description={step.description}
                  />
                </div>
              ))}
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default WorkflowSection;
