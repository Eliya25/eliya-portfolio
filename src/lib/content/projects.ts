import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";

import { parseProjectFrontmatter, type Project } from "./project-schema";

const projectsDirectory = path.join(
  process.cwd(),
  "src",
  "content",
  "projects",
);
const mdxExtension = ".mdx";

export type ProjectDocument = {
  project: Project;
  body: string;
};

async function getProjectFileNames(): Promise<string[]> {
  const entries = await readdir(projectsDirectory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(mdxExtension))
    .map((entry) => entry.name)
    .toSorted();
}

async function loadProjectFile(fileName: string): Promise<ProjectDocument> {
  const absolutePath = path.join(projectsDirectory, fileName);
  const source = await readFile(absolutePath, "utf8");
  const { data, content } = matter(source);
  const project = parseProjectFrontmatter(data, fileName);
  const fileSlug = fileName.slice(0, -mdxExtension.length);

  if (project.slug !== fileSlug) {
    throw new Error(
      `Invalid project frontmatter in ${fileName}: slug "${project.slug}" must match filename "${fileSlug}".`,
    );
  }

  if (!content.trim()) {
    throw new Error(
      `Invalid project content in ${fileName}: the MDX body cannot be empty.`,
    );
  }

  return { project, body: content };
}

export const getAllProjectDocuments = cache(
  async (): Promise<ProjectDocument[]> => {
    const fileNames = await getProjectFileNames();
    const documents = await Promise.all(fileNames.map(loadProjectFile));

    return documents.toSorted((left, right) =>
      right.project.publishedAt.localeCompare(left.project.publishedAt),
    );
  },
);

export async function getAllProjects(): Promise<Project[]> {
  return (await getAllProjectDocuments()).map(({ project }) => project);
}

export const getProjectBySlug = cache(
  async (slug: string): Promise<ProjectDocument | null> => {
    const documents = await getAllProjectDocuments();
    return documents.find(({ project }) => project.slug === slug) ?? null;
  },
);
