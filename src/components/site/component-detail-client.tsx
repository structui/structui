"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  BookOpen,
  Code2,
  Copy,
  ExternalLink,
  FileCode2,
  Package,
  Tag,
} from "lucide-react";
import { useState } from "react";

import { ComponentPreview } from "@/src/components/site/component-previews";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { CodeBlock } from "@/src/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";
import type { ComponentCatalogDetail } from "@/src/lib/registry/catalog";

interface ComponentDetailClientProps {
  component: ComponentCatalogDetail;
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

export function ComponentDetailClient({ component }: ComponentDetailClientProps) {
  const [copied, setCopied] = useState(false);

  const copyImport = () => {
    navigator.clipboard.writeText(component.importCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="">
      {/* Back link */}
      <div className="mb-6">
        <Button asChild variant="ghost" size="sm" className="h-8 gap-1.5 rounded-full px-3 text-xs text-muted-foreground hover:text-foreground">
          <Link href="/components">
            <ArrowLeft className="h-3.5 w-3.5" />
            All components
          </Link>
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
        {/* Main column */}
        <div className="space-y-8 min-w-0">
          {/* Hero header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  CATEGORY_COLORS[component.category] ?? "text-muted-foreground bg-muted/40 border-border/60",
                )}
              >
                {component.category}
              </span>
              <Badge
                variant="outline"
                className={cn(
                  "rounded-full px-3 py-1 text-xs",
                  component.status === "stable" && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
                  component.status === "preview" && "border-amber-500/30 text-amber-600 dark:text-amber-400",
                )}
              >
                {component.status}
              </Badge>
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{component.title}</h1>
              <p className="mt-2 max-w-2xl text-base text-muted-foreground">{component.llmSummary}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {component.docsUrl && (
                <Button asChild size="sm" className="rounded-full">
                  <Link href={component.docsUrl}>
                    <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                    Open docs
                  </Link>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={copyImport}
              >
                <Copy className="mr-1.5 h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy import"}
              </Button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="overflow-hidden rounded-2xl border bg-gradient-to-br from-muted/20 via-background to-background">
            <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs text-muted-foreground">Preview</span>
              </div>
              <span className="font-mono text-[11px] text-muted-foreground/60">{component.slug}</span>
            </div>
            <div className="p-6 lg:p-8">
              <ComponentPreview slug={component.slug} />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="code" id="code-tab">
            <TabsList className="h-auto rounded-2xl border bg-muted/30 p-1">
              <TabsTrigger value="code" className="gap-2 rounded-xl">
                <Code2 className="h-3.5 w-3.5" />
                Code
              </TabsTrigger>
              <TabsTrigger value="manual" className="gap-2 rounded-xl">
                <Package className="h-3.5 w-3.5" />
                Manual Add
              </TabsTrigger>
              <TabsTrigger value="docs" className="gap-2 rounded-xl">
                <BookOpen className="h-3.5 w-3.5" />
                Docs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="code" className="mt-6 space-y-4">
              <Card className="overflow-hidden border-border/70">
                <CardHeader className="border-b bg-muted/20 py-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    Import
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  <CodeBlock code={component.importCode} language="tsx" />
                  <CodeBlock code={component.installCode} language="bash" />
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-border/70">
                <CardHeader className="border-b bg-muted/20 py-3">
                  <CardTitle className="flex items-center gap-2 text-sm font-medium">
                    <FileCode2 className="h-3.5 w-3.5 text-muted-foreground" />
                    Source
                  </CardTitle>
                  <CardDescription className="text-xs">
                    From <code className="rounded bg-muted px-1 py-0.5">{component.sourcePath}</code>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <CodeBlock code={component.sourceCode} language="tsx" />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="mt-6">
              <Card className="border-border/70">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Manual install</CardTitle>
                  <CardDescription className="text-xs">
                    Copy-paste path for teams that want to own the source.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ol className="space-y-2">
                    {component.manualSteps.map((step, i) => (
                      <li key={step} className="flex gap-3 rounded-xl border border-border/70 bg-muted/10 p-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-bold text-primary">
                          {i + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ol>
                  {component.dependencies.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Dependencies</p>
                      <div className="flex flex-wrap gap-2">
                        {component.dependencies.map((dep) => (
                          <Badge key={dep} variant="secondary" className="rounded-full">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="mt-6">
              <Card className="border-border/70">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Documentation</CardTitle>
                  <CardDescription className="text-xs">
                    Rendered from the{" "}
                    <code className="rounded bg-muted px-1 py-0.5">content</code> folder.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {component.docContent ? (
                    <article className="prose prose-neutral max-w-none dark:prose-invert prose-sm">
                      <ReactMarkdown>{component.docContent}</ReactMarkdown>
                    </article>
                  ) : (
                    <div className="rounded-xl border border-dashed py-10 text-center">
                      <p className="text-sm text-muted-foreground">
                        No markdown documentation for this component yet.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="hidden space-y-4 lg:block">
          {/* Component info */}
          <div className="rounded-2xl border border-border/70 bg-card">
            <div className="border-b px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Component Info
              </p>
            </div>
            <div className="space-y-3 p-4">
              <InfoRow label="Slug" value={<code className="rounded bg-muted px-1.5 py-0.5 text-xs">{component.slug}</code>} />
              <InfoRow label="Category" value={component.category} />
              <InfoRow label="Status" value={
                <Badge variant="outline" className={cn(
                  "h-5 rounded-full px-2 text-[11px]",
                  component.status === "stable" && "border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
                )}>
                  {component.status}
                </Badge>
              } />
            </div>
          </div>

          {/* Dependencies */}
          {component.dependencies.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-card">
              <div className="border-b px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Dependencies
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 p-4">
                {component.dependencies.map((dep) => (
                  <Badge key={dep} variant="secondary" className="rounded-full text-xs">
                    {dep}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Quick actions */}
          <div className="rounded-2xl border border-border/70 bg-card">
            <div className="border-b px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Quick Actions
              </p>
            </div>
            <div className="space-y-1.5 p-3">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 rounded-xl text-xs"
                onClick={copyImport}
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied!" : "Copy import statement"}
              </Button>
              {component.docsUrl && (
                <Button asChild variant="ghost" size="sm" className="w-full justify-start gap-2 rounded-xl text-xs">
                  <Link href={component.docsUrl}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    Open docs page
                  </Link>
                </Button>
              )}
              <Button asChild variant="ghost" size="sm" className="w-full justify-start gap-2 rounded-xl text-xs">
                <a href="#code-tab">
                  <FileCode2 className="h-3.5 w-3.5" />
                  View source code
                </a>
              </Button>
            </div>
          </div>

          {/* Tags */}
          {(component as any).tags?.length > 0 && (
            <div className="rounded-2xl border border-border/70 bg-card">
              <div className="border-b px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Tag className="h-3 w-3" />
                  Tags
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 p-4">
                {(component as any).tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" className="rounded-full text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>
      <div className="text-right text-xs font-medium">{value}</div>
    </div>
  );
}
