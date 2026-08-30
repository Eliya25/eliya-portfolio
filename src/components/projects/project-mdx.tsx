import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

import { ArchitectureFlow } from "@/components/projects/architecture-flow";
import {
  ProjectFigure,
  ProjectVideo,
} from "@/components/projects/project-media";
import { rejectUnsafeMdx } from "@/lib/content/safe-mdx";

export async function ProjectMdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [rejectUnsafeMdx],
  });

  return (
    <Content components={{ ArchitectureFlow, ProjectFigure, ProjectVideo }} />
  );
}
