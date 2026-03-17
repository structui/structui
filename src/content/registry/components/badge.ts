import type { ComponentRegistryEntry } from "@/src/lib/registry/types";

export const badgeComponent: ComponentRegistryEntry = {
  id: "badge",
  slug: "badge",
  title: "Badge",
  description: "Compact status indicator for labels, states, and metadata.",
  llmSummary:
    "Use Badge to communicate status, category, or small metadata labels. Suitable for filters, labels, and inline semantic emphasis.",
  category: "General",
  status: "stable",
  docsStatus: "ready",
  visibility: "public",
  tags: ["status", "label", "metadata", "pill"],
  sourcePath: "src/components/ui/badge.tsx",
  sourceExport: "Badge",
  docsPath: "src/content/docs/components/badge.md",
  dependencies: ["class-variance-authority"],
  registryDependencies: [],
  relatedComponents: ["button"],
};
