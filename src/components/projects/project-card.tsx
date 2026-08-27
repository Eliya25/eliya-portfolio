import Link from "next/link";

import type { Project } from "@/lib/content/project-schema";

export function ProjectCard({
  project,
  headingLevel = 2,
}: {
  project: Project;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <article className="project-card">
      <div className="project-card-meta">
        {project.status ? <span>{project.status}</span> : null}
        <span>{project.technologies.slice(0, 3).join(" · ")}</span>
      </div>
      <Heading>
        <Link href={`/projects/${project.slug}`}>{project.title}</Link>
      </Heading>
      <p>{project.shortDescription}</p>
      <Link className="text-link" href={`/projects/${project.slug}`}>
        Read project overview →
      </Link>
    </article>
  );
}
