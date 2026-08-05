import type { Metadata } from "next";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Education and work history.",
};

export default function ExperiencePage() {
  return <Experience />;
}
