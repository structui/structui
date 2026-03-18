import type { Metadata } from "next";

import { HomePage } from "@/src/components/site/home-page";
import { getAllMarkdownDocs } from "@/src/lib/content/docs";
import { getPublicComponentCatalog } from "@/src/lib/registry/catalog";

export const metadata: Metadata = {
  title: "SUI — Source-First React Component Library",
  description:
    "SUI gives you 50+ production-ready React components with full source ownership. Preview, install via CLI, and ship with confidence. Built with Tailwind CSS and Radix UI.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "SUI — Source-First React Component Library",
    description:
      "50+ production-ready React components. Preview, install via CLI, and ship with confidence. Built with Tailwind CSS and Radix UI.",
    url: "/",
  },
};

export default async function Page() {
  const [components, docs] = await Promise.all([
    getPublicComponentCatalog(),
    getAllMarkdownDocs(),
  ]);
  const categoryCount = new Set(components.map((item) => item.category)).size;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SUI — StructUI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    description:
      "Source-first React component library with 50+ components, theme creator, blocks, and CLI.",
    url: "https://structui.dev",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "50+ React components",
      "Theme Creator tool",
      "Block templates",
      "CLI installer",
      "TypeScript support",
      "Tailwind CSS v4",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePage
        componentCount={components.length}
        docsCount={docs.length}
        categoryCount={categoryCount}
      />
    </>
  );
}
