import { getComponentBySlug } from "@/src/lib/registry/components";
import type { ComponentDoc } from "@/src/lib/registry/types";

const rawComponentDocs = import.meta.glob("/src/content/docs/components/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const componentDocs = new Map<string, string>(
  Object.entries(rawComponentDocs).map(([filePath, content]) => [
    filePath.replace(/^\/src\//, "src/"),
    content,
  ]),
);

export const getComponentDocByPath = (path: string): ComponentDoc | undefined => {
  const content = componentDocs.get(path);

  if (!content) {
    return undefined;
  }

  return {
    path,
    content,
  };
};

export const getComponentDocBySlug = (slug: string): ComponentDoc | undefined => {
  const component = getComponentBySlug(slug);

  if (!component) {
    return undefined;
  }

  return getComponentDocByPath(component.docsPath);
};
