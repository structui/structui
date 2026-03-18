import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Container } from "@/src/components/layout/container";
import { Snippet } from "@/src/components/ui/snippet";
import { GridBackground } from "@/src/components/effects/grid-background";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";
import { BentoGrid, BentoGridItem } from "@/src/components/ui/bento-grid";
import { Card, CardContent } from "@/src/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/src/components/ui/accordion";
import {
  getSiteMetrics,
  SITE_BRAND_NAME,
  SITE_CLI_COMMAND,
  SITE_PACKAGE_NAME,
} from "@/src/lib/registry";
import { useInView } from "motion/react";
import {
  ArrowRight, Zap, Shield, Layout, Code2, Sparkles, CheckCircle2,
  Layers, Star, Terminal, Package, Globe, Cpu, MousePointer2,
  BarChart3, Calendar, Trello, Command, Palette, Blocks
} from "lucide-react";

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

// ─── Component Preview Card ───────────────────────────────────────────────────
const PreviewCard = ({ icon, label, color }: { icon: React.ReactNode; label: string; color: string }) => (
  <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl border bg-card text-xs font-medium text-card-foreground shadow-sm">
    <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: color + "20", color }}>
      {icon}
    </div>
    {label}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
export const HomePage = () => {
  const AVATARS = [1, 2, 3, 4, 5];
  const siteMetrics = getSiteMetrics();
  const siteStats = [
    { label: "Components", value: siteMetrics.totalComponents },
    { label: "Documented", value: siteMetrics.documentedComponents },
    { label: "Stable", value: siteMetrics.stableComponents },
    { label: "Categories", value: siteMetrics.categories },
  ];
  const featuredPreviewItems = [
    { icon: <MousePointer2 className="w-3 h-3" />, label: "Button", color: "#6366f1" },
    { icon: <Layers className="w-3 h-3" />, label: "Accordion", color: "#10b981" },
    { icon: <BarChart3 className="w-3 h-3" />, label: "Charts", color: "#f59e0b" },
    { icon: <Calendar className="w-3 h-3" />, label: "Calendar", color: "#3b82f6" },
    { icon: <Trello className="w-3 h-3" />, label: "Kanban", color: "#ec4899" },
    { icon: <Command className="w-3 h-3" />, label: "Command", color: "#8b5cf6" },
    { icon: <Palette className="w-3 h-3" />, label: "Theme Creator", color: "#ef4444" },
    { icon: <Blocks className="w-3 h-3" />, label: "Blocks", color: "#14b8a6" },
  ];
  const cliSnippet = `# Install the CLI\nnpm install -g ${SITE_PACKAGE_NAME}\n\n# Add a component\nnpx ${SITE_CLI_COMMAND} add button\nnpx ${SITE_CLI_COMMAND} add data-table-advanced\n\n# Add a full block\nnpx ${SITE_CLI_COMMAND} add block-dashboard\n\n# Initialize a project template\nnpx ${SITE_CLI_COMMAND} init saas`;

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-background">
      <GridBackground className="opacity-[0.04]" />

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-28">
        <Container>
          <div className="max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-foreground">
              Build{" "}
              <span className="text-primary">Reliable</span>{" "}
              Interfaces at Scale.
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              {SITE_BRAND_NAME} is a professional-grade component library for React — accessible, animated, and built with
              Radix UI + Tailwind CSS v4. Ship faster without compromising quality.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-3 pt-2">
              <Button asChild size="lg" className="h-12 px-8 rounded-xl text-base font-semibold shadow-lg shadow-primary/20">
                <Link to="/components">
                  Explore Components <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-xl text-base">
                <Link to="/docs">View Docs</Link>
              </Button>
            </div>

            {/* Avatars + social proof */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2.5">
                {AVATARS.map(i => (
                  <Avatar key={i} className="border-2 border-background w-9 h-9">
                    <AvatarImage src={`https://i.pravatar.cc/150?u=dev${i}`} />
                    <AvatarFallback className="text-xs">D{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-current" />)}
                </div>
                <p className="text-xs text-muted-foreground">Currently shipping <strong className="text-foreground">{siteMetrics.documentedComponents}</strong> documented components</p>
              </div>
            </div>
          </div>

          {/* Component strip */}
          <div className="flex flex-wrap gap-2 mt-12">
            {featuredPreviewItems.map((item) => (
              <div key={item.label}>
                <PreviewCard icon={item.icon} label={item.label} color={item.color} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════ STATS ════════════════════════ */}
      <section className="border-y border-border bg-muted/20">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {siteStats.map((stat) => (
              <div key={stat.label} className="py-10 px-8">
                <p className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  <Counter to={stat.value} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════ BENTO FEATURES ════════════════════════ */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="mb-14 space-y-3">
            <Badge variant="secondary" className="rounded-full px-3">Why StructUI?</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Everything you need to ship.</h2>
            <p className="text-muted-foreground max-w-xl">
              Built for developers who care about quality, performance, and accessibility.
            </p>
          </div>

          <BentoGrid className="md:auto-rows-[16rem]">
            <BentoGridItem
              className="md:col-span-2"
              title={`${siteMetrics.totalComponents} Registry-Tracked Components`}
              description={`${siteMetrics.documentedComponents} documented entries across ${siteMetrics.categories} categories. Every component is tracked through a single typed registry.`}
              icon={<Layers className="w-4 h-4" />}
              header={
                <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center gap-3 flex-wrap p-4">
                  {["Button","Badge","Card","Input","Table","Chart","Kanban","Calendar","Tabs","Accordion"].map(c => (
                    <span key={c} className="px-2.5 py-1 bg-background border rounded-lg text-xs font-medium text-foreground/70 shadow-sm">{c}</span>
                  ))}
                </div>
              }
            />
            <BentoGridItem
              title="Animated by Default"
              description="Smooth, performant animations powered by Motion (Framer Motion)."
              icon={<Zap className="w-4 h-4" />}
              header={
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                </div>
              }
            />
            <BentoGridItem
              title="WAI-ARIA Accessible"
              description="Every component follows accessibility standards. Keyboard navigable, screen reader friendly."
              icon={<Shield className="w-4 h-4" />}
              header={
                <div className="w-full h-full flex items-center justify-center gap-3">
                  {["Tab ↹", "Enter ↵", "Esc", "↑↓"].map(k => (
                    <kbd key={k} className="px-2 py-1 bg-muted border rounded text-xs font-mono shadow-sm text-muted-foreground">{k}</kbd>
                  ))}
                </div>
              }
            />
            <BentoGridItem
              className="md:col-span-2"
              title="Theme Creator & CSS Variables"
              description="4 built-in themes + a visual Theme Creator. CSS variable-based system means instant customization with zero rebuild."
              icon={<Palette className="w-4 h-4" />}
              header={
                <div className="w-full h-full flex items-center justify-center gap-2 p-4">
                  {[
                    { name: "Light", bg: "#f7f8fa", fg: "#1a1a1a" },
                    { name: "Dark", bg: "#0f1115", fg: "#e2e4e9" },
                    { name: "Khaki", bg: "#f0f2eb", fg: "#2d331f" },
                    { name: "Custom", bg: "#faf5ff", fg: "#7c3aed" },
                  ].map(t => (
                    <div key={t.name} className="flex flex-col items-center gap-1.5">
                      <div
                        className="w-14 h-10 rounded-xl border shadow-sm flex items-center justify-center text-[10px] font-bold"
                        style={{ background: t.bg, color: t.fg, borderColor: t.fg + "20" }}
                      >Aa</div>
                      <span className="text-[10px] text-muted-foreground">{t.name}</span>
                    </div>
                  ))}
                </div>
              }
            />
          </BentoGrid>
        </Container>
      </section>

      {/* ════════════════════════ CLI INSTALL ════════════════════════ */}
      <section className="py-20 border-y bg-muted/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-primary" />
                <Badge variant="secondary" className="rounded-full px-3">CLI</Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Install components with one command.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-sm text-foreground">{SITE_CLI_COMMAND}</code> CLI
                lets you add, remove, and scaffold components directly from the registry.
                No manual file copying.
              </p>
              <ul className="space-y-2">
                {[
                  "Add individual components or full blocks",
                  "Remove components you no longer need",
                  "Initialize SaaS, ERP, or CRM project templates",
                  "List and inspect all installed components",
                ].map(f => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/docs#cli"><Terminal className="w-4 h-4" /> CLI Docs</Link>
                </Button>
                <Button asChild className="gap-2">
                  <Link to="/r2go"><Package className="w-4 h-4" /> R2Go Templates</Link>
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Snippet
                code={cliSnippet}
                language="bash"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════ COMPONENT SHOWCASE ════════════════════════ */}
      <section className="py-24">
        <Container>
          <div className="mb-14 space-y-3">
            <Badge variant="secondary" className="rounded-full px-3">Blocks</Badge>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready-to-use sections.</h2>
            <p className="text-muted-foreground max-w-xl">
              Copy and paste full sections into your app. Hero, pricing, testimonials, stats, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Analytics Dashboard", desc: "Charts, KPIs, and data tables for your admin panel.", icon: <BarChart3 className="w-5 h-5" />, href: "/blocks", color: "#6366f1" },
              { title: "Auth Pages", desc: "Sign in and sign up forms with OAuth buttons.", icon: <Shield className="w-5 h-5" />, href: "/blocks", color: "#10b981" },
              { title: "Pricing Sections", desc: "Monthly/yearly toggle with feature comparison.", icon: <CheckCircle2 className="w-5 h-5" />, href: "/blocks", color: "#f59e0b" },
              { title: "Hero Sections", desc: "Centered, split, and gradient hero layouts.", icon: <Globe className="w-5 h-5" />, href: "/blocks", color: "#3b82f6" },
              { title: "Kanban Board", desc: "Drag-and-drop task management board.", icon: <Trello className="w-5 h-5" />, href: "/blocks", color: "#ec4899" },
              { title: "CRM Data Table", desc: "Searchable, sortable customer management table.", icon: <Layers className="w-5 h-5" />, href: "/blocks", color: "#8b5cf6" },
            ].map((block) => (
              <Link key={block.title} to={block.href}>
                <Card className="group hover:border-primary/30 hover:shadow-md transition-all duration-300 h-full overflow-hidden">
                  <div
                    className="h-32 flex items-center justify-center"
                    style={{ background: block.color + "10" }}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ background: block.color + "20", color: block.color }}>
                      {block.icon}
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-sm mb-1">{block.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{block.desc}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-primary mt-3 font-medium group-hover:gap-2 transition-all">
                      View block <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════ TESTIMONIALS ════════════════════════ */}
      <section className="py-20 border-y bg-muted/10">
        <Container>
          <div className="mb-12 space-y-2">
            <h2 className="text-2xl md:text-4xl font-bold">Loved by developers.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "Sarah Chen", role: "CTO at TechFlow", avatar: "sc", text: "StructUI completely transformed our development workflow. The components are incredibly well-built and easy to customize to our brand." },
              { name: "Marcus Thorne", role: "Lead Designer", avatar: "mt", text: "Finally a UI library that understands design. The attention to detail in the animations and spacing is exceptional." },
              { name: "Elena Rodriguez", role: "Senior Frontend Eng.", avatar: "er", text: "The accessibility features are a lifesaver. We achieved full WCAG compliance in record time thanks to StructUI." },
            ].map((t) => (
              <Card key={t.name} className="h-full rounded-2xl border bg-card">
                <CardContent className="p-6 space-y-5">
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 text-amber-400 fill-current" />)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={`https://i.pravatar.cc/100?u=${t.avatar}`} />
                      <AvatarFallback className="text-xs">{t.avatar.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-semibold">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* ════════════════════════ FAQ ════════════════════════ */}
      <section className="py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              <Badge variant="secondary" className="rounded-full px-3">FAQ</Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Common questions.</h2>
              <p className="text-muted-foreground">
                Can't find what you're looking for?{" "}
                <a href="/docs" className="text-primary underline underline-offset-2">Check the docs.</a>
              </p>
            </div>
            <div>
              <Accordion type="single" collapsible className="space-y-2">
                {[
                  { q: `Is ${SITE_BRAND_NAME} free to use?`, a: `Yes, ${SITE_BRAND_NAME} is completely free and open source. Use it in personal and commercial projects.` },
                  { q: "Does it work with Next.js?", a: `Absolutely. ${SITE_BRAND_NAME} works with any React framework — Next.js, Vite, Remix, and more.` },
                  { q: "Can I customize the components?", a: "Yes. All components use CSS variables and Tailwind classes, making them fully customizable. The Theme Creator lets you export a custom theme." },
                  { q: "Is TypeScript required?", a: "No, but recommended. All components are fully typed for the best developer experience." },
                  { q: "How do I add components to my project?", a: `Use the ${SITE_CLI_COMMAND} CLI: \`npx ${SITE_CLI_COMMAND} add button\`. Or copy files manually from the repository.` },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border rounded-xl px-4 border-border">
                    <AccordionTrigger className="text-sm font-medium py-3.5">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-sm pb-4">{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Container>
      </section>

      {/* ════════════════════════ CTA ════════════════════════ */}
      <section className="py-24 border-t">
        <Container>
          <div className="relative space-y-6 p-16 rounded-3xl border bg-muted/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
            <Badge variant="secondary" className="relative rounded-full px-3">Get Started</Badge>
            <h2 className="relative text-4xl md:text-6xl font-bold tracking-tight">
              Start building today.
            </h2>
            <p className="relative text-muted-foreground max-w-md leading-relaxed">
              Explore {siteMetrics.totalComponents} registry-tracked components and start building faster with {SITE_BRAND_NAME}.
            </p>
            <div className="relative flex flex-col sm:flex-row items-start gap-3">
              <Button asChild size="lg" className="h-12 px-10 rounded-xl text-base font-semibold shadow-lg shadow-primary/20">
                <Link to="/docs">Get Started Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-10 rounded-xl text-base">
                <Link to="/components">Browse Components</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};
