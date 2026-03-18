export interface DocNavItem {
  id: string;
  label: string;
  group: string;
  path: string;
}

export const DOCS_NAV_ITEMS: DocNavItem[] = [
  { id: "introduction", label: "Introduction", group: "Getting Started", path: "/docs/introduction" },
  { id: "installation", label: "Installation", group: "Getting Started", path: "/docs/installation" },
  { id: "registry", label: "Registry & LLMs", group: "Getting Started", path: "/docs/registry" },
  { id: "theming", label: "Theming", group: "Getting Started", path: "/docs/theming" },
  { id: "cli", label: "CLI Usage", group: "Getting Started", path: "/docs/cli" },
  { id: "principles", label: "Design Principles", group: "Architecture", path: "/docs/principles" },
  { id: "styling", label: "Styling System", group: "Architecture", path: "/docs/styling" },
  { id: "accessibility", label: "Accessibility", group: "Architecture", path: "/docs/accessibility" },
];

export const getDocPathById = (id: string): string => {
  const item = DOCS_NAV_ITEMS.find((entry) => entry.id === id);

  return item?.path ?? "/docs";
};
