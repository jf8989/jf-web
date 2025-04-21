/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/utils/AnimatedDiv.tsx
"use client"; // Needs to be a client component

import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number; // Optional delay
  // Allow other motion.div props to be passed
  [key: string]: any;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedDiv: React.FC<AnimatedDivProps> = ({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  ...rest
}) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible" // Trigger animation when element enters viewport
      viewport={{ once: true, amount: 0.2 }} // Trigger once, when 20% is visible
      transition={{ duration: 0.5, delay }} // Animation duration and optional delay
      variants={variants}
      {...rest} // Pass down any other motion props
    >
      {children}
    </motion.div>
  );
};

export default AnimatedDiv;
