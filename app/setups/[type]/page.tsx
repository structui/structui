import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Terminal, FileText, Package, CheckCircle2 } from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { Badge } from "@/src/components/ui/badge";
import { findSetup, SETUP_PAGES, SETUP_ICONS, SETUP_COLORS } from "@/src/setups/registry";
import type { SetupType, ColorPalette, AuthProvider } from "@/src/setups/types";

interface Props {
  params: Promise<{ type: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const setup = findSetup(type);
  if (!setup) return {};

  return {
    title: `${setup.label} Setup`,
    description: setup.description,
    alternates: { canonical: `/setups/${type}` },
    openGraph: {
      title: `${setup.label} Setup — SUI`,
      description: setup.description,
      url: `/setups/${type}`,
    },
  };
}

// Generate a small sample of the most important files for preview
function getSampleFiles(type: string): Array<{ path: string; lines: number }> {
  const samples: Record<string, Array<{ path: string; lines: number }>> = {
    crm: [
      { path: "app/(crm)/layout.tsx", lines: 16 },
      { path: "app/(crm)/dashboard/page.tsx", lines: 58 },
      { path: "app/(crm)/customers/page.tsx", lines: 55 },
      { path: "app/(auth)/sign-in/page.tsx", lines: 68 },
      { path: "components/layout/sidebar.tsx", lines: 72 },
      { path: "components/layout/header.tsx", lines: 24 },
      { path: "components/layout/footer.tsx", lines: 12 },
      { path: "app/(crm)/deals/page.tsx", lines: 55 },
      { path: "app/(crm)/activities/page.tsx", lines: 60 },
      { path: "app/(crm)/profile/page.tsx", lines: 58 },
    ],
    erp: [
      { path: "app/(erp)/layout.tsx", lines: 16 },
      { path: "app/(erp)/dashboard/page.tsx", lines: 55 },
      { path: "app/(erp)/inventory/page.tsx", lines: 58 },
      { path: "app/(erp)/orders/page.tsx", lines: 55 },
      { path: "app/(auth)/sign-in/page.tsx", lines: 68 },
      { path: "components/layout/sidebar.tsx", lines: 72 },
      { path: "app/(erp)/finance/page.tsx", lines: 20 },
      { path: "app/(erp)/hr/page.tsx", lines: 20 },
      { path: "app/(erp)/procurement/page.tsx", lines: 20 },
      { path: "app/(erp)/reports/page.tsx", lines: 20 },
    ],
    saas: [
      { path: "app/page.tsx", lines: 65 },
      { path: "app/(app)/layout.tsx", lines: 16 },
      { path: "app/(app)/dashboard/page.tsx", lines: 50 },
      { path: "app/(app)/billing/page.tsx", lines: 70 },
      { path: "app/(app)/users/page.tsx", lines: 52 },
      { path: "app/(app)/settings/page.tsx", lines: 48 },
      { path: "app/(auth)/sign-in/page.tsx", lines: 68 },
      { path: "components/layout/sidebar.tsx", lines: 72 },
      { path: "app/(app)/analytics/page.tsx", lines: 25 },
      { path: "app/(app)/profile/page.tsx", lines: 58 },
    ],
    auth: [
      { path: "app/(auth)/sign-in/page.tsx", lines: 68 },
      { path: "app/(auth)/sign-up/page.tsx", lines: 72 },
      { path: "app/(auth)/forgot-password/page.tsx", lines: 58 },
      { path: "app/(protected)/layout.tsx", lines: 22 },
      { path: "app/(protected)/home/page.tsx", lines: 38 },
      { path: "app/(auth)/layout.tsx", lines: 10 },
    ],
  };
  return samples[type] ?? [];
}

const PROVIDER_INFO: Record<AuthProvider, { label: string; pkg: string; desc: string }> = {
  none:         { label: "None",          pkg: "—",              desc: "No auth — add it yourself later" },
  "next-auth":  { label: "NextAuth.js",   pkg: "next-auth@beta", desc: "Credentials provider, sessions, middleware" },
  "better-auth":{ label: "Better Auth",   pkg: "better-auth",    desc: "Database-agnostic, email/password, middleware" },
  "basic-auth": { label: "Basic (JWT)",   pkg: "jose",           desc: "Custom JWT cookies, sign-in/up/out API routes" },
};

const ACCENT_CLASSES: Record<string, {
  hero: string; badge: string; cmd: string; file: string; check: string; providerActive: string;
}> = {
  blue:   { hero: "from-blue-500/10",   badge: "bg-blue-500/10 text-blue-400",   cmd: "border-blue-900 bg-blue-950/60 text-blue-300",   file: "text-blue-400",   check: "text-blue-400",   providerActive: "border-blue-600 bg-blue-950/40" },
  indigo: { hero: "from-indigo-500/10", badge: "bg-indigo-500/10 text-indigo-400",cmd: "border-indigo-900 bg-indigo-950/60 text-indigo-300",file: "text-indigo-400", check: "text-indigo-400", providerActive: "border-indigo-600 bg-indigo-950/40" },
  violet: { hero: "from-violet-500/10", badge: "bg-violet-500/10 text-violet-400",cmd: "border-violet-900 bg-violet-950/60 text-violet-300",file: "text-violet-400", check: "text-violet-400", providerActive: "border-violet-600 bg-violet-950/40" },
  emerald:{ hero: "from-emerald-500/10",badge: "bg-emerald-500/10 text-emerald-400",cmd: "border-emerald-900 bg-emerald-950/60 text-emerald-300",file: "text-emerald-400",check: "text-emerald-400", providerActive: "border-emerald-600 bg-emerald-950/40" },
};

export default async function SetupDetailPage({ params }: Props) {
  const { type } = await params;
  const setup = findSetup(type);
  if (!setup) notFound();

  const color = SETUP_COLORS[setup.name as SetupType];
  const ac = ACCENT_CLASSES[color] ?? ACCENT_CLASSES.blue;
  const pages = SETUP_PAGES[setup.name as SetupType];
  const sampleFiles = getSampleFiles(type);
  const authProviders: AuthProvider[] = ["none", "next-auth", "better-auth", "basic-auth"];
  const colorPalettes: ColorPalette[] = ["slate","blue","indigo","violet","purple","rose","orange","emerald","teal","zinc"];

  return (
    <div className="min-h-screen">
      <Container className="py-12 space-y-12">

        {/* Breadcrumb */}
        <Link
          href="/setups"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All setups
        </Link>

        {/* Hero */}
        <div className={`rounded-2xl border border-border bg-gradient-to-br ${ac.hero} to-transparent p-8 space-y-5`}>
          <div className="flex items-center gap-4">
            <div className="text-4xl">{SETUP_ICONS[setup.name as SetupType]}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold">{setup.label} Setup</h1>
                <Badge variant="secondary">Starter Kit</Badge>
              </div>
              <p className="text-muted-foreground">{setup.description}</p>
            </div>
          </div>

          {/* Install command */}
          <div className={`inline-flex items-center gap-3 rounded-xl border px-5 py-3 font-mono text-sm ${ac.cmd}`}>
            <Terminal className="w-4 h-4 shrink-0 opacity-60" />
            <span className="opacity-60">npx sui add</span>
            <span className="font-semibold">{setup.name}-setup</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: detail */}
          <div className="lg:col-span-2 space-y-8">

            {/* Pages included */}
            <section className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                Pages & routes
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {pages.map((page) => (
                  <div
                    key={page}
                    className="flex items-center gap-2 rounded-lg bg-muted/40 px-3 py-2"
                  >
                    <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${ac.check}`} />
                    <span className="text-sm">{page}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Generated files preview */}
            <section className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Package className="w-4 h-4 text-muted-foreground" />
                Generated files
              </h2>
              <div className="space-y-1">
                {sampleFiles.map((f) => (
                  <div
                    key={f.path}
                    className="flex items-center justify-between rounded-lg px-3 py-1.5 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                      <span className={`font-mono text-xs truncate ${ac.file}`}>{f.path}</span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 ml-4 tabular-nums">
                      ~{f.lines} lines
                    </span>
                  </div>
                ))}
                {/* Auth provider files note */}
                <div className="flex items-center gap-2.5 rounded-lg px-3 py-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-border shrink-0" />
                  <span className="font-mono text-xs text-muted-foreground italic">
                    + auth files (based on your chosen provider)
                  </span>
                </div>
              </div>
            </section>

            {/* Output location */}
            <section className="rounded-xl border border-border bg-card p-6 space-y-4">
              <h2 className="text-base font-semibold">Output options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border bg-background p-4 space-y-1.5">
                  <p className="text-sm font-medium">Main project</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Files written directly into your project root. Dependencies installed automatically. Ready to run.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-background p-4 space-y-1.5">
                  <p className="text-sm font-medium font-mono text-xs">struct/setups/{type}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Saved as a reference template. No dependencies installed. Copy files manually when ready.
                  </p>
                </div>
              </div>
            </section>

          </div>

          {/* Right: sidebar */}
          <div className="space-y-5">

            {/* Auth providers */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-semibold">Auth providers</h3>
              <div className="space-y-2">
                {authProviders.map((p) => {
                  const info = PROVIDER_INFO[p];
                  return (
                    <div
                      key={p}
                      className={`rounded-lg border p-3 space-y-0.5 ${
                        p !== "none" ? ac.providerActive : "border-border"
                      }`}
                    >
                      <p className="text-xs font-semibold">{info.label}</p>
                      <p className="text-xs text-muted-foreground">{info.desc}</p>
                      {info.pkg !== "—" && (
                        <p className={`text-xs font-mono mt-1 ${ac.file}`}>{info.pkg}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color palettes */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <h3 className="text-sm font-semibold">Color palettes</h3>
              <div className="grid grid-cols-5 gap-2">
                {colorPalettes.map((c) => (
                  <div key={c} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-7 h-7 rounded-md border border-border/50"
                      style={{ backgroundColor: PALETTE_HEX[c] }}
                    />
                    <span className="text-[10px] text-muted-foreground capitalize">{c}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick start */}
            <div className="rounded-xl border border-border bg-card p-5 space-y-3">
              <h3 className="text-sm font-semibold">Quick start</h3>
              <div className="space-y-2">
                {[
                  `npx sui add ${setup.name}-setup`,
                  "# Follow the prompts",
                  "npm run dev",
                ].map((cmd, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-muted/30 px-3 py-2 font-mono text-xs text-muted-foreground"
                  >
                    {cmd.startsWith("#") ? (
                      <span className="text-muted-foreground/50">{cmd}</span>
                    ) : (
                      cmd
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* All setups link */}
            <Link
              href="/setups"
              className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm hover:bg-muted/30 transition-colors"
            >
              <span className="text-muted-foreground">Browse all setups</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180 text-muted-foreground" />
            </Link>

          </div>
        </div>
      </Container>
    </div>
  );
}

// Hex values for color palette swatches (Tailwind 500)
const PALETTE_HEX: Record<ColorPalette, string> = {
  slate:   "#64748b",
  blue:    "#3b82f6",
  indigo:  "#6366f1",
  violet:  "#8b5cf6",
  purple:  "#a855f7",
  rose:    "#f43f5e",
  orange:  "#f97316",
  emerald: "#10b981",
  teal:    "#14b8a6",
  zinc:    "#71717a",
};
