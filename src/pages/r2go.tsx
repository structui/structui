import React, { useState } from "react";
import { Container } from "@/src/components/layout/container";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Snippet } from "@/src/components/ui/snippet";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Layout, Sidebar, Search, Settings, Download, Monitor, Phone, Tablet,
  GripVertical, Sparkles, Zap, Users, BarChart3, ShoppingCart, ArrowRight,
  Check, Terminal, Package, Globe
} from "lucide-react";
import { motion } from "motion/react";

// ─── Templates ────────────────────────────────────────────────────────────────
const TEMPLATES = [
  {
    id: "saas",
    name: "SaaS Dashboard",
    desc: "Full-featured analytics dashboard with sidebar, charts, user management, and billing. Perfect for modern SaaS products.",
    tag: "SaaS",
    color: "#6366f1",
    features: ["Auth pages", "Analytics dashboard", "User management", "Billing & plans", "Settings panel"],
    pages: 12,
    components: 45,
  },
  {
    id: "erp",
    name: "ERP System",
    desc: "Enterprise resource planning layout with modules for inventory, HR, finance, and operations.",
    tag: "ERP",
    color: "#0ea5e9",
    features: ["Inventory module", "HR management", "Finance & accounting", "Reports", "Multi-role access"],
    pages: 18,
    components: 62,
  },
  {
    id: "crm",
    name: "CRM Portal",
    desc: "Customer relationship management with contacts, deals pipeline, activity tracking, and email integration.",
    tag: "CRM",
    color: "#10b981",
    features: ["Contacts & companies", "Deal pipeline (Kanban)", "Activity timeline", "Email templates", "Analytics"],
    pages: 14,
    components: 51,
  },
];

// ─── Builder Blocks ───────────────────────────────────────────────────────────
const AVAILABLE_BLOCKS = [
  { id: "topbar", name: "Top Navigation Bar", icon: <Layout className="w-4 h-4" />, desc: "Global nav with logo, links, user menu" },
  { id: "sidebar", name: "Navigation Sidebar", icon: <Sidebar className="w-4 h-4" />, desc: "Collapsible sidebar with nested items" },
  { id: "hero", name: "Hero Section", icon: <Monitor className="w-4 h-4" />, desc: "Large CTA with headline and image" },
  { id: "stats", name: "Stats Grid", icon: <BarChart3 className="w-4 h-4" />, desc: "KPI cards with trend indicators" },
  { id: "table", name: "Data Table", icon: <Search className="w-4 h-4" />, desc: "Searchable, sortable data grid" },
  { id: "pricing", name: "Pricing Table", icon: <ShoppingCart className="w-4 h-4" />, desc: "3-tier pricing with toggle" },
  { id: "footer", name: "App Footer", icon: <Settings className="w-4 h-4" />, desc: "Links, social, legal section" },
];

// ─── Sortable Block Item ───────────────────────────────────────────────────────
function SortableBlock({ id, name, desc, icon }: { id: string; name: string; desc?: string; icon?: React.ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: isDragging ? 0.97 : 1 }}
      className="flex items-center gap-3 p-3.5 border rounded-xl bg-background cursor-grab active:cursor-grabbing hover:border-primary/30 hover:shadow-sm transition-all"
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground/50 shrink-0" />
      <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{name}</p>
        {desc && <p className="text-xs text-muted-foreground truncate">{desc}</p>}
      </div>
    </motion.div>
  );
}

