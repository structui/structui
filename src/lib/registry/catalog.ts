import { promises as fs } from "node:fs";
import path from "node:path";

import { componentRegistryEntries } from "@/registry/components";
import { getMarkdownDocBySlug } from "@/src/lib/content/docs";
import type {
  ComponentCategory,
  ComponentRegistryEntry,
  ComponentStatus,
  DocsStatus,
} from "@/src/lib/registry/types";

const UI_ROOT = path.join(process.cwd(), "components/ui");
const DOCS_ROOT = path.join(process.cwd(), "docs/components");

type CatalogOverride = Partial<ComponentRegistryEntry> & {
  title?: string;
  sourceExport?: string;
};

const CATEGORY_OVERRIDES: Record<string, ComponentCategory> = {
  "activity-feed": "Data Display",
  accordion: "Data Display",
  "alert-dialog": "Overlay",
  avatar: "Data Display",
  badge: "General",
  "bento-grid": "Layout",
  "blocks-modern": "Layout",
  button: "General",
  calendar: "Data Display",
  card: "Layout",
  charts: "Data Display",
  checkbox: "Forms",
  "code-block": "General",
  "color-picker": "Forms",
  combobox: "Forms",
  command: "Advanced",
  "command-bar": "Advanced",
  "command-palette": "Advanced",
  "cookies-banner": "Overlay",
  "data-grid": "Data Display",
  "data-table-advanced": "Data Display",
  "device-mockups": "Layout",
  dialogs: "Overlay",
  "drag-list": "Data Display",
  "dropdown-menu": "Overlay",
  feedback: "Feedback",
  "file-upload": "Forms",
  "form-advanced": "Forms",
  hero: "Advanced",
  "inputs-advanced": "Forms",
  input: "Forms",
  kanban: "Data Display",
  kbd: "General",
  loaders: "General",
  "markdown-editor": "Forms",
  "multi-step-form": "Forms",
  navigation: "Navigation",
  "navigation-advanced": "Navigation",
  "notification-center": "Data Display",
  "otp-input": "Forms",
  "overlay-advanced": "Overlay",
  popover: "Overlay",
  pricing: "Data Display",
  primitives: "Layout",
  "profile-card": "Data Display",
  progress: "Feedback",
  "radio-group": "Forms",
  rating: "Feedback",
  select: "Forms",
  sheet: "Overlay",
  skeleton: "Feedback",
  slider: "Forms",
  "smart-table": "Data Display",
  snippet: "General",
  "split-pane": "Layout",
  spinner: "Feedback",
  stats: "Data Display",
  stepper: "Navigation",
  switch: "Forms",
  table: "Data Display",
  tabs: "Navigation",
  textarea: "Forms",
  timeline: "Data Display",
  toast: "Feedback",
  "tree-view": "Navigation",
  tooltip: "Overlay",
  "virtual-list": "Data Display",
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
  "file-upload": "File Upload",
  "form-advanced": "Form Advanced",
  "inputs-advanced": "Inputs Advanced",
  kbd: "KBD",
  "markdown-editor": "Markdown Editor",
  "multi-step-form": "Multi Step Form",
  "navigation-advanced": "Navigation Advanced",
  "notification-center": "Notification Center",
  "otp-input": "OTP Input",
  "overlay-advanced": "Overlay Advanced",
  "profile-card": "Profile Card",
  "radio-group": "Radio Group",
  "smart-table": "Smart Table",
  "split-pane": "Split Pane",
  "tree-view": "Tree View",
  "virtual-list": "Virtual List",
};

