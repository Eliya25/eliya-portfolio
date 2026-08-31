import type { ProjectSection } from "@/lib/content/project-sections";

export function CaseStudyToc({ sections }: { sections: ProjectSection[] }) {
  if (sections.length === 0) return null;

  return (
    <nav className="case-study-toc" aria-labelledby="case-study-toc-title">
      <p className="case-study-toc-title" id="case-study-toc-title">
        On this page
      </p>
      <ol>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
