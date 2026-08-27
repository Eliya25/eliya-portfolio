import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectMdx } from "@/components/projects/project-mdx";
import { getAllProjects, getProjectBySlug } from "@/lib/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllProjects()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = await getProjectBySlug(slug);

  if (!document) {
    return {};
  }

  const { project } = document;

  return {
    title: project.seo.title ?? project.title,
    description: project.seo.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const document = await getProjectBySlug(slug);

  if (!document) {
    notFound();
  }

  const { project, body } = document;

  return (
    <article className="content-section shell">
      <Link className="text-link back-link" href="/projects">
        ← All projects
      </Link>
      <header className="project-header">
        <p className="eyebrow">Project overview</p>
        <h1 className="page-title">{project.title}</h1>
        <p className="page-intro">{project.shortDescription}</p>
        <div className="project-actions">
          {project.repositoryUrl ? (
            <a
              className="button"
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              className="button button-secondary"
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
            >
              Live demo <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </header>
      <div className="project-facts" aria-label="Project details">
        <div>
          <span>Problem</span>
          <p>{project.problemSummary}</p>
        </div>
        <div>
          <span>Stack</span>
          <p>{project.technologies.join(", ")}</p>
        </div>
      </div>
      <div className="prose">
        <ProjectMdx source={body} />
      </div>
    </article>
  );
}
