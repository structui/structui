import { useParams, Link } from "react-router-dom";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { CodeBlock } from "@/src/components/ui/code-block";
import ReactMarkdown from "react-markdown";
import { componentData } from "@/src/content/components/legacy-component-detail-data";
import {
  getComponentBySlug,
  getComponentDocBySlug,
  SITE_CLI_COMMAND,
  SITE_ISSUES_URL,
  SITE_PACKAGE_NAME,
} from "@/src/lib/registry";
import { ExternalLink, Info, Layers, MousePointer2 } from "lucide-react";

export const ComponentDetail = () => {
  const { componentId } = useParams();
  const data = componentId ? componentData[componentId] : null;
  const registryEntry = componentId ? getComponentBySlug(componentId) : undefined;
  const componentDoc = componentId ? getComponentDocBySlug(componentId) : undefined;
  const hasMarkdownDoc = Boolean(componentDoc);
  const displayCategory = registryEntry?.category ?? data?.category;
  const displayTitle = registryEntry?.title ?? data?.title;
  const displayDescription = registryEntry?.description ?? data?.description;
  const sourcePath = registryEntry?.sourcePath ?? `src/components/ui/${componentId}.tsx`;
  const packageName = registryEntry?.sourceExport
    ? `${SITE_PACKAGE_NAME}/${registryEntry.slug}`
    : SITE_PACKAGE_NAME;

  if (!data && !registryEntry) {
    // Fallback for components not yet fully documented in this detailed view
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Layers className="h-12 w-12 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Documentation in Progress</h1>
        <p className="text-muted-foreground mb-8">We are currently working on detailed documentation for "{componentId}".</p>
        <Button asChild>
          <Link to="/components">Back to Components</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12 pb-24 mt-8">
      <div className="flex-1 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="rounded-sm px-1.5">{displayCategory}</Badge>
            {registryEntry && (
              <Badge variant="outline" className="rounded-sm px-1.5 uppercase">
                {registryEntry.status}
              </Badge>
            )}
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight">{displayTitle}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {displayDescription}
          </p>
          <div className="flex gap-4 pt-2">
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <Link to="/docs">
              <ExternalLink className="h-4 w-4" /> Docs
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="gap-2" asChild>
              <a
                href={SITE_ISSUES_URL}
                target="_blank"
                rel="noreferrer"
              >
              <Info className="h-4 w-4" /> Report Issue
              </a>
            </Button>
          </div>
        </div>

        {/* Installation */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Installation</h2>
          <Tabs defaultValue="cli" className="w-full">
            <TabsList>
              <TabsTrigger value="cli">CLI</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            <TabsContent value="cli">
              <CodeBlock code={`npx ${SITE_CLI_COMMAND} add ${componentId}`} language="bash" />
            </TabsContent>
            <TabsContent value="manual">
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Copy the source file into your <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">src/components/ui/</code> directory:</p>
                <CodeBlock code={`# 1. Copy the component file
cp node_modules/${SITE_PACKAGE_NAME}/${sourcePath} src/components/ui/

# 2. Or manually create ${sourcePath}
# 3. Import the exported symbol into your app`} language="bash" />
                {data?.usage && !hasMarkdownDoc && (
                  <div>
                    <p className="text-sm font-medium mb-2">Full source usage:</p>
                    <CodeBlock code={data.usage} />
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Usage */}
        {data?.usage && !hasMarkdownDoc && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Usage</h2>
            <CodeBlock code={data.usage} />
          </div>
        )}

        {componentDoc && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
            <div className="min-h-[200px] rounded-xl border bg-muted/10 p-6 prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown>{componentDoc.content}</ReactMarkdown>
            </div>
          </div>
        )}

        {/* Examples */}
        {data && (
          <div className="space-y-12">
            <h2 className="text-3xl font-bold tracking-tight">Examples</h2>
            {data.examples.map((example, index) => (
              <div key={index} className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{example.title}</h3>
                  <p className="text-muted-foreground">{example.description}</p>
                </div>
                <Tabs defaultValue="preview" className="w-full">
                  <TabsList className="grid w-[200px] grid-cols-2">
                    <TabsTrigger value="preview">Preview</TabsTrigger>
                    <TabsTrigger value="code">Code</TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="mt-4">
                    <div className="flex items-center justify-center p-12 border rounded-xl bg-muted/10 min-h-[200px]">
                      {example.render}
                    </div>
                  </TabsContent>
                  <TabsContent value="code">
                    <CodeBlock code={example.code} />
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </div>
        )}

        {/* Props */}
        {data && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Props</h2>
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-[150px]">Prop</TableHead>
                    <TableHead className="w-[200px]">Type</TableHead>
                    <TableHead className="w-[100px]">Default</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.props.map((prop) => (
                    <TableRow key={prop.name}>
                      <TableCell className="font-mono text-sm font-bold text-primary">{prop.name}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{prop.type}</TableCell>
                      <TableCell className="font-mono text-xs">{prop.default}</TableCell>
                      <TableCell className="text-sm">{prop.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="lg:w-80 space-y-8">
        {data?.features && !hasMarkdownDoc && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Layers className="h-4 w-4" /> Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.features.map((feature, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span> {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {data?.accessibility && !hasMarkdownDoc && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MousePointer2 className="h-4 w-4" /> Accessibility
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data.accessibility.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary">•</span> {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-4 w-4" /> Quick Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-muted-foreground">Category</p>
              <p className="text-sm">{displayCategory}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase text-muted-foreground">Package</p>
              <p className="text-sm font-mono">{packageName}</p>
            </div>
            {registryEntry?.sourcePath && (
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Source</p>
                <p className="text-sm font-mono break-all">{registryEntry.sourcePath}</p>
              </div>
            )}
            {registryEntry && (
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">Docs Status</p>
                <p className="text-sm">{registryEntry.docsStatus}</p>
              </div>
            )}
            {registryEntry?.tags.length ? (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {registryEntry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
            {registryEntry?.llmSummary && (
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase text-muted-foreground">LLM Summary</p>
                <p className="text-sm text-muted-foreground">{registryEntry.llmSummary}</p>
              </div>
            )}
            {registryEntry?.relatedComponents.length ? (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase text-muted-foreground">Related</p>
                <div className="flex flex-wrap gap-2">
                  {registryEntry.relatedComponents.map((relatedComponent) => (
                    <Button key={relatedComponent} variant="outline" size="sm" asChild>
                      <Link to={`/components/${relatedComponent}`}>{relatedComponent}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
