import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  ChevronRight,
  ExternalLink,
  FileText,
  Layers,
  Terminal,
} from "lucide-react";

import { SiteSidebar } from "@/src/components/site/sidebar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { CodeBlock } from "@/src/components/ui/code-block";
import { getAllMarkdownDocs, getMarkdownDocBySlug } from "@/src/lib/content/docs";
import { getComponentCatalogDetail } from "@/src/lib/registry/catalog";

export async function generateStaticParams() {
  const docs = await getAllMarkdownDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [doc, allDocs, component] = await Promise.all([
    getMarkdownDocBySlug(slug),
    getAllMarkdownDocs(),
    getComponentCatalogDetail(slug),
  ]);

  if (!doc) {
    notFound();
  }

  // Prev / next navigation
  const currentIndex = allDocs.findIndex((d) => d.slug === slug);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;
  const cliInstallCode = component ? component.installCode : null;
  const registryInspectCode = component
    ? `curl -s https://structui.com/api/registry/components/${component.slug} | jq '.files[0]'`
    : null;
  const shadcnInstallCode = component
    ? `npx shadcn@latest add https://structui.com/api/r/${component.slug}`
    : null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SiteSidebar
        items={[
          {
            title: "Documentation",
            items: [{ title: "Overview", href: "/docs" }],
          },
          {
            title: "Component Docs",
            items: allDocs.map((item) => ({
              title: item.title,
              href: `/docs/components/${item.slug}`,
            })),
          },
        ]}
        className="sticky top-12 hidden h-[calc(100vh-3rem)] w-60 shrink-0 overflow-y-auto border-r lg:block"
      />

      <main className="min-w-0 flex-1">
        <div className="mx-auto px-6 py-10 lg:px-10">

          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/docs" className="transition-colors hover:text-foreground">Docs</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/docs" className="transition-colors hover:text-foreground">Components</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-foreground">{doc.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_220px]">
            {/* Main content */}
            <div className="space-y-8 min-w-0">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="rounded-full px-3 py-1 text-xs">
                    <BookOpen className="mr-1.5 h-3 w-3" />
                    Component Docs
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1 font-mono text-xs text-muted-foreground">
                    {doc.slug}
                  </Badge>
                </div>

                <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
                  {doc.title}
                </h1>

                {doc.description && (
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {doc.description}
                  </p>
                )}

                {component && (
                  <Button asChild size="sm" className="rounded-full">
                    <Link href={`/components/${doc.slug}`}>
                      <Layers className="mr-1.5 h-3.5 w-3.5" />
                      View component
                      <ExternalLink className="ml-1.5 h-3 w-3 opacity-60" />
                    </Link>
                  </Button>
                )}
              </div>

              {/* Install */}
              {component && (
                <div id="installation" className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-primary/70" />
                    <p className="text-sm font-semibold">Installation</p>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="rounded-2xl border border-border/70 bg-card p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        CLI
                      </p>
                      {cliInstallCode && (
                        <CodeBlock code={cliInstallCode} language="bash" />
                      )}
                    </div>
                    <div className="rounded-2xl border border-border/70 bg-card p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Registry API
                      </p>
                      {registryInspectCode && (
                        <CodeBlock code={registryInspectCode} language="bash" />
                      )}
                      {shadcnInstallCode && (
                        <div className="mt-3">
                          <CodeBlock code={shadcnInstallCode} language="bash" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Article */}
              <div id="documentation" className="rounded-2xl border border-border/70 bg-card">
                <div className="border-b px-6 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Documentation
                  </p>
                </div>
                <div className="p-6 lg:p-8">
                  <article className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:text-xs prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-border/70 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                    <ReactMarkdown>{doc.content}</ReactMarkdown>
                  </article>
                </div>
              </div>

              {/* Prev / Next */}
              <div className="flex items-center justify-between gap-4">
                {prevDoc ? (
                  <Link
                    href={`/docs/components/${prevDoc.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-all hover:border-primary/20 hover:shadow-sm"
                  >
                    <ArrowLeft className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:-translate-x-0.5 group-hover:text-primary" />
                    <div>
                      <p className="text-[11px] text-muted-foreground">Previous</p>
                      <p className="text-sm font-medium">{prevDoc.title}</p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {nextDoc ? (
                  <Link
                    href={`/docs/components/${nextDoc.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 text-right transition-all hover:border-primary/20 hover:shadow-sm"
                  >
                    <div>
                      <p className="text-[11px] text-muted-foreground">Next</p>
                      <p className="text-sm font-medium">{nextDoc.title}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>

            {/* Right sidebar */}
            <div className="hidden space-y-4 lg:block">
              {/* Meta */}
              <div className="rounded-2xl border border-border/70 bg-card">
                <div className="border-b px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    On this page
                  </p>
                </div>
                <div className="space-y-1 p-3">
                  {component && (
                    <a href="#installation" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
                      <Terminal className="h-3 w-3 shrink-0" />
                      Installation
                    </a>
                  )}
                  <a href="#documentation" className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground">
                    <FileText className="h-3 w-3 shrink-0" />
                    Documentation
                  </a>
                </div>
              </div>

              {/* Source info */}
              <div className="rounded-2xl border border-border/70 bg-card">
                <div className="border-b px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Source
                  </p>
                </div>
                <div className="space-y-3 p-4">
                  <div>
                    <p className="mb-1 text-[11px] text-muted-foreground">Doc file</p>
                    <code className="break-all font-mono text-[11px] text-foreground/70">
                      {doc.filePath}
                    </code>
                  </div>
                  {component && (
                    <div>
                      <p className="mb-1 text-[11px] text-muted-foreground">Component file</p>
                      <code className="break-all font-mono text-[11px] text-foreground/70">
                        {component.sourcePath}
                      </code>
                    </div>
                  )}
                </div>
              </div>

              {/* Related component */}
              {component && (
                <div className="rounded-2xl border border-primary/12 bg-primary/4">
                  <div className="border-b border-primary/10 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                      Related
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="mb-1 text-sm font-medium">{component.title}</p>
                    <p className="mb-3 text-xs text-muted-foreground">{component.description}</p>
                    <Button asChild size="sm" variant="outline" className="w-full rounded-full text-xs">
                      <Link href={`/components/${doc.slug}`}>
                        View component
                        <ArrowRight className="ml-1.5 h-3 w-3" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )}

              {/* All docs */}
              <div className="rounded-2xl border border-border/70 bg-card">
                <div className="border-b px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    All component docs
                  </p>
                </div>
                <div className="space-y-0.5 p-2">
                  {allDocs.map((d) => (
                    <Link
                      key={d.slug}
                      href={`/docs/components/${d.slug}`}
                      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-muted/40 ${d.slug === slug ? "bg-primary/8 font-medium text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <Layers className="h-3 w-3 shrink-0 opacity-60" />
                      {d.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
