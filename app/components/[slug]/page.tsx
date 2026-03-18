import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ComponentDetailClient } from "@/src/components/site/component-detail-client";
import { SiteSidebar } from "@/src/components/site/sidebar";
import { Container } from "@/src/components/layout/container";
import {
  getComponentCatalogDetail,
  getPublicComponentCatalog,
} from "@/src/lib/registry/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const detail = await getComponentCatalogDetail(slug);
  if (!detail) return {};
  return {
    title: detail.title,
    description:
      detail.description ||
      `${detail.title} React component — source code, preview, and install instructions.`,
    alternates: { canonical: `/components/${slug}` },
    openGraph: {
      title: `${detail.title} — SUI`,
      description:
        detail.description ||
        `${detail.title} React component with full source code.`,
      url: `/components/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const components = await getPublicComponentCatalog();
  return components.map((component) => ({ slug: component.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [detail, components] = await Promise.all([
    getComponentCatalogDetail(slug),
    getPublicComponentCatalog(),
  ]);

  if (!detail) {
    notFound();
  }

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
          <ComponentDetailClient component={detail} />
        </Container>
      </main>
    </div>
  );
}
