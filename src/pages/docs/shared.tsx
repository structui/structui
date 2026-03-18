import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Layers, Palette, Shield, Sun, Moon, Leaf, Zap } from "lucide-react";

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
import { cn } from "@/src/lib/utils";

export const DocsParagraph = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

export const DocsInlineCode = ({ children }: { children: React.ReactNode }): React.JSX.Element => (
  <code className="bg-muted text-foreground px-1.5 py-0.5 rounded-md text-sm font-mono">
    {children}
  </code>
);

export const DocsSection = ({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}): React.JSX.Element => (
  <section id={id} className="scroll-mt-24 space-y-6 pb-16 border-b last:border-none">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    {children}
  </section>
);

export const DocsPageShell = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: React.ReactNode;
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
          {description ? <div className="text-xl text-muted-foreground font-light">{description}</div> : null}
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </Container>
  </div>
);

const siteMetrics = getSiteMetrics();

export const DOC_SNIPPETS = {
  installCommand: `npm install ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge\n\n# pnpm (recommended)\npnpm add ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge\n\n# yarn\nyarn add ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge`,
  stylesImport: `@import "tailwindcss";\n@import "${SITE_PACKAGE_NAME}/styles";`,
  componentImport: `import { Button } from "${SITE_PACKAGE_NAME}/button";\n\nexport default function App() {\n  return <Button variant="outline">Hello ${SITE_BRAND_NAME}</Button>;\n}`,
  registrySnippet: `# Public machine-readable surfaces\n${SITE_URL}/registry.json\n${SITE_URL}/registry/index.json\n${SITE_URL}/registry/components/button.json\n${SITE_URL}/registry/components/button.md\n${SITE_URL}/llms.txt\n${SITE_URL}/llms-full.txt`,
  cliSnippet: `# List installed components and blocks\nnpx ${SITE_CLI_COMMAND} list\n\n# Add a component\nnpx ${SITE_CLI_COMMAND} add button\nnpx ${SITE_CLI_COMMAND} add data-table-advanced\n\n# Add a block (prefix with block-)\nnpx ${SITE_CLI_COMMAND} add block-pricing\nnpx ${SITE_CLI_COMMAND} add block-dashboard\n\n# Remove a component\nnpx ${SITE_CLI_COMMAND} remove button\n\n# Initialize a full project template\nnpx ${SITE_CLI_COMMAND} init saas\nnpx ${SITE_CLI_COMMAND} init erp\nnpx ${SITE_CLI_COMMAND} init crm`,
  stylingSnippet: `import { cva, type VariantProps } from "class-variance-authority";\nimport { cn } from "@/lib/utils";\n\nconst buttonVariants = cva(\n  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",\n  {\n    variants: {\n      variant: {\n        default: "bg-primary text-primary-foreground hover:bg-primary/90",\n        outline: "border border-input bg-transparent hover:bg-accent",\n        ghost: "hover:bg-accent hover:text-accent-foreground",\n      },\n      size: {\n        default: "h-9 px-4 py-2",\n        sm: "h-8 px-3 text-xs",\n        lg: "h-11 px-8",\n      },\n    },\n    defaultVariants: { variant: "default", size: "default" },\n  }\n);`,
  themingVariables: `:root {\n  --background: #f7f8fa;\n  --foreground: #1a1a1a;\n  --primary: #1a1a1a;\n  --primary-foreground: #f7f8fa;\n  --radius: 0.5rem;\n}`,
  themingTailwind: `<div className="bg-background text-foreground border-primary/10">\n  <h1 className="text-primary">Hello World</h1>\n</div>`,
};

