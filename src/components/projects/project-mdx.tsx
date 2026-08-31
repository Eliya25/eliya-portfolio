import { evaluate } from "@mdx-js/mdx";
import type { ReactNode } from "react";
import * as runtime from "react/jsx-runtime";

import { ArchitectureFlow } from "@/components/projects/architecture-flow";
import {
  ProjectFigure,
  ProjectVideo,
} from "@/components/projects/project-media";
import { rejectUnsafeMdx } from "@/lib/content/safe-mdx";
import { slugifySectionTitle } from "@/lib/content/project-sections";

function SectionHeading({ children }: { children?: ReactNode }) {
  const title = typeof children === "string" ? children : String(children);
  const id = slugifySectionTitle(title);

  return (
    <h2 id={id}>
      <a className="case-study-heading-link" href={`#${id}`}>
        {children}
      </a>
    </h2>
  );
}

export async function ProjectMdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [rejectUnsafeMdx],
  });

  return (
    <Content
      components={{
        ArchitectureFlow,
        ProjectFigure,
        ProjectVideo,
        h2: SectionHeading,
      }}
    />
  );
}
