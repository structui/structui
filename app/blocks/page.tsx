import type { Metadata } from "next";
import { LegacyBlocksPage } from "./client";

export const metadata: Metadata = {
  title: "UI Blocks — Ready-Made Section Templates for React & Next.js",
  description:
    "Browse production-ready section and page block templates built with Tailwind CSS and Radix UI. Hero sections, feature grids, pricing tables, dashboards, and more. Copy the full source code or install via CLI.",
  keywords: [
    "UI blocks",
    "React section templates",
    "Next.js blocks",
    "Tailwind CSS blocks",
    "landing page sections",
    "hero section React",
    "pricing table component",
    "feature grid template",
    "dashboard blocks",
    "copy paste sections",
    "SUI blocks",
    "StructUI templates",
    "open source blocks",
  ],
  alternates: { canonical: "/blocks" },
  openGraph: {
    type: "website",
    title: "UI Blocks — SUI",
    description:
      "Ready-made section templates for landing pages, apps, and dashboards. Full source code included.",
    url: "/blocks",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUI UI Blocks",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UI Blocks — SUI",
    description: "Production-ready section templates. Copy source or install via CLI.",
    images: ["/og-image.png"],
    creator: "@structui",
    site: "@structui",
  },
};


export default function Page() {
  return <LegacyBlocksPage />;
}
