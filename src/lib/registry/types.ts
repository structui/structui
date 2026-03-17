export const COMPONENT_CATEGORIES = [
  "General",
  "Layout",
  "Forms",
  "Data Display",
  "Navigation",
  "Feedback",
  "Overlay",
  "Advanced",
] as const;

export const COMPONENT_STATUSES = ["stable", "preview", "planned"] as const;

export const DOCS_STATUSES = ["ready", "draft", "planned"] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];
export type ComponentStatus = (typeof COMPONENT_STATUSES)[number];
export type DocsStatus = (typeof DOCS_STATUSES)[number];

export interface ComponentRegistryEntry {
  id: string;
  slug: string;
  title: string;
  description: string;
  llmSummary: string;
  category: ComponentCategory;
  status: ComponentStatus;
  docsStatus: DocsStatus;
  visibility: "public";
  tags: string[];
  sourcePath: string;
  sourceExport: string;
  docsPath: string;
  dependencies: string[];
  registryDependencies: string[];
  relatedComponents: string[];
}

export interface SidebarItem {
  title: string;
  href: string;
}

export interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export interface SiteMetrics {
  totalComponents: number;
  documentedComponents: number;
  stableComponents: number;
  previewComponents: number;
  plannedComponents: number;
  categories: number;
}
