import type { Metadata } from "next";
import Hero from "@/components/Hero";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: profile.role,
  description: profile.summary,
};

export default function Home() {
  return <Hero />;
}
