import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  BookOpen,
  Code2,
  Component,
  Layers,
  Layers2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { cn } from "@/src/lib/utils";

interface HomePageProps {
  componentCount: number;
  docsCount: number;
  categoryCount: number;
}

const BUILD_TRACKS = [
  {
    title: "Primitives",
    description: "Low-level UI pieces with clean source ownership and composable APIs.",
    href: "/components",
    icon: Layers,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/30",
  },
  {
    title: "Blocks",
    description: "Production section templates for landing pages, apps, and dashboards.",
    href: "/blocks",
    icon: Blocks,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "group-hover:border-violet-500/30",
  },
  {
    title: "Theme Creator",
    description: "Design tokens editor with live preview and CSS/Tailwind export.",
    href: "/theme-creator",
    icon: Sparkles,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "group-hover:border-rose-500/30",
  },
  {
    title: "Docs",
    description: "Markdown docs that stay in sync with component source and usage.",
    href: "/docs",
    icon: BookOpen,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/30",
  },
  {
    title: "Setups",
    description: "Full-stack Next.js starter kits — CRM, ERP, SaaS, Auth. One command, instant scaffold.",
    href: "/setups",
    icon: Layers2,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
    border: "group-hover:border-teal-500/30",
  },
  {
    title: "Auth Demo",
    description: "Credentials flow with protected routes and modal-first sign-in UX.",
    href: "/dashboard",
    icon: ShieldCheck,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "group-hover:border-amber-500/30",
  },
];

const FEATURES = [
  {
    title: "Source-first registry",
    description: "Every component ships with its real source file, not a black-box package.",
    icon: Code2,
  },
  {
    title: "Markdown docs",
    description: "Documentation lives next to the component and renders as a full page.",
    icon: BookOpen,
  },
  {
    title: "48+ components",
    description: "From primitives to complex data grids, kanban boards, and notification centers.",
    icon: Component,
  },
  {
    title: "CLI-ready",
    description: "Add any component to your project with a single `npx sui add` command.",
    icon: TerminalSquare,
  },
  {
    title: "Zero config",
    description: "Works with Next.js, Vite, Remix, and Astro out of the box.",
    icon: Zap,
  },
  {
    title: "Open source",
    description: "Full source access. Fork it, extend it, ship it under your brand.",
    icon: Sparkles,
  },
];

const FLOW_STEPS = [
  {
    title: "Find",
    description: "Open component previews, source, and docs in one catalog flow.",
    step: "01",
  },
  {
    title: "Compose",
    description: "Combine primitives and blocks into page-ready sections fast.",
    step: "02",
  },
  {
    title: "Ship",
    description: "Move from prototype to production while keeping source control in-house.",
    step: "03",
  },
];

