import type { Root } from "mdast";
import { visit } from "unist-util-visit";

const executableNodeTypes = new Set([
  "mdxjsEsm",
  "mdxFlowExpression",
  "mdxTextExpression",
]);
const allowedComponentNames = new Set(["ProjectFigure", "ProjectVideo"]);

export const rejectUnsafeMdx = () => (tree: Root) => {
  visit(tree, (node) => {
    if (executableNodeTypes.has(node.type)) {
      throw new Error(
        `Unsafe MDX node "${node.type}" is not allowed in project content.`,
      );
    }

    if (
      node.type === "mdxJsxFlowElement" ||
      node.type === "mdxJsxTextElement"
    ) {
      const componentName = node.name;

      if (!componentName || !allowedComponentNames.has(componentName)) {
        throw new Error(
          `MDX component "${componentName ?? "anonymous"}" is not allowed.`,
        );
      }
    }
  });
};
