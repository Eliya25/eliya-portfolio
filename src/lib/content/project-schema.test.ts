import { describe, expect, it } from "vitest";

import { parseProjectFrontmatter } from "./project-schema";

const validProject = {
  slug: "example-project",
  title: "Example Project",
  shortDescription: "A concise description of the project.",
  problemSummary: "A concrete problem that needs an engineering solution.",
  publishedAt: "2026-08-27",
  featured: false,
  technologies: ["TypeScript"],
  repositoryUrl: "https://github.com/example/project",
  seo: {
    description: "An example project used to validate portfolio content.",
  },
};

describe("parseProjectFrontmatter", () => {
  it("returns normalized, valid project metadata", () => {
    expect(
      parseProjectFrontmatter(validProject, "example-project.mdx"),
    ).toEqual(validProject);
  });

  it("reports the source file and invalid fields", () => {
    expect(() =>
      parseProjectFrontmatter(
        { ...validProject, slug: "Not Valid", publishedAt: "27-08-2026" },
        "invalid.mdx",
      ),
    ).toThrowError(
      /Invalid project frontmatter in invalid\.mdx:[\s\S]*slug[\s\S]*publishedAt/,
    );
  });

  it.each(["2026-02-30", "2026-13-01"])(
    "rejects the nonexistent calendar date %s",
    (publishedAt) => {
      expect(() =>
        parseProjectFrontmatter(
          { ...validProject, publishedAt },
          "invalid-date.mdx",
        ),
      ).toThrowError(/Expected a valid date/);
    },
  );

  it("rejects duplicate technologies and unknown fields", () => {
    expect(() =>
      parseProjectFrontmatter(
        {
          ...validProject,
          technologies: ["TypeScript", "TypeScript"],
          unsupported: true,
        },
        "invalid.mdx",
      ),
    ).toThrowError(/Technologies must be unique|Unrecognized key/);
  });
});
