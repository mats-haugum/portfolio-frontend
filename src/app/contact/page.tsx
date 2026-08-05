import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch by email, GitHub, or LinkedIn.",
};

export default function ContactPage() {
  return <Contact />;
}
