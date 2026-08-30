import { compile } from "@mdx-js/mdx";
import { describe, expect, it } from "vitest";

import { rejectUnsafeMdx } from "./safe-mdx";

describe("safe MDX policy", () => {
  it("accepts Markdown-only project content", async () => {
    await expect(
      compile("## Overview\n\nA **documented** engineering decision.", {
        remarkPlugins: [rejectUnsafeMdx],
      }),
    ).resolves.toBeDefined();
  });

  it("accepts the audited project media components", async () => {
    await expect(
      compile(
        '<ArchitectureFlow />\n\n<ProjectFigure src="/image.png" alt="Demo" width="1200" height="800" caption="Interface" />\n\n<ProjectVideo src="https://example.com/demo.webm" poster="/poster.png" caption="Demo video" label="Video demo" />',
        { remarkPlugins: [rejectUnsafeMdx] },
      ),
    ).resolves.toBeDefined();
  });

  it.each([
    ["JavaScript expressions", "Result: {process.env.SECRET}"],
    ["ES module imports", 'import Component from "./component"\n\n# Overview'],
    ["unapproved components", "<UnapprovedComponent />"],
  ])("rejects %s", async (_label, source) => {
    await expect(
      compile(source, { remarkPlugins: [rejectUnsafeMdx] }),
    ).rejects.toThrow(/Unsafe MDX node|is not allowed/);
  });
});
