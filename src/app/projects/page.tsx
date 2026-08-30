import type { Metadata } from "next";

import { ProjectCard } from "@/components/projects/project-card";
import { getAllProjects } from "@/lib/content/projects";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Projects",
  description:
    "Backend, infrastructure, and AI engineering projects by Eliya Cohen.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="content-section shell" aria-labelledby="projects-title">
      <p className="eyebrow">Selected work</p>
      <h1 id="projects-title" className="page-title">
        Projects
      </h1>
      <p className="page-intro">
        Engineering projects documented through the problems they solve, their
        architecture, and the trade-offs behind their implementation.
      </p>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard project={project} key={project.slug} />
        ))}
      </div>
    </section>
  );
}
