import type { Metadata } from "next";

import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileCode2,
  Globe,
  Layers,
  Package,
  Terminal,
  Workflow,
  Wrench,
  XCircle,
  Zap,
} from "lucide-react";

import { SiteSidebar } from "@/src/components/site/sidebar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Snippet } from "@/src/components/ui/snippet";
import { getAllMarkdownDocs } from "@/src/lib/content/docs";
import { cn } from "@/src/lib/utils";

const CLI_COMMANDS = [
  { cmd: "sui init", desc: "Initialize SUI in a project" },
  { cmd: "sui add <name>", desc: "Add a component or block" },
  { cmd: "sui search [query]", desc: "Search the registry" },
  { cmd: "sui info <name>", desc: "Inspect a package entry" },
  { cmd: "sui list", desc: "List installed components" },
  { cmd: "sui update [name]", desc: "Update a component to latest" },
  { cmd: "sui registry", desc: "View registry details" },
  { cmd: "sui doctor", desc: "Diagnose configuration issues" },
  { cmd: "sui version", desc: "Print CLI version" },
  { cmd: "sui help", desc: "Show usage information" },
];

const SUPPORTED_FRAMEWORKS = [
  {
    name: "Next.js",
    label: "Recommended",
    description:
      "Works with both App Router and Pages Router. The strongest path for credentials auth and source-first component workflows.",
    color: "text-blue-500",
    bg: "bg-blue-500/8",
    border: "border-blue-500/20",
  },
  {
    name: "Vite + React",
    label: "Supported",
    description:
      "If Tailwind CSS and React are already configured, component files can be copied in directly with zero friction.",
    color: "text-violet-500",
    bg: "bg-violet-500/8",
    border: "border-violet-500/20",
  },
  {
    name: "Remix / React Router",
    label: "Supported",
    description:
      "React-based pieces adapt well, with standard client/server boundaries for client-only components.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/20",
  },
  {
    name: "Astro + React",
    label: "Manual",
    description:
      "Source files can be used through a manual add workflow inside React islands.",
    color: "text-amber-500",
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
  },
];

const WORKFLOW_STEPS = [
  {
    title: "Catalog",
    description:
      "The registry catalog exposes components and blocks in a machine-readable index.",
    icon: Layers,
  },
  {
    title: "Inspect",
    description:
      "Each package has a detail document with dependencies, files, source paths, and download URLs.",
    icon: BookOpen,
  },
  {
    title: "Install",
    description:
      "Teams can install through CLI (`npx sui add <name>`), shadcn-style endpoints, or direct downloads.",
    icon: Terminal,
  },
  {
    title: "Compose",
    description:
      "Components and blocks can be composed in your own project without runtime vendor lock-in.",
    icon: FileCode2,
  },
  {
    title: "Distribute",
    description:
      "The backend serves CLI contract routes and shadcn-compatible routes from the same source catalog.",
    icon: Zap,
  },
];

const KEY_FILES = [
  "package.json",
  "src/lib/registry/distribution.ts",
  "src/lib/registry/catalog.ts",
  "app/api/registry/index.json/route.ts",
  "app/api/registry/components/[slug]/route.ts",
  "app/api/registry/blocks/[slug]/route.ts",
  "app/api/registry/download/[type]/[slug]/route.ts",
  "app/api/registry.json/route.ts",
  "app/api/r/index.json/route.ts",
  "app/api/r/[slug]/route.ts",
];

const BUILT_AREAS = [
  "Unified registry source layer for components and blocks",
  "CLI-friendly index and detail contracts under `/api/registry/...`",
  "Direct source download endpoint for component and block files",
  "shadcn-style index and item endpoints under `/api/registry.json` and `/api/r/...`",
  "Search filtering via query params (`?q=...`) on index routes",
  "Consistent English JSON error responses and cache headers",
];

const LIMITATIONS = [
  "Block package entries currently map selected existing component source files.",
  "Registry endpoints are public and do not include auth- or plan-based gating.",
  "Dependency installation is still executed by consumer tooling, not by the API itself.",
  "Semver release channels (stable, beta, canary) are not split yet.",
  "Package signatures and integrity hashes are not exposed yet.",
];

