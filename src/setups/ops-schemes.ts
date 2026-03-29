export interface OpsScheme {
  slug: string;
  title: string;
  sector: string;
  summary: string;
  tone: string;
  pages: string[];
  features: string[];
  stack: string[];
  blocks: string[];
  palette: string;
  visual: string;
}

export const OPS_SCHEMES: OpsScheme[] = [
  {
    slug: "space-labs",
    title: "Orbital Space Labs",
    sector: "Space",
    summary:
      "Aerospace startup websites with mission timeline, launch telemetry strips, and investor-ready product sections.",
    tone: "Technical, cinematic, premium",
    pages: ["Landing", "Programs", "Mission Timeline", "Team", "Contact"],
    features: ["Sticky mission rail", "Telemetry cards", "Launch countdown", "Partner logos"],
    stack: ["Hero", "Stats", "Timeline", "Bento Grid"],
    blocks: [
      "Mission Control Hero",
      "Telemetry KPI Rail",
      "Launch Program Grid",
      "Partner Confidence Strip",
    ],
    palette: "from-slate-900/70 via-blue-950/60 to-slate-950/70",
    visual: "/schemes/space-labs.svg",
  },
  {
    slug: "smart-farm",
    title: "Verdant Farm Systems",
    sector: "Farm",
    summary:
      "Modern agriculture companies with crop analytics, sustainability highlights, and farm operation showcases.",
    tone: "Natural, clean, reliable",
    pages: ["Landing", "Operations", "Technology", "Case Studies", "Contact"],
    features: ["Harvest KPIs", "Season calendar", "Sustainability blocks", "Service cards"],
    stack: ["Calendar", "Charts", "Card", "Data Table"],
    blocks: [
      "Season Planning Board",
      "Crop Yield KPI Grid",
      "Sustainability Statement Band",
      "Case Study Highlight Rows",
    ],
    palette: "from-emerald-900/55 via-lime-900/40 to-emerald-950/65",
    visual: "/schemes/smart-farm.svg",
  },
  {
    slug: "engineering-studio",
    title: "Northbridge Engineering",
    sector: "Engineering",
    summary:
      "Engineering company pages focused on technical capability, compliance, and project execution quality.",
    tone: "Structured, industrial, direct",
    pages: ["Landing", "Capabilities", "Projects", "Quality", "Contact"],
    features: ["Capability matrix", "Project milestones", "Certifications", "Resource links"],
    stack: ["Table", "Timeline", "Tabs", "Accordion"],
    blocks: [
      "Capability Matrix",
      "Milestone Execution Timeline",
      "Compliance Certification Stack",
      "Technical Resource Rail",
    ],
    palette: "from-zinc-900/70 via-slate-900/60 to-zinc-950/70",
    visual: "/schemes/engineering-studio.svg",
  },
  {
    slug: "architecture-office",
    title: "Atelier Axis Architecture",
    sector: "Architecture",
    summary:
      "Architecture offices with visual portfolio walls, studio narratives, and project process storytelling.",
    tone: "Editorial, refined, minimal",
    pages: ["Landing", "Portfolio", "Studio", "Process", "Contact"],
    features: ["Masonry project gallery", "Studio manifesto", "Process steps", "Press quotes"],
    stack: ["Device Mockups", "Bento Grid", "Stepper", "Tabs"],
    blocks: [
      "Signature Project Gallery",
      "Studio Philosophy Statement",
      "Project Process Stepper",
      "Editorial Quote Panel",
    ],
    palette: "from-stone-900/70 via-neutral-900/60 to-zinc-950/70",
    visual: "/schemes/architecture-office.svg",
  },
  {
    slug: "creative-agency",
    title: "Pulse Creative Agency",
    sector: "Agency",
    summary:
      "Agency websites with service ladders, campaign highlights, and conversion-oriented project storytelling.",
    tone: "Sharp, energetic, modern",
    pages: ["Landing", "Services", "Work", "Insights", "Contact"],
    features: ["Service lanes", "Work cards", "Client logos", "CTA strips"],
    stack: ["Hero", "Pricing", "Stats", "Toast"],
    blocks: [
      "Campaign Hero Banner",
      "Service Ladder Cards",
      "Client Proof Wall",
      "Conversion CTA Strip",
    ],
    palette: "from-slate-900/70 via-cyan-950/50 to-slate-950/70",
    visual: "/schemes/creative-agency.svg",
  },
  {
    slug: "portfolio-minimal",
    title: "Mono Portfolio",
    sector: "Portfolio",
    summary:
      "Personal and studio portfolio structures with focused project details, about pages, and inquiry forms.",
    tone: "Minimal, calm, contemporary",
    pages: ["Landing", "Projects", "Case Detail", "About", "Contact"],
    features: ["Project index", "Case storytelling", "Skill blocks", "Contact intake"],
    stack: ["Card", "Separator", "Textarea", "Tooltip"],
    blocks: [
      "Featured Work Grid",
      "Case Narrative Layout",
      "Skill Matrix Tiles",
      "Inquiry Form Panel",
    ],
    palette: "from-neutral-900/70 via-zinc-900/65 to-black/75",
    visual: "/schemes/portfolio-minimal.svg",
  },
  {
    slug: "company-intro",
    title: "Corporate Intro Pack",
    sector: "Company Intro",
    summary:
      "Plug-and-play corporate intro pages for B2B companies, teams, and productized service firms.",
    tone: "Confident, clean, business-first",
    pages: ["Landing", "About", "Services", "References", "Contact"],
    features: ["Trust band", "Service matrix", "Reference slider", "FAQ"],
    stack: ["Accordion", "Badge", "Avatar", "Tabs"],
    blocks: [
      "Executive Intro Hero",
      "Service Matrix",
      "Reference Proof Carousel",
      "Procurement FAQ Block",
    ],
    palette: "from-slate-900/70 via-indigo-950/50 to-slate-950/70",
    visual: "/schemes/company-intro.svg",
  },
];

export const OPS_SCHEME_SLUGS = OPS_SCHEMES.map((scheme) => scheme.slug);

export function getOpsSchemeBySlug(slug: string): OpsScheme | undefined {
  return OPS_SCHEMES.find((scheme) => scheme.slug === slug);
}
