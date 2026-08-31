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
  const sections = Array.from(
    source.matchAll(/^##\s+(.+)$/gm),
    ([, title]) => ({
      id: slugifySectionTitle(title.trim()),
      title: title.trim(),
    }),
  );
  const ids = new Set<string>();

  for (const section of sections) {
    if (!section.id || ids.has(section.id)) {
      throw new Error(
        `Project section headings must create unique, non-empty IDs. Invalid heading: "${section.title}".`,
      );
    }

    ids.add(section.id);
  }

  return sections;
}
