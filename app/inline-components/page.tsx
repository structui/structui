import type { Metadata } from "next";
import { InlineComponentsClient } from "@/src/components/site/inline-components-client";

const TITLE = "Inline Components — Pure CSS Components for React, Vue & Astro";
const DESCRIPTION =
  "10 production-ready UI components built with pure inline CSS styles — Bento Grid, Glass Card, Stat Ticker, Timeline, Kanban Board, Avatar Card, Pricing Cards, Toast Stack, Progress Bars, and Feature Grid. Zero dependencies. Copy-paste ready for React, Vue 3, and Astro.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "inline CSS components",
    "pure CSS components",
    "React components",
    "Vue components",
    "Astro components",
    "no dependencies UI",
    "zero dependency components",
    "copy paste components",
    "bento grid React",
    "glassmorphism card",
    "stat ticker UI",
    "timeline component",
    "kanban board component",
    "avatar card component",
    "pricing cards React",
    "toast notification UI",
    "progress bar component",
    "feature grid layout",
    "inline style React",
    "React inline styles",
    "CSS in JS components",
    "SUI inline components",
    "StructUI components",
    "framework agnostic UI",
  ],
  alternates: {
    canonical: "/inline-components",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/inline-components",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUI Inline Components — Pure CSS UI Components",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@structui",
    site: "@structui",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Inline Components — SUI",
    description: DESCRIPTION,
    url: "https://structui.com/inline-components",
    isPartOf: {
      "@type": "WebSite",
      name: "SUI — StructUI",
      url: "https://structui.com",
    },
    about: {
      "@type": "Thing",
      name: "Inline CSS UI Components",
      description:
        "Zero-dependency UI components built with pure inline CSS, ready to copy-paste into any React, Vue 3, or Astro project.",
    },
    hasPart: [
      { "@type": "SoftwareSourceCode", name: "Bento Grid", description: "CSS grid layout with featured cards and stat tiles.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Glass Card", description: "Glassmorphism card with backdrop blur and gradient background.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Stat Ticker", description: "KPI stat cards with trend indicators.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Timeline", description: "Vertical activity timeline with colored milestone dots.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Kanban Board", description: "Horizontal kanban columns with draggable-ready task cards.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Avatar Card", description: "User profile card with online status indicator.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Pricing Cards", description: "Side-by-side pricing tiers with highlighted plan.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Toast Stack", description: "Notification toasts with success, error, and info types.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Progress Bars", description: "Animated skill-level progress bars with percentage labels.", programmingLanguage: ["React", "Vue", "Astro"] },
      { "@type": "SoftwareSourceCode", name: "Feature Grid", description: "2×2 feature highlight grid with icons and descriptions.", programmingLanguage: ["React", "Vue", "Astro"] },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InlineComponentsClient />
    </>
  );
}
