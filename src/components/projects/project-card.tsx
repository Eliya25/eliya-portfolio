import Image from "next/image";
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
  const caseStudyUrl = `/projects/${project.slug}`;

  return (
    <article
      className={`project-card${project.coverImage ? "" : "project-card--no-cover"}`}
    >
      {project.coverImage ? (
        <Link
          className="project-card-cover"
          href={caseStudyUrl}
          aria-label={`Read the ${project.title} case study`}
        >
          <Image
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            width={project.coverImage.width}
            height={project.coverImage.height}
            sizes="(max-width: 640px) calc(100vw - 2rem), (max-width: 1200px) 42vw, 32rem"
          />
        </Link>
      ) : null}
      <div className="project-card-content">
        {project.status ? (
          <p className="project-status">{project.status}</p>
        ) : null}
        <Heading>
          <Link href={caseStudyUrl}>{project.title}</Link>
        </Heading>
        <p className="project-card-description">{project.shortDescription}</p>
        <ul className="project-technologies" aria-label="Technologies">
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="project-card-links">
          <Link className="text-link" href={caseStudyUrl}>
            Case study →
          </Link>
          {project.demoUrl ? (
            <a
              className="text-link"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
          {project.repositoryUrl ? (
            <a
              className="text-link"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
