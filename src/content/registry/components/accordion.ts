import type { ComponentRegistryEntry } from "@/src/lib/registry/types";

export const accordionComponent: ComponentRegistryEntry = {
  id: "accordion",
  slug: "accordion",
  title: "Accordion",
  description: "Collapsible sections for progressively revealing content.",
  llmSummary:
    "Use Accordion for FAQs, settings panels, and dense content sections. Supports single or multiple expanded items and keyboard navigation.",
  category: "Data Display",
  status: "stable",
  docsStatus: "ready",
  visibility: "public",
  tags: ["collapse", "faq", "disclosure", "content"],
  sourcePath: "src/components/ui/accordion.tsx",
  sourceExport: "Accordion",
  docsPath: "src/content/docs/components/accordion.md",
  dependencies: ["@radix-ui/react-accordion"],
  registryDependencies: [],
  relatedComponents: ["button"],
};
