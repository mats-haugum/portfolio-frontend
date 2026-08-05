"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className,
  mode = "inView",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  mode?: "inView" | "mount";
}) {
  const animation = {
    initial: { opacity: 0, y: 24 },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };

  if (mode === "mount") {
    return (
      <motion.div
        initial={animation.initial}
        animate={{ opacity: 1, y: 0 }}
        transition={animation.transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={animation.initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={animation.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
