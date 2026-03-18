"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Activity,
  AreaChart,
  BarChart3,
  Bell,
  Blocks,
  CalendarDays,
  Code2,
  CreditCard,
  Eye,
  FileText,
  GripHorizontal,
  Home,
  ImageIcon,
  KanbanSquare,
  LayoutPanelTop,
  Maximize2,
  Minimize2,
  Minus,
  Monitor,
  Move,
  PanelBottom,
  PanelLeft,
  Phone,
  Plus,
  RefreshCcw,
  Rows3,
  Settings2,
  Shield,
  Table2,
  Tablet,
  Trash2,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { cn } from "@/src/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type Viewport = "desktop" | "tablet" | "mobile";
type BlockKind =
  | "header"
  | "sidebar"
  | "stats"
  | "table"
  | "kanban"
  | "checkout"
  | "timeline"
  | "footer"
  | "analytics"
  | "user-management"
  | "notifications"
  | "settings"
  | "calendar-month"
  | "media-gallery"
  | "onboarding"
  | "code-editor";

type LayoutRect = { x: number; y: number; w: number; h: number };

type BlockDef = {
  kind: BlockKind;
  name: string;
  description: string;
  category: string;
  accent: string;
  icon: ReactNode;
  defaults: Record<Viewport, { w: number; h: number }>;
};

type Item = {
  id: string;
  kind: BlockKind;
  name: string;
  description: string;
  category: string;
  accent: string;
  rects: Record<Viewport, LayoutRect>;
};

type DragSession =
  | {
    type: "move" | "resize";
    id: string;
    startX: number;
    startY: number;
    rect: LayoutRect;
    cellWidth: number;
    viewport: Viewport;
  }
  | null;

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "structui:r2go-app-layout";
const PREVIEW_CHANNEL_KEY = "structui:r2go-preview-channel";
const GRID_GAP = 12;
const ROW_HEIGHT = 100;
const CANVAS_PADDING = 16;

const VIEWPORTS: Record<
  Viewport,
  { label: string; columns: number; maxWidth: number; icon: ReactNode }
> = {
  desktop: { label: "Desktop", columns: 12, maxWidth: 1120, icon: <Monitor className="h-3.5 w-3.5" /> },
  tablet: { label: "Tablet", columns: 8, maxWidth: 820, icon: <Tablet className="h-3.5 w-3.5" /> },
  mobile: { label: "Mobile", columns: 4, maxWidth: 420, icon: <Phone className="h-3.5 w-3.5" /> },
};

const BLOCKS: BlockDef[] = [
  {
    kind: "header",
    name: "Header",
    description: "Top nav with search and actions.",
    category: "Navigation",
    accent: "#2563eb",
    icon: <LayoutPanelTop className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 12, h: 1 }, tablet: { w: 8, h: 1 }, mobile: { w: 4, h: 1 } },
  },
  {
    kind: "sidebar",
    name: "Sidebar",
    description: "Navigation rail for dense screens.",
    category: "Navigation",
    accent: "#0f766e",
    icon: <PanelLeft className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 3, h: 4 }, tablet: { w: 3, h: 3 }, mobile: { w: 4, h: 2 } },
  },
  {
    kind: "stats",
    name: "Stats Grid",
    description: "Compact KPI and metrics cards.",
    category: "Data",
    accent: "#16a34a",
    icon: <BarChart3 className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 5, h: 2 }, tablet: { w: 4, h: 2 }, mobile: { w: 4, h: 2 } },
  },
  {
    kind: "table",
    name: "Data Table",
    description: "Search and records table.",
    category: "Data",
    accent: "#ea580c",
    icon: <Table2 className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 7, h: 3 }, tablet: { w: 8, h: 3 }, mobile: { w: 4, h: 2 } },
  },
  {
    kind: "kanban",
    name: "Kanban Board",
    description: "Workflow board with lanes.",
    category: "Workspace",
    accent: "#db2777",
    icon: <KanbanSquare className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 8, h: 3 }, tablet: { w: 8, h: 3 }, mobile: { w: 4, h: 3 } },
  },
  {
    kind: "checkout",
    name: "Checkout",
    description: "Payment and address flow.",
    category: "Commerce",
    accent: "#ca8a04",
    icon: <CreditCard className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 4, h: 3 }, tablet: { w: 4, h: 3 }, mobile: { w: 4, h: 3 } },
  },
  {
    kind: "timeline",
    name: "Timeline",
    description: "Milestones and execution strip.",
    category: "Workspace",
    accent: "#65a30d",
    icon: <Rows3 className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 6, h: 2 }, tablet: { w: 4, h: 2 }, mobile: { w: 4, h: 2 } },
  },
  {
    kind: "footer",
    name: "Footer",
    description: "Bottom links and support area.",
    category: "Layout",
    accent: "#475569",
    icon: <PanelBottom className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 12, h: 1 }, tablet: { w: 8, h: 1 }, mobile: { w: 4, h: 2 } },
  },
  {
    kind: "analytics",
    name: "Analytics",
    description: "Area chart with KPI summary.",
    category: "Data",
    accent: "#7c3aed",
    icon: <AreaChart className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 7, h: 3 }, tablet: { w: 8, h: 3 }, mobile: { w: 4, h: 3 } },
  },
  {
    kind: "user-management",
    name: "User Mgmt",
    description: "User list with roles and actions.",
    category: "Data",
    accent: "#0891b2",
    icon: <Users className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 6, h: 3 }, tablet: { w: 8, h: 3 }, mobile: { w: 4, h: 3 } },
  },
  {
    kind: "notifications",
    name: "Notifications",
    description: "Notification feed with filters.",
    category: "Workspace",
    accent: "#be185d",
    icon: <Bell className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 4, h: 4 }, tablet: { w: 4, h: 4 }, mobile: { w: 4, h: 4 } },
  },
  {
    kind: "settings",
    name: "Settings",
    description: "App settings with toggle groups.",
    category: "Workspace",
    accent: "#374151",
    icon: <Settings2 className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 5, h: 4 }, tablet: { w: 8, h: 4 }, mobile: { w: 4, h: 4 } },
  },
  {
    kind: "calendar-month",
    name: "Calendar",
    description: "Monthly calendar grid with events.",
    category: "Workspace",
    accent: "#0d9488",
    icon: <CalendarDays className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 5, h: 4 }, tablet: { w: 8, h: 4 }, mobile: { w: 4, h: 4 } },
  },
  {
    kind: "media-gallery",
    name: "Media Gallery",
    description: "Image grid with hover actions.",
    category: "Layout",
    accent: "#9333ea",
    icon: <ImageIcon className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 6, h: 3 }, tablet: { w: 8, h: 3 }, mobile: { w: 4, h: 3 } },
  },
  {
    kind: "onboarding",
    name: "Onboarding",
    description: "Multi-step onboarding wizard.",
    category: "Commerce",
    accent: "#16a34a",
    icon: <Zap className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 6, h: 4 }, tablet: { w: 8, h: 4 }, mobile: { w: 4, h: 4 } },
  },
  {
    kind: "code-editor",
    name: "Code Editor",
    description: "Monaco-style code panel.",
    category: "Workspace",
    accent: "#1d4ed8",
    icon: <Code2 className="h-3.5 w-3.5" />,
    defaults: { desktop: { w: 6, h: 4 }, tablet: { w: 8, h: 4 }, mobile: { w: 4, h: 3 } },
  },
];

