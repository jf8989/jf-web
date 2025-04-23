// src/components/WorkflowSection.tsx
"use client";

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv";
// --- NEW: Import relevant icons ---
// Find appropriate icons for each step! Examples below.
import {
  LuSearchCheck, // Discovery
  LuLayoutDashboard, // Design/Architecture
  LuCode, // Development
  LuFlaskConical, // Testing
  LuRocket, // Deployment
  LuRepeat2, // Iteration
} from "react-icons/lu"; // Using Lucide icons as examples
// --- END NEW ---

const workflowSteps = [
  // --- NEW: Added icon property ---
  {
    id: 1,
    title: "Discovery & Planning",
    description:
      "Understanding requirements, defining scope, user stories, and initial planning using Agile principles.",
    icon: <LuSearchCheck />,
    color: "text-blue-500 dark:text-blue-400", // Example color
  },
  {
    id: 2,
    title: "Design & Architecture",
    description:
      "System design, component architecture, data modeling, and technology selection for robust solutions.",
    icon: <LuLayoutDashboard />,
    color: "text-purple-500 dark:text-purple-400",
  },
  {
    id: 3,
    title: "Development",
    description:
      "Coding with best practices, Test-Driven Development (TDD) where applicable, and version control via Git.",
    icon: <LuCode />,
    color: "text-emerald-500 dark:text-emerald-400",
  },
  {
    id: 4,
    title: "Testing & QA",
    description:
      "Comprehensive testing including unit, integration, E2E tests, and accessibility checks.",
    icon: <LuFlaskConical />,
    color: "text-orange-500 dark:text-orange-400", // Need orange in config? Or use another color
  },
  {
    id: 5,
    title: "Deployment & CI/CD",
    description:
      "Optimized builds, seamless deployment via Vercel, and setting up CI/CD pipelines.",
    icon: <LuRocket />,
    color: "text-red-500 dark:text-red-400", // Need red in config?
  },
  {
    id: 6,
    title: "Review & Iteration",
    description:
      "Gathering feedback, monitoring application performance, and planning iterative improvements.",
    icon: <LuRepeat2 />,
    color: "text-yellow-500 dark:text-yellow-400", // Need yellow in config?
  },
  // --- END NEW ---
];

// --- UPDATED: WorkflowCard definition ---
const WorkflowCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}> = ({ title, description, icon, color }) => (
  // Use subtle background, add icon, adjust text alignment/size
  <div className="bg-white dark:bg-gray-800/70 backdrop-blur-sm p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700/80 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
    {/* Icon */}
    <div className={`mb-3 text-2xl ${color}`}>
      {" "}
      {/* Color applied here */}
      {icon}
    </div>
    {/* Title */}
    <h4 className={`text-md font-semibold mb-2 ${color}`}>
      {" "}
      {/* Color applied here too */}
      {title}
    </h4>
    {/* Description */}
    <p className="text-sm text-gray-600 dark:text-gray-400 font-body flex-grow leading-relaxed">
      {" "}
      {/* Improved line height */}
      {description}
    </p>
  </div>
);
// --- END UPDATED ---

const WorkflowSection: React.FC = () => {
  return (
    <section
      id="workflow"
      className="py-16 sm:py-20 bg-gray-100 dark:bg-gray-900/50 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16 text-gray-900 dark:text-white tracking-tight">
            My Development Workflow
          </h2>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          {/* --- UPDATED: Container for scrolling & shadow fix --- */}
          {/* Added pb-8 here to give space BELOW the scroll container for shadows */}
          <div className="pb-8">
            {/* Removed negative margin, adjusted horizontal padding */}
            <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0">
              {/* Grid setup remains similar, maybe adjust gap */}
              <div className="flex space-x-6 px-2 pb-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 sm:gap-6 sm:space-x-0 sm:px-0 min-w-max sm:min-w-full">
                {workflowSteps.map((step) => (
                  <div
                    key={step.id}
                    // Adjusted width for consistency, ensure it works with grid gap
                    className="w-60 sm:w-auto flex-shrink-0 sm:flex-shrink"
                  >
                    <WorkflowCard
                      title={step.title}
                      description={step.description}
                      icon={step.icon} // Pass icon
                      color={step.color} // Pass color
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* --- END UPDATED --- */}
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default WorkflowSection;