const COMPONENT_CATEGORIES = [
  { name: "Forms", count: 9, color: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
  { name: "Data Display", count: 8, color: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  { name: "Overlay", count: 7, color: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
  { name: "Navigation", count: 4, color: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  { name: "General", count: 7, color: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
  { name: "Advanced", count: 8, color: "bg-primary/15 text-primary" },
];

export function HomePage({ componentCount, docsCount, categoryCount }: HomePageProps) {
  return (
    <div className="relative overflow-hidden pb-28">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(ellipse_at_20%_10%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_55%),radial-gradient(ellipse_at_80%_0%,color-mix(in_srgb,var(--primary)_8%,transparent),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <Container className="relative space-y-24 pt-14">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-7">
            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-bold tracking-tight leading-[1.1] md:text-6xl lg:text-[64px]">
                Build real interfaces,{" "}
                <span className="relative">
                  <span className="relative z-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    own the source.
                  </span>
                </span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                SUI gives you preview, source, install guidance, and docs
                in a single workflow—no black-box dependencies.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6">
                <Link href="/components">
                  Explore Components <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-6">
                <Link href="/docs">Read Docs</Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:max-w-sm">
              {[
                { label: "Components", value: componentCount, suffix: "+" },
                { label: "Doc Pages", value: docsCount },
                { label: "Categories", value: categoryCount },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-border/70 bg-background/80 p-3 text-center"
                >
                  <p className="text-2xl font-bold tracking-tight">
                    {item.value}{item.suffix}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero card */}
          <div className="space-y-3">
            <Card className="overflow-hidden border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background shadow-xl shadow-primary/5">
              <CardHeader className="border-b border-border/70 bg-background/40 pb-3 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-rose-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground">terminal</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-5">
                <div className="space-y-2 rounded-xl bg-muted/40 p-4 font-mono text-sm">
                  <p className="text-muted-foreground/60">
                    <span className="text-muted-foreground/40">$</span>{" "}
                    npx sui add button
                  </p>
                  <p className="text-emerald-500">✓ Added button to components/ui/</p>
                  <p className="text-muted-foreground/60">
                    <span className="text-muted-foreground/40">$</span>{" "}
                    npx sui add notification-center
                  </p>
                  <p className="text-emerald-500">✓ Added notification-center to components/ui/</p>
                  <p className="text-muted-foreground/60">
                    <span className="text-muted-foreground/40">$</span>{" "}
                    npx sui add multi-step-form
                  </p>
                  <p className="text-emerald-500">✓ Added multi-step-form to components/ui/</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Source files copied directly into your project. No runtime deps.
                </p>
              </CardContent>
            </Card>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {COMPONENT_CATEGORIES.map((cat) => (
                <Link key={cat.name} href={`/components`}>
                  <span className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-opacity hover:opacity-80", cat.color)}>
                    {cat.name}
                    <span className="font-mono text-[10px] opacity-70">{cat.count}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Build Tracks ─────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              What&apos;s included
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Everything in one place</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {BUILD_TRACKS.map((track) => (
              <Link key={track.title} href={track.href} className="group">
                <Card className={cn(
                  "h-full border-border/80 bg-background/75 transition-all hover:-translate-y-0.5 hover:shadow-lg",
                  track.border,
                )}>
                  <CardHeader className="space-y-3">
                    <div className={cn("flex h-9 w-9 items-center justify-center rounded-xl border border-border/60", track.bg)}>
                      <track.icon className={cn("h-4 w-4", track.color)} />
                    </div>
                    <div>
                      <CardTitle className="flex items-center justify-between text-base font-semibold">
                        {track.title}
                        <ArrowRight className="h-4 w-4 text-muted-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:text-primary/60" />
                      </CardTitle>
                      <CardDescription className="mt-1 text-sm leading-relaxed">
                        {track.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Features grid ────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Why SUI
            </p>
            <h2 className="text-3xl font-bold tracking-tight">Built for real projects</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border/70 bg-background/60 p-5 transition-colors hover:border-primary/20 hover:bg-card"
              >
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-xl border border-primary/20 bg-primary/8">
                  <feature.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="mb-1 text-sm font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Workflow + Links ──────────────────────────────────────────── */}
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="border-primary/10 bg-gradient-to-br from-background via-background to-primary/5">
            <CardHeader className="pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Workflow
              </p>
              <CardTitle className="text-2xl font-bold">From catalog to production</CardTitle>
              <CardDescription className="text-sm">
                A three-step path tuned for teams that want speed and source control together.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {FLOW_STEPS.map((step) => (
                <div key={step.title} className="relative rounded-2xl border bg-background/80 p-4">
                  <p className="mb-2 font-mono text-3xl font-bold leading-none text-primary/15">
                    {step.step}
                  </p>
                  <p className="mb-1 text-sm font-semibold">{step.title}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <TerminalSquare className="h-4 w-4 text-primary" />
                Quick links
              </CardTitle>
              <CardDescription className="text-xs">
                Jump to the most useful entry points.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { label: "All Components", href: "/components", icon: Layers },
                { label: "Blocks Library", href: "/blocks", icon: Blocks },
                { label: "Theme Creator", href: "/theme-creator", icon: Sparkles },
                { label: "Markdown Docs", href: "/docs", icon: BookOpen },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 rounded-xl border border-border/60 bg-background px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/25 hover:text-foreground"
                >
                  <item.icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                  <span className="flex-1">{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/30 transition-all group-hover:translate-x-0.5 group-hover:text-primary/60" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-primary/5 px-8 py-12 text-center">
          <div className="mx-auto max-w-xl space-y-4">
            <Badge variant="secondary" className="rounded-full px-3 py-1">
              Open Source
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Start building today</h2>
            <p className="text-base text-muted-foreground">
              Browse the registry, grab what you need, and ship with confidence.
              All source included.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-8">
                <Link href="/components">
                  Browse Components <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-11 rounded-full px-8">
                <a href="https://github.com/structui/structui" target="_blank" rel="noreferrer">
                  View on GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>

      </Container>
    </div>
  );
}
