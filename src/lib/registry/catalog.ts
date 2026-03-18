import { promises as fs } from "node:fs";
import path from "node:path";

import { componentRegistryEntries } from "@/src/content/registry/components";
import { getMarkdownDocBySlug } from "@/src/lib/content/docs";
import type {
  ComponentCategory,
  ComponentRegistryEntry,
  ComponentStatus,
  DocsStatus,
} from "@/src/lib/registry/types";

const UI_ROOT = path.join(process.cwd(), "src/components/ui");

type CatalogOverride = Partial<ComponentRegistryEntry> & {
  title?: string;
  sourceExport?: string;
};

const CATEGORY_OVERRIDES: Record<string, ComponentCategory> = {
  accordion: "Data Display",
  "alert-dialog": "Overlay",
  avatar: "Data Display",
  badge: "General",
  "bento-grid": "Layout",
  button: "General",
  calendar: "Data Display",
  card: "Layout",
  charts: "Data Display",
  checkbox: "Forms",
  "code-block": "General",
  combobox: "Forms",
  command: "Advanced",
  "command-palette": "Advanced",
  "cookies-banner": "Overlay",
  "data-table-advanced": "Data Display",
  "device-mockups": "Layout",
  dialogs: "Overlay",
  "dropdown-menu": "Overlay",
  feedback: "Feedback",
  "form-advanced": "Forms",
  hero: "Advanced",
  "inputs-advanced": "Forms",
  kanban: "Data Display",
  loaders: "General",
  "markdown-editor": "Forms",
  navigation: "Navigation",
  "navigation-advanced": "Navigation",
  "overlay-advanced": "Overlay",
  popover: "Overlay",
  pricing: "Data Display",
  primitives: "Layout",
  "radio-group": "Forms",
  select: "Forms",
  sheet: "Overlay",
  skeleton: "Feedback",
  slider: "Forms",
  spinner: "Feedback",
  stats: "Data Display",
  stepper: "Navigation",
  switch: "Forms",
  table: "Data Display",
  tabs: "Navigation",
  textarea: "Forms",
  timeline: "Data Display",
  toast: "Feedback",
  tooltip: "Overlay",
  "3d-pin": "Advanced",
};

const EXPORT_OVERRIDES: Record<string, string> = {
  "3d-pin": "PinContainer",
  charts: "AreaChartComponent",
  dialogs: "SignInModal",
  feedback: "Alert",
  "inputs-advanced": "Toggle",
  loaders: "Spinner1",
  navigation: "Breadcrumbs",
  "navigation-advanced": "NavigationMenu",
  "overlay-advanced": "ContextMenu",
  primitives: "Separator",
  toast: "ToastProvider",
};

const TITLE_OVERRIDES: Record<string, string> = {
  "3d-pin": "3D Pin",
  "alert-dialog": "Alert Dialog",
  "bento-grid": "Bento Grid",
  charts: "Charts",
  combobox: "Combobox",
  "command-palette": "Command Palette",
  "cookies-banner": "Cookies Banner",
  "data-table-advanced": "Data Table Advanced",
  "device-mockups": "Device Mockups",
  "dropdown-menu": "Dropdown Menu",
  "form-advanced": "Form Advanced",
  "inputs-advanced": "Inputs Advanced",
  "markdown-editor": "Markdown Editor",
  "navigation-advanced": "Navigation Advanced",
  "overlay-advanced": "Overlay Advanced",
  "radio-group": "Radio Group",
};

const REGISTRY_OVERRIDES = new Map(
  componentRegistryEntries.map((entry) => [entry.slug, entry]),
);

export interface ComponentCatalogEntry extends ComponentRegistryEntry {
  docsUrl: string | null;
  docsAvailable: boolean;
}

export interface ComponentCatalogDetail extends ComponentCatalogEntry {
  sourceCode: string;
  importCode: string;
  installCode: string;
  manualSteps: string[];
  docContent: string | null;
}

const slugToTitle = (slug: string): string =>
  TITLE_OVERRIDES[slug] ||
  slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");

const slugToExport = (slug: string): string =>
  EXPORT_OVERRIDES[slug] ||
  slug
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join("");

const createBaseEntry = (slug: string): ComponentRegistryEntry => {
  const sourcePath = `src/components/ui/${slug}.tsx`;
  const hasDocs = REGISTRY_OVERRIDES.has(slug);

  return {
    id: slug,
    slug,
    title: slugToTitle(slug),
    description: `${slugToTitle(slug)} component source and usage guide.`,
    llmSummary: `Use ${slugToTitle(slug)} by copying the source file or importing it into your UI layer.`,
    category: CATEGORY_OVERRIDES[slug] || "General",
    status: "stable" as ComponentStatus,
    docsStatus: (hasDocs ? "ready" : "draft") as DocsStatus,
    visibility: "public",
    tags: [slug],
    sourcePath,
    sourceExport: slugToExport(slug),
    docsPath: `src/content/docs/components/${slug}.md`,
    dependencies: [],
    registryDependencies: [],
    relatedComponents: [],
  };
};

export async function getPublicComponentCatalog(): Promise<ComponentCatalogEntry[]> {
  const files = await fs.readdir(UI_ROOT);
  const slugs = files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, ""));

  const entries = slugs
    .map((slug) => ({
      ...createBaseEntry(slug),
      ...(REGISTRY_OVERRIDES.get(slug) as CatalogOverride | undefined),
    }))
    .filter((entry) => entry.visibility === "public")
    .map((entry) => {
      const docsAvailable = REGISTRY_OVERRIDES.has(entry.slug);

      return {
        ...entry,
        docsAvailable,
        docsUrl: docsAvailable ? `/docs/components/${entry.slug}` : null,
      };
    })
    .sort((left, right) => left.title.localeCompare(right.title));

  return entries;
}

export async function getComponentCatalogDetail(
  slug: string,
): Promise<ComponentCatalogDetail | null> {
  const entries = await getPublicComponentCatalog();
  const entry = entries.find((item) => item.slug === slug);

  if (!entry) {
    return null;
  }

  const sourceFile = path.join(process.cwd(), entry.sourcePath);
  const sourceCode = await fs.readFile(sourceFile, "utf8");
  const doc = await getMarkdownDocBySlug(slug);
  const sourceImportPath = `@/src/components/ui/${entry.slug}`;

  return {
    ...entry,
    sourceCode,
    docContent: doc?.content || null,
    importCode: `import { ${entry.sourceExport} } from "${sourceImportPath}";`,
    installCode: `npx strui add ${entry.slug}`,
    manualSteps: [
      `Copy \`${entry.sourcePath}\` into your project.`,
      "Move any shared utilities such as `cn` into your local `lib/utils.ts`.",
      `Import the exported API with \`${entry.sourceExport}\` and adapt aliases if your project uses a different path setup.`,
    ],
  };
}
