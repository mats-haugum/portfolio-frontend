import type { Metadata } from "next";
import Expertise from "@/components/Expertise";

export const metadata: Metadata = {
  title: "Expertise",
  description:
    "Backend, frontend, database, and tooling expertise — the technologies I build with day to day.",
};

export default function ExpertisePage() {
  return <Expertise />;
}
