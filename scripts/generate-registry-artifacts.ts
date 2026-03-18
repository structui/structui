import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { componentRegistryEntries } from "../src/content/registry/components/index";
import {
  SITE_BRAND_NAME,
  SITE_CLI_COMMAND,
  SITE_GITHUB_URL,
  SITE_PACKAGE_NAME,
  SITE_URL,
} from "../src/lib/registry/constants";
import { getSiteMetrics } from "../src/lib/registry/metrics";
import type { ComponentRegistryEntry } from "../src/lib/registry/types";

interface PackageManifest {
  version: string;
}

interface RegistryExport {
  brand: string;
  packageName: string;
  cliCommand: string;
  siteUrl: string;
  githubUrl: string;
  version: string;
  metrics: ReturnType<typeof getSiteMetrics>;
  components: ComponentExport[];
}

interface ComponentExport {
  id: string;
  slug: string;
  title: string;
  description: string;
  llmSummary: string;
  category: string;
  status: string;
  docsStatus: string;
  tags: string[];
  sourcePath?: string;
  sourceExport?: string;
  docsPath: string;
  dependencies: string[];
  registryDependencies: string[];
  relatedComponents: string[];
  hasMarkdownDoc: boolean;
}

interface ComponentGroup {
  category: string;
  components: ComponentExport[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const REGISTRY_DIR = path.join(PUBLIC_DIR, "registry");
const REGISTRY_COMPONENTS_DIR = path.join(REGISTRY_DIR, "components");

const parsePackageManifest = (value: string): PackageManifest => {
  const parsed: unknown = JSON.parse(value);

  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !("version" in parsed) ||
    typeof parsed.version !== "string"
  ) {
    throw new Error("Invalid package.json: expected a string version field.");
  }

  return {
    version: parsed.version,
  };
};

const readComponentDoc = async (
  entry: ComponentRegistryEntry,
): Promise<string | undefined> => {
  const absoluteDocPath = path.join(ROOT_DIR, entry.docsPath);

  try {
    return await readFile(absoluteDocPath, "utf8");
  } catch {
    return undefined;
  }
};

const toComponentExport = async (
  entry: ComponentRegistryEntry,
): Promise<ComponentExport> => {
  const markdownDoc = await readComponentDoc(entry);

  return {
    id: entry.id,
    slug: entry.slug,
    title: entry.title,
    description: entry.description,
    llmSummary: entry.llmSummary,
    category: entry.category,
    status: entry.status,
    docsStatus: entry.docsStatus,
    tags: [...entry.tags],
    sourcePath: entry.sourcePath,
    sourceExport: entry.sourceExport,
    docsPath: entry.docsPath,
    dependencies: [...entry.dependencies],
    registryDependencies: [...entry.registryDependencies],
    relatedComponents: [...entry.relatedComponents],
    hasMarkdownDoc: Boolean(markdownDoc),
  };
};

const getComponentGroups = (components: ComponentExport[]): ComponentGroup[] => {
  const groups = new Map<string, ComponentExport[]>();

  for (const component of components) {
    const categoryComponents = groups.get(component.category) ?? [];
    categoryComponents.push(component);
    groups.set(component.category, categoryComponents);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([category, categoryComponents]) => ({
      category,
      components: categoryComponents.sort((left, right) =>
        left.title.localeCompare(right.title),
      ),
    }));
};

const getComponentDocsUrl = (slug: string): string =>
  `${SITE_URL}/components/${slug}`;

const getRegistryJsonUrl = (slug: string): string =>
  `${SITE_URL}/registry/components/${slug}.json`;

const getRegistryMarkdownUrl = (slug: string): string =>
  `${SITE_URL}/registry/components/${slug}.md`;

const buildLlmsTxt = (components: ComponentExport[]): string => {
  const metrics = getSiteMetrics();
  const groups = getComponentGroups(components);
  const lines = [
    `# ${SITE_BRAND_NAME}`,
    "",
    `> ${SITE_BRAND_NAME} is a registry-first React UI system with reusable components, public docs, structured registry exports, and LLM-friendly discovery surfaces.`,
    "",
    "## Overview",
    "",
    `- [Docs](${SITE_URL}/docs): Product and usage documentation.`,
    `- [Components](${SITE_URL}/components): Browse the component catalog.`,
    `- [Blocks](${SITE_URL}/blocks): Explore higher-level UI patterns and page sections.`,
    `- [Theme Creator](${SITE_URL}/theme-creator): Build and export design token themes.`,
    `- [GitHub](${SITE_GITHUB_URL}): Source code, issues, and project history.`,
    "",
    "## Installation",
    "",
    `- [Docs Installation](${SITE_URL}/docs#installation): Install ${SITE_PACKAGE_NAME} in a React app.`,
    `- [CLI Usage](${SITE_URL}/docs#cli): Canonical \`npx ${SITE_CLI_COMMAND}\` command surface.`,
    `- [Registry & LLMs](${SITE_URL}/docs#registry): Public machine-readable registry and LLM endpoints.`,
    "",
    "## Registry",
    "",
    `- [registry.json](${SITE_URL}/registry.json): Global registry export with metrics and component index.`,
    `- [registry/index.json](${SITE_URL}/registry/index.json): Mirrored registry index export.`,
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): Expanded LLM reference with per-component links and summaries.`,
    "",
    `## Components (${metrics.totalComponents})`,
    "",
  ];

