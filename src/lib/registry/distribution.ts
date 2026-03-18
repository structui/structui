import { promises as fs } from "node:fs";
import path from "node:path";

import { componentRegistryEntries } from "@/registry/components";
import { SITE_BRAND_NAME, SITE_URL } from "@/src/lib/registry/constants";
import type { ComponentRegistryEntry } from "@/src/lib/registry/types";

export type RegistryPackageType = "component" | "block";
export type RegistryIndexType = RegistryPackageType | "all";
export type ShadcnRegistryItemType = "registry:ui" | "registry:block";

export interface RegistryFile {
  path: string;
  content: string;
  target: string;
  sourcePath: string;
}

export interface RegistryPackage {
  name: string;
  type: RegistryPackageType;
  title: string;
  description: string;
  version: string;
  dependencies: string[];
  registryDependencies: string[];
  tags: string[];
  files: RegistryFile[];
}

export interface RegistryIndexItem {
  name: string;
  type: RegistryPackageType;
  version: string;
  description: string;
  entrypoint: string;
  dependencies: string[];
  tags: string[];
}

export interface RegistryIndexResponse {
  registryVersion: number;
  updatedAt: string;
  message: string;
  source: string;
  items: RegistryIndexItem[];
}

export interface RegistryDetailResponse {
  name: string;
  type: RegistryPackageType;
  version: string;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  tags: string[];
  files: Array<{
    path: string;
    content: string;
    sourcePath: string;
    target: string;
  }>;
  downloadUrl: string;
  message: string;
}

export interface ShadcnRegistryIndexResponse {
  $schema: string;
  name: string;
  homepage: string;
  updatedAt: string;
  items: Array<{
    name: string;
    type: ShadcnRegistryItemType;
    title: string;
    description: string;
    dependencies: string[];
    registryDependencies: string[];
  }>;
}

export interface ShadcnRegistryItemResponse {
  $schema: string;
  name: string;
  type: ShadcnRegistryItemType;
  title: string;
  description: string;
  dependencies: string[];
  registryDependencies: string[];
  files: Array<{
    path: string;
    type: ShadcnRegistryItemType;
    target: string;
    content: string;
  }>;
}

interface RegistryCatalog {
  generatedAt: string;
  version: string;
  components: RegistryPackage[];
  blocks: RegistryPackage[];
  all: RegistryPackage[];
}

interface BlockBlueprint {
  name: string;
  title: string;
  description: string;
  sourceSlug: string;
  tags: string[];
}

const REGISTRY_VERSION = 1;
const SHADCN_REGISTRY_SCHEMA = "https://ui.shadcn.com/schema/registry.json";
const SHADCN_REGISTRY_ITEM_SCHEMA =
  "https://ui.shadcn.com/schema/registry-item.json";
const ROOT_DIR = process.cwd();
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, "package.json");
const CACHE_TTL_MS = 30_000;

const BLOCK_BLUEPRINTS: BlockBlueprint[] = [
  {
    name: "hero-section",
    title: "Hero Section",
    description: "Marketing hero section with CTA and headline content.",
    sourceSlug: "hero",
    tags: ["hero", "marketing", "landing"],
  },
  {
    name: "pricing-section",
    title: "Pricing Section",
    description: "Pricing cards section for plan comparison and purchase flows.",
    sourceSlug: "pricing",
    tags: ["pricing", "plans", "saas"],
  },
  {
    name: "stats-section",
    title: "Stats Section",
    description: "KPI and metric section for dashboards and marketing pages.",
    sourceSlug: "stats",
    tags: ["stats", "kpi", "dashboard"],
  },
  {
    name: "timeline-section",
    title: "Timeline Section",
    description: "Activity timeline section for changelogs and project history.",
    sourceSlug: "timeline",
    tags: ["timeline", "activity", "history"],
  },
  {
    name: "feature-bento",
    title: "Feature Bento",
    description: "Bento-style feature grid for product landing pages.",
    sourceSlug: "bento-grid",
    tags: ["features", "bento", "layout"],
  },
  {
    name: "kanban-board",
    title: "Kanban Board",
    description: "Task management board block for productivity interfaces.",
    sourceSlug: "kanban",
    tags: ["kanban", "task", "productivity"],
  },
  {
    name: "cookies-consent",
    title: "Cookies Consent",
    description: "Cookie consent block for privacy and compliance prompts.",
    sourceSlug: "cookies-banner",
    tags: ["cookies", "consent", "privacy"],
  },
  {
    name: "command-palette-modal",
    title: "Command Palette Modal",
    description: "Search-driven command palette block for keyboard navigation.",
    sourceSlug: "command-palette",
    tags: ["command", "search", "navigation"],
  },
  {
    name: "data-table-section",
    title: "Data Table Section",
    description: "Advanced data table block for records and admin interfaces.",
    sourceSlug: "data-table-advanced",
    tags: ["table", "data", "admin"],
  },
  {
    name: "device-showcase",
    title: "Device Showcase",
    description: "Responsive product showcase block with device mockups.",
    sourceSlug: "device-mockups",
    tags: ["showcase", "product", "devices"],
  },
];

