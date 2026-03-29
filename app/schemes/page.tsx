import type { Metadata } from "next";
import { LayoutTemplate } from "lucide-react";

import { Container } from "@/src/components/layout/container";
import { SchemeCard } from "@/src/components/site/scheme-card";
import { OPS_SCHEMES } from "@/src/setups/ops-schemes";

export const metadata: Metadata = {
  title: "Schemes",
  description:
    "Production-ready one-page website schemes built with Struct UI components for business, portfolio, and sector pages.",
  alternates: { canonical: "/schemes" },
  openGraph: {
    title: "Schemes - Struct UI",
    description:
      "Professional website schemes for space, farm, engineering, architecture, agency, and portfolio use cases.",
    url: "/schemes",
  },
};

export default function SchemesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Container className="space-y-10 py-14">
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 border border-border/70 bg-muted/40 px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <LayoutTemplate className="h-3.5 w-3.5" />
            Schemes / OPS
          </div>
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Website Schemes
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Curated one-page website structures for teams that need fast delivery with
              consistent UI quality. Each scheme includes route structure, reusable block
              modules, and visual direction.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {OPS_SCHEMES.map((scheme) => (
            <SchemeCard key={scheme.slug} scheme={scheme} />
          ))}
        </section>

        <section className="space-y-4 border border-border/70 bg-card/40 p-5">
          <h2 className="text-base font-semibold">Available Block Modules</h2>
          <p className="text-sm text-muted-foreground">
            New block modules are included across schemes to speed up page assembly and keep
            visual consistency between sectors.
          </p>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from(new Set(OPS_SCHEMES.flatMap((scheme) => scheme.blocks))).map((block) => (
              <div
                key={block}
                className="border border-border/70 bg-background/80 px-3 py-2 text-xs text-muted-foreground"
              >
                {block}
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
