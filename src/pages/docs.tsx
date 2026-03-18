import React, { useState } from "react";
import { Snippet } from "@/src/components/ui/snippet";
import { Container } from "@/src/components/layout/container";
import {
  getSiteMetrics,
  SITE_BRAND_NAME,
  SITE_CLI_COMMAND,
  SITE_GITHUB_URL,
  SITE_PACKAGE_NAME,
  SITE_URL,
} from "@/src/lib/registry";
import { cn } from "@/src/lib/utils";
import { ChevronRight, BookOpen, Terminal, Palette, Layers, Zap, Shield } from "lucide-react";

// ─── Doc Section ──────────────────────────────────────────────────────────────
const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-24 space-y-6 pb-16 border-b last:border-none">
    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
    {children}
  </section>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

const InlineCode = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-muted text-foreground px-1.5 py-0.5 rounded-md text-sm font-mono">
    {children}
  </code>
);

const Steps = ({ steps }: { steps: { n: number; title: string; desc: React.ReactNode }[] }) => (
  <ol className="space-y-6">
    {steps.map(s => (
      <li key={s.n} className="flex gap-4">
        <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
          {s.n}
        </div>
        <div className="space-y-2 flex-1">
          <p className="font-semibold text-sm">{s.title}</p>
          <div className="text-sm text-muted-foreground">{s.desc}</div>
        </div>
      </li>
    ))}
  </ol>
);

const Feature = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex gap-3 p-4 rounded-xl border bg-muted/20">
    <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-sm font-semibold mb-0.5">{title}</p>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

