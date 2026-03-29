import type { Metadata } from "next";

import { ComponentsIndexClient } from "@/src/components/site/components-index-client";
import { SiteSidebar } from "@/src/components/site/sidebar";
import { Container } from "@/src/components/layout/container";
import {
  getComponentCoverageSummary,
  getPublicComponentCatalog,
} from "@/src/lib/registry/catalog";

export const metadata: Metadata = {
  title: "React Components — 50+ Source-First UI Components",
  description:
    "Browse 50+ production-ready React components with full source ownership. Built with Tailwind CSS v4 and Radix UI. Install with npx sui add, or copy the source directly. Covers forms, navigation, overlays, data display, and more.",
  keywords: [
    "React components",
    "UI components library",
    "Tailwind CSS components",
    "Radix UI components",
    "source-first components",
    "headless UI",
    "accessible components",
    "shadcn alternative",
    "Next.js components",
    "TypeScript components",
    "form components",
    "navigation components",
    "overlay components",
    "data display components",
    "SUI components",
    "StructUI",
    "open source UI",
    "component registry",
    "CLI components",
    "npx sui add",
  ],
  alternates: { canonical: "/components" },
  openGraph: {
    type: "website",
    title: "React Components — SUI",
    description:
      "Browse 50+ source-first React components. Forms, navigation, data display, overlays, and more. Install via CLI or copy source.",
    url: "/components",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SUI React Components Library",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "React Components — SUI",
    description:
      "50+ source-first React components. Tailwind CSS v4 + Radix UI. Install via CLI.",
    images: ["/og-image.png"],
    creator: "@structui",
    site: "@structui",
  },
};

export default async function Page() {
  const [components, coverage] = await Promise.all([
    getPublicComponentCatalog(),
    getComponentCoverageSummary(),
  ]);
  const grouped = Array.from(new Set(components.map((item) => item.category))).map(
    (category) => ({
      title: category,
      items: components
        .filter((item) => item.category === category)
        .map((item) => ({
          title: item.title,
          href: `/components/${item.slug}`,
        })),
    }),
  );

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen">
      <SiteSidebar
        items={[
          {
            title: "Overview",
            items: [{ title: "All Components", href: "/components" }],
          },
          ...grouped,
        ]}
        className="sticky top-12 hidden h-[calc(100vh-3rem)] w-64 shrink-0 overflow-y-auto border-r lg:block"
      />
      <main className="min-w-0 flex-1 py-12">
        <Container>
          <ComponentsIndexClient components={components} coverage={coverage} />
        </Container>
      </main>
    </div>
  );
}