// ─── Template Card ─────────────────────────────────────────────────────────────
function TemplateCard({ tpl, onSelect }: { tpl: typeof TEMPLATES[0]; onSelect: () => void }) {
  const [selected, setSelected] = useState(false);

  return (
    <Card className="group overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col">
      {/* Visual mockup */}
      <div className="h-44 bg-muted/30 border-b relative overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `radial-gradient(ellipse at 50% 50%, ${tpl.color}, transparent 70%)` }}
        />
        {/* Browser frame */}
        <div className="w-48 h-32 bg-background border shadow rounded-lg overflow-hidden relative z-10 group-hover:scale-105 transition-transform duration-500">
          <div className="h-5 border-b flex items-center gap-1 px-2 bg-muted/50">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <div className="flex-1 mx-2 h-2 bg-muted rounded-sm" />
          </div>
          <div className="flex h-full">
            <div className="w-10 border-r bg-muted/30 h-full" />
            <div className="flex-1 p-2 space-y-1.5">
              <div className="h-2 bg-muted rounded w-3/4" />
              <div className="h-2 bg-muted rounded w-1/2" />
              <div className="grid grid-cols-2 gap-1 mt-2">
                <div className="h-5 bg-muted rounded" />
                <div className="h-5 bg-muted rounded" />
              </div>
              <div className="h-8 bg-muted/50 rounded mt-1" />
            </div>
          </div>
        </div>
        <Badge className="absolute top-3 right-3 text-xs" style={{ background: tpl.color }}>{tpl.tag}</Badge>
      </div>

      <CardContent className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base mb-1">{tpl.name}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{tpl.desc}</p>

        <div className="space-y-2 mb-4">
          {tpl.features.map(f => (
            <div key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="w-3.5 h-3.5 text-green-500 shrink-0" /> {f}
            </div>
          ))}
        </div>

        <div className="flex gap-3 text-xs text-muted-foreground mb-4">
          <span>{tpl.pages} pages</span>
          <span>•</span>
          <span>{tpl.components} components</span>
        </div>

        <div className="space-y-2">
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground gap-2" variant="outline" onClick={onSelect}>
            <Download className="w-4 h-4" /> Download Template
          </Button>
          <Snippet
            code={`npx strui init ${tpl.id}`}
            language="bash"
            className="!my-0 text-xs"
          />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export const R2GoPage = () => {
  const [items, setItems] = useState(AVAILABLE_BLOCKS.map(b => b.id));
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems(prev => {
        const oldIdx = prev.indexOf(active.id as string);
        const newIdx = prev.indexOf(over.id as string);
        return arrayMove(prev, oldIdx, newIdx);
      });
    }
  };

  const generateCode = () => {
    const blockNames = items.map(id => {
      const b = AVAILABLE_BLOCKS.find(x => x.id === id);
      const name = b?.name.replace(/\s+/g, "") ?? id;
      return name;
    });
    return `import React from 'react';
${blockNames.map(n => `import { ${n} } from '@/components/blocks/${n.toLowerCase()}';`).join("\n")}

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
${items.map(id => {
  const b = AVAILABLE_BLOCKS.find(x => x.id === id);
  const n = b?.name.replace(/\s+/g, "") ?? id;
  return `      <${n} />`;
}).join("\n")}
    </div>
  );
}`;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="border-b bg-muted/20">
        <Container className="py-12">
          <div className="max-w-3xl space-y-4">
            <Badge variant="secondary" className="px-3 rounded-full flex w-fit items-center gap-2">
              <Sparkles className="w-3 h-3" /> Ready-to-Go
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight">R2Go Templates & Visual Builder</h1>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Launch your next SaaS, ERP, or CRM in minutes. Choose a pre-built template or
              use the drag-and-drop builder to compose your own layout.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
              <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-primary" /> Production-ready</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-primary" /> Fully responsive</span>
              <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-primary" /> One-command install</span>
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-10">
        <Tabs defaultValue="templates">
          <TabsList className="mb-8">
            <TabsTrigger value="templates" className="gap-1.5">
              <Monitor className="w-4 h-4" /> Pre-built Templates
            </TabsTrigger>
            <TabsTrigger value="builder" className="gap-1.5">
              <Layout className="w-4 h-4" /> Visual Builder
            </TabsTrigger>
          </TabsList>

          {/* ── Templates Tab ── */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TEMPLATES.map(tpl => (
                <div key={tpl.id}>
                  <TemplateCard tpl={tpl} onSelect={() => {}} />
                </div>
              ))}
            </div>

            {/* CLI quick-start */}
            <div className="mt-12 p-8 rounded-2xl border bg-muted/10 space-y-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-primary" />
                <h3 className="font-bold">Quick Start via CLI</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Use the <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-foreground">strui</code> CLI to
                scaffold a complete project structure with one command:
              </p>
              <Snippet
                code={`# Initialize a SaaS template
npx strui init saas

# Then:
cd saas-project
pnpm install
pnpm dev`}
                language="bash"
              />
            </div>
          </TabsContent>

          {/* ── Builder Tab ── */}
          <TabsContent value="builder">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Block palette */}
              <div className="lg:col-span-1">
                <div className="sticky top-20 space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Available Blocks</CardTitle>
                      <CardDescription className="text-xs">Drag blocks into the canvas to build your layout.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-1.5 p-3 pt-0">
                      {AVAILABLE_BLOCKS.map(b => (
                        <div
                          key={b.id}
                          className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-transparent hover:border-border text-sm cursor-default"
                        >
                          <div className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            {b.icon}
                          </div>
                          <span className="text-xs font-medium truncate">{b.name}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Viewport toggle */}
                  <Card>
                    <CardContent className="p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Preview Viewport</p>
                      <div className="flex gap-1.5">
                        {([
                          { key: "desktop", icon: <Monitor className="w-4 h-4" /> },
                          { key: "tablet", icon: <Tablet className="w-4 h-4" /> },
                          { key: "mobile", icon: <Phone className="w-4 h-4" /> },
                        ] as const).map(v => (
                          <Button
                            key={v.key}
                            variant={viewport === v.key ? "default" : "outline"}
                            size="sm"
                            className="flex-1 h-8 p-0"
                            onClick={() => setViewport(v.key)}
                          >
                            {v.icon}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Canvas */}
              <div className="lg:col-span-3 space-y-5">
                <div
                  className={`border rounded-2xl bg-muted/5 p-6 min-h-[520px] mx-auto transition-all duration-300 ${
                    viewport === "mobile" ? "max-w-sm" : viewport === "tablet" ? "max-w-xl" : "max-w-full"
                  }`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Canvas — drag to reorder</p>
                    <Badge variant="secondary" className="text-xs">{items.length} blocks</Badge>
                  </div>

                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <SortableContext items={items} strategy={verticalListSortingStrategy}>
                      <div className="space-y-2">
                        {items.map(id => {
                          const block = AVAILABLE_BLOCKS.find(b => b.id === id);
                          return (
                            <div key={id}>
                              <SortableBlock
                                id={id}
                                name={block?.name ?? id}
                                desc={block?.desc}
                                icon={block?.icon}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>

                {/* Code export */}
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-sm">Generated Layout</h3>
                        <p className="text-xs text-muted-foreground">Auto-generated from your block order.</p>
                      </div>
                      <Button size="sm" className="gap-1.5">
                        <Download className="w-3.5 h-3.5" /> Export
                      </Button>
                    </div>
                    <Snippet code={generateCode()} language="tsx" filename="AppLayout.tsx" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    </div>
  );
};
