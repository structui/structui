import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard/", "/auth/"],
      },
    ],
    sitemap: "https://structui.dev/sitemap.xml",
    host: "https://structui.dev",
  };
}
