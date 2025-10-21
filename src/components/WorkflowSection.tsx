/// Path: src/components/WorkflowSection.tsx

"use client";

import React from "react";
import {
  LuSearchCheck,
  LuLayoutDashboard,
  LuCode,
  LuFlaskConical,
  LuRocket,
  LuRepeat2,
} from "react-icons/lu";
import { motion, useReducedMotion } from "framer-motion";

type Step = {
  id: number;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
};

const steps: Step[] = [
  {
    id: 1,
    title: "Discovery & Planning",
    desc: "Agree on scope, constraints, and success metrics. Capture user stories and risks up-front.",
    icon: <LuSearchCheck />,
    color: "text-blue-500 dark:text-blue-400",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Design & Architecture",
    desc: "Component map, data contracts, and navigation. Favor simple shapes and cache-aware data.",
    icon: <LuLayoutDashboard />,
    color: "text-purple-500 dark:text-purple-400",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Development",
    desc: "TypeScript-first implementation with linting and previews. Small PRs, fast iterations.",
    icon: <LuCode />,
    color: "text-emerald-500 dark:text-emerald-400",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    title: "Testing & QA",
    desc: "Unit where logic lives, integration where flows live. Accessibility and smoke tests.",
    icon: <LuFlaskConical />,
    color: "text-orange-500 dark:text-orange-400",
    gradient: "from-orange-500 to-amber-500",
  },
  {
    id: 5,
    title: "Deployment & CI/CD",
    desc: "Optimized builds via Vercel. Preview links for every change, telemetry on production.",
    icon: <LuRocket />,
    color: "text-red-500 dark:text-red-400",
    gradient: "from-red-500 to-rose-500",
  },
  {
    id: 6,
    title: "Review & Iteration",
    desc: "Collect signals, prioritize deltas, and ship again. Keep the release train moving.",
    icon: <LuRepeat2 />,
    color: "text-yellow-600 dark:text-yellow-400",
    gradient: "from-yellow-500 to-orange-500",
  },
];

const WorkflowSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="workflow"
      className="relative bg-gradient-to-b from-gray-50 via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-950 pt-28 md:pt-32 pb-20 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-40 w-80 h-80 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-400/10 dark:bg-purple-500/5 rounded-full blur-3xl" />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-30 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgb(156 163 175 / 0.2) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced header with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white tracking-tight">
            My Development Workflow
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A structured approach to building exceptional web experiences
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
            <motion.ol
              className="min-w-max sm:min-w-full grid grid-flow-col sm:grid-flow-row auto-cols-[22rem] sm:auto-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-2 pb-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {steps.map((step, index) => (
                <motion.li
                  key={step.id}
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Card with glassmorphism */}
                  <div className="relative h-full rounded-2xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    {/* Gradient border effect on hover */}
                    <div
                      className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl -z-10`}
                    />

                    {/* Top gradient accent */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient}`}
                    />

                    {/* Icon section with gradient background */}
                    <div className="relative px-6 pt-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        {/* Step number */}
                        <motion.div
                          className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                          whileHover={{ scale: 1.05 }}
                        >
                          STEP {String(step.id).padStart(2, "0")}
                        </motion.div>

                        {/* Icon with gradient */}
                        <motion.div
                          className={`relative flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${step.gradient} shadow-lg`}
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 17,
                          }}
                        >
                          <div className="text-3xl text-white drop-shadow-sm">
                            {step.icon}
                          </div>

                          {/* Glow effect */}
                          <div
                            className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-300 -z-10`}
                          />
                        </motion.div>
                      </div>

                      {/* Title with gradient on hover */}
                      <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    {/* Bottom section with subtle pattern */}
                    <div className="px-6 pb-6">
                      <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 dark:text-gray-500 font-medium">
                            Phase {step.id} of 6
                          </span>
                          <motion.div
                            className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            whileInView={{ width: 64 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: index * 0.1 + 0.3,
                              duration: 0.6,
                            }}
                          >
                            <motion.div
                              className={`h-full bg-gradient-to-r ${step.gradient} rounded-full`}
                              initial={{ x: "-100%" }}
                              whileInView={{ x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: index * 0.1 + 0.5,
                                duration: 0.8,
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Hover shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none"
                      initial={{ x: "-100%", y: "-100%" }}
                      whileHover={{ x: "100%", y: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>

        {/* Optional: Connection indicator for desktop */}
        {!prefersReducedMotion && (
          <motion.div
            className="hidden lg:block text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Each phase builds upon the last, creating a robust development
              cycle
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WorkflowSection;
