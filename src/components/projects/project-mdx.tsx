import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

import { rejectUnsafeMdx } from "@/lib/content/safe-mdx";

export async function ProjectMdx({ source }: { source: string }) {
  const { default: Content } = await evaluate(source, {
    ...runtime,
    remarkPlugins: [rejectUnsafeMdx],
  });

  return <Content />;
}
