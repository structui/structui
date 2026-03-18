import type { Metadata } from "next";
import { LegacyBlocksPage } from "./client";

export const metadata: Metadata = {
  title: "Blocks",
  description:
    "Production-ready section templates for landing pages, apps, and dashboards. Copy full source code blocks.",
  alternates: { canonical: "/blocks" },
  openGraph: {
    title: "Blocks — SUI",
    description:
      "Production-ready section templates for landing pages, apps, and dashboards.",
    url: "/blocks",
  },
};

export default function Page() {
  return <LegacyBlocksPage />;
}