const normalizeSourcePath = (value: string): string =>
  value.replace(/^src\/components\/ui\//, "components/ui/");

const normalizeDocsPath = (value: string): string =>
  value.replace(/^src\/content\/docs\/components\//, "docs/components/");

const REGISTRY_OVERRIDES = new Map(
  componentRegistryEntries.map((entry) => [
    entry.slug,
    {
      ...entry,
      sourcePath: normalizeSourcePath(entry.sourcePath ?? `components/ui/${entry.slug}.tsx`),
      docsPath: normalizeDocsPath(entry.docsPath),
    },
  ]),
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

export interface ComponentCoverageSummary {
  totalComponents: number;
  registryMapped: number;
  docsAvailable: number;
  categories: number;
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
  const sourcePath = `components/ui/${slug}.tsx`;

  return {
    id: slug,
    slug,
    title: slugToTitle(slug),
    description: `${slugToTitle(slug)} component source and usage guide.`,
    llmSummary: `Use ${slugToTitle(slug)} by copying the source file or importing it into your UI layer.`,
    category: CATEGORY_OVERRIDES[slug] || "General",
    status: "stable" as ComponentStatus,
    docsStatus: "draft" as DocsStatus,
    visibility: "public",
    tags: [slug],
    sourcePath,
    sourceExport: slugToExport(slug),
    docsPath: `docs/components/${slug}.md`,
    dependencies: [],
    registryDependencies: [],
    relatedComponents: [],
  };
};

const hasDocForSlug = async (slug: string): Promise<boolean> => {
  try {
    await fs.access(path.join(DOCS_ROOT, `${slug}.md`));
    return true;
  } catch {
    return false;
  }
};

export async function getComponentCoverageSummary(): Promise<ComponentCoverageSummary> {
  const files = await fs.readdir(UI_ROOT);
  const slugs = files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, ""));
  const docs = await fs.readdir(DOCS_ROOT);
  const docsSet = new Set(docs.filter((file) => file.endsWith(".md")).map((file) => file.replace(/\.md$/, "")));

  const merged = slugs.map((slug) => {
    const entry = {
      ...createBaseEntry(slug),
      ...(REGISTRY_OVERRIDES.get(slug) as CatalogOverride | undefined),
    };

    return {
      ...entry,
      sourcePath: normalizeSourcePath(entry.sourcePath ?? `components/ui/${slug}.tsx`),
      docsPath: normalizeDocsPath(entry.docsPath ?? `docs/components/${slug}.md`),
    };
  });

  return {
    totalComponents: slugs.length,
    registryMapped: slugs.filter((slug) => REGISTRY_OVERRIDES.has(slug)).length,
    docsAvailable: slugs.filter((slug) => docsSet.has(slug)).length,
    categories: new Set(merged.map((entry) => entry.category)).size,
  };
}

export async function getPublicComponentCatalog(): Promise<ComponentCatalogEntry[]> {
  const files = await fs.readdir(UI_ROOT);
  const slugs = files
    .filter((file) => file.endsWith(".tsx"))
    .map((file) => file.replace(/\.tsx$/, ""));

  const merged = slugs
    .map((slug) => {
      const entry = {
        ...createBaseEntry(slug),
        ...(REGISTRY_OVERRIDES.get(slug) as CatalogOverride | undefined),
      };

      return {
        ...entry,
        sourcePath: normalizeSourcePath(entry.sourcePath ?? `components/ui/${slug}.tsx`),
        docsPath: normalizeDocsPath(entry.docsPath ?? `docs/components/${slug}.md`),
      };
    })
    .filter((entry) => entry.visibility === "public");

  const entries = await Promise.all(
    merged.map(async (entry) => {
      const docsAvailable = await hasDocForSlug(entry.slug);

      return {
        ...entry,
        docsAvailable,
        docsUrl: docsAvailable ? `/docs/components/${entry.slug}` : null,
      };
    }),
  );

  return entries.sort((left, right) => left.title.localeCompare(right.title));
}

export async function getComponentCatalogDetail(
  slug: string,
): Promise<ComponentCatalogDetail | null> {
  const entries = await getPublicComponentCatalog();
  const entry = entries.find((item) => item.slug === slug);

  if (!entry?.sourcePath) {
    return null;
  }

  const sourceFile = path.join(UI_ROOT, `${entry.slug}.tsx`);
  const sourceCode = await fs.readFile(sourceFile, "utf8");
  const doc = await getMarkdownDocBySlug(slug);
  const sourceImportPath = `@/components/ui/${entry.slug}`;
  const isToast = entry.slug === "toast";

  const importCode = isToast
    ? `import { ToastProvider, useToast } from "${sourceImportPath}";`
    : `import { ${entry.sourceExport} } from "${sourceImportPath}";`;

  const manualSteps = isToast
    ? [
        `Copy \`${entry.sourcePath}\` into your project.`,
        "Wrap your app/layout with `ToastProvider` once.",
        "Call `useToast()` in client components to trigger toasts.",
      ]
    : [
        `Copy \`${entry.sourcePath}\` into your project.`,
        "Move any shared utilities such as `cn` into your local `lib/utils.ts`.",
        `Import the exported API with \`${entry.sourceExport}\` and adapt aliases if your project uses a different path setup.`,
      ];

  return {
    ...entry,
    sourceCode,
    docContent: doc?.content || null,
    importCode,
    installCode: `npx sui add ${entry.slug}`,
    manualSteps,
  };
}
