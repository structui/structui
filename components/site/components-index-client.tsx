"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, LayoutGrid, List, Search, Sparkles } from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { cn } from "@/src/lib/utils";
import type {
  ComponentCatalogEntry,
  ComponentCoverageSummary,
} from "@/src/lib/registry/catalog";

interface ComponentsIndexClientProps {
  components: ComponentCatalogEntry[];
  coverage: ComponentCoverageSummary;
}

// Mini visual preview thumbnail based on category
function ComponentThumbnail({ category }: { category: string }) {
  const gradients: Record<string, string> = {
    "General": "from-blue-500/20 via-blue-400/10 to-transparent",
    "Forms": "from-violet-500/20 via-violet-400/10 to-transparent",
    "Navigation": "from-emerald-500/20 via-emerald-400/10 to-transparent",
    "Data Display": "from-amber-500/20 via-amber-400/10 to-transparent",
    "Overlay": "from-rose-500/20 via-rose-400/10 to-transparent",
    "Feedback": "from-cyan-500/20 via-cyan-400/10 to-transparent",
    "Layout": "from-orange-500/20 via-orange-400/10 to-transparent",
    "Advanced": "from-primary/25 via-primary/10 to-transparent",
  };

  const dots: Record<string, string> = {
    "General": "bg-blue-500",
    "Forms": "bg-violet-500",
    "Navigation": "bg-emerald-500",
    "Data Display": "bg-amber-500",
    "Overlay": "bg-rose-500",
    "Feedback": "bg-cyan-500",
    "Layout": "bg-orange-500",
    "Advanced": "bg-primary",
  };

  const gradient = gradients[category] ?? "from-primary/20 via-primary/10 to-transparent";
  const dot = dots[category] ?? "bg-primary";

  return (
    <div className={cn("relative h-24 w-full overflow-hidden rounded-xl bg-gradient-to-br", gradient)}>
      <div className="absolute inset-0 flex items-center justify-center gap-1.5">
        {/* Visual placeholder pattern per category */}
        {category === "Forms" && (
          <div className="space-y-1.5 w-28">
            <div className="h-5 rounded-md border border-border/50 bg-background/60" />
            <div className="h-5 rounded-md border border-border/50 bg-background/60" />
            <div className="h-4 w-16 rounded-md bg-primary/70" />
          </div>
        )}
        {category === "Navigation" && (
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-6 rounded-lg border border-border/50 bg-background/70 px-3 text-[9px] font-medium flex items-center text-foreground/60">
                Link
              </div>
            ))}
          </div>
        )}
        {category === "Data Display" && (
          <div className="space-y-1 w-28">
            {[80, 60, 90, 45].map((w, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="h-2 rounded-full bg-background/60 flex-1" style={{ maxWidth: `${w}%` }} />
                <div className={cn("h-2 rounded-full", dot)} style={{ width: `${w * 0.4}px` }} />
              </div>
            ))}
          </div>
        )}
        {category === "Overlay" && (
          <div className="relative w-24 h-14">
            <div className="absolute inset-0 rounded-xl border border-border/50 bg-background/80 shadow-sm" />
            <div className="absolute left-2 top-2 right-2 h-4 rounded-md border border-border/40 bg-background/60" />
            <div className="absolute left-3 bottom-3 h-3 w-12 rounded-md bg-primary/60" />
          </div>
        )}
        {(category === "General" || category === "Feedback" || category === "Layout" || category === "Advanced") && (
          <div className="flex flex-wrap justify-center gap-1.5 px-3">
            {[48, 56, 40, 64, 44].map((w, i) => (
              <div
                key={i}
                className={cn("h-5 rounded-full", i === 0 ? dot : "border border-border/60 bg-background/60")}
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        )}
      </div>
      {/* subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IndoaXRlIi8+PHJlY3QgeD0iMiIgeT0iMiIgd2lkdGg9IjIiIGhlaWdodD0iMiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')]" />
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  "General": "text-blue-600 bg-blue-500/8 border-blue-500/20 dark:text-blue-400",
  "Forms": "text-violet-600 bg-violet-500/8 border-violet-500/20 dark:text-violet-400",
  "Navigation": "text-emerald-600 bg-emerald-500/8 border-emerald-500/20 dark:text-emerald-400",
  "Data Display": "text-amber-600 bg-amber-500/8 border-amber-500/20 dark:text-amber-400",
  "Overlay": "text-rose-600 bg-rose-500/8 border-rose-500/20 dark:text-rose-400",
  "Feedback": "text-cyan-600 bg-cyan-500/8 border-cyan-500/20 dark:text-cyan-400",
  "Layout": "text-orange-600 bg-orange-500/8 border-orange-500/20 dark:text-orange-400",
  "Advanced": "text-primary bg-primary/8 border-primary/20",
};

type ViewMode = "grid" | "list";

export function ComponentsIndexClient({
  components,
  coverage,
}: ComponentsIndexClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<ViewMode>("grid");

  const categories = useMemo(
    () => ["All", ...new Set(components.map((c) => c.category))],
    [components],
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: components.length };
    for (const c of components) {
      counts[c.category] = (counts[c.category] ?? 0) + 1;
    }
    return counts;
  }, [components]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return components.filter((c) => {
      const matchesSearch =
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.slug.toLowerCase().includes(query);
      const matchesCategory = category === "All" || c.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [components, search, category]);

  return (
    <div className="">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">
            <Sparkles className="mr-1.5 h-3 w-3" />
            {components.length} components
          </Badge>
        </div>
        <h1 className="text-5xl font-bold tracking-tight">Components</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Source files, code-first install guidance, and markdown-backed docs in one registry.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            {coverage.totalComponents} UI files
          </span>
          <span className="border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            {coverage.registryMapped} registry mapped
          </span>
          <span className="border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            {coverage.docsAvailable} docs ready
          </span>
          <span className="border border-border/70 bg-card px-3 py-1 text-xs text-muted-foreground">
            {coverage.categories} categories
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            className="h-10 rounded-xl pl-10 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center mb-3 gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  category === item
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                {item}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0 text-[10px] font-semibold leading-4",
                    category === item
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted-foreground/15",
                  )}
                >
                  {categoryCounts[item] ?? 0}
                </span>
              </button>
            ))}
          </div>

          <div className="hidden items-center rounded-xl border p-0.5 sm:flex">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                view === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <List className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      {search && (
        <p className="text-sm text-muted-foreground">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{search}&quot;
        </p>
      )}

      {/* Grid */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((component) => (
            <Link key={component.slug} href={`/components/${component.slug}`}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                {/* Thumbnail */}
                <ComponentThumbnail category={component.category} />

                {/* Content */}
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-semibold leading-tight">{component.title}</h3>
                      <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {component.description}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                        CATEGORY_COLORS[component.category] ?? "text-muted-foreground bg-muted/40 border-border/60",
                      )}
                    >
                      {component.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {component.docsAvailable && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          docs
                        </span>
                      )}
                      <span className="font-mono text-[11px] text-muted-foreground/60">{component.slug}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="divide-y divide-border/60 rounded-2xl border">
          {filtered.map((component, i) => (
            <Link key={component.slug} href={`/components/${component.slug}`}>
              <div className={cn(
                "group flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-muted/30",
                i === 0 && "rounded-t-2xl",
                i === filtered.length - 1 && "rounded-b-2xl",
              )}>
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/8">
                  <span className="font-mono text-[11px] font-bold text-primary">
                    {component.slug.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{component.title}</span>
                    {component.docsAvailable && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                        docs
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">{component.description}</p>
                </div>
                <span
                  className={cn(
                    "hidden shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium sm:block",
                    CATEGORY_COLORS[component.category] ?? "text-muted-foreground bg-muted/40 border-border/60",
                  )}
                >
                  {component.category}
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground/40 transition-all group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-24 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-base font-medium">No components found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => { setSearch(""); setCategory("All"); }}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