const DEFAULT_KINDS: BlockKind[] = [
  "header", "sidebar", "stats", "table", "kanban", "checkout", "timeline", "footer",
];

// ─── Grid math ────────────────────────────────────────────────────────────────

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function overlap(a: LayoutRect, b: LayoutRect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function canPlace(rect: LayoutRect, placed: LayoutRect[], cols: number) {
  if (rect.x < 0 || rect.y < 0 || rect.x + rect.w > cols) return false;
  return !placed.some((p) => overlap(rect, p));
}

function findSlot(target: LayoutRect, placed: LayoutRect[], cols: number): LayoutRect {
  const w = clamp(target.w, 1, cols);
  const h = clamp(target.h, 1, 8);
  const maxX = Math.max(0, cols - w);
  for (let y = Math.max(0, target.y); y < 80; y++) {
    for (let x = y === Math.max(0, target.y) ? clamp(target.x, 0, maxX) : 0; x <= maxX; x++) {
      const c = { x, y, w, h };
      if (canPlace(c, placed, cols)) return c;
    }
  }
  return { x: 0, y: placed.length ? Math.max(...placed.map((p) => p.y + p.h)) : 0, w, h };
}

function pack(items: Item[], vp: Viewport, focusId?: string, patch?: Partial<LayoutRect>): Item[] {
  const cols = VIEWPORTS[vp].columns;
  const ordered = [...items].sort((a, b) => {
    if (a.id === focusId) return -1;
    if (b.id === focusId) return 1;
    const ar = a.rects[vp], br = b.rects[vp];
    return ar.y !== br.y ? ar.y - br.y : ar.x - br.x;
  });

  const placed: { id: string; rect: LayoutRect }[] = [];
  const map = new Map<string, LayoutRect>();

  for (const item of ordered) {
    const cur = item.id === focusId
      ? { ...item.rects[vp], ...patch }
      : { ...item.rects[vp] };
    const norm = {
      x: clamp(cur.x, 0, Math.max(0, cols - clamp(cur.w, 1, cols))),
      y: Math.max(0, cur.y),
      w: clamp(cur.w, 1, cols),
      h: clamp(cur.h, 1, 8),
    };
    const rect = findSlot(norm, placed.map((p) => p.rect), cols);
    placed.push({ id: item.id, rect });
    map.set(item.id, rect);
  }

  return items.map((item) => ({
    ...item,
    rects: { ...item.rects, [vp]: map.get(item.id) ?? item.rects[vp] },
  }));
}

function syncViewports(items: Item[]): Item[] {
  const desk = pack(items, "desktop");
  const tabSeed = desk.map((i) => ({ ...i, rects: { ...i.rects, tablet: { ...i.rects.tablet, x: 0, y: i.rects.desktop.y } } }));
  const mobSeed = desk.map((i) => ({ ...i, rects: { ...i.rects, mobile: { ...i.rects.mobile, x: 0, y: i.rects.desktop.y } } }));
  return pack(pack(tabSeed, "tablet"), "mobile");
}

function createItem(kind: BlockKind, seed: number): Item {
  const block = BLOCKS.find((b) => b.kind === kind)!;
  return {
    id: `${kind}-${seed}-${Math.random().toString(36).slice(2, 7)}`,
    kind: block.kind,
    name: block.name,
    description: block.description,
    category: block.category,
    accent: block.accent,
    rects: {
      desktop: { x: 0, y: 0, ...block.defaults.desktop },
      tablet: { x: 0, y: 0, ...block.defaults.tablet },
      mobile: { x: 0, y: 0, ...block.defaults.mobile },
    },
  };
}

function createDefaultLayout(): Item[] {
  return syncViewports(pack(DEFAULT_KINDS.map((k, i) => createItem(k, i + 1)), "desktop"));
}

function getCanvasHeight(items: Item[], vp: Viewport): number {
  const bottom = items.reduce((m, item) => Math.max(m, item.rects[vp].y + item.rects[vp].h), 0);
  return Math.max(480, bottom * ROW_HEIGHT + Math.max(0, bottom - 1) * GRID_GAP + CANVAS_PADDING * 2);
}

// ─── Block previews ───────────────────────────────────────────────────────────

function BlockPreview({ kind }: { kind: BlockKind }) {
  if (kind === "header") return (
    <div className="flex h-full items-center justify-between rounded-2xl border border-border bg-background px-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Blocks className="h-3.5 w-3.5" />
        </div>
        <div className="hidden h-8 w-36 rounded-lg border bg-muted/30 sm:block" />
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" className="h-7 text-xs">Docs</Button>
        <Button size="sm" className="h-7 text-xs">+ New</Button>
        <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">HG</AvatarFallback></Avatar>
      </div>
    </div>
  );

  if (kind === "sidebar") return (
    <div className="flex h-full flex-col gap-1.5 rounded-2xl border border-border bg-background p-2.5">
      {[{ label: "Overview", icon: Home }, { label: "Activity", icon: Activity }, { label: "Boards", icon: KanbanSquare }, { label: "Billing", icon: CreditCard }].map(({ label, icon: Icon }, i) => (
        <Button key={label} variant={i === 0 ? "default" : "ghost"} size="sm" className="h-8 justify-start gap-2 text-xs">
          <Icon className="h-3.5 w-3.5" />{label}
        </Button>
      ))}
    </div>
  );

  if (kind === "stats") return (
    <div className="grid h-full grid-cols-2 gap-2">
      {[["Revenue", "$48.2k", "+12%"], ["Conv.", "6.2%", "+0.4%"], ["MRR", "$12.4k", "+8%"], ["Churn", "1.8%", "-0.2%"]].map(([label, val, delta]) => (
        <Card key={label} className="rounded-xl">
          <CardContent className="p-3">
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <p className="text-lg font-bold leading-tight">{val}</p>
            <Badge variant="secondary" className="mt-1 rounded-full px-1.5 py-0 text-[10px]">{delta}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (kind === "table") return (
    <Card className="h-full overflow-hidden rounded-2xl">
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b py-3">
        <div><CardTitle className="text-xs">Customers</CardTitle><CardDescription className="text-[11px]">3 active</CardDescription></div>
        <Button size="sm" className="h-7 text-xs">Export</Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Status</TableHead>
              <TableHead className="text-right text-xs">MRR</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[["Acme", "Active", "$420"], ["Pixel", "Trial", "$180"], ["North", "Active", "$260"]].map(([n, s, m]) => (
              <TableRow key={n}>
                <TableCell className="text-xs">{n}</TableCell>
                <TableCell><Badge variant="secondary" className="rounded-full text-[10px]">{s}</Badge></TableCell>
                <TableCell className="text-right text-xs">{m}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  if (kind === "kanban") return (
    <div className="grid h-full gap-2 md:grid-cols-3">
      {([["Backlog", ["Landing polish", "Pricing copy"]], ["In Progress", ["Referral", "Audit logs"]], ["Review", ["Usage limits"]]] as const).map(([lane, cards]) => (
        <Card key={lane} className="rounded-xl bg-muted/30">
          <CardHeader className="flex-row items-center justify-between space-y-0 py-2 px-3">
            <CardTitle className="text-xs">{lane}</CardTitle>
            <Badge variant="secondary" className="rounded-full text-[10px]">{cards.length}</Badge>
          </CardHeader>
          <CardContent className="space-y-1.5 px-3 pb-3">
            {cards.map((c) => (
              <Card key={c} className="rounded-lg"><CardContent className="p-2"><p className="text-xs font-medium">{c}</p></CardContent></Card>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (kind === "checkout") return (
    <div className="grid h-full gap-2 md:grid-cols-[1fr_0.85fr]">
      <Card className="rounded-xl">
        <CardContent className="space-y-2 p-3">
          <Input value="Haci Mert" readOnly className="h-8 text-xs" />
          <Input value="mert@example.com" readOnly className="h-8 text-xs" />
          <Input value="Istanbul, TR" readOnly className="h-8 text-xs" />
          <Button className="h-8 w-full text-xs">Continue to payment</Button>
        </CardContent>
      </Card>
      <Card className="rounded-xl bg-slate-950 text-white">
        <CardContent className="space-y-2 p-3">
          <div className="flex justify-between text-xs"><span>Pro plan</span><span>$49</span></div>
          <div className="flex justify-between text-xs"><span>Tax</span><span>$9</span></div>
          <div className="flex justify-between border-t border-white/10 pt-2 text-xs font-bold"><span>Total</span><span>$58</span></div>
          <Button className="h-7 w-full bg-white text-xs text-slate-950 hover:bg-white/90">Pay now</Button>
        </CardContent>
      </Card>
    </div>
  );

  if (kind === "timeline") return (
    <div className="flex h-full items-center gap-2 rounded-2xl border border-border bg-background px-4">
      {["Brief", "Design", "QA", "Ship"].map((s, i) => (
        <div key={s} className="flex flex-1 items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium">{s}</p>
            <p className="text-[10px] text-muted-foreground">Done</p>
          </div>
          {i < 3 && <div className="h-px w-4 shrink-0 bg-border" />}
        </div>
      ))}
    </div>
  );

  // ── Analytics ──
  if (kind === "analytics") {
    const data = [40, 65, 50, 80, 72, 95, 88, 110, 102, 130, 120, 148];
    const max = Math.max(...data);
    return (
      <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-background p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold">Revenue Overview</p>
            <p className="text-[11px] text-muted-foreground">Last 12 months</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> +23.4%
          </div>
        </div>
        <div className="flex flex-1 items-end gap-1">
          {data.map((v, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-0.5">
              <div
                className="w-full rounded-t-sm bg-primary/70 transition-all hover:bg-primary"
                style={{ height: `${(v / max) * 80}%`, minHeight: 4 }}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 border-t pt-2">
          {[["$148k", "This month"], ["$890k", "YTD"], ["6.2%", "Conv."]].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <p className="text-sm font-bold">{val}</p>
              <p className="text-[10px] text-muted-foreground">{lbl}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── User management ──
  if (kind === "user-management") {
    const users = [
      { name: "Alice Chen", role: "Admin", status: "Active", avatar: "AC" },
      { name: "Bob Kim", role: "Member", status: "Active", avatar: "BK" },
      { name: "Carlos V.", role: "Viewer", status: "Trial", avatar: "CV" },
      { name: "Diana P.", role: "Editor", status: "Inactive", avatar: "DP" },
    ];
    const statusColor: Record<string, string> = {
      Active: "text-emerald-600 bg-emerald-500/10",
      Trial: "text-amber-600 bg-amber-500/10",
      Inactive: "text-slate-500 bg-slate-500/10",
    };
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <p className="text-xs font-semibold">Users</p>
          <Button size="sm" className="h-6 px-2 text-[10px]"><Plus className="mr-1 h-3 w-3" />Invite</Button>
        </div>
        <div className="flex-1 overflow-hidden">
          {users.map((u) => (
            <div key={u.name} className="flex items-center gap-3 border-b border-border/40 px-4 py-2.5 last:border-0 hover:bg-muted/20">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">{u.avatar}</div>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium">{u.name}</p>
                <p className="text-[10px] text-muted-foreground">{u.role}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${statusColor[u.status]}`}>{u.status}</span>
            </div>
          ))}
        </div>
        <div className="border-t px-4 py-2 text-[10px] text-muted-foreground">4 members · 2 pending invites</div>
      </div>
    );
  }

  // ── Notifications ──
  if (kind === "notifications") {
    const notifs = [
      { icon: "✅", title: "Deploy succeeded", time: "2m", color: "text-emerald-500" },
      { icon: "💬", title: "Alex mentioned you", time: "14m", color: "text-blue-500" },
      { icon: "⚠️", title: "Disk usage at 87%", time: "1h", color: "text-amber-500" },
      { icon: "🔔", title: "New user signup", time: "2h", color: "text-violet-500" },
      { icon: "📦", title: "Package outdated", time: "1d", color: "text-slate-400" },
    ];
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Bell className="h-3.5 w-3.5" />
            <p className="text-xs font-semibold">Notifications</p>
          </div>
          <span className="rounded-full bg-primary px-1.5 py-0 text-[10px] font-semibold text-primary-foreground">3</span>
        </div>
        <div className="flex-1 overflow-hidden divide-y divide-border/40">
          {notifs.map((n, i) => (
            <div key={i} className={`flex items-start gap-3 px-4 py-2.5 hover:bg-muted/20 ${i < 3 ? "bg-primary/3" : ""}`}>
              <span className="mt-0.5 text-sm">{n.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="truncate text-xs font-medium">{n.title}</p>
                <p className="text-[10px] text-muted-foreground">{n.time} ago</p>
              </div>
              {i < 3 && <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Settings ──
  if (kind === "settings") {
    const settings = [
      { label: "Email notifications", enabled: true, desc: "Receive digest emails" },
      { label: "Two-factor auth", enabled: true, desc: "TOTP authenticator" },
      { label: "Public profile", enabled: false, desc: "Visible to everyone" },
      { label: "Analytics tracking", enabled: true, desc: "Usage telemetry" },
      { label: "Marketing emails", enabled: false, desc: "Product updates" },
    ];
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background">
        <div className="border-b px-4 py-2.5 flex items-center gap-2">
          <Settings2 className="h-3.5 w-3.5" />
          <p className="text-xs font-semibold">Settings</p>
        </div>
        <div className="flex-1 overflow-hidden divide-y divide-border/40">
          {settings.map((s) => (
            <div key={s.label} className="flex items-center gap-3 px-4 py-2.5">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium">{s.label}</p>
                <p className="text-[10px] text-muted-foreground">{s.desc}</p>
              </div>
              <div className={`relative h-5 w-9 cursor-pointer rounded-full transition-colors ${s.enabled ? "bg-primary" : "bg-muted"}`}>
                <div className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${s.enabled ? "translate-x-4" : "translate-x-0.5"}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Calendar month ──
  if (kind === "calendar-month") {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = Array.from({ length: firstDay + daysInMonth }, (_, i) => i < firstDay ? null : i - firstDay + 1);
    const events: Record<number, string> = { [today.getDate()]: "Today", [today.getDate() + 2]: "Deploy", [today.getDate() - 1]: "Review" };
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    return (
      <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-semibold">{today.toLocaleString("default", { month: "long", year: "numeric" })}</p>
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-7 gap-px">
          {dayNames.map((d) => <div key={d} className="py-1 text-center text-[10px] font-semibold text-muted-foreground">{d}</div>)}
          {days.map((d, i) => (
            <div key={i} className={`relative aspect-square flex items-center justify-center rounded-lg text-xs transition-colors ${d === today.getDate() ? "bg-primary text-primary-foreground font-bold" : d && events[d] ? "bg-primary/10 text-primary font-medium" : d ? "hover:bg-muted/40" : ""}`}>
              {d}
              {d && events[d] && d !== today.getDate() && <div className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary" />}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Media gallery ──
  if (kind === "media-gallery") {
    const palette = ["from-blue-400 to-blue-600", "from-violet-400 to-violet-600", "from-emerald-400 to-emerald-600", "from-amber-400 to-amber-600", "from-rose-400 to-rose-600", "from-cyan-400 to-cyan-600", "from-orange-400 to-orange-600", "from-pink-400 to-pink-600", "from-teal-400 to-teal-600"];
    return (
      <div className="flex h-full flex-col rounded-2xl border border-border bg-background overflow-hidden">
        <div className="flex items-center justify-between border-b px-4 py-2.5">
          <p className="text-xs font-semibold">Media</p>
          <span className="text-[10px] text-muted-foreground">9 files</span>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-0.5 overflow-hidden bg-muted/20 p-0.5">
          {palette.map((grad, i) => (
            <div key={i} className={`group relative flex items-center justify-center rounded-lg bg-gradient-to-br ${grad} overflow-hidden`}>
              <ImageIcon className="h-5 w-5 text-white/60" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
                <Eye className="h-4 w-4 text-transparent transition-colors group-hover:text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Onboarding ──
  if (kind === "onboarding") {
    const steps = ["Account", "Profile", "Workspace", "Launch"];
    const currentStep = 1;
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-background p-5">
        <div className="mb-4 flex justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex flex-1 flex-col items-center gap-1">
              <div className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold transition-all ${i < currentStep ? "border-emerald-500 bg-emerald-500 text-white" : i === currentStep ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span className={`text-[10px] font-medium ${i === currentStep ? "text-primary" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`absolute mt-3.5 h-px w-full ${i < currentStep ? "bg-emerald-500" : "bg-border"}`} />}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border/60 bg-muted/20 p-4 space-y-3">
          <p className="text-sm font-semibold">Set up your profile</p>
          <div className="h-7 rounded-lg border border-border/60 bg-background px-3 text-xs flex items-center text-muted-foreground">Display name</div>
          <div className="h-7 rounded-lg border border-border/60 bg-background px-3 text-xs flex items-center text-muted-foreground">Role / Title</div>
        </div>
        <div className="mt-4 flex justify-between">
          <Button size="sm" variant="outline" className="h-8 rounded-xl text-xs">Back</Button>
          <Button size="sm" className="h-8 rounded-xl text-xs">Continue →</Button>
        </div>
      </div>
    );
  }

  // ── Code editor ──
  if (kind === "code-editor") {
    const lines = [
      { num: 1, tokens: [{ t: "import", c: "text-blue-400" }, { t: " { useState } ", c: "text-foreground/80" }, { t: "from", c: "text-blue-400" }, { t: ' "react"', c: "text-amber-400" }] },
      { num: 2, tokens: [] },
      { num: 3, tokens: [{ t: "export function", c: "text-violet-400" }, { t: " Counter", c: "text-amber-300" }, { t: "() {", c: "text-foreground/80" }] },
      { num: 4, tokens: [{ t: "  const", c: "text-blue-400" }, { t: " [count, setCount] = ", c: "text-foreground/80" }, { t: "useState", c: "text-amber-300" }, { t: "(0)", c: "text-foreground/80" }] },
      { num: 5, tokens: [{ t: "  return", c: "text-blue-400" }, { t: " (", c: "text-foreground/80" }] },
      { num: 6, tokens: [{ t: "    <button", c: "text-rose-400" }, { t: " onClick", c: "text-emerald-400" }, { t: "={() => ", c: "text-foreground/80" }, { t: "setCount", c: "text-amber-300" }, { t: "(c+1)}", c: "text-foreground/80" }, { t: ">", c: "text-rose-400" }] },
      { num: 7, tokens: [{ t: "      Count: {count}", c: "text-foreground/70" }] },
      { num: 8, tokens: [{ t: "    </button>", c: "text-rose-400" }] },
      { num: 9, tokens: [{ t: "  )", c: "text-foreground/80" }] },
      { num: 10, tokens: [{ t: "}", c: "text-foreground/80" }] },
    ];
    return (
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-[#0d1117]">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-1 rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-white/60">counter.tsx</span>
        </div>
        <div className="flex-1 overflow-hidden p-3 font-mono text-[11px] leading-6">
          {lines.map((line) => (
            <div key={line.num} className="flex gap-4">
              <span className="w-5 shrink-0 text-right text-white/20 select-none">{line.num}</span>
              <span>
                {line.tokens.map((tok, i) => (
                  <span key={i} className={tok.c}>{tok.t}</span>
                ))}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid h-full gap-2 rounded-2xl border border-border bg-background p-4 md:grid-cols-[1fr_0.75fr]">
      <div><p className="text-xs font-semibold">Need help?</p><p className="mt-1 text-[11px] text-muted-foreground">Support and legal links.</p></div>
      <div className="grid grid-cols-2 gap-1.5">
        {["Docs", "Status", "Support", "Contact"].map((l) => (<Button key={l} variant="outline" className="h-7 text-xs">{l}</Button>))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Page() {
  const isPreview =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("preview") === "1";

  const initialState = useMemo(() => {
    const fallback = { items: createDefaultLayout(), viewport: "desktop" as Viewport };
    if (typeof window === "undefined") return fallback;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw) as { items: Item[]; viewport: Viewport };
      if (!parsed?.items?.length) return fallback;
      return { items: syncViewports(parsed.items), viewport: parsed.viewport ?? "desktop" };
    } catch {
      return fallback;
    }
  }, []);

  const [items, setItems] = useState<Item[]>(initialState.items);
  const [viewport, setViewport] = useState<Viewport>(initialState.viewport);
  const [selectedId, setSelectedId] = useState<string | null>(initialState.items[0]?.id ?? null);
  const [session, setSession] = useState<DragSession>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [propertiesOpen, setPropertiesOpen] = useState(true);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const channelRef = useRef<BroadcastChannel | null>(null);

  const categories = useMemo(() => [...new Set(BLOCKS.map((b) => b.category))], []);
  const selected = items.find((i) => i.id === selectedId) ?? null;

  // ── Persist ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const payload = JSON.stringify({ items, viewport, updatedAt: Date.now() });
    window.localStorage.setItem(STORAGE_KEY, payload);
    channelRef.current?.postMessage(payload);
  }, [items, viewport]);

  useEffect(() => {
    channelRef.current = typeof window !== "undefined"
      ? new BroadcastChannel(PREVIEW_CHANNEL_KEY)
      : null;

    const onMsg = (e: MessageEvent<string>) => {
      if (!e.data) return;
      try {
        const inc = JSON.parse(e.data) as { items: Item[]; viewport: Viewport };
        if (inc?.items?.length) {
          setItems(syncViewports(inc.items));
          setViewport(inc.viewport);
        }
      } catch { }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const inc = JSON.parse(e.newValue) as { items: Item[]; viewport: Viewport };
        if (inc?.items?.length) {
          setItems(syncViewports(inc.items));
          setViewport(inc.viewport);
        }
      } catch { }
    };

    channelRef.current?.addEventListener("message", onMsg);
    window.addEventListener("storage", onStorage);

    return () => {
      channelRef.current?.removeEventListener("message", onMsg);
      channelRef.current?.close();
      channelRef.current = null;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // ── Drag session ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!session) return;

    const onMove = (e: PointerEvent) => {
      const cols = VIEWPORTS[session.viewport].columns;
      const dx = e.clientX - session.startX;
      const dy = e.clientY - session.startY;
      if (session.type === "move") {
        const x = clamp(session.rect.x + Math.round(dx / Math.max(1, session.cellWidth + GRID_GAP)), 0, Math.max(0, cols - session.rect.w));
        const y = Math.max(0, session.rect.y + Math.round(dy / (ROW_HEIGHT + GRID_GAP)));
        setItems((cur) => pack(cur, session.viewport, session.id, { x, y }));
      } else {
        const w = clamp(session.rect.w + Math.round(dx / Math.max(1, session.cellWidth + GRID_GAP)), 1, cols);
        const h = clamp(session.rect.h + Math.round(dy / (ROW_HEIGHT + GRID_GAP)), 1, 8);
        setItems((cur) => pack(cur, session.viewport, session.id, { w, h, x: clamp(session.rect.x, 0, Math.max(0, cols - w)) }));
      }
    };

    const onUp = () => setSession(null);
    document.body.style.cursor = session.type === "move" ? "grabbing" : "nwse-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [session]);

  // ── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isPreview) return;
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        removeBlock(selectedId);
      }
      if (e.key === "Escape") setSelectedId(null);
      if (e.key === "f" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setFullscreen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, isPreview]);

  // ── Helpers ──────────────────────────────────────────────────────────────────
  const mutate = useCallback((updater: (cur: Item[]) => Item[]) => {
    setItems((cur) => syncViewports(updater(cur)));
  }, []);

  const addBlock = useCallback((kind: BlockKind, x = 0, y?: number) => {
    const next = createItem(kind, Date.now());
    mutate((cur) =>
      pack(
        [...cur, { ...next, rects: { ...next.rects, [viewport]: { ...next.rects[viewport], x, y: y ?? cur.length } } }],
        viewport,
        next.id,
      ),
    );
    setSelectedId(next.id);
  }, [mutate, viewport]);

  const removeBlock = useCallback((id: string) => {
    setSession((cur) => (cur?.id === id ? null : cur));
    setItems((cur) => {
      const next = syncViewports(pack(cur.filter((item) => item.id !== id), viewport));
      setSelectedId((sel) => {
        if (sel !== id) return next.some((item) => item.id === sel) ? sel : next[0]?.id ?? null;
        return next[0]?.id ?? null;
      });
      return next;
    });
  }, [viewport]);

  const beginInteraction = useCallback((
    type: "move" | "resize",
    e: React.PointerEvent,
    item: Item,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canvasRef.current) return;
    const cols = VIEWPORTS[viewport].columns;
    const bounds = canvasRef.current.getBoundingClientRect();
    const cellWidth = (bounds.width - CANVAS_PADDING * 2 - (cols - 1) * GRID_GAP) / cols;
    setSelectedId(item.id);
    setSession({ type, id: item.id, startX: e.clientX, startY: e.clientY, rect: { ...item.rects[viewport] }, cellWidth, viewport });
  }, [viewport]);

  const updateRect = useCallback((id: string, patch: Partial<LayoutRect>) => {
    mutate((cur) => pack(cur, viewport, id, patch));
  }, [mutate, viewport]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!canvasRef.current) return;
    const kind = e.dataTransfer.getData("text/r2go-block") as BlockKind;
    if (!kind) return;
    const bounds = canvasRef.current.getBoundingClientRect();
    const cols = VIEWPORTS[viewport].columns;
    const cellWidth = (bounds.width - CANVAS_PADDING * 2 - (cols - 1) * GRID_GAP) / cols;
    const x = clamp(Math.round((e.clientX - bounds.left - CANVAS_PADDING) / Math.max(1, cellWidth + GRID_GAP)), 0, cols - 1);
    const y = Math.max(0, Math.round((e.clientY - bounds.top - CANVAS_PADDING) / (ROW_HEIGHT + GRID_GAP)));
    addBlock(kind, x, y);
  }, [addBlock, viewport]);

  const openPreview = () => {
    const payload = JSON.stringify({ items, viewport, updatedAt: Date.now() });
    window.localStorage.setItem(STORAGE_KEY, payload);
    channelRef.current?.postMessage(payload);
    window.open("/r2go?preview=1", "r2go-preview", "popup,width=1440,height=920,resizable=yes,scrollbars=yes");
  };

  const reset = () => {
    const next = createDefaultLayout();
    setItems(next);
    setSelectedId(next[0]?.id ?? null);
    setViewport("desktop");
  };

  // ── Canvas height ─────────────────────────────────────────────────────────
  const canvasHeight = getCanvasHeight(items, viewport);

  // ── Canvas node ───────────────────────────────────────────────────────────
  const canvasNode = (
    <div
      className="mx-auto transition-all duration-300 ease-out"
      style={{ maxWidth: VIEWPORTS[viewport].maxWidth }}
    >
      <div
        ref={canvasRef}
        className={cn(
          "relative overflow-hidden",
          !isPreview && "rounded-2xl border border-border/80 bg-gradient-to-br from-card to-muted/30",
        )}
        style={{
          height: canvasHeight,
          padding: CANVAS_PADDING,
          ["--cell-width" as string]: `calc((100% - ${CANVAS_PADDING * 2}px - ${(VIEWPORTS[viewport].columns - 1) * GRID_GAP}px) / ${VIEWPORTS[viewport].columns})`,
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={(e) => { if (e.target === e.currentTarget) setSelectedId(null); }}
      >
        {/* Grid lines */}
        {!isPreview && (
          <div
            className="pointer-events-none absolute opacity-[0.35]"
            style={{
              inset: CANVAS_PADDING,
              backgroundImage: `
                linear-gradient(to right, color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px),
                linear-gradient(to bottom, color-mix(in srgb, var(--border) 80%, transparent) 1px, transparent 1px)
              `,
              backgroundSize: `calc(var(--cell-width) + ${GRID_GAP}px) ${ROW_HEIGHT + GRID_GAP}px`,
              borderRadius: 12,
            }}
          />
        )}

        {/* Blocks */}
        {items.map((item) => {
          const rect = item.rects[viewport];
          const isSelected = selectedId === item.id;
          const isDragging = session?.id === item.id;

          return (
            <div
              key={item.id}
              className={cn(
                "absolute overflow-hidden",
                !isPreview && cn(
                  "rounded-2xl border bg-card/95 backdrop-blur",
                  "transition-[left,top,width,height] duration-150 ease-out",
                  isDragging && "duration-0",
                  isSelected
                    ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
                    : "border-border/80 shadow-sm hover:border-primary/30 hover:shadow-md",
                ),
              )}
              style={{
                left: `calc(${rect.x} * (var(--cell-width) + ${GRID_GAP}px) + ${CANVAS_PADDING}px)`,
                top: `calc(${rect.y} * (${ROW_HEIGHT}px + ${GRID_GAP}px) + ${CANVAS_PADDING}px)`,
                width: `calc(${rect.w} * var(--cell-width) + ${(rect.w - 1) * GRID_GAP}px)`,
                height: `calc(${rect.h} * ${ROW_HEIGHT}px + ${(rect.h - 1) * GRID_GAP}px)`,
              }}
              onPointerDown={() => !isPreview && setSelectedId(item.id)}
            >
              {/* Accent glow */}
              {!isPreview && (
                <div
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{ background: `radial-gradient(ellipse at top right, ${item.accent}55, transparent 55%)` }}
                />
              )}

              {/* Block content */}
              <div className={cn("relative", !isPreview ? "h-[calc(100%-40px)] min-h-[60px]" : "h-full")}>
                <BlockPreview kind={item.kind} />
              </div>

              {/* Controls bar */}
              {!isPreview && (
                <div className="absolute bottom-0 left-0 right-0 flex h-10 items-center justify-between px-2">
                  {/* Label */}
                  <div className="flex items-center gap-1.5">
                    <span
                      className="rounded-md px-2 py-0.5 text-[11px] font-medium text-white/90"
                      style={{ background: item.accent + "cc" }}
                    >
                      {item.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground/60">
                      {rect.w}×{rect.h}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    {/* Move handle */}
                    <button
                      type="button"
                      className="flex h-7 w-7 cursor-grab items-center justify-center rounded-lg border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-foreground active:cursor-grabbing"
                      onPointerDown={(e) => beginInteraction("move", e, item)}
                      title="Drag to move"
                    >
                      <Move className="h-3.5 w-3.5" />
                    </button>

                    {/* Resize handle */}
                    <button
                      type="button"
                      className="flex h-7 w-7 cursor-nwse-resize items-center justify-center rounded-lg border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-primary/40 hover:text-foreground"
                      onPointerDown={(e) => beginInteraction("resize", e, item)}
                      title="Drag to resize"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-border/70 bg-background/80 text-muted-foreground shadow-sm transition hover:border-destructive/40 hover:text-destructive"
                      onClick={(e) => { e.stopPropagation(); removeBlock(item.id); }}
                      title="Delete block"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty state */}
        {items.length === 0 && !isPreview && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-primary/5">
              <GripHorizontal className="h-5 w-5 text-primary/50" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Canvas is empty</p>
            <p className="text-xs text-muted-foreground/60">Drag blocks from the panel or click to add</p>
          </div>
        )}
      </div>
    </div>
  );

  // ── Preview mode ──────────────────────────────────────────────────────────
  if (isPreview) {
    return <div className="min-h-screen bg-background p-4">{canvasNode}</div>;
  }

  // ── Editor mode ───────────────────────────────────────────────────────────
  return (
    <div
      className={cn(
        "flex flex-col transition-all duration-300",
        fullscreen
          ? "fixed inset-0 z-50 bg-background"
          : "mx-auto w-full max-w-[1600px] px-4 pb-8 pt-6 sm:px-6",
      )}
    >
      {/* ── Top toolbar ─────────────────────────────────────────────────── */}
      <div className={cn(
        "mb-3 flex items-center justify-between gap-3 rounded-2xl border border-border/70 bg-background/95 px-4 py-2.5 shadow-sm backdrop-blur",
        fullscreen && "rounded-none border-x-0 border-t-0",
      )}>
        {/* Left: title + info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <Blocks className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold">R2Go</span>
            <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">Layout Editor</Badge>
          </div>
          <div className="hidden items-center gap-1.5 text-[11px] text-muted-foreground sm:flex">
            <span className="rounded-md bg-muted px-2 py-0.5">{items.length} blocks</span>
            <span className="rounded-md bg-muted px-2 py-0.5">{VIEWPORTS[viewport].columns} col</span>
          </div>
        </div>

        {/* Center: viewport switcher */}
        <div className="flex items-center gap-0.5 rounded-xl border border-border/70 bg-muted/30 p-0.5">
          {(Object.entries(VIEWPORTS) as [Viewport, typeof VIEWPORTS[Viewport]][]).map(([key, meta]) => (
            <button
              key={key}
              onClick={() => setViewport(key)}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                viewport === key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
              title={meta.label}
            >
              {meta.icon}
              <span className="hidden sm:inline">{meta.label}</span>
            </button>
          ))}
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1.5 rounded-xl px-3 text-xs"
            onClick={() => setSidebarOpen((v) => !v)}
            title="Toggle block panel"
          >
            <PanelLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Blocks</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 gap-1.5 rounded-xl px-3 text-xs"
            onClick={reset}
            title="Reset layout"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-8 gap-1.5 rounded-xl px-3 text-xs"
            onClick={openPreview}
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button
            size="sm"
            variant={fullscreen ? "default" : "outline"}
            className="h-8 w-8 rounded-xl p-0"
            onClick={() => setFullscreen((v) => !v)}
            title={fullscreen ? "Exit fullscreen (⌘F)" : "Fullscreen (⌘F)"}
          >
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>

      {/* ── Main 3-panel area ────────────────────────────────────────────── */}
      <div className={cn("flex min-h-0 flex-1 gap-3 overflow-hidden", fullscreen && "flex-1")}>

        {/* ── Left panel: block palette ──────────────────────────────────── */}
        <div className={cn(
          "flex w-56 shrink-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300",
          !sidebarOpen && "w-0 overflow-hidden opacity-0",
          fullscreen && "rounded-none border-l-0 border-y-0",
        )}>
          <div className="flex items-center justify-between border-b px-3 py-2.5">
            <p className="text-xs font-semibold">Blocks</p>
            <p className="text-[11px] text-muted-foreground">{BLOCKS.length} total</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {categories.map((cat) => (
              <div key={cat} className="mb-3">
                <p className="mb-1.5 px-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {cat}
                </p>
                <div className="space-y-1">
                  {BLOCKS.filter((b) => b.category === cat).map((block) => (
                    <button
                      key={block.kind}
                      type="button"
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/r2go-block", block.kind)}
                      onClick={() => addBlock(block.kind)}
                      className="group flex w-full items-center gap-2.5 rounded-xl border border-border/60 bg-background/60 p-2.5 text-left transition-all hover:border-primary/30 hover:bg-accent/30 hover:shadow-sm"
                    >
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white/90"
                        style={{ background: block.accent + "cc" }}
                      >
                        {block.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-medium">{block.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">{block.description}</p>
                      </div>
                      <GripHorizontal className="h-3 w-3 shrink-0 text-muted-foreground/30 transition group-hover:text-muted-foreground/60" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Center: canvas ─────────────────────────────────────────────── */}
        <div className={cn(
          "flex min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-border/70",
          fullscreen && "rounded-none border-x-0 border-y-0",
        )}>
          {/* Canvas toolbar */}
          <div className="flex items-center justify-between border-b bg-muted/20 px-3 py-2">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <span>{VIEWPORTS[viewport].label}</span>
              <span>·</span>
              <span>{VIEWPORTS[viewport].columns} columns</span>
              <span>·</span>
              <span>snap to grid</span>
            </div>
            <div className="text-[11px] text-muted-foreground">
              {selected ? (
                <span className="text-foreground/70">
                  Selected: <strong>{selected.name}</strong>
                  {" "}{selected.rects[viewport].w}×{selected.rects[viewport].h}
                </span>
              ) : (
                <span>Click a block to select it · Del to remove</span>
              )}
            </div>
          </div>

          {/* Scrollable canvas area */}
          <div className="flex-1 overflow-auto bg-muted/10 p-4">
            {canvasNode}
          </div>
        </div>

        {/* ── Right panel: properties ─────────────────────────────────────── */}
        <div className={cn(
          "flex w-56 shrink-0 flex-col overflow-hidden rounded-2xl border border-border/70 bg-card transition-all duration-300",
          (!selected || !propertiesOpen) && "w-0 overflow-hidden opacity-0",
          fullscreen && "rounded-none border-r-0 border-y-0",
        )}>
          {selected && (
            <>
              <div className="flex items-center justify-between border-b px-3 py-2.5">
                <p className="text-xs font-semibold">Properties</p>
                <button
                  onClick={() => setPropertiesOpen((v) => !v)}
                  className="rounded-lg p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-4">
                {/* Block identity */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-white/90"
                      style={{ background: selected.accent + "cc" }}
                    >
                      {BLOCKS.find((b) => b.kind === selected.kind)?.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{selected.name}</p>
                      <p className="text-[11px] text-muted-foreground">{selected.category}</p>
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{selected.description}</p>
                </div>

                {/* Dimensions */}
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Dimensions
                  </p>

                  {/* Width */}
                  <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-2.5 py-2">
                    <span className="text-xs text-muted-foreground">Width</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                        onClick={() => updateRect(selected.id, { w: clamp(selected.rects[viewport].w - 1, 1, VIEWPORTS[viewport].columns) })}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums">
                        {selected.rects[viewport].w}
                      </span>
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                        onClick={() => updateRect(selected.id, { w: clamp(selected.rects[viewport].w + 1, 1, VIEWPORTS[viewport].columns) })}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Height */}
                  <div className="flex items-center justify-between rounded-xl border border-border/70 bg-muted/20 px-2.5 py-2">
                    <span className="text-xs text-muted-foreground">Height</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                        onClick={() => updateRect(selected.id, { h: clamp(selected.rects[viewport].h - 1, 1, 8) })}
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums">
                        {selected.rects[viewport].h}
                      </span>
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-lg border border-border/60 bg-background text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                        onClick={() => updateRect(selected.id, { h: clamp(selected.rects[viewport].h + 1, 1, 8) })}
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Position info */}
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Position
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { label: "Col", value: selected.rects[viewport].x + 1 },
                      { label: "Row", value: selected.rects[viewport].y + 1 },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-xl border border-border/70 bg-muted/20 px-2.5 py-2 text-center">
                        <p className="text-[10px] text-muted-foreground">{label}</p>
                        <p className="text-sm font-bold">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Viewport info */}
                <div className="space-y-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    All viewports
                  </p>
                  {(Object.entries(selected.rects) as [Viewport, LayoutRect][]).map(([vp, r]) => (
                    <div
                      key={vp}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs",
                        vp === viewport
                          ? "bg-primary/8 text-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      <span className="capitalize font-medium">{vp}</span>
                      <span className="font-mono text-[11px]">{r.w}×{r.h}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="pt-1 border-t space-y-1.5">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start gap-2 rounded-xl text-xs text-destructive hover:border-destructive/30 hover:bg-destructive/5 hover:text-destructive"
                    onClick={() => removeBlock(selected.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove block
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Placeholder when nothing selected */}
          {!selected && (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 p-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-border/70">
                <GripHorizontal className="h-4 w-4 text-muted-foreground/40" />
              </div>
              <p className="text-xs text-muted-foreground">Select a block to edit its properties</p>
            </div>
          )}
        </div>

      </div>

      {/* ── Keyboard hint ──────────────────────────────────────────────────── */}
      {!fullscreen && (
        <div className="mt-2 flex flex-wrap items-center gap-3 px-1">
          {[
            { keys: ["Drag"], desc: "move block" },
            { keys: ["⌘F"], desc: "fullscreen" },
            { keys: ["Del"], desc: "remove selected" },
            { keys: ["Esc"], desc: "deselect" },
          ].map(({ keys, desc }) => (
            <div key={desc} className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60">
              {keys.map((k) => (
                <kbd key={k} className="rounded border border-border/60 bg-muted/40 px-1.5 py-0.5 text-[10px] font-mono">
                  {k}
                </kbd>
              ))}
              <span>{desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
