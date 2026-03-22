import type { ComponentCategory } from "./types";

export const SITE_BRAND_NAME = "StructUI";
export const SITE_PACKAGE_NAME = "struct-ui";
export const SITE_CLI_COMMAND = "strui";
export const SITE_URL = "https://structui.com";
export const SITE_GITHUB_URL = "https://github.com/structui/structui";
export const SITE_ISSUES_URL = `${SITE_GITHUB_URL}/issues`;

export const COMPONENT_CATEGORY_LABELS: Record<ComponentCategory, string> = {
  General: "Core",
  Layout: "Layout & Structure",
  Forms: "Inputs & Forms",
  "Data Display": "Data Views",
  Navigation: "Navigation",
  Feedback: "Feedback & Status",
  Overlay: "Overlays",
  Advanced: "Advanced Patterns",
};

export const STATIC_DOCS_SIDEBAR = {
  title: "Getting Started",
  items: [
    { title: "Introduction", href: "/docs" },
    { title: "Installation", href: "/docs#overview" },
  ],
} as const;
