/// Path: src/components/WorkflowSection.tsx
/// Role: Section showing process steps; modernized type scale, polish, and subtle motion

"use client";

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv";
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
};

const steps: Step[] = [
  {
    id: 1,
    title: "Discovery & Planning",
    desc: "Agree on scope, constraints, and success metrics. Capture user stories and risks up-front.",
    icon: <LuSearchCheck />,
    color: "text-blue-500 dark:text-blue-400",
  },
  {
    id: 2,
    title: "Design & Architecture",
    desc: "Component map, data contracts, and navigation. Favor simple shapes and cache-aware data.",
    icon: <LuLayoutDashboard />,
    color: "text-purple-500 dark:text-purple-400",
  },
  {
    id: 3,
    title: "Development",
    desc: "TypeScript-first implementation with linting and previews. Small PRs, fast iterations.",
    icon: <LuCode />,
    color: "text-emerald-500 dark:text-emerald-400",
  },
  {
    id: 4,
    title: "Testing & QA",
    desc: "Unit where logic lives, integration where flows live. Accessibility and smoke tests.",
    icon: <LuFlaskConical />,
    color: "text-orange-500 dark:text-orange-400",
  },
  {
    id: 5,
    title: "Deployment & CI/CD",
    desc: "Optimized builds via Vercel. Preview links for every change, telemetry on production.",
    icon: <LuRocket />,
    color: "text-red-500 dark:text-red-400",
  },
  {
    id: 6,
    title: "Review & Iteration",
    desc: "Collect signals, prioritize deltas, and ship again. Keep the release train moving.",
    icon: <LuRepeat2 />,
    color: "text-yellow-600 dark:text-yellow-400",
  },
];

const WorkflowSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Light stagger on first paint
  const containerVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section
      id="workflow"
      className="bg-gray-50 dark:bg-gray-900/50 pt-28 md:pt-32 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <AnimatedDiv>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-10 md:mb-14 text-gray-900 dark:text-white tracking-tight">
            My Development Workflow
          </h2>
        </AnimatedDiv>

        {/* horizontal scroll on small, grid on md+ */}
        <AnimatedDiv delay={0.05}>
          <div className="relative">
            {/* subtle progress rail (desktop) */}
            {!prefersReducedMotion && (
              <motion.div
                className="hidden lg:block absolute left-0 right-0 top-24 h-0.5 rounded-full bg-gradient-to-r from-sky-200/70 via-gray-200/50 to-purple-200/70 dark:from-sky-900/40 dark:via-gray-800 dark:to-purple-900/40"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}

            <div className="overflow-x-auto scrollbar-hide -mx-2 px-2">
              <motion.ol
                className="min-w-max sm:min-w-full grid grid-flow-col sm:grid-flow-row auto-cols-[20rem] sm:auto-cols-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                {steps.map((step) => (
                  <motion.li
                    key={step.id}
                    variants={itemVariants}
                    className="group relative rounded-2xl bg-white/95 dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700/60 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {/* number + icon header */}
                    <div className="flex items-center justify-between px-5 pt-5">
                      <div className="text-sm font-semibold tracking-widest text-gray-500 dark:text-gray-400">
                        {String(step.id).padStart(2, "0")}
                      </div>
                      <div className="flex items-center justify-center rounded-full px-2.5 py-2 bg-gray-50 dark:bg-gray-700/60">
                        <div className={`text-2xl md:text-3xl ${step.color}`}>
                          {step.icon}
                        </div>
                      </div>
                    </div>

                    {/* accent rail */}
                    <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-sky-400/50 via-blue-400/40 to-purple-400/50 dark:from-sky-500/40 dark:via-blue-500/30 dark:to-purple-500/40" />
                    {/* animated accent on hover */}
                    <motion.div
                      className="absolute left-0 right-0 top-[60px] h-0.5 origin-left bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    />

                    {/* body */}
                    <div className="p-5">
                      <h4
                        className={`text-xl md:text-2xl font-semibold mb-2 ${step.color}`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.desc}
                      </p>

                      {/* focus target for keyboard users */}
                      <a
                        href="#workflow"
                        className="sr-only focus:not-sr-only focus:block mt-4 text-sky-600 dark:text-sky-400 text-sm underline"
                      >
                        Learn more
                      </a>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </div>
          </div>
        </AnimatedDiv>
      </div>
    </section>
  );
};

export default WorkflowSection;