// ─── Sidebar nav ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "introduction", label: "Introduction", group: "Getting Started" },
  { id: "installation", label: "Installation", group: "Getting Started" },
  { id: "registry", label: "Registry & LLMs", group: "Getting Started" },
  { id: "theming", label: "Theming", group: "Getting Started" },
  { id: "cli", label: "CLI Usage", group: "Getting Started" },
  { id: "principles", label: "Design Principles", group: "Architecture" },
  { id: "styling", label: "Styling System", group: "Architecture" },
  { id: "accessibility", label: "Accessibility", group: "Architecture" },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export const DocsPage = () => {
  const [active, setActive] = useState("introduction");
  const siteMetrics = getSiteMetrics();
  const installCommand = `npm install ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge\n\n# pnpm (recommended)\npnpm add ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge\n\n# yarn\nyarn add ${SITE_PACKAGE_NAME} lucide-react motion clsx tailwind-merge`;
  const stylesImport = `@import "tailwindcss";\n@import "${SITE_PACKAGE_NAME}/styles";`;
  const componentImport = `import { Button } from "${SITE_PACKAGE_NAME}/button";\n\nexport default function App() {\n  return <Button variant="outline">Hello ${SITE_BRAND_NAME}</Button>;\n}`;
  const registrySnippet = `# Public machine-readable surfaces\n${SITE_URL}/registry.json\n${SITE_URL}/registry/index.json\n${SITE_URL}/registry/components/button.json\n${SITE_URL}/registry/components/button.md\n${SITE_URL}/llms.txt\n${SITE_URL}/llms-full.txt`;
  const cliSnippet = `# List installed components and blocks\nnpx ${SITE_CLI_COMMAND} list\n\n# Add a component\nnpx ${SITE_CLI_COMMAND} add button\nnpx ${SITE_CLI_COMMAND} add data-table-advanced\n\n# Add a block (prefix with block-)\nnpx ${SITE_CLI_COMMAND} add block-pricing\nnpx ${SITE_CLI_COMMAND} add block-dashboard\n\n# Remove a component\nnpx ${SITE_CLI_COMMAND} remove button\n\n# Initialize a full project template\nnpx ${SITE_CLI_COMMAND} init saas\nnpx ${SITE_CLI_COMMAND} init erp\nnpx ${SITE_CLI_COMMAND} init crm`;

  const groups = Array.from(new Set(NAV.map(n => n.group)));

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 border-r sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-muted/5 shrink-0">
        <div className="p-5 space-y-6">
          {groups.map(g => (
            <div key={g} className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 px-2 mb-2">{g}</p>
              {NAV.filter(n => n.group === g).map(n => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setActive(n.id)}
                  className={cn(
                    "block px-3 py-1.5 rounded-lg text-sm transition-colors",
                    active === n.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {n.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 py-16 min-w-0">
        <Container>
          <div className="space-y-0">

            {/* ── Introduction ── */}
            <Section id="introduction" title="Introduction">
              <P>
                {SITE_BRAND_NAME} is a registry-first React UI system. It ships reusable components,
                machine-readable metadata, and LLM-oriented discovery surfaces from the same source of truth.
              </P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Feature icon={<Zap className="w-4 h-4" />} title="Fast by default" desc="Tree-shaking, lazy-loading, and virtual scrolling built in." />
                <Feature icon={<Shield className="w-4 h-4" />} title="Accessible" desc="WAI-ARIA compliant, keyboard navigable, screen reader friendly." />
                <Feature icon={<Palette className="w-4 h-4" />} title="Themeable" desc="CSS variable-based system with 4 built-in themes and a visual Theme Creator." />
                <Feature icon={<Layers className="w-4 h-4" />} title={`${siteMetrics.totalComponents} Components`} desc={`${siteMetrics.documentedComponents} documented entries across ${siteMetrics.categories} categories.`} />
              </div>
            </Section>

            <Section id="registry" title="Registry & LLMs">
              <P>
                {SITE_BRAND_NAME} publishes human-facing docs and machine-facing exports together.
                Use the registry JSON for structured integrations and the LLM text files for lightweight discovery.
              </P>
              <Snippet
                code={registrySnippet}
                language="text"
              />
              <div className="rounded-xl border p-4 bg-muted/20 text-sm space-y-2">
                <p className="font-semibold text-foreground">What each surface is for</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li><InlineCode>registry.json</InlineCode> gives you global metadata, metrics, and the component index.</li>
                  <li><InlineCode>registry/components/*.json</InlineCode> exposes per-component structured records.</li>
                  <li><InlineCode>registry/components/*.md</InlineCode> exposes the matching markdown docs when available.</li>
                  <li><InlineCode>llms.txt</InlineCode> is the compact discovery surface for agents and search systems.</li>
                  <li><InlineCode>llms-full.txt</InlineCode> includes longer component context and embedded markdown docs.</li>
                </ul>
              </div>
              <P>
                Canonical source code and issue tracking live on <a href={SITE_GITHUB_URL} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">GitHub</a>.
              </P>
            </Section>

            {/* ── Installation ── */}
            <Section id="installation" title="Installation">
              <P>Install {SITE_BRAND_NAME} and its peer dependencies using your preferred package manager.</P>

              <Steps steps={[
                {
                  n: 1,
                  title: "Install packages",
                  desc: (
                    <Snippet
                      code={installCommand}
                      language="bash"
                    />
                  )
                },
                {
                  n: 2,
                  title: "Configure Tailwind CSS v4",
                  desc: (
                    <>
                      <p className="mb-2">Import StructUI's styles in your global CSS:</p>
                        <Snippet
                        code={stylesImport}
                        language="css"
                        filename="globals.css"
                      />
                    </>
                  )
                },
                {
                  n: 3,
                  title: "Add the utility helper",
                  desc: (
                    <>
                      <p className="mb-2">Create <InlineCode>src/lib/utils.ts</InlineCode>:</p>
                      <Snippet
                        code={`import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
                        language="ts"
                        filename="src/lib/utils.ts"
                      />
                    </>
                  )
                },
                {
                  n: 4,
                  title: "Use a component",
                  desc: (
                    <Snippet
                      code={componentImport}
                      language="tsx"
                      filename="App.tsx"
                    />
                  )
                }
              ]} />
            </Section>

            {/* ── Theming ── */}
            <Section id="theming" title="Theming">
              <P>
                {SITE_BRAND_NAME} uses CSS custom properties (variables) for theming. Override them in your
                global CSS to apply a custom theme instantly — no build step required.
              </P>
              <Snippet
                code={`:root {
  --background: #f7f8fa;
  --foreground: #1a1a1a;
  --card: #ffffff;
  --card-foreground: #1a1a1a;
  --primary: #1a1a1a;
  --primary-foreground: #f7f8fa;
  --secondary: #e2e4e9;
  --secondary-foreground: #1a1a1a;
  --muted: #e2e4e9;
  --muted-foreground: #6b7280;
  --accent: #e2e4e9;
  --accent-foreground: #1a1a1a;
  --border: #e2e4e9;
  --input: #e2e4e9;
  --ring: #1a1a1a;
  --radius: 0.25rem;
}

/* Dark mode */
.dark {
  --background: #0f1115;
  --foreground: #e2e4e9;
  --card: #14161a;
  --card-foreground: #e2e4e9;
  --primary: #e2e4e9;
  --primary-foreground: #0f1115;
  --muted: #1b1e23;
  --muted-foreground: #9ca3af;
  --border: #1b1e23;
}`}
                language="css"
                filename="globals.css"
              />
              <P>
                The <InlineCode>--radius</InlineCode> variable controls border-radius globally.
                Use the <a href="/theme-creator" className="text-primary underline underline-offset-2">Theme Creator</a> page
                to build and export a custom theme visually.
              </P>
            </Section>

            {/* ── CLI ── */}
            <Section id="cli" title="CLI Usage">
              <P>
                <InlineCode>{SITE_CLI_COMMAND}</InlineCode> is the canonical CLI contract for the registry workflow.
                The public registry and LLM exports are available now; the full install automation flow is being aligned to this command surface.
              </P>
              <Snippet
                code={cliSnippet}
                language="bash"
              />
              <div className="rounded-xl border p-4 bg-muted/20 text-sm space-y-2">
                <p className="font-semibold text-foreground">Available commands</p>
                <table className="w-full text-xs text-muted-foreground">
                  <tbody>
                    {[
                      [`${SITE_CLI_COMMAND} list`, "List all installed components and blocks"],
                      [`${SITE_CLI_COMMAND} add <name>`, "Download and install a component/block"],
                      [`${SITE_CLI_COMMAND} remove <name>`, "Uninstall a component/block"],
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
            </Section>

            {/* ── Design Principles ── */}
            <Section id="principles" title="Design Principles">
              <P>{SITE_BRAND_NAME} is built around four core principles:</P>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { title: "Clarity", desc: "Interfaces should be immediately understandable. Reduce cognitive load with consistent patterns." },
                  { title: "Efficiency", desc: "Minimize friction for developers with composable primitives and sane defaults." },
                  { title: "Accessibility", desc: "WAI-ARIA compliant. All interactions are keyboard navigable and screen-reader friendly." },
                  { title: "Consistency", desc: "A unified visual language across all components through shared CSS variables and Tailwind config." },
                ].map(p => (
                  <div key={p.title} className="p-4 rounded-xl border bg-muted/10">
                    <p className="font-semibold text-sm mb-1">{p.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* ── Styling ── */}
            <Section id="styling" title="Styling System">
              <P>
                {SITE_BRAND_NAME} uses <strong>Tailwind CSS v4</strong> with the Vite plugin for zero-config setup.
                Component variants are managed with <InlineCode>class-variance-authority</InlineCode> (CVA)
                and class merging is handled by <InlineCode>tailwind-merge</InlineCode>.
              </P>
              <Snippet
                code={`import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input bg-transparent hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);`}
                language="tsx"
                filename="button.tsx"
              />
            </Section>

            {/* ── Accessibility ── */}
            <Section id="accessibility" title="Accessibility">
              <P>
                StructUI is built on <strong>Radix UI</strong> primitives, which implement
                WAI-ARIA patterns out of the box. Every interactive component supports:
              </P>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  "Full keyboard navigation (Tab, Arrow keys, Enter, Space, Escape)",
                  "Screen reader announcements via aria-live regions",
                  "Focus management in dialogs, modals, and overlays",
                  "High contrast mode support",
                  "Reduced motion support via prefers-reduced-motion",
                  "Role and aria-* attributes on all interactive elements",
                ].map(item => (
                  <li key={item} className="flex gap-2">
                    <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Section>

          </div>
        </Container>
      </main>
    </div>
  );
};
