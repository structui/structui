import type { MetadataRoute } from "next";

import { getPublicComponentCatalog } from "@/src/lib/registry/catalog";
import { getAllMarkdownDocs } from "@/src/lib/content/docs";
import { OPS_SCHEMES } from "@/src/setups/ops-schemes";

const BASE_URL = "https://structui.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [components, docs] = await Promise.all([
    getPublicComponentCatalog(),
    getAllMarkdownDocs(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/components`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blocks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/theme-creator`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/inline-components`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/palettes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/setups`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/schemes`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const componentRoutes: MetadataRoute.Sitemap = components.map((component) => ({
    url: `${BASE_URL}/components/${component.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const docRoutes: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${BASE_URL}/docs/components/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const schemeRoutes: MetadataRoute.Sitemap = OPS_SCHEMES.map((scheme) => ({
    url: `${BASE_URL}/setups/ops/${scheme.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...componentRoutes, ...docRoutes, ...schemeRoutes];
}
