import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ChevronRight, Layers, Palette, Shield, Zap } from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { Snippet } from "@/src/components/ui/snippet";
import {
  DOCS_NAV_ITEMS,
  getSiteMetrics,
  SITE_BRAND_NAME,
  SITE_CLI_COMMAND,
  SITE_GITHUB_URL,
  SITE_PACKAGE_NAME,
  SITE_URL,
} from "@/src/lib/registry";

type DocSectionId =
  | "introduction"
  | "installation"
  | "registry"
  | "principles"
  | "styling"
  | "accessibility";

const SectionShell = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}): React.JSX.Element => (
  <div className="py-12">
    <Container>
      <div className="max-w-4xl space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>{title}</span>
          </div>
          <h1 className="text-5xl font-thin tracking-tighter">{title}</h1>
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </Container>
  </div>
);

const P = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

const InlineCode = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <code className="bg-muted text-foreground px-1.5 py-0.5 rounded-md text-sm font-mono">
    {children}
  </code>
);

const siteMetrics = getSiteMetrics();
const installCommand = `npm install ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge\n\n# pnpm (recommended)\npnpm add ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge\n\n# yarn\nyarn add ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge`;
const stylesImport = `@import "tailwindcss";\n@import "${SITE_PACKAGE_NAME}/styles";`;
const componentImport = `import { Button } from "${SITE_PACKAGE_NAME}/button";\n\nexport default function App() {\n  return <Button variant="outline">Hello ${SITE_BRAND_NAME}</Button>;\n}`;
const registrySnippet = `# Public machine-readable surfaces\n${SITE_URL}/registry.json\n${SITE_URL}/registry/index.json\n${SITE_URL}/registry/components/button.json\n${SITE_URL}/registry/components/button.md\n${SITE_URL}/llms.txt\n${SITE_URL}/llms-full.txt`;

