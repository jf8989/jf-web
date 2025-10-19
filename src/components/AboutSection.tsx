// src/components/AboutSection.tsx
"use client";

import React from "react";
import AnimatedDiv from "@/components/utils/AnimatedDiv";
import { motion, useReducedMotion } from "framer-motion";
import { FaReact, FaNodeJs, FaMusic, FaBolt } from "react-icons/fa";

const AboutSection: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const sectionStyle = {
    backgroundImage: `url('/images/about-background.png')`,
  };

  const factItems = [
    { icon: <FaBolt />, label: "Projects shipped", value: "30+" },
    { icon: <FaReact />, label: "Frontend focus", value: "React / Next.js" },
    { icon: <FaNodeJs />, label: "Backend stack", value: "Node + Firebase" },
    { icon: <FaMusic />, label: "Audio cred", value: "Mix & Mastering" },
  ];

  return (
    <section
      id="about"
      className="relative bg-cover bg-center bg-no-repeat overflow-hidden pt-28 md:pt-32 pb-20"
      style={sectionStyle}
    >
      {/* soft overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/85 to-white/40 dark:from-gray-900/85 dark:to-gray-900/40 backdrop-blur-[2px] z-0" />

      <div className="relative z-10 container mx-auto px-4">
        <AnimatedDiv>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-14 text-gray-900 dark:text-white tracking-tight">
            About Me
          </h2>
        </AnimatedDiv>

        {/* split layout */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* story */}
          <AnimatedDiv delay={0.05} className="lg:col-span-7">
            <div className="rounded-2xl bg-white/90 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/60 shadow-sm p-6 md:p-7">
              <p className="font-body text-gray-700 dark:text-gray-200 text-lg leading-relaxed mb-5">
                I build fast, expressive web apps and I care about the little
                things: motion that earns its keep, readable type, and clean
                data paths. My lane is{" "}
                <span className="text-sky-700 dark:text-sky-300 font-semibold">
                  React/Next.js
                </span>
                — with enough backend to ship end-to-end.
              </p>
              <p className="font-body text-gray-700 dark:text-gray-200 text-lg leading-relaxed">
                Parallel to code, I’m an audio engineer. That sensibility shows
                up in my work: dynamic but balanced, opinionated without being
                loud. I like products that feel alive without asking for
                attention.
              </p>

              <ul className="mt-6 grid sm:grid-cols-2 gap-3">
                {[
                  "Accessible, responsive UI by default",
                  "TypeScript-first, predictable state",
                  "Edge-friendly where it helps performance",
                  "Animations tuned for reduced-motion users",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"
                  >
                    <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedDiv>

          {/* quick facts */}
          <AnimatedDiv delay={0.1} className="lg:col-span-5">
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              {factItems.map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={
                    prefersReducedMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 16 }
                  }
                  whileInView={
                    prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
                  }
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.05 * idx }}
                  className="rounded-xl border border-gray-200/70 dark:border-gray-700/60 bg-white/95 dark:bg-gray-800/90 backdrop-blur p-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-sky-600 dark:text-sky-400 text-xl">
                      {f.icon}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                        {f.label}
                      </div>
                      <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {f.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* small note */}
            <div className="mt-4 text-base text-gray-900 dark:text-gray-900">
              * More details in Projects below.
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
