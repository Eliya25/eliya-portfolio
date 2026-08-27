import { describe, expect, it } from "vitest";

import { getAllProjects, getProjectBySlug } from "./projects";

describe("project content loader", () => {
  it("loads and validates the repository-backed project collection", async () => {
    const projects = await getAllProjects();

    expect(projects).toHaveLength(1);
    expect(projects[0]).toMatchObject({
      slug: "lumiere",
      title: "Lumière — AI Movie Concierge",
      featured: true,
    });
  });

  it("returns the MDX body for a known slug", async () => {
    const document = await getProjectBySlug("lumiere");

    expect(document?.body).toContain("## Overview");
  });

  it("does not construct a file path from an unknown slug", async () => {
    await expect(getProjectBySlug("../../package")).resolves.toBeNull();
  });
});
