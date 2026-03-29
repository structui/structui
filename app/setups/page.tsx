import type { Metadata } from "next";
import Link from "next/link";
import { Terminal, ArrowRight, Layers2, LayoutTemplate } from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { Badge } from "@/src/components/ui/badge";
import { SETUP_REGISTRY, SETUP_PAGES, SETUP_ICONS, SETUP_COLORS } from "@/src/setups/registry";

export const metadata: Metadata = {
  title: "Setups",
  description:
    "Full-stack Next.js starter kits — CRM, ERP, SaaS, and Auth. Scaffold production-ready apps in seconds with npx sui add.",
  alternates: { canonical: "/setups" },
  openGraph: {
    title: "Setups — SUI",
    description:
      "Full-stack Next.js starter kits for CRM, ERP, SaaS, and Auth. Install via CLI with npx sui add.",
    url: "/setups",
  },
};

const ACCENT_CLASSES: Record<string, { border: string; icon: string; badge: string; cmd: string }> = {
  blue:   { border: "group-hover:border-blue-500/40",   icon: "text-blue-400 bg-blue-500/10",   badge: "bg-blue-500/10 text-blue-400",   cmd: "border-blue-900 bg-blue-950/60 text-blue-300" },
  indigo: { border: "group-hover:border-indigo-500/40", icon: "text-indigo-400 bg-indigo-500/10", badge: "bg-indigo-500/10 text-indigo-400", cmd: "border-indigo-900 bg-indigo-950/60 text-indigo-300" },
  violet: { border: "group-hover:border-violet-500/40", icon: "text-violet-400 bg-violet-500/10", badge: "bg-violet-500/10 text-violet-400", cmd: "border-violet-900 bg-violet-950/60 text-violet-300" },
  emerald:{ border: "group-hover:border-emerald-500/40",icon: "text-emerald-400 bg-emerald-500/10",badge: "bg-emerald-500/10 text-emerald-400",cmd: "border-emerald-900 bg-emerald-950/60 text-emerald-300" },
};

export default function SetupsPage() {
  return (
    <div className="min-h-screen">
      <Container className="py-16 space-y-16">

        {/* Header */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2">
            <Layers2 className="w-5 h-5 text-violet-400" />
            <span className="text-sm font-medium text-muted-foreground">Setups</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            Production-ready app starters
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Scaffold a complete Next.js app with auth, routing, layout, and pages — in one command.
            Choose your color palette, auth provider, and output location interactively.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2 font-mono text-sm">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-muted-foreground">npx sui add</span>
              <span className="text-foreground">crm-setup</span>
            </div>
            <Badge variant="secondary">Interactive CLI</Badge>
          </div>
        </div>

        {/* Setup Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SETUP_REGISTRY.map((setup) => {
            const color = SETUP_COLORS[setup.name];
            const ac = ACCENT_CLASSES[color] ?? ACCENT_CLASSES.blue;
            const pages = SETUP_PAGES[setup.name];

            return (
              <Link
                key={setup.name}
                href={`/setups/${setup.name}`}
                className={`group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:shadow-lg hover:shadow-black/10 ${ac.border}`}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${ac.icon}`}>
                    {SETUP_ICONS[setup.name]}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>

                {/* Title & description */}
                <h2 className="text-lg font-semibold mb-1">{setup.label}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {setup.description}
                </p>

                {/* Pages */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {pages.map((page) => (
                    <span
                      key={page}
                      className={`px-2 py-0.5 rounded-md text-xs font-medium ${ac.badge}`}
                    >
                      {page}
                    </span>
                  ))}
                </div>

                {/* Install command */}
                <div className={`mt-auto flex items-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs ${ac.cmd}`}>
                  <Terminal className="w-3 h-3 shrink-0 opacity-60" />
                  npx sui add {setup.name}-setup
                </div>
              </Link>
            );
          })}
        </div>

        <div className="rounded-2xl border border-border bg-card/40 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                <LayoutTemplate className="h-3.5 w-3.5" />
                Schemes / OPS
              </div>
              <h2 className="text-xl font-semibold">Professional one-page website schemes</h2>
              <p className="text-sm text-muted-foreground">
                Review modern scheme packs for company profiles, portfolios, agencies,
                and sector-specific marketing sites.
              </p>
            </div>
            <Link
              href="/schemes"
              className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Open schemes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Auth providers section */}
        <div className="rounded-2xl border border-border bg-card/50 p-8 space-y-5">
          <h2 className="text-xl font-semibold">Supported auth providers</h2>
          <p className="text-sm text-muted-foreground max-w-xl">
            Every setup prompts you to choose an auth integration. Files and dependencies are generated automatically.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "None", desc: "Skip — add auth yourself later", icon: "⏭" },
              { name: "NextAuth.js", desc: "next-auth v5 beta, Credentials provider", icon: "🔐" },
              { name: "Better Auth", desc: "better-auth, database-agnostic", icon: "🛡" },
              { name: "Basic Auth (JWT)", desc: "Custom JWT cookies, zero dependency", icon: "🔑" },
            ].map((p) => (
              <div
                key={p.name}
                className="rounded-xl border border-border bg-background p-4 space-y-2"
              >
                <span className="text-2xl">{p.icon}</span>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Color palettes */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">10 color palettes</h2>
          <p className="text-sm text-muted-foreground">
            Pick a primary Tailwind color — every component, button, and accent in the generated app uses it consistently.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: "Slate",   tw: "bg-slate-500" },
              { name: "Blue",    tw: "bg-blue-500" },
              { name: "Indigo",  tw: "bg-indigo-500" },
              { name: "Violet",  tw: "bg-violet-500" },
              { name: "Purple",  tw: "bg-purple-500" },
              { name: "Rose",    tw: "bg-rose-500" },
              { name: "Orange",  tw: "bg-orange-500" },
              { name: "Emerald", tw: "bg-emerald-500" },
              { name: "Teal",    tw: "bg-teal-500" },
              { name: "Zinc",    tw: "bg-zinc-500" },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
                <span className={`w-3 h-3 rounded-full ${c.tw}`} />
                <span className="text-xs font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">How it works</h2>
          <ol className="space-y-4">
            {[
              { n: "1", title: "Run the command", body: "npx sui add crm-setup — the CLI starts an interactive prompt." },
              { n: "2", title: "Answer the questions", body: "Project title, color palette, auth provider, and where to place the files." },
              { n: "3", title: "Files are generated", body: "All pages, layouts, components, and auth configuration are written to disk." },
              { n: "4", title: "Dependencies installed", body: "npm install runs automatically for any required packages." },
              { n: "5", title: "Start building", body: "Run npm run dev — everything is wired up and ready to customize." },
            ].map((step) => (
              <li key={step.n} className="flex gap-4">
                <span className="w-7 h-7 shrink-0 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {step.n}
                </span>
                <div>
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

      </Container>
    </div>
  );
}