const sectionContent: Record<DocSectionId, { title: string; content: React.JSX.Element }> = {
  introduction: {
    title: "Introduction",
    content: (
      <>
        <P>
          {SITE_BRAND_NAME} is a registry-first React UI system. It ships reusable components,
          machine-readable metadata, and LLM-oriented discovery surfaces from the same source of truth.
        </P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: <Zap className="w-4 h-4" />, title: "Fast by default", desc: "Tree-shaking, lazy-loading, and virtual scrolling built in." },
            { icon: <Shield className="w-4 h-4" />, title: "Accessible", desc: "WAI-ARIA compliant, keyboard navigable, screen reader friendly." },
            { icon: <Palette className="w-4 h-4" />, title: "Themeable", desc: "CSS variable-based system with 4 built-in themes and a visual Theme Creator." },
            { icon: <Layers className="w-4 h-4" />, title: `${siteMetrics.totalComponents} Components`, desc: `${siteMetrics.documentedComponents} documented entries across ${siteMetrics.categories} categories.` },
          ].map((feature) => (
            <div key={feature.title} className="flex gap-3 p-4 rounded-xl border bg-muted/20">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {feature.icon}
              </div>
              <div>
                <p className="text-sm font-semibold mb-0.5">{feature.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  installation: {
    title: "Installation",
    content: (
      <>
        <P>Install {SITE_BRAND_NAME} and its peer dependencies using your preferred package manager.</P>
        <Snippet code={installCommand} language="bash" />
        <P>Import StructUI styles in your global CSS.</P>
        <Snippet code={stylesImport} language="css" filename="globals.css" />
        <P>Create your class merge helper in <InlineCode>src/lib/utils.ts</InlineCode>.</P>
        <Snippet
          code={`import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`}
          language="ts"
          filename="src/lib/utils.ts"
        />
        <P>Then render your first component.</P>
        <Snippet code={componentImport} language="tsx" filename="App.tsx" />
      </>
    ),
  },
  registry: {
    title: "Registry & LLMs",
    content: (
      <>
        <P>
          {SITE_BRAND_NAME} publishes human-facing docs and machine-facing exports together.
          Use the registry JSON for structured integrations and the LLM text files for lightweight discovery.
        </P>
        <Snippet code={registrySnippet} language="text" />
        <div className="rounded-xl border p-4 bg-muted/20 text-sm space-y-2">
          <p className="font-semibold text-foreground">What each surface is for</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><InlineCode>registry.json</InlineCode> gives you global metadata, metrics, and the component index.</li>
            <li><InlineCode>registry/components/*.json</InlineCode> exposes per-component structured records.</li>
            <li><InlineCode>registry/components/*.md</InlineCode> exposes the matching markdown docs when available.</li>
            <li><InlineCode>llms.txt</InlineCode> is the compact discovery surface for agents and search systems.</li>
            <li><InlineCode>llms-full.txt</InlineCode> is the expanded docs-first reference for deeper traversal.</li>
          </ul>
        </div>
        <P>
          Canonical source code and issue tracking live on <a href={SITE_GITHUB_URL} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">GitHub</a>.
        </P>
      </>
    ),
  },
  principles: {
    title: "Design Principles",
    content: (
      <>
        <P>{SITE_BRAND_NAME} is built around four core principles:</P>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: "Clarity", desc: "Interfaces should be immediately understandable. Reduce cognitive load with consistent patterns." },
            { title: "Efficiency", desc: "Minimize friction for developers with composable primitives and sane defaults." },
            { title: "Accessibility", desc: "WAI-ARIA compliant. All interactions are keyboard navigable and screen-reader friendly." },
            { title: "Consistency", desc: "A unified visual language across all components through shared CSS variables and Tailwind config." },
          ].map((principle) => (
            <div key={principle.title} className="p-4 rounded-xl border bg-muted/10">
              <p className="font-semibold text-sm mb-1">{principle.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  styling: {
    title: "Styling System",
    content: (
      <>
        <P>
          {SITE_BRAND_NAME} uses <strong>Tailwind CSS v4</strong> with the Vite plugin for zero-config setup.
          Component variants are managed with <InlineCode>class-variance-authority</InlineCode> and class merging is handled by <InlineCode>tailwind-merge</InlineCode>.
        </P>
        <Snippet
          code={`import { cva, type VariantProps } from "class-variance-authority";\nimport { cn } from "@/lib/utils";\n\nconst buttonVariants = cva(\n  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",\n  {\n    variants: {\n      variant: {\n        default: "bg-primary text-primary-foreground hover:bg-primary/90",\n        outline: "border border-input bg-transparent hover:bg-accent",\n        ghost: "hover:bg-accent hover:text-accent-foreground",\n      },\n      size: {\n        default: "h-9 px-4 py-2",\n        sm: "h-8 px-3 text-xs",\n        lg: "h-11 px-8",\n      },\n    },\n    defaultVariants: { variant: "default", size: "default" },\n  }\n);`}
          language="tsx"
          filename="button.tsx"
        />
      </>
    ),
  },
  accessibility: {
    title: "Accessibility",
    content: (
      <>
        <P>
          {SITE_BRAND_NAME} is built on <strong>Radix UI</strong> primitives, which implement WAI-ARIA patterns out of the box.
        </P>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {[
            "Full keyboard navigation (Tab, Arrow keys, Enter, Space, Escape)",
            "Screen reader announcements via aria-live regions",
            "Focus management in dialogs, modals, and overlays",
            "High contrast mode support",
            "Reduced motion support via prefers-reduced-motion",
            "Role and aria-* attributes on all interactive elements",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
};

export const DocsSectionPage = (): React.JSX.Element => {
  const { sectionId } = useParams<{ sectionId: string }>();

  if (!sectionId || !(sectionId in sectionContent)) {
    return <Navigate to="/docs" replace />;
  }

  const section = sectionContent[sectionId as DocSectionId];

  return <SectionShell title={section.title}>{section.content}</SectionShell>;
};
