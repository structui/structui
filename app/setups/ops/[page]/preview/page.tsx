import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { OpsPreview } from "@/src/components/site/ops-preview";
import { getOpsSchemeBySlug, OPS_SCHEME_SLUGS } from "@/src/setups/ops-schemes";

interface Props {
  params: Promise<{ page: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params;
  const scheme = getOpsSchemeBySlug(page);

  if (!scheme) {
    return {};
  }

  return {
    title: `${scheme.title} - Live Preview`,
    description: `Live one-page preview for the ${scheme.title} OPS scheme.`,
    alternates: { canonical: `/setups/ops/${scheme.slug}/preview` },
  };
}

export function generateStaticParams() {
  return OPS_SCHEME_SLUGS.map((page) => ({ page }));
}

export default async function OpsSchemePreviewPage({ params }: Props) {
  const { page } = await params;
  const scheme = getOpsSchemeBySlug(page);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed left-4 top-4 z-50 md:left-6 md:top-6">
        <Link
          href={`/setups/ops/${scheme.slug}`}
          className="inline-flex items-center gap-2 border border-white/25 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors hover:bg-black/55"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to scheme details
        </Link>
      </div>
      <OpsPreview
        slug={scheme.slug}
        title={scheme.title}
        sector={scheme.sector}
        summary={scheme.summary}
        tone={scheme.tone}
        pages={scheme.pages}
        features={scheme.features}
        blocks={scheme.blocks}
        stack={scheme.stack}
      />
    </div>
  );
}
