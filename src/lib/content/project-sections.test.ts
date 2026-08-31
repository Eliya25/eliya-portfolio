import { describe, expect, it } from "vitest";

import {
  extractProjectSections,
  slugifySectionTitle,
} from "./project-sections";

describe("project sections", () => {
  it("extracts level-two headings in source order", () => {
    expect(
      extractProjectSections(
        "## Overview\n\nBody\n\n### Detail\n\n## Testing and CI\n",
      ),
    ).toEqual([
      { id: "overview", title: "Overview" },
      { id: "testing-and-ci", title: "Testing and CI" },
    ]);
  });

  it("creates stable anchor ids", () => {
    expect(slugifySectionTitle("TMDB enrichment & fault isolation")).toBe(
      "tmdb-enrichment-fault-isolation",
    );
  });

  it("rejects headings that would create duplicate ids", () => {
    expect(() =>
      extractProjectSections("## Request flow\n\n## Request-flow\n"),
    ).toThrow(/unique, non-empty IDs/);
  });
});
