export type ProjectSection = {
  id: string;
  title: string;
};

export function slugifySectionTitle(title: string): string {
  return title
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractProjectSections(source: string): ProjectSection[] {
  return Array.from(source.matchAll(/^##\s+(.+)$/gm), ([, title]) => ({
    id: slugifySectionTitle(title.trim()),
    title: title.trim(),
  }));
}
