"use client";

import * as React from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Check,
  ChevronRight,
  CreditCard,
  Globe,
  Grid3X3,
  Layers,
  Lock,
  Mail,
  MessageSquare,
  Rocket,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

// ─── 1. Bento Marketing Section ───────────────────────────────────────────────

export function BentoMarketingBlock({ className }: { className?: string }) {
  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center space-y-4">
          <Badge variant="secondary" className="rounded-full px-3">
            <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
            Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Everything you need to ship
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A complete toolkit for building modern web applications. From design system to production.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Large card */}
          <div className="group lg:col-span-2 overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background p-8">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-2xl font-bold">Launch in days, not months</h3>
            <p className="text-muted-foreground mb-6">
              Pre-built components, blocks, and patterns let you go from idea to production faster than ever.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Components", value: "50+" },
                { label: "Blocks", value: "30+" },
                { label: "Templates", value: "10+" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border border-border/60 bg-background/60 p-3 text-center">
                  <p className="text-xl font-bold">{stat.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
              <Shield className="h-5 w-5 text-violet-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Type-safe by default</h3>
              <p className="text-sm text-muted-foreground">Full TypeScript support with accurate prop types and autocompletion.</p>
            </div>
            <div className="rounded-xl bg-muted/40 p-3 font-mono text-xs text-muted-foreground">
              <span className="text-blue-400">interface</span>{" "}
              <span className="text-emerald-400">ButtonProps</span> {"{"}
              <br />
              {"  "}variant<span className="text-orange-400">?</span>: <span className="text-amber-400">&apos;default&apos;</span>
              <br />
              {"}"}
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <Zap className="h-5 w-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">CLI-first workflow</h3>
              <p className="text-sm text-muted-foreground">Add any component in seconds. Source files go directly into your project.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background/60 p-3">
              <p className="font-mono text-xs text-muted-foreground/60">
                <span className="text-muted-foreground/30">$</span> npx sui add button
              </p>
              <p className="font-mono text-xs text-emerald-500 mt-1">✓ Added button to components/ui/</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <Globe className="h-5 w-5 text-amber-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Framework agnostic</h3>
              <p className="text-sm text-muted-foreground">Works with Next.js, Vite, Remix, and Astro.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Vite", "Remix", "Astro"].map((f) => (
                <span key={f} className="rounded-full border border-border/70 bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-3xl border border-border/70 bg-card p-6 space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/10">
              <Star className="h-5 w-5 text-rose-500" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Community-driven</h3>
              <p className="text-sm text-muted-foreground">Open source with an active community of contributors.</p>
            </div>
            <div className="flex -space-x-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-[10px] font-bold"
                  style={{
                    backgroundColor: ["#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"][i],
                    color: "#fff",
                  }}
                >
                  {["AJ", "BK", "CL", "DM", "EN", "FO"][i]}
                </div>
              ))}
              <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-bold text-muted-foreground">
                +99
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 2. Pricing Block ─────────────────────────────────────────────────────────

const PRICING_TIERS = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for side projects and prototypes.",
    badge: null,
    color: "border-border/70",
    features: [
      "50+ UI components",
      "Basic blocks library",
      "Community support",
      "MIT License",
      "CLI access",
    ],
    cta: "Get started",
    ctaVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "For professional developers and teams.",
    badge: "Most Popular",
    color: "border-primary/30 bg-gradient-to-b from-primary/5 to-background",
    features: [
      "Everything in Starter",
      "Premium block templates",
      "Priority support",
      "Advanced components",
      "Team license (5 seats)",
      "Early access to new components",
    ],
    cta: "Start free trial",
    ctaVariant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored for large organizations.",
    badge: null,
    color: "border-border/70",
    features: [
      "Everything in Pro",
      "Unlimited team seats",
      "Custom component development",
      "SLA & dedicated support",
      "White-label license",
      "On-premise deployment",
    ],
    cta: "Contact sales",
    ctaVariant: "outline" as const,
  },
];