const NEXT_STEPS = [
  "Add dedicated source templates for every block package.",
  "Expose integrity hash fields to support secure installs.",
  "Add version channels and per-item changelog metadata.",
  "Add optional authentication and role-based package visibility.",
  "Ship CLI autofix flows for dependency sync and upgrade previews.",
];

const API_ENDPOINTS = [
  {
    path: "/api/registry/index.json",
    description: "Combined CLI index for all package types.",
  },
  {
    path: "/api/registry/components/index.json",
    description: "CLI index for component packages only.",
  },
  {
    path: "/api/registry/blocks/index.json",
    description: "CLI index for block packages only.",
  },
  {
    path: "/api/registry/components/:slug",
    description: "CLI detail payload for a single component package.",
  },
  {
    path: "/api/registry/blocks/:slug",
    description: "CLI detail payload for a single block package.",
  },
  {
    path: "/api/registry/download/:type/:slug",
    description: "Direct source file download endpoint.",
  },
  {
    path: "/api/registry.json",
    description: "shadcn-style registry index.",
  },
  {
    path: "/api/r/:slug",
    description: "shadcn-style registry item document.",
  },
];

export const metadata: Metadata = {
  title: "Docs",
  description:
    "SUI documentation — CLI reference, framework support, registry contract, and component-level markdown docs.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Documentation — SUI",
    description:
      "CLI reference, framework support, registry contract, and component-level markdown docs.",
    url: "/docs",
  },
};

