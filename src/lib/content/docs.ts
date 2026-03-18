import { promises as fs } from "node:fs";
import path from "node:path";

const DOCS_ROOT = path.join(process.cwd(), "src/content/docs/components");

export interface MarkdownDocPage {
  slug: string;
  title: string;
  description: string;
  content: string;
  filePath: string;
}

const stripMarkdown = (value: string): string =>
  value
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[>#*_~-]/g, "")
    .trim();

const getTitle = (content: string, fallback: string): string => {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1]?.trim() || fallback;
};

const getDescription = (content: string): string => {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.startsWith("#"));

  return stripMarkdown(lines[0] || "Component documentation.");
};

export async function getAllMarkdownDocs(): Promise<MarkdownDocPage[]> {
  const files = await fs.readdir(DOCS_ROOT);
  const pages = await Promise.all(
    files
      .filter((file) => file.endsWith(".md"))
      .map(async (file) => {
        const filePath = path.join(DOCS_ROOT, file);
        const content = await fs.readFile(filePath, "utf8");
        const slug = file.replace(/\.md$/, "");

        return {
          slug,
          title: getTitle(content, slug),
          description: getDescription(content),
          content,
          filePath: path.relative(process.cwd(), filePath),
        };
      }),
  );

  return pages.sort((left, right) => left.title.localeCompare(right.title));
}

export async function getMarkdownDocBySlug(
  slug: string,
): Promise<MarkdownDocPage | null> {
  try {
    const filePath = path.join(DOCS_ROOT, `${slug}.md`);
    const content = await fs.readFile(filePath, "utf8");

    return {
      slug,
      title: getTitle(content, slug),
      description: getDescription(content),
      content,
      filePath: path.relative(process.cwd(), filePath),
    };
  } catch {
    return null;
  }
}