export function PricingBlock({ className }: { className?: string }) {
  const [annual, setAnnual] = React.useState(false);

  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 text-center space-y-4">
          <Badge variant="secondary" className="rounded-full px-3">
            <CreditCard className="mr-1.5 h-3 w-3" />
            Pricing
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">Simple, transparent pricing</h2>
          <p className="text-muted-foreground">No hidden fees. Cancel anytime.</p>

          {/* Annual toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={cn("text-sm", !annual && "font-medium")}>Monthly</span>
            <button
              onClick={() => setAnnual((a) => !a)}
              className={cn(
                "relative h-6 w-11 rounded-full border border-border transition-colors",
                annual ? "bg-primary" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform",
                  annual ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
            <span className={cn("text-sm", annual && "font-medium")}>
              Annual
              <Badge variant="secondary" className="ml-1.5 rounded-full px-1.5 text-[10px]">
                Save 20%
              </Badge>
            </span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_TIERS.map((tier) => (
            <Card
              key={tier.name}
              className={cn(
                "relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg",
                tier.color,
              )}
            >
              {tier.badge && (
                <div className="absolute right-4 top-4">
                  <Badge className="rounded-full text-[11px]">{tier.badge}</Badge>
                </div>
              )}
              <CardHeader className="pb-4">
                <p className="text-sm font-semibold text-muted-foreground">{tier.name}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  )}
                  {annual && tier.price !== "Free" && tier.price !== "Custom" && (
                    <Badge variant="secondary" className="ml-1 rounded-full text-[10px]">
                      billed yearly
                    </Badge>
                  )}
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <Button
                  variant={tier.ctaVariant}
                  className="w-full rounded-full"
                >
                  {tier.cta}
                  {tier.ctaVariant === "default" && (
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  )}
                </Button>
                <ul className="space-y-2.5">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5 text-sm">
                      <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 3. Stats Section ─────────────────────────────────────────────────────────

export function StatsBlock({ className }: { className?: string }) {
  const stats = [
    { value: "50K+", label: "Developers", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { value: "200+", label: "Components & Blocks", icon: Grid3X3, color: "text-violet-500", bg: "bg-violet-500/10" },
    { value: "4.9", label: "Average Rating", icon: Star, color: "text-amber-500", bg: "bg-amber-500/10" },
    { value: "99.9%", label: "Uptime SLA", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ];

  return (
    <section className={cn("py-16", className)}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-primary/10 bg-gradient-to-br from-primary/8 via-background to-background">
          <div className="grid divide-y divide-border/50 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 lg:divide-y-0">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 px-8 py-10 text-center"
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 4. Testimonials Block ────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Frontend Lead @ Stripe",
    avatar: "SC",
    color: "bg-blue-500",
    stars: 5,
    text: "SUI has become our go-to component library. The source-first approach is exactly what enterprise teams need.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Solo Founder",
    avatar: "MR",
    color: "bg-violet-500",
    stars: 5,
    text: "I shipped my SaaS in 2 weeks using SUI blocks. The CLI workflow is incredibly smooth.",
  },
  {
    name: "Aisha Patel",
    role: "Design Engineer @ Linear",
    avatar: "AP",
    color: "bg-emerald-500",
    stars: 5,
    text: "The components are beautifully designed and the TypeScript types are rock solid. Highly recommend.",
  },
  {
    name: "Tom Bradley",
    role: "CTO @ Startup",
    avatar: "TB",
    color: "bg-amber-500",
    stars: 5,
    text: "Migrated our entire design system to SUI in a sprint. The docs are excellent.",
  },
  {
    name: "Yuki Tanaka",
    role: "Senior Developer",
    avatar: "YT",
    color: "bg-rose-500",
    stars: 5,
    text: "Best open source UI library I've used. The theme creator alone saves hours of work.",
  },
  {
    name: "Emma Wilson",
    role: "Product Engineer @ Vercel",
    avatar: "EW",
    color: "bg-cyan-500",
    stars: 5,
    text: "Clean APIs, great defaults, and easy to customize. SUI is a joy to work with.",
  },
];

export function TestimonialsBlock({ className }: { className?: string }) {
  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 text-center space-y-3">
          <Badge variant="secondary" className="rounded-full px-3">
            <MessageSquare className="mr-1.5 h-3 w-3" />
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">Loved by developers</h2>
          <p className="text-muted-foreground">Trusted by 50,000+ developers worldwide.</p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="mb-4 break-inside-avoid rounded-2xl border border-border/70 bg-card p-5 space-y-3"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                  style={{ backgroundColor: t.color.replace("bg-", "") }}
                >
                  <div className={cn("flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white", t.color)}>
                    {t.avatar}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold">{t.name}</p>
                  <p className="text-[11px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 5. Newsletter CTA Block ──────────────────────────────────────────────────

export function NewsletterBlock({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    await new Promise((r) => setTimeout(r, 1000));
    setState("success");
  };

  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tight">Stay in the loop</h2>
            <p className="text-muted-foreground">
              Get notified when we ship new components, blocks, and features.
              No spam, unsubscribe anytime.
            </p>
          </div>

          {state === "success" ? (
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-4">
              <Check className="h-5 w-5 text-emerald-500" />
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                You&apos;re subscribed!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <Button type="submit" className="rounded-full px-5" disabled={state === "loading"}>
                {state === "loading" ? "..." : "Subscribe"}
              </Button>
            </form>
          )}

          <p className="text-xs text-muted-foreground/60">
            Join 12,000+ developers. No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── 6. Feature Comparison Block ─────────────────────────────────────────────

const COMPARISON_FEATURES = [
  { feature: "Source code access", sui: true, shadcn: true, mui: false },
  { feature: "CLI component installer", sui: true, shadcn: true, mui: false },
  { feature: "Theme creator tool", sui: true, shadcn: false, mui: false },
  { feature: "Block templates", sui: true, shadcn: false, mui: false },
  { feature: "Tailwind CSS v4 support", sui: true, shadcn: false, mui: false },
  { feature: "No runtime dependency", sui: true, shadcn: true, mui: false },
  { feature: "Accessible (ARIA)", sui: true, shadcn: true, mui: true },
  { feature: "Dark mode built-in", sui: true, shadcn: true, mui: true },
  { feature: "TypeScript types", sui: true, shadcn: true, mui: true },
  { feature: "Open source", sui: true, shadcn: true, mui: true },
];

export function FeatureComparisonBlock({ className }: { className?: string }) {
  return (
    <section className={cn("py-20", className)}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-10 text-center space-y-3">
          <Badge variant="secondary" className="rounded-full px-3">
            <BarChart3 className="mr-1.5 h-3 w-3" />
            Comparison
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">How we compare</h2>
          <p className="text-muted-foreground">See how SUI stacks up against other popular libraries.</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70">
          <table className="w-full text-sm">
            <thead className="border-b border-border/70 bg-muted/30">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Feature
                </th>
                {["SUI", "shadcn/ui", "MUI"].map((lib) => (
                  <th
                    key={lib}
                    className={cn(
                      "px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider",
                      lib === "SUI" ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {lib}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {COMPARISON_FEATURES.map((row) => (
                <tr key={row.feature} className="transition-colors hover:bg-muted/20">
                  <td className="px-4 py-3 text-sm">{row.feature}</td>
                  {[row.sui, row.shadcn, row.mui].map((val, i) => (
                    <td key={i} className="px-4 py-3 text-center">
                      {val ? (
                        <Check className={cn("mx-auto h-4 w-4", i === 0 ? "text-primary" : "text-emerald-500")} />
                      ) : (
                        <span className="mx-auto block h-4 w-4 text-center font-mono text-xs text-muted-foreground/40">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── 7. Login Card Block ──────────────────────────────────────────────────────

export function LoginCardBlock({ className }: { className?: string }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  return (
    <div className={cn("flex min-h-screen items-center justify-center bg-background p-4", className)}>
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <Card className="border-border/70">
          <CardContent className="pt-6 space-y-4">
            {/* OAuth buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-border/70 bg-background text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="flex h-9 items-center justify-center gap-2 rounded-lg border border-border/70 bg-background text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-card px-3 text-[11px] text-muted-foreground">or continue with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-muted-foreground">Password</label>
                  <button type="button" className="text-[11px] text-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button type="submit" className="w-full rounded-lg" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <button className="text-primary hover:underline">Sign up free</button>
        </p>
      </div>
    </div>
  );
}
