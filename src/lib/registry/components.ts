import { componentRegistryEntries } from "@/registry/components";
import { STATIC_DOCS_SIDEBAR } from "@/src/lib/registry/constants";
import type {
  ComponentCategory,
  ComponentRegistryEntry,
  SidebarSection,
} from "@/src/lib/registry/types";

const normalizeSourcePath = (value?: string): string | undefined => {
  if (!value) {
    return value;
  }

  return value.replace(/^src\/components\/ui\//, "components/ui/");
};

const normalizeDocsPath = (value: string): string =>
  value.replace(/^src\/content\/docs\/components\//, "docs/components/");

const validateComponentRegistry = (
  entries: ComponentRegistryEntry[],
): ComponentRegistryEntry[] => {
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const entry of entries) {
    if (ids.has(entry.id)) {
      throw new Error(`Duplicate component id: ${entry.id}`);
    }

    if (slugs.has(entry.slug)) {
      throw new Error(`Duplicate component slug: ${entry.slug}`);
    }

    ids.add(entry.id);
    slugs.add(entry.slug);
  }

  return [...entries].sort((left, right) => left.title.localeCompare(right.title));
};

const COMPONENTS = validateComponentRegistry(
  componentRegistryEntries.map((entry) => ({
    ...entry,
    sourcePath: normalizeSourcePath(entry.sourcePath),
    docsPath: normalizeDocsPath(entry.docsPath),
  })),
);

export const getAllComponents = (): ComponentRegistryEntry[] => [...COMPONENTS];

export const getPublicComponents = (): ComponentRegistryEntry[] =>
  COMPONENTS.filter((entry) => entry.visibility === "public");

export const getDocumentedComponents = (): ComponentRegistryEntry[] =>
  COMPONENTS.filter((entry) => entry.docsStatus === "ready");

export const getComponentBySlug = (
  slug: string,
): ComponentRegistryEntry | undefined =>
  COMPONENTS.find((entry) => entry.slug === slug);

export const getComponentCategories = (): ComponentCategory[] =>
  Array.from(new Set(COMPONENTS.map((entry) => entry.category)));

export const getComponentSidebarSections = (): SidebarSection[] => {
  const categorySections = getComponentCategories().map((category) => ({
    title: category,
    items: COMPONENTS.filter((entry) => entry.category === category).map((entry) => ({
      title: entry.title,
      href: `/components/${entry.slug}`,
    })),
  }));

  return [
    {
      title: STATIC_DOCS_SIDEBAR.title,
      items: STATIC_DOCS_SIDEBAR.items.map((item) => ({
        title: item.title,
        href: item.href,
      })),
    },
    ...categorySections,
  ];
};