  for (const group of groups) {
    lines.push(`### ${group.category}`, "");

    for (const component of group.components) {
      lines.push(
        `- [${component.title}](${getComponentDocsUrl(component.slug)}): ${component.description}`,
      );
    }

    lines.push("");
  }

  return `${lines.join("\n")}\n`;
};

const buildLlmsFullTxt = async (components: ComponentExport[]): Promise<string> => {
  const metrics = getSiteMetrics();
  const groups = getComponentGroups(components);
  const lines = [
    `# ${SITE_BRAND_NAME}`,
    "",
    `> Expanded LLM reference for ${SITE_BRAND_NAME}. Includes docs links, registry links, machine-readable endpoints, and component summaries.`,
    "",
    "## Overview",
    "",
    `- [Docs](${SITE_URL}/docs): Product overview, installation, theming, and CLI guidance.`,
    `- [Components](${SITE_URL}/components): Human-facing catalog for all registry entries.`,
    `- [Registry JSON](${SITE_URL}/registry.json): Structured registry export for tools and integrations.`,
    `- [GitHub](${SITE_GITHUB_URL}): Source repository and issue tracker.`,
    "",
    "## Package",
    "",
    `- package: \`${SITE_PACKAGE_NAME}\``,
    `- cli: \`npx ${SITE_CLI_COMMAND}\``,
    `- metrics: ${metrics.totalComponents} total, ${metrics.documentedComponents} markdown-documented, ${metrics.stableComponents} stable, ${metrics.categories} categories`,
    "",
    "## Registry Surfaces",
    "",
    `- [registry.json](${SITE_URL}/registry.json): Global registry export with metrics and all components.`,
    `- [registry/index.json](${SITE_URL}/registry/index.json): Mirrored registry index.`,
    `- [llms.txt](${SITE_URL}/llms.txt): Compact discovery-oriented LLM file.`,
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): Expanded LLM file.`,
    "",
    `## Components (${metrics.totalComponents})`,
    "",
  ];

  for (const group of groups) {
    lines.push(`### ${group.category}`, "");

    for (const component of group.components) {
      const registryEntry = componentRegistryEntries.find(
        (entry) => entry.slug === component.slug,
      );

      if (!registryEntry) {
        throw new Error(`Missing registry entry for component slug: ${component.slug}`);
      }

      const markdownDoc = await readComponentDoc(registryEntry);
      const extraLinks = [
        `[Docs](${getComponentDocsUrl(component.slug)})`,
        `[Registry JSON](${getRegistryJsonUrl(component.slug)})`,
      ];

      if (markdownDoc) {
        extraLinks.push(`[Registry Markdown](${getRegistryMarkdownUrl(component.slug)})`);
      }

      lines.push(
        `- [${component.title}](${getComponentDocsUrl(component.slug)}): ${component.llmSummary}`,
        `  - slug: \`${component.slug}\``,
        `  - status: ${component.status}`,
        `  - docs: ${component.docsStatus}`,
        `  - links: ${extraLinks.join(" | ")}`,
      );

      if (component.tags.length > 0) {
        lines.push(`  - tags: ${component.tags.join(", ")}`);
      }

      if (component.relatedComponents.length > 0) {
        lines.push(`  - related: ${component.relatedComponents.join(", ")}`);
      }
    }

    lines.push("");
  }

  return `${lines.join("\n")}\n`;
};

const writeJson = async (filePath: string, value: unknown): Promise<void> => {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
};

const main = async (): Promise<void> => {
  const packageManifest = parsePackageManifest(
    await readFile(path.join(ROOT_DIR, "package.json"), "utf8"),
  );

  const sortedEntries = [...componentRegistryEntries].sort((left, right) =>
    left.slug.localeCompare(right.slug),
  );
  const components = await Promise.all(sortedEntries.map(toComponentExport));

  const registryExport: RegistryExport = {
    brand: SITE_BRAND_NAME,
    packageName: SITE_PACKAGE_NAME,
    cliCommand: SITE_CLI_COMMAND,
    siteUrl: SITE_URL,
    githubUrl: SITE_GITHUB_URL,
    version: packageManifest.version,
    metrics: getSiteMetrics(),
    components,
  };

  await mkdir(REGISTRY_COMPONENTS_DIR, { recursive: true });
  await rm(REGISTRY_COMPONENTS_DIR, { recursive: true, force: true });
  await mkdir(REGISTRY_COMPONENTS_DIR, { recursive: true });

  await writeJson(path.join(PUBLIC_DIR, "registry.json"), registryExport);
  await writeJson(path.join(REGISTRY_DIR, "index.json"), registryExport);

  for (const component of components) {
    await writeJson(
      path.join(REGISTRY_COMPONENTS_DIR, `${component.slug}.json`),
      component,
    );

    const registryEntry = sortedEntries.find((entry) => entry.slug === component.slug);

    if (!registryEntry) {
      throw new Error(`Missing registry entry for component slug: ${component.slug}`);
    }

    const markdownDoc = await readComponentDoc(registryEntry);

    if (markdownDoc) {
      await writeFile(
        path.join(REGISTRY_COMPONENTS_DIR, `${component.slug}.md`),
        markdownDoc,
        "utf8",
      );
    }
  }

  await writeFile(path.join(PUBLIC_DIR, "llms.txt"), buildLlmsTxt(components), "utf8");
  await writeFile(
    path.join(PUBLIC_DIR, "llms-full.txt"),
    await buildLlmsFullTxt(components),
    "utf8",
  );
};

void main();
