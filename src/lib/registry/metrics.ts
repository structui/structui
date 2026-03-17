import { getAllComponents } from "@/src/lib/registry/components";
import type { SiteMetrics } from "@/src/lib/registry/types";

export const getSiteMetrics = (): SiteMetrics => {
  const components = getAllComponents();

  return {
    totalComponents: components.length,
    documentedComponents: components.filter((entry) => entry.docsStatus === "ready").length,
    stableComponents: components.filter((entry) => entry.status === "stable").length,
    previewComponents: components.filter((entry) => entry.status === "preview").length,
    plannedComponents: components.filter((entry) => entry.status === "planned").length,
    categories: new Set(components.map((entry) => entry.category)).size,
  };
};
