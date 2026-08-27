import type { Metadata } from "next";
import Link from "next/link";

import { getAllProjects } from "@/lib/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Backend, infrastructure, and AI engineering projects by Eliya Cohen.",
};

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
          <article className="project-card" key={project.slug}>
            <div className="project-card-meta">
              {project.status ? <span>{project.status}</span> : null}
              <span>{project.technologies.slice(0, 3).join(" · ")}</span>
            </div>
            <h2>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </h2>
            <p>{project.shortDescription}</p>
            <Link className="text-link" href={`/projects/${project.slug}`}>
              Read project overview →
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