export const DOC_SECTION_CONTENT = {
  introduction: {
    title: "Introduction",
    content: (
      <>
        <DocsParagraph>
          {SITE_BRAND_NAME} is a registry-first React UI system. It ships reusable components,
          machine-readable metadata, and LLM-oriented discovery surfaces from the same source of truth.
        </DocsParagraph>
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
        <DocsParagraph>Install {SITE_BRAND_NAME} and its peer dependencies using your preferred package manager.</DocsParagraph>
        <Snippet code={DOC_SNIPPETS.installCommand} language="bash" />
        <DocsParagraph>Import StructUI styles in your global CSS.</DocsParagraph>
        <Snippet code={DOC_SNIPPETS.stylesImport} language="css" filename="globals.css" />
        <DocsParagraph>Create your class merge helper in <DocsInlineCode>src/lib/utils.ts</DocsInlineCode>.</DocsParagraph>
        <Snippet code={`import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}`} language="ts" filename="src/lib/utils.ts" />
        <DocsParagraph>Then render your first component.</DocsParagraph>
        <Snippet code={DOC_SNIPPETS.componentImport} language="tsx" filename="App.tsx" />
      </>
    ),
  },
  registry: {
    title: "Registry & LLMs",
    content: (
      <>
        <DocsParagraph>
          {SITE_BRAND_NAME} publishes human-facing docs and machine-facing exports together.
          Use the registry JSON for structured integrations and the LLM text files for lightweight discovery.
        </DocsParagraph>
        <Snippet code={DOC_SNIPPETS.registrySnippet} language="text" />
        <div className="rounded-xl border p-4 bg-muted/20 text-sm space-y-2">
          <p className="font-semibold text-foreground">What each surface is for</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><DocsInlineCode>registry.json</DocsInlineCode> gives you global metadata, metrics, and the component index.</li>
            <li><DocsInlineCode>registry/components/*.json</DocsInlineCode> exposes per-component structured records.</li>
            <li><DocsInlineCode>registry/components/*.md</DocsInlineCode> exposes the matching markdown docs when available.</li>
            <li><DocsInlineCode>llms.txt</DocsInlineCode> is the compact discovery surface for agents and search systems.</li>
            <li><DocsInlineCode>llms-full.txt</DocsInlineCode> is the expanded docs-first reference for deeper traversal.</li>
          </ul>
        </div>
        <DocsParagraph>
          Canonical source code and issue tracking live on <a href={SITE_GITHUB_URL} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">GitHub</a>.
        </DocsParagraph>
      </>
    ),
  },
  principles: {
    title: "Design Principles",
    content: (
      <>
        <DocsParagraph>{SITE_BRAND_NAME} is built around four core principles:</DocsParagraph>
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
        <DocsParagraph>
          {SITE_BRAND_NAME} uses <strong>Tailwind CSS v4</strong> with the Vite plugin for zero-config setup.
          Component variants are managed with <DocsInlineCode>class-variance-authority</DocsInlineCode> and class merging is handled by <DocsInlineCode>tailwind-merge</DocsInlineCode>.
        </DocsParagraph>
        <Snippet code={DOC_SNIPPETS.stylingSnippet} language="tsx" filename="button.tsx" />
      </>
    ),
  },
  accessibility: {
    title: "Accessibility",
    content: (
      <>
        <DocsParagraph>
          {SITE_BRAND_NAME} is built on <strong>Radix UI</strong> primitives, which implement WAI-ARIA patterns out of the box.
        </DocsParagraph>
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
} as const;

export const DocsSidebar = ({ activePath }: { activePath?: string }): React.JSX.Element => {
  const groups = Array.from(new Set(DOCS_NAV_ITEMS.map((item) => item.group)));

  return (
    <aside className="hidden lg:block w-64 border-r sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-muted/5 shrink-0">
      <div className="p-5 space-y-6">
        {groups.map((group) => (
          <div key={group} className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-2 mb-2">{group}</p>
            {DOCS_NAV_ITEMS.filter((item) => item.group === group).map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={cn(
                  "block px-3 py-1.5 rounded-lg text-sm transition-colors",
                  activePath === item.path
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export const DocsOverviewPage = (): React.JSX.Element => (
  <div className="flex min-h-screen bg-background">
    <DocsSidebar activePath="/docs/introduction" />
    <main className="flex-1 py-16 min-w-0">
      <Container>
        <div className="space-y-0">
          {DOCS_NAV_ITEMS.filter((item) => item.path !== "/docs/cli" && item.path !== "/docs/theming").map((item) => {
            const section = DOC_SECTION_CONTENT[item.id as keyof typeof DOC_SECTION_CONTENT];

            return (
              <DocsSection key={item.id} title={section.title}>
                <div className="flex justify-end">
                  <Link to={item.path} className="text-sm text-primary hover:underline underline-offset-2">
                    Open page
                  </Link>
                </div>
                {section.content}
              </DocsSection>
            );
          })}
        </div>
      </Container>
    </main>
  </div>
);

export const CliDocsContent = (): React.JSX.Element => (
  <>
    <DocsParagraph>
      <DocsInlineCode>{SITE_CLI_COMMAND}</DocsInlineCode> is the canonical CLI contract for the registry workflow.
      The public registry and LLM exports are available now; the full install automation flow is being aligned to this command surface.
    </DocsParagraph>
    <div className="grid gap-8 md:grid-cols-2">
      <div className="p-8 border rounded-3xl bg-muted/5 space-y-4">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Palette className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">Command Surface</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Use the canonical command names now, even while install automation is still being aligned behind the scenes.
        </p>
        <Snippet code={`npx ${SITE_CLI_COMMAND} list\nnpx ${SITE_CLI_COMMAND} add button\nnpx ${SITE_CLI_COMMAND} init saas`} language="bash" />
      </div>
      <div className="p-8 border rounded-3xl bg-muted/5 space-y-4">
        <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
          <Zap className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-bold">Common Flows</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Add components, initialize templates, and inspect your local registry usage from a single CLI surface.
        </p>
        <Snippet code={DOC_SNIPPETS.cliSnippet} language="bash" />
      </div>
    </div>
    <div className="rounded-xl border p-4 bg-muted/20 text-sm space-y-2">
      <p className="font-semibold text-foreground">Available commands</p>
      <table className="w-full text-xs text-muted-foreground">
        <tbody>
          {[
            [`${SITE_CLI_COMMAND} list`, "List all installed components and blocks"],
            [`${SITE_CLI_COMMAND} add <name>`, "Download and install a component or block"],
            [`${SITE_CLI_COMMAND} remove <name>`, "Uninstall a component or block"],
            [`${SITE_CLI_COMMAND} init <template>`, "Scaffold a complete project (saas / erp / crm)"],
            [`${SITE_CLI_COMMAND} info <name>`, "Show details about an installed component"],
          ].map(([cmd, desc]) => (
            <tr key={cmd} className="border-b border-border/50 last:border-none">
              <td className="py-1.5 pr-6 font-mono text-foreground">{cmd}</td>
              <td className="py-1.5">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

export const ThemingDocsContent = (): React.JSX.Element => (
  <>
    <DocsParagraph>
      Customize every aspect of your application&apos;s appearance. {SITE_BRAND_NAME} uses CSS variables for effortless and dynamic theming.
    </DocsParagraph>
    <DocsSection title="CSS Variables">
      <DocsParagraph>
        The theme system is built on top of standard CSS variables. Override these in your global CSS file to change the look and feel of your entire app.
      </DocsParagraph>
      <Snippet code={DOC_SNIPPETS.themingVariables} language="css" />
    </DocsSection>
    <DocsSection title="Built-in Themes">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 border rounded-3xl bg-background space-y-3">
          <Sun className="h-5 w-5 text-amber-500" />
          <h4 className="font-bold">Light</h4>
          <p className="text-xs text-muted-foreground">Clean, high-contrast light mode for maximum legibility.</p>
        </div>
        <div className="p-6 border rounded-3xl bg-[#0f1115] text-white space-y-3">
          <Moon className="h-5 w-5 text-indigo-400" />
          <h4 className="font-bold">Dark</h4>
          <p className="text-xs text-muted-foreground">Sophisticated dark mode for reduced eye strain.</p>
        </div>
        <div className="p-6 border rounded-3xl bg-[#f0f2eb] text-[#2d331f] space-y-3">
          <Leaf className="h-5 w-5 text-emerald-600" />
          <h4 className="font-bold">Khaki</h4>
          <p className="text-xs text-muted-foreground">Organic, warm tones for a natural and approachable feel.</p>
        </div>
      </div>
    </DocsSection>
    <DocsSection title="Usage in Tailwind">
      <DocsParagraph>All variables are mapped to Tailwind utility classes automatically.</DocsParagraph>
      <Snippet code={DOC_SNIPPETS.themingTailwind} language="tsx" />
    </DocsSection>
  </>
);
