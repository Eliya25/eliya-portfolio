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
