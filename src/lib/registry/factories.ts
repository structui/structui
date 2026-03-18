import type {
  ComponentCategory,
  ComponentRegistryEntry,
  ComponentStatus,
  DocsStatus,
} from "@/src/lib/registry/types";

interface ComponentRegistrySeed {
  id: string;
  title: string;
  description: string;
  category: ComponentCategory;
  llmSummary?: string;
  status?: ComponentStatus;
  docsStatus?: DocsStatus;
  tags?: string[];
  sourcePath?: string;
  sourceExport?: string;
  docsPath?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  relatedComponents?: string[];
}

export const createComponentRegistryEntry = (
  seed: ComponentRegistrySeed,
): ComponentRegistryEntry => ({
  id: seed.id,
  slug: seed.id,
  title: seed.title,
  description: seed.description,
  llmSummary: seed.llmSummary ?? `${seed.title}: ${seed.description}`,
  category: seed.category,
  status: seed.status ?? "stable",
  docsStatus: seed.docsStatus ?? "draft",
  visibility: "public",
  tags: seed.tags ?? [],
  sourcePath: seed.sourcePath,
  sourceExport: seed.sourceExport,
  docsPath: seed.docsPath ?? `docs/components/${seed.id}.md`,
  dependencies: seed.dependencies ?? [],
  registryDependencies: seed.registryDependencies ?? [],
  relatedComponents: seed.relatedComponents ?? [],
});
