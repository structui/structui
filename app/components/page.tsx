import type { Metadata } from "next";

import { ComponentsIndexClient } from "@/src/components/site/components-index-client";
import { SiteSidebar } from "@/src/components/site/sidebar";
import { Container } from "@/src/components/layout/container";
import { getPublicComponentCatalog } from "@/src/lib/registry/catalog";

export const metadata: Metadata = {
  title: "Components",
  description:
    "Browse 50+ source-first React components built with Tailwind CSS and Radix UI. Copy source code or install via CLI with npx sui add.",
  alternates: { canonical: "/components" },
  openGraph: {
    title: "Components — SUI",
    description:
      "Browse 50+ source-first React components. Forms, navigation, data display, overlays, and more.",
    url: "/components",
  },
};

export default async function Page() {
  const components = await getPublicComponentCatalog();
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
    <div className="flex min-h-screen">
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
        <Container className="mx-auto max-w-7xl">
          <ComponentsIndexClient components={components} />
        </Container>
      </main>
    </div>
  );
}
