import type { Metadata } from "next";
import { PalettesClient } from "@/src/components/site/palettes-client";

const TITLE = "Design Palettes — CSS Color Systems with AI-Ready DESIGN_PATTERN Docs";
const DESCRIPTION =
  "Explore 6 production-ready design system color palettes (Lyra, Aurora, Crimson, Slate Pro, Copper, Neon Void) with live previews, token tables, copy-paste CSS variables, and AI-readable DESIGN_PATTERN.md documentation. Works with any framework.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "design system palette",
    "CSS color variables",
    "design tokens",
    "color scheme",
    "dark mode palette",
    "light mode palette",
    "CSS custom properties",
    "AI design system",
    "DESIGN_PATTERN.md",
    "Tailwind CSS palette",
    "color system",
    "UI color tokens",
    "design system colors",
    "theme colors",
    "SUI palettes",
    "StructUI palette",
    "color variables",
    "CSS variables design system",
    "accessible color palette",
    "WCAG color contrast",
    "Lyra design system",
    "Aurora design system",
    "Crimson design system",
  ],
  alternates: {
    canonical: "/palettes",
  },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: "/palettes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUI Design Palettes — CSS Color Systems",
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
    name: "Design Palettes — SUI",
    description: DESCRIPTION,
    url: "https://structui.com/palettes",
    isPartOf: {
      "@type": "WebSite",
      name: "SUI — StructUI",
      url: "https://structui.com",
    },
    about: {
      "@type": "Thing",
      name: "Design System Color Palettes",
      description:
        "Production-ready CSS color token systems with live previews, AI-readable documentation, and framework-agnostic CSS variable output.",
    },
    hasPart: [
      { "@type": "CreativeWork", name: "Lyra Palette", description: "Professional dual-tone palette with cool blue accents for light, dark, and grey themes." },
      { "@type": "CreativeWork", name: "Aurora Palette", description: "Deep forest-green dark-first palette inspired by natural bioluminescence." },
      { "@type": "CreativeWork", name: "Crimson Palette", description: "Warm, high-contrast palette with deep crimson accents — bold and dramatic." },
      { "@type": "CreativeWork", name: "Slate Pro Palette", description: "Refined neutral palette with violet undertones, enterprise-ready." },
      { "@type": "CreativeWork", name: "Copper Palette", description: "Warm amber and copper tones for editorial and luxury brands." },
      { "@type": "CreativeWork", name: "Neon Void Palette", description: "Cyberpunk-inspired pitch-black canvas with electric cyan accents." },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PalettesClient />
    </>
  );
}
