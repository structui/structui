"use client";

import dynamic from "next/dynamic";

export const LegacyBlocksPage = dynamic(
  () =>
    import("@/src/legacy-pages/blocks").then((module) => ({
      default: module.BlocksPage,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-primary/10 bg-muted/10 p-8 text-sm text-muted-foreground">
          Loading blocks...
        </div>
      </div>
    ),
  },
);
