import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected projects, including ClinicBook, a clinic appointment booking system.",
};

export default function ProjectsPage() {
  return <Projects />;
}
