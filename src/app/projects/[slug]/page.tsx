import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/ProjectCaseStudy";
import { caseStudyProjects, getProject } from "@/lib/data";

// Every case study is known at build time, so anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project?.caseStudy) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${slug}`,
      type: "article",
      images: [
        {
          url: project.caseStudy.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project?.caseStudy) notFound();

  return (
    <ProjectCaseStudy project={{ ...project, caseStudy: project.caseStudy }} />
  );
}
