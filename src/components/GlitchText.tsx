"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function GlitchText({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, x: -6 }}
      animate={{
        opacity: [0, 1, 0.3, 1, 0.5, 1, 1],
        x: [-6, 4, -3, 2, -1, 0, 0],
        textShadow: [
          "0 0 0 rgba(0,0,0,0)",
          "-2px 0 var(--color-coral), 2px 0 var(--color-berry)",
          "2px 0 var(--color-berry), -2px 0 var(--color-amber)",
          "-1px 0 var(--color-coral), 1px 0 var(--color-berry)",
          "1px 0 var(--color-amber), -1px 0 var(--color-coral)",
          "0 0 0 rgba(0,0,0,0)",
          "0 0 0 rgba(0,0,0,0)",
        ],
      }}
      transition={{
        duration: 0.9,
        delay,
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
        ease: "easeOut",
      }}
    >
      {children}
    </motion.span>
  );
}
