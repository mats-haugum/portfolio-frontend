"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { profile } from "@/lib/data";

const MotionLink = motion(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Placeholder background — swap for the 3D scene later */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_35%,rgba(125,211,252,0.12),transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0}
        className="font-mono text-xs uppercase tracking-[0.3em] text-accent"
      >
        {profile.tagline}
      </motion.p>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.1}
        className="mt-6 text-6xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl"
      >
        {profile.name}
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.25}
        className="mt-8 max-w-xl text-sm text-muted sm:text-base"
      >
        {profile.summary}
      </motion.p>

      <MotionLink
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={0.35}
        href="/work"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-mono text-xs uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        See my work ↓
      </MotionLink>
    </section>
  );
}