export default async function Page() {
  const docs = await getAllMarkdownDocs();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SiteSidebar
        items={[
          {
            title: "Guide",
            items: [
              { title: "Overview", href: "/docs#overview" },
              { title: "How It Works", href: "/docs#workflow" },
              { title: "Framework Support", href: "/docs#frameworks" },
              { title: "CLI Surface", href: "/docs#cli" },
              { title: "Install Flows", href: "/docs#install-flows" },
              { title: "Registry API", href: "/docs#registry" },
              { title: "Current Status", href: "/docs#limitations" },
            ],
          },
          {
            title: "Component Docs",
            items: docs.map((doc) => ({
              title: doc.title,
              href: `/docs/components/${doc.slug}`,
            })),
          },
        ]}
        className="sticky top-12 hidden h-[calc(100vh-3rem)] w-60 shrink-0 overflow-y-auto border-r lg:block"
      />

      <main className="min-w-0 flex-1">
        <div className="mx-auto space-y-16 px-6 py-12 lg:px-10">

          {/* ── Overview ─────────────────────────────────────────────── */}
          <section id="overview" className="scroll-mt-20 space-y-8 md:scroll-mt-24">
            {/* Hero */}
            <div className="relative overflow-hidden rounded-3xl border border-primary/12 bg-gradient-to-br from-primary/10 via-background to-background px-8 py-10">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">
                    <BookOpen className="mr-1.5 h-3 w-3" />
                    Documentation
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1 text-xs text-muted-foreground">
                    v1.4
                  </Badge>
                </div>
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  SUI Docs
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                  SUI is a source-first system for React components and blocks.
                  Browse the catalog, read the docs, and use the CLI to add components
                  directly into your project.
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <Button asChild size="sm" className="rounded-full">
                    <Link href="/components">
                      Browse Components
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="rounded-full">
                    <Link href="#cli">CLI Reference</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Pillars */}
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "CLI-first",
                  description: "A ready command surface for the `npx sui ...` workflow.",
                  icon: Terminal,
                  color: "text-blue-500",
                  bg: "bg-blue-500/8",
                },
                {
                  title: "Registry-ready",
                  description: "A base layer for remote distribution through a JSON registry.",
                  icon: Package,
                  color: "text-violet-500",
                  bg: "bg-violet-500/8",
                },
                {
                  title: "Source-first",
                  description: "The real component file can be taken directly from the code tab.",
                  icon: FileCode2,
                  color: "text-emerald-500",
                  bg: "bg-emerald-500/8",
                },
                {
                  title: "Docs-linked",
                  description: "Markdown sources are automatically turned into HTML pages.",
                  icon: BookOpen,
                  color: "text-amber-500",
                  bg: "bg-amber-500/8",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-border/70 bg-card p-5"
                >
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", item.bg)}>
                    <item.icon className={cn("h-4 w-4", item.color)} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="border-t" />

          {/* ── How It Works ─────────────────────────────────────────── */}
          <section id="workflow" className="scroll-mt-20 space-y-6 md:scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Workflow
              </p>
              <h2 className="text-2xl font-bold tracking-tight">How SUI works</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                SUI is not just a component gallery. The catalog, markdown docs, and CLI
                install flow are designed to work together in a single workflow.
              </p>
            </div>

            <div className="relative space-y-0">
              {WORKFLOW_STEPS.map((step, index) => (
                <div key={step.title} className="group flex gap-4">
                  {/* Line */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/8 text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    {index < WORKFLOW_STEPS.length - 1 && (
                      <div className="mt-1 w-px flex-1 bg-border/60" style={{ minHeight: "28px" }} />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-3.5 w-3.5 text-muted-foreground/60" />
                      <p className="text-sm font-semibold">{step.title}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t" />

          {/* ── Framework Support ────────────────────────────────────── */}
          <section id="frameworks" className="scroll-mt-20 space-y-6 md:scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Compatibility
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Supported frameworks</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Built around React + Tailwind CSS, so it adapts anywhere React is part of the stack.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SUPPORTED_FRAMEWORKS.map((fw) => (
                <div
                  key={fw.name}
                  className={cn("rounded-2xl border p-5 transition-colors", fw.border, fw.bg)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Cpu className={cn("h-4 w-4 shrink-0", fw.color)} />
                      <p className="text-sm font-semibold">{fw.name}</p>
                    </div>
                    <span className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium", fw.border, fw.color)}>
                      {fw.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {fw.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="border-t" />

          {/* ── CLI ──────────────────────────────────────────────────── */}
          <section id="cli" className="scroll-mt-20 space-y-6 md:scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                CLI
              </p>
              <h2 className="text-2xl font-bold tracking-tight">CLI surface</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                StructUI packages can be installed from the <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">sui</code> command surface, backed by the registry API routes.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              {/* Commands */}
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-border/70 bg-card">
                  <div className="flex items-center gap-2 border-b bg-muted/30 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                    </div>
                    <span className="text-xs text-muted-foreground">terminal</span>
                  </div>
                  <div className="divide-y divide-border/50">
                    {CLI_COMMANDS.map(({ cmd, desc }) => (
                      <div key={cmd} className="flex items-center gap-4 px-4 py-2.5 transition-colors hover:bg-muted/20">
                        <code className="w-44 shrink-0 font-mono text-xs text-primary">{cmd}</code>
                        <span className="text-xs text-muted-foreground">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border/70 bg-card p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Built areas
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {BUILT_AREAS.map((item) => (
                      <div key={item} className="flex gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <Snippet
                  language="bash"
                  filename="cli-install-examples.sh"
                  code={`npx sui init
npx sui add button
npx sui add hero-section
npx sui info button
npx sui search pricing`}
                />
              </div>

              {/* Key files */}
              <div className="rounded-2xl border border-border/70 bg-card">
                <div className="border-b px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-3.5 w-3.5 text-muted-foreground" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key files
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-border/40">
                  {KEY_FILES.map((file) => (
                    <div key={file} className="flex items-center gap-2 px-4 py-2">
                      <FileCode2 className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                      <span className="font-mono text-xs text-muted-foreground">{file}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="border-t" />

          {/* ── Install Flows ───────────────────────────────────────── */}
          <section id="install-flows" className="scroll-mt-20 space-y-6 md:scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Install
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Component and block install flows</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                You can install with CLI, inspect detail payloads, and download raw source files directly from the API.
              </p>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Snippet
                language="bash"
                filename="install-component.sh"
                code={`# 1) List component packages
curl -s https://structui.com/api/registry/components/index.json | jq '.items[0]'

# 2) Inspect one package detail
curl -s https://structui.com/api/registry/components/button | jq '.files[0]'

# 3) Download source file directly
curl -L https://structui.com/api/registry/download/component/button -o button.tsx

# 4) CLI install
npx sui add button`}
              />
              <Snippet
                language="bash"
                filename="install-block.sh"
                code={`# 1) List block packages
curl -s https://structui.com/api/registry/blocks/index.json | jq '.items[0]'

# 2) Inspect one block package
curl -s https://structui.com/api/registry/blocks/hero-section | jq '.files[0]'

# 3) Download source file directly
curl -L https://structui.com/api/registry/download/block/hero-section -o hero-section.tsx

# 4) CLI install
npx sui add hero-section`}
              />
            </div>
          </section>

          <div className="border-t" />

          {/* ── Registry API ───────────────────────────────────────── */}
          <section id="registry" className="scroll-mt-20 space-y-6 md:scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Registry
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Registry API contract</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                StructUI serves both a CLI contract and shadcn-compatible contract from the same package catalog.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {API_ENDPOINTS.map((endpoint) => (
                <div
                  key={endpoint.path}
                  className="rounded-2xl border border-border/70 bg-card p-4"
                >
                  <div className="mb-1.5 flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5 text-primary/70" />
                    <code className="text-xs text-primary">{endpoint.path}</code>
                  </div>
                  <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Snippet
                language="json"
                filename="cli-index.json"
                code={`{
  "registryVersion": 1,
  "updatedAt": "2026-03-19T00:00:00.000Z",
  "message": "StructUI registry index generated successfully.",
  "source": "StructUI Registry API",
  "items": [
    {
      "name": "button",
      "type": "component",
      "version": "0.1.0",
      "description": "Interactive button with multiple variants and sizes.",
      "entrypoint": "components/button.json",
      "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
      "tags": ["action", "trigger", "form", "cta"]
    },
    {
      "name": "hero-section",
      "type": "block",
      "version": "0.1.0",
      "description": "Marketing hero section with CTA and headline content.",
      "entrypoint": "blocks/hero-section.json",
      "dependencies": [],
      "tags": ["hero", "marketing", "landing"]
    }
  ]
}`}
              />
              <Snippet
                language="json"
                filename="component-detail.json"
                code={`{
  "name": "button",
  "type": "component",
  "version": "0.1.0",
  "title": "Button",
  "description": "Interactive button with multiple variants and sizes.",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": [],
  "tags": ["action", "trigger", "form", "cta"],
  "files": [
    {
      "path": "button.tsx",
      "sourcePath": "src/components/ui/button.tsx",
      "target": "components/ui/button.tsx",
      "content": "..."
    }
  ],
  "downloadUrl": "/api/registry/download/component/button",
  "message": "Registry item generated successfully."
}`}
              />
              <Snippet
                language="json"
                filename="shadcn-index.json"
                code={`{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "structui",
  "homepage": "https://structui.com",
  "updatedAt": "2026-03-19T00:00:00.000Z",
  "items": [
    {
      "name": "button",
      "type": "registry:ui",
      "title": "Button",
      "description": "Interactive button with multiple variants and sizes.",
      "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
      "registryDependencies": []
    }
  ]
}`}
              />
              <Snippet
                language="json"
                filename="shadcn-item.json"
                code={`{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "button",
  "type": "registry:ui",
  "title": "Button",
  "description": "Interactive button with multiple variants and sizes.",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": [],
  "files": [
    {
      "path": "button.tsx",
      "type": "registry:ui",
      "target": "components/ui/button.tsx",
      "content": "..."
    }
  ]
}`}
              />
            </div>
          </section>

          <div className="border-t" />

          {/* ── Limitations + Next Steps ──────────────────────────────── */}
          <section id="limitations" className="scroll-mt-20 space-y-6 md:scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Status
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Current state</h2>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-amber-500" />
                  <p className="text-sm font-semibold">Known limitations</p>
                </div>
                <div className="space-y-2">
                  {LIMITATIONS.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-xl border border-amber-500/10 bg-amber-500/5 p-3"
                    >
                      <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                      <span className="text-xs leading-relaxed text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Blocks className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold">Recommended next steps</p>
                </div>
                <div className="space-y-2">
                  {NEXT_STEPS.map((item, i) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-xl border border-primary/10 bg-primary/4 p-3"
                    >
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                        {i + 1}
                      </div>
                      <span className="text-xs leading-relaxed text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="border-t" />

          {/* ── Component Docs ───────────────────────────────────────── */}
          {docs.length > 0 && (
            <section className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Component Docs
                </p>
                <h2 className="text-2xl font-bold tracking-tight">Markdown documentation</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Generated from markdown files under{" "}
                  <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                    docs/components
                  </code>
                  .
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/components/${doc.slug}`}
                    className="group flex items-center justify-between rounded-2xl border border-border/70 bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/8">
                        <Layers className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="line-clamp-1 text-xs text-muted-foreground">{doc.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary/60" />
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}
