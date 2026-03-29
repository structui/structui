import { Check, ArrowRight, Star, Layers, Globe, Shield } from "lucide-react";

interface OpsPreviewProps {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  tone: string;
  pages: string[];
  features: string[];
  blocks: string[];
  stack: string[];
}

interface SchemeImages {
  hero: string;
  side: string;
  detail: string;
}

const IMAGES: Record<string, SchemeImages> = {
  "space-labs": {
    hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80",
  },
  "smart-farm": {
    hero: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1200&q=80",
  },
  "engineering-studio": {
    hero: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
  },
  "architecture-office": {
    hero: "https://images.unsplash.com/photo-1465804575741-338df8554e02?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&q=80",
  },
  "creative-agency": {
    hero: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80",
  },
  "portfolio-minimal": {
    hero: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
  },
  "company-intro": {
    hero: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=80",
    side: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80",
    detail: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  },
};

function Img({ src, alt, className }: { src: string; alt: string; className: string }) {
  return <img src={src} alt={alt} loading="lazy" className={className} />;
}

/* ──────────────────────────────────────────────────────────────── */
/* FARM                                                             */
/* ──────────────────────────────────────────────────────────────── */
function FarmLayout({
  title, summary, pages, features, blocks, stack, images,
}: Omit<OpsPreviewProps, "slug" | "sector" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#f4f7ef] text-[#1a2b1a] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-[#d5dfca] bg-[#f4f7ef]/95 px-8 py-4 backdrop-blur-sm md:px-16">
        <span className="text-sm font-semibold tracking-tight">{title}</span>
        <div className="hidden items-center gap-6 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-xs uppercase tracking-[0.16em] text-[#4a6040] transition-opacity hover:opacity-70">{p}</span>
          ))}
        </div>
        <button className="bg-[#4a7c3f] px-4 py-2 text-xs uppercase tracking-widest text-white hover:bg-[#3d6834] transition-colors">
          Contact
        </button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <Img src={images.hero} alt="Farm fields" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1f0e]/85 via-[#0e1f0e]/50 to-transparent" />
        <div className="relative flex min-h-[88vh] flex-col justify-end px-8 pb-16 pt-32 md:px-16">
          <p className="mb-3 text-[11px] uppercase tracking-[0.24em] text-[#a8d89a]">Smart Agriculture · Est. 2012</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] text-white md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">{summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-[#5a9e4c] px-6 py-3 text-sm text-white hover:bg-[#4d8a40] transition-colors">
              Explore Operations <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
            <button className="border border-white/35 px-6 py-3 text-sm text-white hover:bg-white/10 transition-colors">
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 border-b border-[#d5dfca] md:grid-cols-4">
        {[["46,000", "Managed Acres"], ["+21%", "Yield Growth"], ["18%", "Water Savings"], ["99.2%", "Uptime SLA"]].map(([v, k]) => (
          <div key={k} className="border-r border-[#d5dfca] px-8 py-7 last:border-r-0">
            <p className="text-3xl font-semibold text-[#3d6834]">{v}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#6a8c60]">{k}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="px-8 py-16 md:px-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-[#7aaa6a]">Platform Capabilities</p>
            <h2 className="text-3xl font-semibold">Built for Modern Agriculture</h2>
          </div>
          <button className="hidden text-xs uppercase tracking-widest text-[#4a7c3f] underline-offset-4 hover:underline md:block">
            View all →
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="border border-[#d5dfca] bg-white p-5 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center bg-[#eaf5e6]">
                <Layers className="h-4 w-4 text-[#4a7c3f]" />
              </div>
              <p className="text-sm font-medium">{f}</p>
              <p className="text-xs leading-relaxed text-[#6a8060]">
                Integrated data-driven tools for every stage of your operation.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Split: image + pages */}
      <section className="grid border-y border-[#d5dfca] lg:grid-cols-2">
        <Img src={images.side} alt="Farm technology" className="h-full min-h-[420px] w-full object-cover" />
        <div className="space-y-0 px-8 py-10 md:px-14">
          <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-[#7aaa6a]">Site Pages</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-[#dce5d1] py-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#9ab08a] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium">{p}</span>
              </div>
              <Check className="h-3.5 w-3.5 text-[#5a9e4c]" />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-[#2d4d28] px-8 py-16 text-white md:px-16">
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#a8d89a] text-[#a8d89a]" />)}
          </div>
          <p className="text-2xl font-medium leading-relaxed">
            "Verdant transformed the way we manage our 12,000-acre operation — real-time crop intelligence finally within reach."
          </p>
          <div>
            <p className="text-sm font-medium text-white/90">James Holloway</p>
            <p className="text-[11px] uppercase tracking-widest text-white/55">Operations Director, Holloway Farms</p>
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="px-8 py-14 md:px-16">
        <p className="mb-6 text-[11px] uppercase tracking-[0.18em] text-[#7aaa6a]">Block Modules</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b} className="border border-[#d5dfca] bg-white px-4 py-4 text-sm font-medium">
              {b}
              <p className="mt-1 text-[11px] text-[#8aaa7a]">Struct UI component</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-[#d5dfca] bg-white px-8 py-10 md:px-16">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#8aaa7a]">Stack:</p>
          {stack.map((s) => (
            <span key={s} className="border border-[#d5dfca] px-3 py-1 text-xs text-[#4a6040]">{s}</span>
          ))}
        </div>
      </section>

      <p className="bg-[#f4f7ef] px-8 py-4 text-[10px] uppercase tracking-[0.14em] text-[#9ab08a] md:px-16">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* SPACE LABS                                                       */
/* ──────────────────────────────────────────────────────────────── */
function DarkSplitLayout({
  title, summary, pages, features, blocks, stack, images,
}: Omit<OpsPreviewProps, "slug" | "sector" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#060c17] text-white font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-white/8 bg-[#060c17]/95 px-8 py-4 backdrop-blur-sm md:px-16">
        <span className="text-sm font-semibold tracking-tight">{title}</span>
        <div className="hidden items-center gap-6 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-[11px] uppercase tracking-[0.16em] text-white/55 transition-colors hover:text-white/90">{p}</span>
          ))}
        </div>
        <button className="border border-blue-400/60 px-4 py-2 text-[11px] uppercase tracking-widest text-blue-300 hover:bg-blue-400/10 transition-colors">
          Mission Access
        </button>
      </nav>

      {/* Hero — full bleed split */}
      <section className="grid min-h-[90vh] lg:grid-cols-[1fr_1fr]">
        <div className="relative order-2 lg:order-1">
          <Img src={images.hero} alt="Space" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060c17]/60 to-transparent" />
        </div>
        <div className="order-1 flex flex-col justify-center space-y-8 bg-[#0a1628] px-8 py-20 md:px-14 lg:order-2">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-[0.24em] text-blue-400/80">Orbital Space Labs · 2024</p>
            <h1 className="text-5xl font-semibold leading-tight md:text-6xl">{title}</h1>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/72">{summary}</p>
          <div className="grid grid-cols-3 gap-3">
            {[["12", "Missions"], ["4", "Satellites"], ["99.7%", "Reliability"]].map(([v, k]) => (
              <div key={k} className="border border-white/10 bg-white/4 px-3 py-4 text-center">
                <p className="text-xl font-semibold text-blue-300">{v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/45">{k}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 px-5 py-3 text-sm text-white hover:bg-blue-500 transition-colors">
              View Programs <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
            <button className="border border-white/20 px-5 py-3 text-sm text-white/85 hover:bg-white/8 transition-colors">
              Investor Pack
            </button>
          </div>
        </div>
      </section>

      {/* Mission features */}
      <section className="border-y border-white/8 px-8 py-14 md:px-16">
        <div className="mb-10">
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-blue-400/70">Platform Features</p>
          <h2 className="text-2xl font-semibold">Mission-Grade Infrastructure</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="border border-white/10 bg-white/4 p-5 space-y-3">
              <div className="h-8 w-8 bg-blue-500/20 flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue-400" />
              </div>
              <p className="text-sm font-medium">{f}</p>
              <p className="text-xs text-white/45 leading-relaxed">
                Built for precision and planetary-scale reliability.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pages + image */}
      <section className="grid lg:grid-cols-[1fr_1fr]">
        <div className="space-y-0 px-8 py-12 md:px-16">
          <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/40">Site Architecture</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-white/8 py-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tabular-nums text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm">{p}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-blue-400/60" />
            </div>
          ))}
        </div>
        <Img src={images.side} alt="Space equipment" className="h-full min-h-[360px] w-full object-cover" />
      </section>

      {/* Quote */}
      <section className="border-y border-white/8 bg-[#0d1e35] px-8 py-16 text-center md:px-16">
        <p className="text-2xl font-medium leading-relaxed text-white/90 md:text-3xl">
          "The most complete aerospace web platform — from telemetry to investor narrative, it all clicks."
        </p>
        <p className="mt-6 text-xs uppercase tracking-widest text-blue-300/70">
          — Dr. Sarah Chen, CTO · Orbital Dynamics Group
        </p>
      </section>

      {/* Blocks */}
      <section className="px-8 py-12 md:px-16">
        <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-white/35">Block Modules</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b} className="border border-white/10 bg-[#0a1628] px-4 py-4 text-sm">
              {b}
              <p className="mt-1 text-[11px] text-blue-400/50">Struct UI</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-white/8 px-8 py-6 md:px-16">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/30">Stack:</p>
          {stack.map((s) => (
            <span key={s} className="border border-white/12 px-3 py-1 text-[11px] text-white/55">{s}</span>
          ))}
        </div>
      </section>

      <p className="px-8 py-3 text-[10px] uppercase tracking-[0.14em] text-white/20 md:px-16">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* ENGINEERING                                                      */
/* ──────────────────────────────────────────────────────────────── */
function EngineeringLayout({
  title, summary, pages, features, blocks, stack, images,
}: Omit<OpsPreviewProps, "slug" | "sector" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#0f1114] text-[#dde0e4] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-white/8 px-8 py-4 md:px-16">
        <span className="text-sm font-semibold tracking-tight text-white">{title}</span>
        <div className="hidden items-center gap-6 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-[11px] uppercase tracking-[0.16em] text-white/45 hover:text-white/80 transition-colors">{p}</span>
          ))}
        </div>
        <button className="border border-white/20 px-4 py-2 text-[11px] uppercase tracking-widest text-white/70 hover:bg-white/8 transition-colors">
          Get Quote
        </button>
      </nav>

      {/* Hero — sidebar layout */}
      <section className="grid border-b border-white/8 lg:grid-cols-[360px_1fr]">
        <aside className="border-r border-white/8 px-8 py-14 md:px-10">
          <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-white/35">Engineering Studio</p>
          <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{summary}</p>
          <div className="mt-8 space-y-2">
            {[["ISO 9001", "Certified"], ["20+ Years", "Experience"], ["340+", "Projects Delivered"]].map(([v, k]) => (
              <div key={k} className="flex items-center justify-between border border-white/8 px-3 py-2.5">
                <span className="text-xs text-white/45">{k}</span>
                <span className="text-sm font-semibold text-white">{v}</span>
              </div>
            ))}
          </div>
          <button className="mt-6 w-full border border-white/20 py-3 text-xs uppercase tracking-widest text-white/80 hover:bg-white/8 transition-colors">
            Download Capability Sheet
          </button>
        </aside>
        <div className="relative min-h-[500px]">
          <Img src={images.hero} alt="Engineering project" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[#0f1114]/30" />
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-white/8 px-8 py-14 md:px-16">
        <div className="mb-8">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-white/30">Core Capabilities</p>
          <h2 className="text-2xl font-semibold text-white">Execution Modules</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="border border-white/8 bg-white/[0.03] p-5 space-y-2">
              <Shield className="h-4 w-4 text-white/35" />
              <p className="text-sm font-medium text-white/90">{f}</p>
              <p className="text-xs text-white/40 leading-relaxed">
                Precision-engineered workflows with ISO-grade quality assurance.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Image + page list */}
      <section className="grid border-b border-white/8 lg:grid-cols-[1fr_1fr]">
        <Img src={images.side} alt="Engineering process" className="h-full min-h-[380px] w-full object-cover" />
        <div className="space-y-0 px-8 py-12 md:px-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-white/30">Site Pages</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-white/8 py-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tabular-nums text-white/25">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-white/80">{p}</span>
              </div>
              <Check className="h-3.5 w-3.5 text-white/30" />
            </div>
          ))}
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {blocks.map((b) => (
              <div key={b} className="border border-white/8 bg-black/30 px-3 py-2 text-xs text-white/55">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certification band */}
      <section className="border-b border-white/8 bg-white/[0.03] px-8 py-10 md:px-16">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/30">Certifications & Compliance:</p>
          {["ISO 9001:2015", "EN 1090", "OHSAS 18001", "CE Marking", "ATEX Rated"].map((cert) => (
            <span key={cert} className="border border-white/12 px-3 py-1.5 text-xs text-white/55">{cert}</span>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="px-8 py-6 md:px-16">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/25">Stack:</p>
          {stack.map((s) => (
            <span key={s} className="border border-white/8 px-3 py-1 text-[11px] text-white/40">{s}</span>
          ))}
        </div>
      </section>

      <p className="px-8 py-3 text-[10px] uppercase tracking-[0.14em] text-white/20 md:px-16">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* ARCHITECTURE                                                     */
/* ──────────────────────────────────────────────────────────────── */
function ArchitectureLayout({
  title, summary, pages, features, blocks, stack, images,
}: Omit<OpsPreviewProps, "slug" | "sector" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#ede9e3] text-[#1e1c19] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-[#ccc5bb] bg-[#ede9e3]/95 px-8 py-5 backdrop-blur-sm md:px-20">
        <span className="text-sm font-semibold tracking-tight">{title}</span>
        <div className="hidden items-center gap-7 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-[11px] uppercase tracking-[0.18em] text-[#7a7066] hover:text-[#1e1c19] transition-colors">{p}</span>
          ))}
        </div>
        <button className="border border-[#b8afa4] px-4 py-2 text-[11px] uppercase tracking-widest text-[#5a524a] hover:bg-[#d5cfc8] transition-colors">
          Studio Visit
        </button>
      </nav>

      {/* Hero — editorial large */}
      <section className="grid min-h-[85vh] lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col justify-end px-8 pb-16 pt-20 md:px-20">
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-[#9a9088]">Architecture · Interior · Identity</p>
          <h1 className="text-6xl font-semibold leading-[1.02] tracking-tight md:text-8xl">{title}</h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#6e6660]">{summary}</p>
          <div className="mt-8 flex gap-3">
            <button className="bg-[#2a2520] px-6 py-3 text-sm text-white hover:bg-[#1a1610] transition-colors">
              View Portfolio
            </button>
            <button className="border border-[#c4bdb5] px-6 py-3 text-sm text-[#5a524a] hover:bg-[#d5cfc8] transition-colors">
              Our Process
            </button>
          </div>
        </div>
        <div className="relative min-h-[520px]">
          <Img src={images.hero} alt="Architecture facade" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute bottom-6 right-6 border border-white/30 bg-white/80 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-widest text-[#6a6258]">Featured · 2024</p>
            <p className="mt-0.5 text-sm font-medium">Axis Tower, Milan</p>
          </div>
        </div>
      </section>

      {/* Awards strip */}
      <section className="flex flex-wrap items-center justify-between gap-4 border-y border-[#ccc5bb] px-8 py-5 md:px-20">
        {["Dezeen Award 2023", "Wallpaper* Best Studio", "AD 100 List", "RIBA Award", "Frame Magazine Feature"].map((award) => (
          <span key={award} className="text-[11px] uppercase tracking-[0.14em] text-[#8a8076]">{award}</span>
        ))}
      </section>

      {/* Page list — editorial */}
      <section className="grid border-b border-[#ccc5bb] lg:grid-cols-[1fr_1fr]">
        <div className="space-y-0 px-8 py-12 md:px-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-[#9a9088]">Site Pages</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-[#ccc5bb] py-5">
              <div className="flex items-center gap-4">
                <span className="text-[11px] tabular-nums text-[#b0a89e]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-base font-medium">{p}</span>
              </div>
              <ArrowRight className="h-4 w-4 text-[#9a9088]" />
            </div>
          ))}
        </div>
        <Img src={images.side} alt="Architecture interior" className="h-full min-h-[400px] w-full object-cover" />
      </section>

      {/* Features — list */}
      <section className="grid border-b border-[#ccc5bb] lg:grid-cols-[1fr_1fr]">
        <div className="px-8 py-12 md:px-20">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-[#9a9088]">Studio Capabilities</p>
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 border-b border-[#d2cbc3] py-3.5">
              <Check className="h-3.5 w-3.5 flex-shrink-0 text-[#7a7066]" />
              <span className="text-sm">{f}</span>
            </div>
          ))}
        </div>
        <div className="border-l border-[#ccc5bb] px-8 py-12 md:px-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-[#9a9088]">Process</p>
          {["Discovery & Brief", "Concept Development", "Design Development", "Documentation", "Site Supervision", "Handover"].map((step, i) => (
            <div key={step} className="flex items-center gap-3 border-b border-[#d2cbc3] py-3">
              <span className="text-[11px] tabular-nums text-[#b0a89e] w-4">{i + 1}</span>
              <span className="text-sm text-[#5a524a]">{step}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-[#2a2520] px-8 py-16 text-white md:px-20">
        <div className="mx-auto max-w-2xl space-y-6">
          <p className="text-3xl font-medium leading-tight tracking-tight">
            "Architecture begins where engineering ends — and that is where we live."
          </p>
          <div>
            <p className="text-sm text-white/75">Luca Moretti, Founding Principal</p>
            <p className="text-[11px] uppercase tracking-widest text-white/40">Atelier Axis Architecture</p>
          </div>
        </div>
      </section>

      {/* Blocks + detail image */}
      <section className="grid border-b border-[#ccc5bb] lg:grid-cols-[1fr_1fr]">
        <Img src={images.detail} alt="Architecture detail" className="h-full min-h-[340px] w-full object-cover" />
        <div className="px-8 py-12 md:px-14">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-[#9a9088]">Block Modules</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {blocks.map((b) => (
              <div key={b} className="border border-[#ccc5bb] bg-white px-4 py-4">
                <p className="text-sm font-medium">{b}</p>
                <p className="mt-1 text-[11px] text-[#9a9088]">Struct UI component</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <p className="mr-2 text-[11px] uppercase tracking-widest text-[#9a9088]">Stack:</p>
            {stack.map((s) => (
              <span key={s} className="border border-[#ccc5bb] px-2.5 py-1 text-[11px] text-[#7a7066]">{s}</span>
            ))}
          </div>
        </div>
      </section>

      <p className="px-8 py-4 text-[10px] uppercase tracking-[0.14em] text-[#9a9088] md:px-20">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* CREATIVE AGENCY                                                  */
/* ──────────────────────────────────────────────────────────────── */
function AgencyLayout({
  title, summary, pages, features, blocks, stack, images,
}: Omit<OpsPreviewProps, "slug" | "sector" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#050e1d] text-white font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-cyan-900/40 bg-[#050e1d]/95 px-8 py-4 backdrop-blur-sm md:px-20">
        <span className="text-sm font-semibold tracking-tight text-cyan-100">{title}</span>
        <div className="hidden items-center gap-6 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-[11px] uppercase tracking-[0.16em] text-cyan-200/50 hover:text-cyan-200/90 transition-colors">{p}</span>
          ))}
        </div>
        <button className="bg-cyan-500 px-4 py-2 text-[11px] uppercase tracking-widest text-white hover:bg-cyan-400 transition-colors">
          Start a Project
        </button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <Img src={images.hero} alt="Agency workspace" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#050e1d]/78" />
        <div className="relative flex min-h-[88vh] flex-col justify-center px-8 md:px-20">
          <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-cyan-300/80">
            Creative · Digital · Brand
          </p>
          <h1 className="max-w-4xl text-6xl font-semibold leading-[1.04] md:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-cyan-50/75">{summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <button className="bg-cyan-500 px-7 py-3.5 text-sm text-white hover:bg-cyan-400 transition-colors">
              Our Work <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
            <button className="border border-cyan-400/30 px-7 py-3.5 text-sm text-cyan-100/85 hover:bg-cyan-900/30 transition-colors">
              Services
            </button>
          </div>
        </div>

        {/* Floating stats */}
        <div className="absolute bottom-8 right-8 hidden space-y-2 md:block">
          {[["180+", "Campaigns"], ["94%", "Retention"], ["12", "Awwwards"]].map(([v, k]) => (
            <div key={k} className="flex items-center gap-3 border border-cyan-400/20 bg-black/50 px-4 py-2.5 backdrop-blur-sm">
              <span className="text-lg font-semibold text-cyan-300">{v}</span>
              <span className="text-[11px] uppercase tracking-widest text-white/50">{k}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-cyan-900/40 px-8 py-14 md:px-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-cyan-400/70">What We Do</p>
            <h2 className="text-2xl font-semibold">Service Lanes</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="group border border-cyan-900/50 bg-cyan-950/20 p-5 space-y-3 transition-colors hover:border-cyan-500/30 hover:bg-cyan-950/40">
              <div className="h-8 w-8 bg-cyan-500/20">
                <div className="h-full w-full flex items-center justify-center">
                  <Layers className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-cyan-100">{f}</p>
              <p className="text-xs leading-relaxed text-cyan-200/40">
                Strategy-first approach with measurable creative results.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Work + pages */}
      <section className="grid border-b border-cyan-900/40 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-0 px-8 py-12 md:px-16">
          <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-cyan-400/60">Site Pages</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-cyan-900/30 py-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tabular-nums text-white/25">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm text-white/85">{p}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-cyan-400/50" />
            </div>
          ))}
        </div>
        <Img src={images.side} alt="Agency team" className="h-full min-h-[360px] w-full object-cover" />
      </section>

      {/* Blocks */}
      <section className="border-b border-cyan-900/40 px-8 py-12 md:px-20">
        <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-cyan-400/60">Block Modules</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b} className="border border-cyan-900/40 bg-cyan-950/20 px-4 py-4 text-sm text-cyan-100/85">
              {b}
              <p className="mt-1 text-[11px] text-cyan-400/40">Struct UI</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="px-8 py-6 md:px-20">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/25">Stack:</p>
          {stack.map((s) => (
            <span key={s} className="border border-cyan-900/40 px-3 py-1 text-[11px] text-cyan-200/45">{s}</span>
          ))}
        </div>
      </section>

      <p className="px-8 py-3 text-[10px] uppercase tracking-[0.14em] text-white/20 md:px-20">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* PORTFOLIO                                                        */
/* ──────────────────────────────────────────────────────────────── */
function PortfolioLayout({
  title, summary, pages, features, blocks, stack, images,
}: Omit<OpsPreviewProps, "slug" | "sector" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#f2f1ef] text-[#161614] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-[#d8d5cf] px-8 py-4 md:px-24">
        <span className="text-sm font-semibold">{title}</span>
        <div className="hidden items-center gap-7 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-[11px] uppercase tracking-[0.16em] text-[#706d66] hover:text-[#161614] transition-colors">{p}</span>
          ))}
        </div>
        <button className="text-[11px] uppercase tracking-widest text-[#706d66] underline-offset-4 hover:underline">
          Hire Me →
        </button>
      </nav>

      {/* Hero — type-led */}
      <section className="px-8 pb-14 pt-20 md:px-24">
        <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-[#9a9790]">Design · Art Direction · Development</p>
        <h1 className="max-w-5xl text-6xl font-semibold leading-[1.03] tracking-tight md:text-8xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#606058]">{summary}</p>
        <div className="mt-8 flex gap-4">
          <button className="bg-[#161614] px-6 py-3 text-sm text-white hover:bg-[#2a2a26] transition-colors">
            View Work <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
          </button>
          <button className="border border-[#c8c4be] px-6 py-3 text-sm text-[#706d66] hover:bg-[#e8e5df] transition-colors">
            About Me
          </button>
        </div>
      </section>

      {/* Image grid */}
      <section className="grid gap-2 px-8 pb-4 md:grid-cols-3 md:px-24">
        <Img src={images.hero} alt="Portfolio hero" className="h-[320px] w-full object-cover md:col-span-2 md:h-[440px]" />
        <div className="grid gap-2">
          <Img src={images.side} alt="Portfolio side" className="h-[214px] w-full object-cover" />
          <Img src={images.detail} alt="Portfolio detail" className="h-[214px] w-full object-cover" />
        </div>
      </section>

      {/* Selected work label */}
      <div className="flex items-center gap-3 border-b border-[#d8d5cf] px-8 py-4 md:px-24">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#9a9790]">Selected Projects · 2022–2024</p>
      </div>

      {/* Pages + features */}
      <section className="grid border-b border-[#d8d5cf] md:grid-cols-2">
        <div className="space-y-0 border-r border-[#d8d5cf] px-8 py-12 md:px-16">
          <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-[#9a9790]">Site Pages</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-[#d8d5cf] py-4">
              <div className="flex items-center gap-3">
                <span className="text-[11px] tabular-nums text-[#b8b5ae]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium">{p}</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-[#9a9790]" />
            </div>
          ))}
        </div>
        <div className="px-8 py-12 md:px-16">
          <p className="mb-4 text-[11px] uppercase tracking-[0.18em] text-[#9a9790]">Skills & Capabilities</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="border border-[#d8d5cf] bg-white px-4 py-3 text-sm">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="border-b border-[#d8d5cf] px-8 py-12 md:px-24">
        <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-[#9a9790]">Block Modules</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b} className="border border-[#d8d5cf] bg-white px-4 py-4 text-sm font-medium">
              {b}
              <p className="mt-1 text-[11px] text-[#9a9790]">Struct UI</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="px-8 py-5 md:px-24">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-[#9a9790]">Stack:</p>
          {stack.map((s) => (
            <span key={s} className="border border-[#d8d5cf] px-3 py-1 text-[11px] text-[#706d66]">{s}</span>
          ))}
        </div>
      </section>

      <p className="px-8 py-4 text-[10px] uppercase tracking-[0.14em] text-[#9a9790] md:px-24">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* CORPORATE                                                        */
/* ──────────────────────────────────────────────────────────────── */
function CorporateLayout({
  title, summary, pages, features, blocks, stack, sector, images,
}: Omit<OpsPreviewProps, "slug" | "tone"> & { images: SchemeImages }) {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#0c1a2e] font-sans">
      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur-sm shadow-sm md:px-20">
        <span className="text-sm font-semibold">{title}</span>
        <div className="hidden items-center gap-6 md:flex">
          {pages.map((p) => (
            <span key={p} className="cursor-pointer text-[11px] uppercase tracking-[0.16em] text-slate-500 hover:text-slate-900 transition-colors">{p}</span>
          ))}
        </div>
        <button className="bg-blue-600 px-4 py-2 text-[11px] uppercase tracking-widest text-white hover:bg-blue-700 transition-colors">
          Request Demo
        </button>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[82vh] overflow-hidden">
        <Img src={images.hero} alt="Corporate boardroom" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1a2e]/90 via-[#0c1a2e]/60 to-[#0c1a2e]/20" />
        <div className="relative flex min-h-[82vh] flex-col justify-end px-8 pb-16 md:px-20">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-blue-300/80">{sector} · Enterprise Solutions</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200/85">{summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="bg-blue-600 px-7 py-3.5 text-sm text-white hover:bg-blue-500 transition-colors">
              Explore Services <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
            </button>
            <button className="border border-white/30 px-7 py-3.5 text-sm text-white/90 hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 border-b border-slate-200 bg-white md:grid-cols-4">
        {[["220+", "Enterprise Clients"], ["11", "Global Offices"], ["18yrs", "In Business"], ["4h", "SLA Response"]].map(([v, k]) => (
          <div key={k} className="border-r border-slate-200 px-8 py-7 last:border-r-0">
            <p className="text-3xl font-semibold text-blue-600">{v}</p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-400">{k}</p>
          </div>
        ))}
      </section>

      {/* Features */}
      <section className="px-8 py-16 md:px-20">
        <div className="mb-10">
          <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-blue-500">Core Services</p>
          <h2 className="text-2xl font-semibold">Service Matrix</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f} className="border border-slate-200 bg-white p-5 shadow-sm space-y-3">
              <div className="h-9 w-9 bg-blue-50 flex items-center justify-center">
                <Globe className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-sm font-medium">{f}</p>
              <p className="text-xs leading-relaxed text-slate-500">
                Enterprise-grade solutions designed for growth and compliance.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pages + image */}
      <section className="grid border-y border-slate-200 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-0 px-8 py-12 md:px-16">
          <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-slate-400">Site Pages</p>
          {pages.map((p, i) => (
            <div key={p} className="flex items-center justify-between border-b border-slate-100 py-4">
              <div className="flex items-center gap-3">
                <span className="text-[10px] tabular-nums text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm font-medium">{p}</span>
              </div>
              <Check className="h-3.5 w-3.5 text-blue-400" />
            </div>
          ))}
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">{f}</div>
            ))}
          </div>
        </div>
        <Img src={images.side} alt="Corporate office" className="h-full min-h-[360px] w-full object-cover" />
      </section>

      {/* Testimonial */}
      <section className="bg-[#0c1a2e] px-8 py-16 text-white md:px-20">
        <div className="mx-auto max-w-3xl space-y-5 text-center">
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-blue-400 text-blue-400" />)}
          </div>
          <p className="text-2xl font-medium leading-relaxed">
            "Switching to this platform reduced our procurement cycle from 6 weeks to 4 days. The ROI was immediate."
          </p>
          <div>
            <p className="text-sm text-white/85">Marcus Webb</p>
            <p className="text-[11px] uppercase tracking-widest text-white/40">VP Operations, Webb Industries</p>
          </div>
        </div>
      </section>

      {/* Blocks */}
      <section className="px-8 py-12 md:px-20">
        <p className="mb-5 text-[11px] uppercase tracking-[0.18em] text-slate-400">Block Modules</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {blocks.map((b) => (
            <div key={b} className="border border-slate-200 bg-white p-4 shadow-sm text-sm font-medium text-slate-700">
              {b}
              <p className="mt-1 text-[11px] text-slate-400">Struct UI</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="border-t border-slate-200 bg-white px-8 py-6 md:px-20">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Stack:</p>
          {stack.map((s) => (
            <span key={s} className="border border-slate-200 px-3 py-1 text-[11px] text-slate-500">{s}</span>
          ))}
        </div>
      </section>

      <p className="px-8 py-4 text-[10px] uppercase tracking-[0.14em] text-slate-400 md:px-20">
        Images: Unsplash · Royalty-free
      </p>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/* EXPORT                                                           */
/* ──────────────────────────────────────────────────────────────── */
export function OpsPreview(props: OpsPreviewProps) {
  const images = IMAGES[props.slug] ?? IMAGES["company-intro"];

  if (props.slug === "smart-farm") return <FarmLayout {...props} images={images} />;
  if (props.slug === "space-labs") return <DarkSplitLayout {...props} images={images} />;
  if (props.slug === "engineering-studio") return <EngineeringLayout {...props} images={images} />;
  if (props.slug === "architecture-office") return <ArchitectureLayout {...props} images={images} />;
  if (props.slug === "creative-agency") return <AgencyLayout {...props} images={images} />;
  if (props.slug === "portfolio-minimal") return <PortfolioLayout {...props} images={images} />;

  return <CorporateLayout {...props} images={images} />;
}
