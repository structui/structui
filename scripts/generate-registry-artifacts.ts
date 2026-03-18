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

const buildLlmsTxt = (components: ComponentExport[]): string => {
  const metrics = getSiteMetrics();
  const lines = [
    `${SITE_BRAND_NAME} is a React component registry and docs system for reusable UI primitives and higher-level blocks.`,
    "",
    `Canonical package: ${SITE_PACKAGE_NAME}`,
    `Canonical CLI: npx ${SITE_CLI_COMMAND}`,
    `Registry URL: ${SITE_URL}/registry.json`,
    `GitHub: ${SITE_GITHUB_URL}`,
    "",
    `Metrics: ${metrics.totalComponents} total components, ${metrics.documentedComponents} documented, ${metrics.stableComponents} stable, ${metrics.categories} categories.`,
    "",
    "Component index:",
    ...components.map(
      (component) =>
        `- ${component.slug}: ${component.title} (${component.category}, ${component.status}) - ${component.llmSummary}`,
    ),
  ];

  return `${lines.join("\n")}\n`;
};

const buildLlmsFullTxt = async (components: ComponentExport[]): Promise<string> => {
  const sections = await Promise.all(
    components.map(async (component) => {
      const registryEntry = componentRegistryEntries.find(
        (entry) => entry.slug === component.slug,
      );

      if (!registryEntry) {
        throw new Error(`Missing registry entry for component slug: ${component.slug}`);
      }

      const markdownDoc = await readComponentDoc(registryEntry);
      const docBlock = markdownDoc
        ? ["", "Markdown documentation:", markdownDoc.trim()].join("\n")
        : "";

      return [
        `## ${component.title}`,
        `- id: ${component.id}`,
        `- slug: ${component.slug}`,
        `- category: ${component.category}`,
        `- status: ${component.status}`,
        `- docsStatus: ${component.docsStatus}`,
        `- sourcePath: ${component.sourcePath ?? "n/a"}`,
        `- sourceExport: ${component.sourceExport ?? "n/a"}`,
        `- tags: ${component.tags.join(", ") || "n/a"}`,
        `- related: ${component.relatedComponents.join(", ") || "n/a"}`,
        `- summary: ${component.llmSummary}`,
        `- description: ${component.description}`,
        docBlock,
      ]
        .filter(Boolean)
        .join("\n");
    }),
  );

  return `${[
    `${SITE_BRAND_NAME} full registry export for LLM consumption.`,
    `Canonical package: ${SITE_PACKAGE_NAME}`,
    `Canonical CLI: npx ${SITE_CLI_COMMAND}`,
    `Site: ${SITE_URL}`,
    `GitHub: ${SITE_GITHUB_URL}`,
    "",
    sections.join("\n\n"),
  ].join("\n")}\n`;
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
