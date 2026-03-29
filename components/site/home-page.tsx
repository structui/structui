import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Code2,
  Layers,
  Layers2,
  LayoutTemplate,
  Sparkles,
  TerminalSquare,
  Zap,
  Component,
  Github,
  Check,
} from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { cn } from "@/src/lib/utils";

interface HomePageProps {
  componentCount: number;
  docsCount: number;
  categoryCount: number;
}

const TRACKS = [
  { title: "Primitives", desc: "Low-level UI pieces with composable APIs and full source.", href: "/components", icon: Layers, tag: "Core" },
  { title: "Blocks", desc: "Production section templates for landing pages and dashboards.", href: "/blocks", icon: Blocks, tag: "Templates" },
  { title: "Setups", desc: "Next.js starter kits — CRM, ERP, SaaS. One command scaffold.", href: "/setups", icon: Layers2, tag: "Scaffold" },
  { title: "Schemes", desc: "One-page site structures for agencies, portfolios, and sectors.", href: "/schemes", icon: LayoutTemplate, tag: "Sites" },
  { title: "Theme Creator", desc: "Design tokens editor with live preview and Tailwind export.", href: "/theme-creator", icon: Sparkles, tag: "Design" },
  { title: "Docs", desc: "Markdown docs that render as full pages, synced to source.", href: "/docs", icon: BookOpen, tag: "Reference" },
];

const FEATURES = [
  { icon: Code2, title: "Source-first registry", desc: "Every component ships with its real source file. No black-box package, no surprise abstractions." },
  { icon: TerminalSquare, title: "CLI installer", desc: "`npx sui add <component>` copies the file directly into your project. Zero added dependencies." },
  { icon: Zap, title: "Zero config", desc: "Works with Next.js, Vite, Remix, and Astro out of the box." },
  { icon: Component, title: "48+ components", desc: "From primitives to kanban boards, data grids, and notification centers." },
  { icon: BookOpen, title: "Markdown docs", desc: "Documentation lives next to the component and renders as a full, navigable page." },
  { icon: Sparkles, title: "Open source", desc: "Full source access. Fork it, extend it, ship it under your brand — MIT licensed." },
];

const CATEGORIES = [
  { name: "Forms", count: 9 },
  { name: "Data Display", count: 8 },
  { name: "Overlay", count: 7 },
  { name: "Navigation", count: 4 },
  { name: "General", count: 7 },
  { name: "Advanced", count: 8 },
];

