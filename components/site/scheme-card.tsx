import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import type { OpsScheme } from "@/src/setups/ops-schemes";

interface SchemeCardProps {
  scheme: OpsScheme;
}

export function SchemeCard({ scheme }: SchemeCardProps) {
  return (
    <Link
      href={`/setups/ops/${scheme.slug}`}
      className="group flex h-full flex-col border border-border/70 bg-card/60 transition-colors hover:border-primary/35"
    >
      <div className={`relative h-32 overflow-hidden bg-gradient-to-br ${scheme.palette}`}>
        <Image
          src={scheme.visual}
          alt={`${scheme.title} visual preview`}
          fill
          className="object-cover opacity-75 transition-opacity duration-300 group-hover:opacity-90"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <Badge variant="secondary" className="rounded-sm text-[10px] uppercase tracking-[0.14em]">
              {scheme.sector}
            </Badge>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight">{scheme.title}</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{scheme.summary}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {scheme.blocks.slice(0, 2).map((block) => (
            <span
              key={block}
              className="border border-border/70 bg-background/70 px-2 py-0.5 text-[11px] text-muted-foreground"
            >
              {block}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
