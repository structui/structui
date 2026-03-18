import Link from "next/link";
import {
  ArrowUpRight,
  Blocks,
  BookOpen,
  Code2,
  Component,
  Github,
  Globe,
  LayoutGrid,
  Palette,
  Shield,
  Terminal,
  Twitter,
  Zap,
} from "lucide-react";

import { cn } from "@/src/lib/utils";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/components", icon: Component },
      { label: "Blocks", href: "/blocks", icon: Blocks },
      { label: "Theme Creator", href: "/theme-creator", icon: Palette },
      { label: "R2Go Playground", href: "/r2go", icon: LayoutGrid },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Overview", href: "/docs", icon: BookOpen },
      { label: "CLI Reference", href: "/docs#cli", icon: Terminal },
      { label: "Registry API", href: "/docs#registry", icon: Code2 },
      { label: "Frameworks", href: "/docs#frameworks", icon: Globe },
    ],
  },
  {
    title: "More",
    links: [
      { label: "GitHub", href: "https://github.com/structui/structui", icon: Github, external: true },
      { label: "Twitter / X", href: "https://x.com/structui", icon: Twitter, external: true },
      { label: "Dashboard Demo", href: "/dashboard", icon: Shield },
      { label: "Changelog", href: "/docs#changelog", icon: Zap },
    ],
  },
];

const TECH_STACK = [
  { label: "Next.js 15" },
  { label: "Tailwind CSS v4" },
  { label: "Radix UI" },
  { label: "TypeScript" },
  { label: "Motion" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/structui/structui",
    icon: Github,
  },
  {
    label: "Twitter",
    href: "https://x.com/structui",
    icon: Twitter,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 overflow-hidden border-t border-border/50">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/4 blur-3xl" />

      {/* ── CTA Banner ── */}
      <div className="relative border-b border-border/40 bg-gradient-to-b from-primary/[0.04] to-transparent">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary/70">
                Get started free
              </p>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Add your first component in seconds
              </h2>
              <p className="text-sm text-muted-foreground">
                No config. Just copy the source or run the CLI.
              </p>
            </div>

            {/* Terminal snippet */}
            <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
              <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/80 pl-3.5 pr-2 py-2 font-mono text-xs backdrop-blur-sm">
                <span className="select-none text-muted-foreground/40">$</span>
                <span className="flex-1 text-foreground">npx sui add button</span>
                <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary">
                  Copy
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground/60">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Source files go straight into your project
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">

          {/* Brand column */}
          <div className="col-span-2 lg:col-span-4">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary">
                <span className="text-xs font-bold text-background">S</span>
              </div>
              <span className="text-base font-bold tracking-tight">
                S<span className="text-primary/50">UI</span>
              </span>
            </Link>

            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-muted-foreground">
              A source-first React component library. Browse, copy, install via CLI — you own every line of code.
            </p>

            {/* Tech stack pills */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {TECH_STACK.map((t) => (
                <span
                  key={t.label}
                  className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[10.5px] font-medium text-muted-foreground"
                >
                  {t.label}
                </span>
              ))}
            </div>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/60 bg-background/60 text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/8 hover:text-primary"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              ))}
              <a
                href="https://github.com/structui/structui"
                target="_blank"
                rel="noreferrer"
                className="ml-1 flex h-8 items-center gap-1.5 rounded-xl border border-border/60 bg-background/60 px-3 text-[11px] font-medium text-muted-foreground transition-all hover:border-primary/30 hover:bg-primary/8 hover:text-primary"
              >
                <Github className="h-3 w-3" />
                Star on GitHub
                <ArrowUpRight className="h-2.5 w-2.5 opacity-60" />
              </a>
            </div>
          </div>

          {/* Spacer on large screens */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.title} className="col-span-1 lg:col-span-2">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map(({ label, href, icon: Icon, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
                        <span>{label}</span>
                        <ArrowUpRight className="h-2.5 w-2.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100" />
                        <span>{label}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-border/40 bg-muted/10">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-3 text-[11.5px] text-muted-foreground/60 sm:flex-row">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span>© {year} SUI — StructUI. All rights reserved.</span>
              <span className="hidden h-3 w-px bg-border/60 sm:block" />
              <Link href="/docs" className="transition-colors hover:text-muted-foreground">
                Docs
              </Link>
              <Link href="/components" className="transition-colors hover:text-muted-foreground">
                Components
              </Link>
              <a
                href="https://github.com/structui/structui/blob/main/LICENSE"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-muted-foreground"
              >
                License
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Built with</span>
              <a
                href="https://nextjs.org"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Next.js
              </a>
              <span>&</span>
              <a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Tailwind CSS
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