export function HomePage({ componentCount, docsCount, categoryCount }: HomePageProps) {
  return (
    <div className="overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative border-b border-border/60">
        {/* Radial glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_srgb,var(--primary)_11%,transparent),transparent_70%)]" />

        <Container className="relative py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-start">

            {/* Left */}
            <div className="space-y-8">
              <div className="space-y-5">
                <Link
                  href="/schemes"
                  className="group inline-flex items-center gap-2 border border-primary/30 bg-primary/8 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-primary transition-colors hover:bg-primary/14"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  New — OPS Schemes
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <h1 className="text-5xl font-bold leading-[1.07] tracking-tight md:text-[62px]">
                  Build real interfaces,{" "}
                  <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-primary to-primary/55 bg-clip-text text-transparent">
                    own the source.
                  </span>
                </h1>

                <p className="max-w-lg text-[17px] leading-relaxed text-muted-foreground">
                  SUI is a source-first component library. Preview components,
                  install via CLI, and get the actual source file in your project —
                  no black-box packages, no hidden deps.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/components"
                  className="inline-flex h-11 items-center gap-2 bg-primary px-6 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Browse Components
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/docs"
                  className="inline-flex h-11 items-center gap-2 border border-border/70 bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Read the Docs
                </Link>
                <a
                  href="https://github.com/structui/structui"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center gap-2 border border-border/70 bg-background px-5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>

            </div>

            {/* Right — bento panel */}
            <div className="grid gap-2.5">

              {/* Terminal */}
              <div className="overflow-hidden border border-border/70 bg-card shadow-xl shadow-black/8">
                <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/55" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/55" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/55" />
                  </div>
                  <span className="ml-1 text-[11px] text-muted-foreground">~ terminal</span>
                </div>
                <div className="divide-y divide-border/40 font-mono text-[12px]">
                  {[
                    { cmd: "npx sui add button", out: "✓  button.tsx → components/ui/" },
                    { cmd: "npx sui add data-table", out: "✓  data-table.tsx → components/ui/" },
                    { cmd: "npx sui add kanban-board", out: "✓  kanban-board.tsx → components/ui/" },
                  ].map(({ cmd, out }) => (
                    <div key={cmd} className="space-y-0.5 px-4 py-3">
                      <p className="text-muted-foreground/60"><span className="select-none text-muted-foreground/30">$ </span>{cmd}</p>
                      <p className="text-emerald-500 text-[11px]">{out}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini component mockups — 2 cols */}
              <div className="grid grid-cols-2 gap-2.5">

                {/* Button preview */}
                <div className="border border-border/60 bg-card p-4 space-y-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Button</p>
                  <div className="space-y-1.5">
                    <div className="flex h-8 w-full items-center justify-center bg-primary text-[11px] font-medium text-primary-foreground">
                      Continue
                    </div>
                    <div className="flex h-8 w-full items-center justify-center border border-border/70 text-[11px] text-muted-foreground">
                      Cancel
                    </div>
                  </div>
                </div>

                {/* Badge preview */}
                <div className="border border-border/60 bg-card p-4 space-y-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Badge</p>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[
                      { l: "New", c: "bg-primary/15 text-primary" },
                      { l: "Live", c: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
                      { l: "Beta", c: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
                      { l: "Draft", c: "bg-muted text-muted-foreground" },
                    ].map(({ l, c }) => (
                      <span key={l} className={cn("px-2 py-0.5 text-[10px] font-medium", c)}>{l}</span>
                    ))}
                  </div>
                </div>

                {/* Input preview */}
                <div className="border border-border/60 bg-card p-4 space-y-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Input</p>
                  <div className="space-y-1.5">
                    <div className="flex h-8 w-full items-center border border-border/70 bg-background px-2.5 text-[11px] text-muted-foreground/50">
                      Email address
                    </div>
                    <div className="flex h-8 w-full items-center border border-primary/50 bg-background px-2.5 text-[11px] text-foreground ring-1 ring-primary/20">
                      john@example.com
                    </div>
                  </div>
                </div>

                {/* Progress / data preview */}
                <div className="border border-border/60 bg-card p-4 space-y-2.5">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Progress</p>
                  <div className="space-y-2 pt-0.5">
                    {[
                      { l: "Design", v: 85 },
                      { l: "Build", v: 62 },
                      { l: "Deploy", v: 34 },
                    ].map(({ l, v }) => (
                      <div key={l} className="space-y-0.5">
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                          <span>{l}</span><span>{v}%</span>
                        </div>
                        <div className="h-1 w-full bg-muted">
                          <div className="h-full bg-primary/70" style={{ width: `${v}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 divide-x divide-border/60 border border-border/60 bg-card">
                {[
                  { v: `${componentCount}+`, l: "Components" },
                  { v: String(docsCount), l: "Doc pages" },
                  { v: String(categoryCount), l: "Categories" },
                ].map(({ v, l }) => (
                  <div key={l} className="flex flex-col items-center py-4">
                    <p className="text-xl font-bold tracking-tight">{v}</p>
                    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <Link key={c.name} href="/components">
                    <span className="inline-flex cursor-pointer items-center gap-1.5 border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground">
                      {c.name}
                      <span className="font-mono opacity-55">{c.count}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── TRACKS ───────────────────────────────────────────────────── */}
      <section className="border-b border-border/60">
        <Container className="py-16 space-y-7">
          <div className="flex items-end justify-between">
            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">What&apos;s included</p>
              <h2 className="text-2xl font-bold tracking-tight">Everything in one place</h2>
            </div>
          </div>

          <div className="grid gap-px border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {TRACKS.map((track) => (
              <Link key={track.title} href={track.href} className="group">
                <div className="flex h-full flex-col gap-3 bg-background p-5 transition-colors hover:bg-accent/50">
                  <div className="flex items-start justify-between">
                    <div className="flex h-8 w-8 items-center justify-center border border-border/70 bg-muted/50">
                      <track.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="border border-border/50 px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {track.tag}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">{track.title}</h3>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary/60" />
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">{track.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="border-b border-border/60">
        <Container className="py-16">
          <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
            {/* Left label */}
            <div className="space-y-3 lg:pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Why SUI</p>
              <h2 className="text-2xl font-bold tracking-tight leading-snug">
                Built for real projects
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Not a demo site — a system designed for shipping production interfaces with source control you actually own.
              </p>
              <Link
                href="/components"
                className="inline-flex items-center gap-1.5 text-sm text-primary underline-offset-4 hover:underline"
              >
                Browse all components <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Right grid */}
            <div className="grid gap-px border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-background p-5 space-y-2.5">
                  <f.icon className="h-4 w-4 text-primary/70" />
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section className="border-b border-border/60">
        <Container className="py-16 space-y-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">How it works</p>
          <div className="grid gap-px border border-border/60 bg-border/60 md:grid-cols-3">
            {[
              { n: "01", title: "Find", desc: "Open any component in the catalog — preview, source, and docs all in one view." },
              { n: "02", title: "Install", desc: "Run `npx sui add <name>`. The source file lands directly in your project." },
              { n: "03", title: "Ship", desc: "You own the file. Customize it, extend it, commit it. No upstream surprises." },
            ].map(({ n, title, desc }) => (
              <div key={n} className="space-y-4 bg-background p-7">
                <p className="font-mono text-5xl font-bold tracking-tighter text-muted-foreground/12 leading-none">
                  {n}
                </p>
                <div className="space-y-1.5">
                  <p className="text-base font-semibold">{title}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── QUICK ACCESS ─────────────────────────────────────────────── */}
      <section className="border-b border-border/60">
        <Container className="py-12">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "All Components", sub: `${componentCount}+ available`, href: "/components", icon: Layers },
              { label: "Blocks Library", sub: "Section templates", href: "/blocks", icon: Blocks },
              { label: "Theme Creator", sub: "Live token editor", href: "/theme-creator", icon: Sparkles },
              { label: "Docs", sub: `${docsCount} pages`, href: "/docs", icon: BookOpen },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-3 border border-border/60 bg-card/40 px-4 py-4 transition-colors hover:border-primary/25 hover:bg-accent/50"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-border/60 bg-muted/50">
                  <item.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground">{item.sub}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/25 transition-all group-hover:translate-x-0.5 group-hover:text-primary/60" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section>
        <Container className="py-20">
          <div className="grid gap-8 border border-border/60 bg-card/40 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 border border-border/60 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Check className="h-3 w-3 text-primary" />
                Open Source · MIT License
              </div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Start building today
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                Browse the registry, grab what you need, and ship with confidence.
                Full source included — always.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
              <Link
                href="/components"
                className="inline-flex h-11 items-center justify-center gap-2 bg-primary px-7 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                Browse Components
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="https://github.com/structui/structui"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 border border-border/70 bg-background px-7 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </Container>
      </section>

    </div>
  );
}
