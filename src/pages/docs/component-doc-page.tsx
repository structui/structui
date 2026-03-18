import React from "react";
import { Navigate, Link, useParams } from "react-router-dom";

import { Sidebar } from "@/src/components/sidebar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import {
  getComponentBySlug,
  getComponentDocBySlug,
  getDocumentedComponents,
  SITE_CLI_COMMAND,
  SITE_PACKAGE_NAME,
} from "@/src/lib/registry";
import ReactMarkdown from "react-markdown";

const documentedComponentsSidebar = [
  {
    title: "Component Docs",
    items: getDocumentedComponents().map((component) => ({
      title: component.title,
      href: `/docs/components/${component.slug}`,
    })),
  },
];

export const ComponentDocPage = (): React.JSX.Element => {
  const { componentId } = useParams<{ componentId: string }>();

  if (!componentId) {
    return <Navigate to="/docs" replace />;
  }

  const component = getComponentBySlug(componentId);
  const componentDoc = getComponentDocBySlug(componentId);

  if (!component || !componentDoc) {
    return <Navigate to={`/components/${componentId}`} replace />;
  }

  const packageName = component.sourceExport
    ? `${SITE_PACKAGE_NAME}/${component.slug}`
    : SITE_PACKAGE_NAME;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar
        items={documentedComponentsSidebar}
        className="hidden lg:block w-60 border-r sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0"
      />
      <main className="flex-1 py-12 min-w-0">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/docs" className="hover:text-foreground transition-colors">
                Docs
              </Link>
              <span>/</span>
              <span>Components</span>
              <span>/</span>
              <span>{component.title}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-sm px-1.5">
                {component.category}
              </Badge>
              <Badge variant="outline" className="rounded-sm px-1.5 uppercase">
                {component.status}
              </Badge>
            </div>
            <h1 className="text-5xl font-thin tracking-tighter">{component.title}</h1>
            <p className="text-xl text-muted-foreground font-light max-w-3xl">
              {component.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild>
                <Link to={`/components/${component.slug}`}>Open component preview</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/docs/registry">Registry surfaces</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="rounded-2xl border bg-muted/10 p-6 prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{componentDoc.content}</ReactMarkdown>
            </div>

            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-muted-foreground">Package</p>
                    <p className="font-mono break-all">{packageName}</p>
                  </div>
                  {component.sourcePath ? (
                    <div className="space-y-1">
                      <p className="text-xs font-bold uppercase text-muted-foreground">Source</p>
                      <p className="font-mono break-all">{component.sourcePath}</p>
                    </div>
                  ) : null}
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase text-muted-foreground">CLI</p>
                    <p className="font-mono break-all">npx {SITE_CLI_COMMAND} add {component.slug}</p>
                  </div>
                  {component.tags.length ? (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase text-muted-foreground">Tags</p>
                      <div className="flex flex-wrap gap-2">
                        {component.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="rounded-full">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>

              {component.relatedComponents.length ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Related Components</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {component.relatedComponents.map((relatedComponent) => (
                      <Button key={relatedComponent} variant="outline" size="sm" asChild>
                        <Link to={`/docs/components/${relatedComponent}`}>{relatedComponent}</Link>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