let cache: RegistryCatalog | null = null;
let cacheExpiresAt = 0;

const unique = (values: string[]): string[] => Array.from(new Set(values));

const normalizeSourcePath = (value: string): string =>
  value.replace(/^src\/components\/ui\//, "components/ui/");

const toSlug = (value: string): string =>
  value.trim().toLowerCase().replace(/\.json$/i, "");

const parseRegistryType = (value: string | null): RegistryIndexType | null => {
  if (!value) {
    return "all";
  }

  if (value === "all" || value === "component" || value === "block") {
    return value;
  }

  return null;
};

const readPackageVersion = async (): Promise<string> => {
  try {
    const packageRaw = await fs.readFile(PACKAGE_JSON_PATH, "utf8");
    const parsed = JSON.parse(packageRaw) as { version?: unknown };

    if (typeof parsed.version === "string" && parsed.version.trim().length > 0) {
      return parsed.version;
    }
  } catch {
    // Ignore and use fallback version.
  }

  return "0.0.0";
};

const readSourceFile = async (
  entry: ComponentRegistryEntry,
): Promise<{ path: string; content: string } | null> => {
  const candidatePaths = unique(
    [
      entry.sourcePath,
      entry.sourcePath ? normalizeSourcePath(entry.sourcePath) : undefined,
      `components/ui/${entry.slug}.tsx`,
    ].filter((value): value is string => Boolean(value)),
  );

  for (const candidatePath of candidatePaths) {
    try {
      const absolutePath = path.join(
        /* turbopackIgnore: true */ ROOT_DIR,
        candidatePath,
      );
      const content = await fs.readFile(absolutePath, "utf8");

      return {
        path: candidatePath,
        content,
      };
    } catch {
      // Continue with next candidate path.
    }
  }

  return null;
};

const toShadcnType = (type: RegistryPackageType): ShadcnRegistryItemType =>
  type === "component" ? "registry:ui" : "registry:block";

const asDownloadUrl = (type: RegistryPackageType, name: string): string =>
  `/api/registry/download/${type}/${name}`;

const packageToIndexItem = (pkg: RegistryPackage): RegistryIndexItem => ({
  name: pkg.name,
  type: pkg.type,
  version: pkg.version,
  description: pkg.description,
  entrypoint:
    pkg.type === "component"
      ? `components/${pkg.name}.json`
      : `blocks/${pkg.name}.json`,
  dependencies: [...pkg.dependencies],
  tags: [...pkg.tags],
});

const packageToDetail = (pkg: RegistryPackage): RegistryDetailResponse => ({
  name: pkg.name,
  type: pkg.type,
  version: pkg.version,
  title: pkg.title,
  description: pkg.description,
  dependencies: [...pkg.dependencies],
  registryDependencies: [...pkg.registryDependencies],
  tags: [...pkg.tags],
  files: pkg.files.map((file) => ({
    path: file.path,
    content: file.content,
    sourcePath: file.sourcePath,
    target: file.target,
  })),
  downloadUrl: asDownloadUrl(pkg.type, pkg.name),
  message: "Registry item generated successfully.",
});

const packageToShadcnItem = (
  pkg: RegistryPackage,
): ShadcnRegistryItemResponse => {
  const shadcnType = toShadcnType(pkg.type);

  return {
    $schema: SHADCN_REGISTRY_ITEM_SCHEMA,
    name: pkg.name,
    type: shadcnType,
    title: pkg.title,
    description: pkg.description,
    dependencies: [...pkg.dependencies],
    registryDependencies: [...pkg.registryDependencies],
    files: pkg.files.map((file) => ({
      path: file.path,
      type: shadcnType,
      target: file.target,
      content: file.content,
    })),
  };
};

const matchesQuery = (pkg: RegistryPackage, query?: string): boolean => {
  if (!query) {
    return true;
  }

  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  const haystack = [
    pkg.name,
    pkg.title,
    pkg.description,
    pkg.type,
    ...pkg.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalized);
};

const toPackageGroups = (
  catalog: RegistryCatalog,
  type: RegistryIndexType,
): RegistryPackage[] => {
  if (type === "component") {
    return [...catalog.components];
  }

  if (type === "block") {
    return [...catalog.blocks];
  }

  return [...catalog.all];
};

const buildRegistryCatalog = async (): Promise<RegistryCatalog> => {
  const version = await readPackageVersion();
  const entries = [...componentRegistryEntries].sort((left, right) =>
    left.slug.localeCompare(right.slug),
  );

  const componentPackages: RegistryPackage[] = [];
  const entryBySlug = new Map(entries.map((entry) => [entry.slug, entry]));

  for (const entry of entries) {
    const sourceFile = await readSourceFile(entry);

    if (!sourceFile) {
      continue;
    }

    componentPackages.push({
      name: entry.slug,
      type: "component",
      title: entry.title,
      description: entry.description,
      version,
      dependencies: unique(entry.dependencies),
      registryDependencies: unique(entry.registryDependencies),
      tags: unique(entry.tags),
      files: [
        {
          path: `${entry.slug}.tsx`,
          content: sourceFile.content,
          sourcePath: sourceFile.path,
          target: `components/ui/${entry.slug}.tsx`,
        },
      ],
    });
  }

  const blockPackages: RegistryPackage[] = [];

  for (const blueprint of BLOCK_BLUEPRINTS) {
    const sourceEntry = entryBySlug.get(blueprint.sourceSlug);

    if (!sourceEntry) {
      continue;
    }

    const sourceFile = await readSourceFile(sourceEntry);

    if (!sourceFile) {
      continue;
    }

    blockPackages.push({
      name: blueprint.name,
      type: "block",
      title: blueprint.title,
      description: blueprint.description,
      version,
      dependencies: unique(sourceEntry.dependencies),
      registryDependencies: unique([
        ...sourceEntry.registryDependencies,
        sourceEntry.slug,
      ]),
      tags: unique([...blueprint.tags, ...sourceEntry.tags]),
      files: [
        {
          path: `${blueprint.name}.tsx`,
          content: sourceFile.content,
          sourcePath: sourceFile.path,
          target: `components/blocks/${blueprint.name}.tsx`,
        },
      ],
    });
  }

  const all = [...componentPackages, ...blockPackages].sort((left, right) =>
    left.name.localeCompare(right.name),
  );

  return {
    generatedAt: new Date().toISOString(),
    version,
    components: componentPackages.sort((left, right) =>
      left.name.localeCompare(right.name),
    ),
    blocks: blockPackages.sort((left, right) =>
      left.name.localeCompare(right.name),
    ),
    all,
  };
};

const getRegistryCatalog = async (): Promise<RegistryCatalog> => {
  if (cache && Date.now() < cacheExpiresAt) {
    return cache;
  }

  cache = await buildRegistryCatalog();
  cacheExpiresAt = Date.now() + CACHE_TTL_MS;

  return cache;
};

const getPackageByName = (
  packages: RegistryPackage[],
  name: string,
): RegistryPackage | null => {
  const slug = toSlug(name);
  return packages.find((pkg) => pkg.name === slug) ?? null;
};

export const resolveRegistryType = (
  value: string | null,
): RegistryIndexType | null => parseRegistryType(value);

export const buildRegistryIndex = async (options?: {
  type?: RegistryIndexType;
  query?: string | null;
}): Promise<RegistryIndexResponse> => {
  const type = options?.type ?? "all";
  const query = options?.query ?? undefined;
  const catalog = await getRegistryCatalog();
  const selected = toPackageGroups(catalog, type)
    .filter((pkg) => matchesQuery(pkg, query ?? undefined))
    .map(packageToIndexItem)
    .sort((left, right) => left.name.localeCompare(right.name));

  return {
    registryVersion: REGISTRY_VERSION,
    updatedAt: catalog.generatedAt,
    message: "StructUI registry index generated successfully.",
    source: `${SITE_BRAND_NAME} Registry API`,
    items: selected,
  };
};

export const buildRegistryDetail = async (
  type: RegistryPackageType,
  name: string,
): Promise<RegistryDetailResponse | null> => {
  const catalog = await getRegistryCatalog();
  const selected = type === "component" ? catalog.components : catalog.blocks;
  const pkg = getPackageByName(selected, name);

  if (!pkg) {
    return null;
  }

  return packageToDetail(pkg);
};

export const findRegistryPackage = async (
  type: RegistryPackageType,
  name: string,
): Promise<RegistryPackage | null> => {
  const catalog = await getRegistryCatalog();
  const selected = type === "component" ? catalog.components : catalog.blocks;
  return getPackageByName(selected, name);
};

export const findRegistryPackageAnyType = async (
  name: string,
): Promise<RegistryPackage | null> => {
  const catalog = await getRegistryCatalog();
  return getPackageByName(catalog.all, name);
};

export const buildShadcnRegistryIndex = async (options?: {
  type?: RegistryIndexType;
  query?: string | null;
}): Promise<ShadcnRegistryIndexResponse> => {
  const type = options?.type ?? "all";
  const query = options?.query ?? undefined;
  const catalog = await getRegistryCatalog();
  const items = toPackageGroups(catalog, type)
    .filter((pkg) => matchesQuery(pkg, query ?? undefined))
    .sort((left, right) => left.name.localeCompare(right.name))
    .map((pkg) => ({
      name: pkg.name,
      type: toShadcnType(pkg.type),
      title: pkg.title,
      description: pkg.description,
      dependencies: [...pkg.dependencies],
      registryDependencies: [...pkg.registryDependencies],
    }));

  return {
    $schema: SHADCN_REGISTRY_SCHEMA,
    name: "structui",
    homepage: SITE_URL,
    updatedAt: catalog.generatedAt,
    items,
  };
};

export const buildShadcnRegistryItem = async (
  name: string,
): Promise<ShadcnRegistryItemResponse | null> => {
  const pkg = await findRegistryPackageAnyType(name);

  if (!pkg) {
    return null;
  }

  return packageToShadcnItem(pkg);
};
