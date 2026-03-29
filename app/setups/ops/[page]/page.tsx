import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { OpsPreview } from "@/src/components/site/ops-preview";
import { CopySchemeCode } from "@/src/components/site/copy-scheme-code";
import { OPS_SCHEME_SLUGS, getOpsSchemeBySlug } from "@/src/setups/ops-schemes";

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
    title: `${scheme.title} - OPS Scheme`,
    description: scheme.summary,
    alternates: { canonical: `/setups/ops/${scheme.slug}` },
    openGraph: {
      title: `${scheme.title} - Struct UI OPS`,
      description: scheme.summary,
      url: `/setups/ops/${scheme.slug}`,
    },
  };
}

export function generateStaticParams() {
  return OPS_SCHEME_SLUGS.map((page) => ({ page }));
}

export default async function OpsSchemeDetailPage({ params }: Props) {
  const { page } = await params;
  const scheme = getOpsSchemeBySlug(page);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* Top-left: back button */}
      <div className="fixed left-4 top-4 z-50 flex flex-wrap items-center gap-2 md:left-6 md:top-6">
        <Link
          href="/schemes"
          className="inline-flex items-center gap-2 border border-white/25 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors hover:bg-black/55"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to schemes
        </Link>
      </div>

      {/* Top-right: copy code + preview */}
      <div className="fixed right-4 top-4 z-50 flex flex-wrap items-center gap-2 md:right-6 md:top-6">
        <CopySchemeCode scheme={scheme} />
        <Link
          href={`/setups/ops/${scheme.slug}/preview`}
          className="inline-flex items-center gap-2 border border-white/25 bg-black/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur-md transition-colors hover:bg-black/55"
        >
          Clean preview
        </Link>
      </div>

      <OpsPreview
        slug={scheme.slug}
        title={scheme.title}
        sector={scheme.sector}
        summary={scheme.summary}
        pages={scheme.pages}
        features={scheme.features}
        blocks={scheme.blocks}
        tone={scheme.tone}
        stack={scheme.stack}
      />
    </div>
  );
}
