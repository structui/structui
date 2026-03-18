// @ts-nocheck
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Snippet } from "@/src/components/ui/snippet";
import { useToast } from "@/src/components/ui/toast";
import {
  Eye,
  Maximize2,
  Monitor,
  Move,
  Phone,
  Plus,
  Rows3,
  Smartphone,
  Tablet,
  Trash2,
  LayoutPanelTop,
  PanelLeft,
  BarChart3,
  Table2,
  KanbanSquare,
  CreditCard,
  PanelBottom,
  RefreshCcw,
  ArrowUpRight,
} from "lucide-react";

type Viewport = "desktop" | "tablet" | "mobile";
type BlockKind = "header" | "sidebar" | "stats" | "table" | "kanban" | "checkout" | "timeline" | "footer";

type BlockDefinition = {
  kind: BlockKind;
  name: string;
  description: string;
  category: string;
  accent: string;
  icon: React.ReactNode;
  defaults: Record<Viewport, { w: number; h: number }>;
};

type LayoutRect = { x: number; y: number; w: number; h: number };

type BuilderItem = {
  id: string;
  kind: BlockKind;
  name: string;
  description: string;
  category: string;
  accent: string;
  rects: Record<Viewport, LayoutRect>;
};

type EditorState = {
  items: BuilderItem[];
  viewport: Viewport;
};

type InteractionSession =
  | {
    type: "move";
    id: string;
    pointerId: number;
    startClientX: number;
    startClientY: number;
    originRect: LayoutRect;
    cellWidth: number;
    rowHeight: number;
    viewport: Viewport;
  }
  | {
    type: "resize";
    id: string;
    pointerId: number;
    startClientX: number;
    startClientY: number;
    originRect: LayoutRect;
    cellWidth: number;
    rowHeight: number;
    viewport: Viewport;
  };

const STORAGE_KEY = "structui:r2go-layout";
const CHANNEL_NAME = "structui-r2go-preview";
const GRID_GAP = 14;
const ROW_HEIGHT = 96;
const CANVAS_PADDING = 18;

const VIEWPORTS: Record<Viewport, { label: string; icon: React.ReactNode; columns: number; widthClass: string }> = {
  desktop: { label: "Desktop", icon: <Monitor className="h-4 w-4" />, columns: 12, widthClass: "max-w-[1120px]" },
  tablet: { label: "Tablet", icon: <Tablet className="h-4 w-4" />, columns: 8, widthClass: "max-w-[820px]" },
  mobile: { label: "Mobile", icon: <Phone className="h-4 w-4" />, columns: 4, widthClass: "max-w-[420px]" },
};

const BLOCKS: BlockDefinition[] = [
  {
    kind: "header",
    name: "Header",
    description: "Top navigation with logo, actions, and search.",
    category: "Navigation",
    accent: "#2563eb",
    icon: <LayoutPanelTop className="h-4 w-4" />,
    defaults: {
      desktop: { w: 12, h: 1 },
      tablet: { w: 8, h: 1 },
      mobile: { w: 4, h: 1 },
    },
  },
  {
    kind: "sidebar",
    name: "Sidebar",
    description: "App navigation rail for dense product layouts.",
    category: "Navigation",
    accent: "#0f766e",
    icon: <PanelLeft className="h-4 w-4" />,
    defaults: {
      desktop: { w: 3, h: 4 },
      tablet: { w: 3, h: 3 },
      mobile: { w: 4, h: 2 },
    },
  },
  {
    kind: "stats",
    name: "Stats Grid",
    description: "KPI cards with compact performance summaries.",
    category: "Data",
    accent: "#16a34a",
    icon: <BarChart3 className="h-4 w-4" />,
    defaults: {
      desktop: { w: 5, h: 2 },
      tablet: { w: 4, h: 2 },
      mobile: { w: 4, h: 2 },
    },
  },
  {
    kind: "table",
    name: "Data Table",
    description: "Searchable table block for records and actions.",
    category: "Data",
    accent: "#ea580c",
    icon: <Table2 className="h-4 w-4" />,
    defaults: {
      desktop: { w: 7, h: 3 },
      tablet: { w: 8, h: 3 },
      mobile: { w: 4, h: 2 },
    },
  },
  {
    kind: "kanban",
    name: "Kanban Board",
    description: "Workflow columns with movable task cards.",
    category: "Workspace",
    accent: "#db2777",
    icon: <KanbanSquare className="h-4 w-4" />,
    defaults: {
      desktop: { w: 8, h: 3 },
      tablet: { w: 8, h: 3 },
      mobile: { w: 4, h: 3 },
    },
  },
  {
    kind: "checkout",
    name: "Checkout",
    description: "Address, summary, and payment panel.",
    category: "Commerce",
    accent: "#ca8a04",
    icon: <CreditCard className="h-4 w-4" />,
    defaults: {
      desktop: { w: 4, h: 3 },
      tablet: { w: 4, h: 3 },
      mobile: { w: 4, h: 3 },
    },
  },
  {
    kind: "timeline",
    name: "Timeline",
    description: "Milestones and execution phases in a horizontal strip.",
    category: "Workspace",
    accent: "#65a30d",
    icon: <Rows3 className="h-4 w-4" />,
    defaults: {
      desktop: { w: 6, h: 2 },
      tablet: { w: 4, h: 2 },
      mobile: { w: 4, h: 2 },
    },
  },
  {
    kind: "footer",
    name: "Footer",
    description: "Bottom links, support, and newsletter actions.",
    category: "Layout",
    accent: "#475569",
    icon: <PanelBottom className="h-4 w-4" />,
    defaults: {
      desktop: { w: 12, h: 1 },
      tablet: { w: 8, h: 1 },
      mobile: { w: 4, h: 2 },
    },
  },
];

const DEFAULT_ITEM_KINDS: BlockKind[] = ["header", "sidebar", "stats", "table", "kanban", "checkout", "timeline", "footer"];

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function cloneItems(items: BuilderItem[]) {
  return items.map((item) => ({
    ...item,
    rects: {
      desktop: { ...item.rects.desktop },
      tablet: { ...item.rects.tablet },
      mobile: { ...item.rects.mobile },
    },
  }));
}

function makeItem(kind: BlockKind, seed = Date.now()): BuilderItem {
  const block = BLOCKS.find((entry) => entry.kind === kind);
  if (!block) {
    throw new Error(`Unknown block: ${kind}`);
  }

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

function rectsOverlap(a: LayoutRect, b: LayoutRect) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function canPlace(rect: LayoutRect, placed: LayoutRect[], columns: number) {
  if (rect.x < 0 || rect.y < 0 || rect.x + rect.w > columns) {
    return false;
  }

  return !placed.some((entry) => rectsOverlap(rect, entry));
}

function findSlot(requested: LayoutRect, placed: LayoutRect[], columns: number) {
  const width = clamp(requested.w, 1, columns);
  const height = clamp(requested.h, 1, 8);
  const maxX = Math.max(0, columns - width);

  for (let y = Math.max(0, requested.y); y < 60; y += 1) {
    for (let x = y === Math.max(0, requested.y) ? clamp(requested.x, 0, maxX) : 0; x <= maxX; x += 1) {
      const candidate = { x, y, w: width, h: height };
      if (canPlace(candidate, placed, columns)) {
        return candidate;
      }
    }
  }

  return { x: 0, y: placed.length ? Math.max(...placed.map((entry) => entry.y + entry.h)) : 0, w: width, h: height };
}

function packLayout(items: BuilderItem[], viewport: Viewport, focusId?: string, patch?: Partial<LayoutRect>) {
  const columns = VIEWPORTS[viewport].columns;
  const ordered = [...items].sort((a, b) => {
    if (a.id === focusId) return -1;
    if (b.id === focusId) return 1;
    const rectA = a.rects[viewport];
    const rectB = b.rects[viewport];
    if (rectA.y === rectB.y) return rectA.x - rectB.x;
    return rectA.y - rectB.y;
  });

  const placed: Array<{ id: string; rect: LayoutRect }> = [];
  const nextMap = new Map<string, LayoutRect>();

  for (const item of ordered) {
    const baseRect = item.id === focusId ? { ...item.rects[viewport], ...patch } : { ...item.rects[viewport] };
    const normalized: LayoutRect = {
      x: clamp(baseRect.x, 0, Math.max(0, columns - clamp(baseRect.w, 1, columns))),
      y: Math.max(0, baseRect.y),
      w: clamp(baseRect.w, 1, columns),
      h: clamp(baseRect.h, 1, 8),
    };
    const rect = findSlot(normalized, placed.map((entry) => entry.rect), columns);
    placed.push({ id: item.id, rect });
    nextMap.set(item.id, rect);
  }

  return items.map((item) => ({
    ...item,
    rects: {
      ...item.rects,
      [viewport]: nextMap.get(item.id) ?? item.rects[viewport],
    },
  }));
}

function serializeState(state: EditorState) {
  return JSON.stringify(state);
}

function parseState(value: string | null): EditorState | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value);
    if (!parsed || !Array.isArray(parsed.items) || !parsed.viewport) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function buildDefaultItems() {
  return packLayout(DEFAULT_ITEM_KINDS.map((kind, index) => makeItem(kind, index + 1)), "desktop");
}

function syncItemsAcrossViewports(items: BuilderItem[]) {
  const desktopPacked = packLayout(items, "desktop");
  const tabletSeed = desktopPacked.map((item) => ({
    ...item,
    rects: {
      ...item.rects,
      tablet: {
        ...item.rects.tablet,
        x: 0,
        y: item.rects.desktop.y,
      },
    },
  }));
  const mobileSeed = desktopPacked.map((item) => ({
    ...item,
    rects: {
      ...item.rects,
      mobile: {
        ...item.rects.mobile,
        x: 0,
        y: item.rects.desktop.y,
      },
    },
  }));

  return packLayout(packLayout(tabletSeed, "tablet"), "mobile");
}

function getCanvasHeight(items: BuilderItem[], viewport: Viewport) {
  const bottom = items.reduce((max, item) => Math.max(max, item.rects[viewport].y + item.rects[viewport].h), 0);
  return Math.max(420, bottom * ROW_HEIGHT + Math.max(0, bottom - 1) * GRID_GAP + CANVAS_PADDING * 2);
}

function getBlockPreview(kind: BlockKind) {
  const shell = "rounded-[22px] border border-slate-200 bg-white shadow-sm";

  switch (kind) {
    case "header":
      return (
        <div className={cn(shell, "flex h-full items-center justify-between px-4 py-3")}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-950" />
            <div className="space-y-1">
              <div className="h-2 w-20 rounded bg-slate-300" />
              <div className="h-2 w-14 rounded bg-slate-100" />
            </div>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-8 w-8 rounded-full bg-slate-100" />
            ))}
          </div>
        </div>
      );
    case "sidebar":
      return (
        <div className={cn(shell, "flex h-full flex-col gap-3 p-4")}>
          <div className="h-10 rounded-2xl bg-slate-950" />
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="rounded-2xl bg-slate-100 px-3 py-4" />
          ))}
        </div>
      );
    case "stats":
      return (
        <div className="grid h-full grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={cn(shell, "space-y-3 p-4")}>
              <div className="h-2 w-14 rounded bg-slate-200" />
              <div className="h-7 w-16 rounded bg-slate-900" />
              <div className="h-2 w-20 rounded bg-emerald-100" />
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className={cn(shell, "flex h-full flex-col overflow-hidden")}>
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div className="h-2 w-24 rounded bg-slate-200" />
            <div className="h-8 w-24 rounded-xl bg-slate-900" />
          </div>
          <div className="grid flex-1 grid-rows-5 gap-px bg-slate-100 p-px">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="grid grid-cols-3 gap-px bg-slate-100">
                {[1, 2, 3].map((cell) => (
                  <div key={cell} className="h-full min-h-10 bg-white" />
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    case "kanban":
      return (
        <div className="grid h-full gap-3 md:grid-cols-3">
          {["Backlog", "In Progress", "Review"].map((lane) => (
            <div key={lane} className="rounded-[22px] border border-slate-200 bg-slate-50 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">{lane}</span>
                <span className="rounded-full bg-white px-2 py-1 text-[10px]">4</span>
              </div>
              <div className="space-y-2">
                {[1, 2, 3].map((card) => (
                  <div key={card} className="rounded-2xl border border-slate-200 bg-white p-3">
                    <div className="mb-2 h-2 w-4/5 rounded bg-slate-200" />
                    <div className="h-2 w-2/3 rounded bg-slate-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    case "checkout":
      return (
        <div className="grid h-full gap-3 md:grid-cols-[1fr_0.8fr]">
          <div className={cn(shell, "space-y-3 p-4")}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="space-y-2">
                <div className="h-2 w-16 rounded bg-slate-200" />
                <div className="h-10 rounded-xl bg-slate-100" />
              </div>
            ))}
          </div>
          <div className="rounded-[22px] bg-slate-950 p-4 text-white">
            {[1, 2, 3].map((item) => (
              <div key={item} className="mb-3 rounded-2xl bg-white/10 p-3" />
            ))}
            <div className="mt-6 h-10 rounded-xl bg-emerald-400" />
          </div>
        </div>
      );
    case "timeline":
      return (
        <div className={cn(shell, "flex h-full items-center gap-3 p-4")}>
          {[1, 2, 3, 4].map((item, index) => (
            <React.Fragment key={item}>
              <div className="flex flex-1 flex-col items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-slate-900" />
                <div className="h-2 w-full rounded bg-slate-100" />
              </div>
              {index < 3 && <div className="h-0.5 w-8 bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      );
    case "footer":
      return (
        <div className={cn(shell, "grid h-full gap-3 p-4 md:grid-cols-[1fr_0.8fr]")}>
          <div className="space-y-2">
            <div className="h-3 w-16 rounded bg-slate-300" />
            <div className="h-2 w-32 rounded bg-slate-100" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-8 rounded-xl bg-slate-100" />
            ))}
          </div>
        </div>
      );
  }
}

function PaletteCard({ block, onAdd }: { block: BlockDefinition; onAdd: () => void }) {
  return (
    <button
      type="button"
      draggable
      onDragStart={(event) => event.dataTransfer.setData("text/r2go-block", block.kind)}
      onClick={onAdd}
      className="group flex w-full items-start gap-3 rounded-[24px] border border-border bg-card p-3 text-left transition hover:border-primary/30 hover:bg-accent/30 hover:shadow-sm"
    >
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        {block.icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold">{block.name}</p>
          <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">
            {block.category}
          </Badge>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{block.description}</p>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
          <Move className="h-3 w-3" />
          Drag into editor
        </div>
      </div>
    </button>
  );
}

function CanvasBlock({
  item,
  viewport,
  selected,
  onSelect,
  onRemove,
  onMoveStart,
  onResizeStart,
}: {
  item: BuilderItem;
  viewport: Viewport;
  selected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onMoveStart: (event: React.PointerEvent<HTMLButtonElement>, item: BuilderItem) => void;
  onResizeStart: (event: React.PointerEvent<HTMLButtonElement>, item: BuilderItem) => void;
}) {
  const rect = item.rects[viewport];

  return (
    <div
      className={cn(
        "absolute overflow-hidden rounded-[28px] border bg-card/95 p-3 shadow-sm backdrop-blur transition",
        selected ? "border-primary shadow-md ring-2 ring-primary/10" : "border-border",
      )}
      style={{
        left: `calc(${rect.x} * (var(--cell-width) + ${GRID_GAP}px) + ${CANVAS_PADDING}px)`,
        top: `calc(${rect.y} * (${ROW_HEIGHT}px + ${GRID_GAP}px) + ${CANVAS_PADDING}px)`,
        width: `calc(${rect.w} * var(--cell-width) + ${(rect.w - 1) * GRID_GAP}px)`,
        height: `calc(${rect.h} * ${ROW_HEIGHT}px + ${(rect.h - 1) * GRID_GAP}px)`,
      }}
      onPointerDown={onSelect}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: `radial-gradient(circle at top right, ${item.accent}33, transparent 45%)` }} />

      <div className="relative mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold">{item.name}</p>
            <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">
              {item.category}
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {rect.w}x{rect.h} grid units
          </p>
        </div>

        <button
          type="button"
          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      <div className="relative h-[calc(100%-3rem)] min-h-[84px]">{getBlockPreview(item.kind)}</div>

      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <button
          type="button"
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:border-primary hover:text-foreground"
          onPointerDown={(event) => onMoveStart(event, item)}
          title="Move block"
        >
          <Move className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition hover:border-primary hover:text-foreground"
          onPointerDown={(event) => onResizeStart(event, item)}
          title="Resize block"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function CanvasPreview({
  items,
  viewport,
  selectedId,
  canvasRef,
  onDropBlock,
  onSelect,
  onRemove,
  onMoveStart,
  onResizeStart,
}: {
  items: BuilderItem[];
  viewport: Viewport;
  selectedId?: string | null;
  canvasRef?: React.RefObject<HTMLDivElement | null>;
  onDropBlock?: (kind: BlockKind, x: number, y: number) => void;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
  onMoveStart?: (event: React.PointerEvent<HTMLButtonElement>, item: BuilderItem) => void;
  onResizeStart?: (event: React.PointerEvent<HTMLButtonElement>, item: BuilderItem) => void;
}) {
  const columns = VIEWPORTS[viewport].columns;
  const height = getCanvasHeight(items, viewport);

  return (
    <div
      ref={canvasRef}
      className="relative overflow-hidden rounded-[32px] border border-border bg-[linear-gradient(180deg,color-mix(in_srgb,var(--card)_84%,transparent),color-mix(in_srgb,var(--muted)_72%,transparent))]"
      style={
        {
          height,
          padding: CANVAS_PADDING,
          "--cell-width": `calc((100% - ${CANVAS_PADDING * 2}px - ${(columns - 1) * GRID_GAP}px) / ${columns})`,
        } as React.CSSProperties
      }
      onDragOver={(event) => {
        if (onDropBlock) {
          event.preventDefault();
        }
      }}
      onDrop={(event) => {
        if (!onDropBlock || !canvasRef?.current) {
          return;
        }
        event.preventDefault();
        const kind = event.dataTransfer.getData("text/r2go-block") as BlockKind;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const usableWidth = canvasRect.width - CANVAS_PADDING * 2;
        const cellWidth = (usableWidth - (columns - 1) * GRID_GAP) / columns;
        const relativeX = event.clientX - canvasRect.left - CANVAS_PADDING;
        const relativeY = event.clientY - canvasRect.top - CANVAS_PADDING;
        const x = clamp(Math.round(relativeX / Math.max(1, cellWidth + GRID_GAP)), 0, columns - 1);
        const y = Math.max(0, Math.round(relativeY / (ROW_HEIGHT + GRID_GAP)));
        if (kind) {
          onDropBlock(kind, x, y);
        }
      }}
    >
      <div
        className="absolute inset-[18px] opacity-60"
        style={{
          backgroundImage: `
            linear-gradient(to right, color-mix(in srgb, var(--border) 75%, transparent) 1px, transparent 1px),
            linear-gradient(to bottom, color-mix(in srgb, var(--border) 75%, transparent) 1px, transparent 1px)
          `,
          backgroundSize: `calc(var(--cell-width) + ${GRID_GAP}px) ${ROW_HEIGHT + GRID_GAP}px`,
          borderRadius: 22,
        }}
      />

      {items.map((item) => (
        <CanvasBlock
          key={item.id}
          item={item}
          viewport={viewport}
          selected={selectedId === item.id}
          onSelect={() => onSelect?.(item.id)}
          onRemove={() => onRemove?.(item.id)}
          onMoveStart={(event, activeItem) => onMoveStart?.(event, activeItem)}
          onResizeStart={(event, activeItem) => onResizeStart?.(event, activeItem)}
        />
      ))}
    </div>
  );
}

export function R2GoPage() {
  const searchParams = useSearchParams();
  const isStandalonePreview = searchParams.get("preview") === "1";
  const { toast } = useToast();
  const initialItems = useMemo(() => syncItemsAcrossViewports(buildDefaultItems()), []);
  const initialState = useMemo<EditorState>(() => ({ items: initialItems, viewport: "desktop" }), [initialItems]);

  const [items, setItems] = useState<BuilderItem[]>(initialState.items);
  const [viewport, setViewport] = useState<Viewport>(initialState.viewport);
  const [selectedId, setSelectedId] = useState<string | null>(initialState.items[0]?.id ?? null);
  const [interaction, setInteraction] = useState<InteractionSession | null>(null);
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  const selectedItem = items.find((item) => item.id === selectedId) ?? null;
  const categories = useMemo(() => [...new Set(BLOCKS.map((block) => block.category))], []);

  useEffect(() => {
    const stored = parseState(window.localStorage.getItem(STORAGE_KEY));
    if (stored?.items?.length) {
      setItems(syncItemsAcrossViewports(stored.items));
      setViewport(stored.viewport ?? "desktop");
      setSelectedId(stored.items[0]?.id ?? null);
    }
  }, []);

  useEffect(() => {
    const nextState = { items, viewport };
    window.localStorage.setItem(STORAGE_KEY, serializeState(nextState));
    channel?.postMessage(nextState);
  }, [channel, items, viewport]);

  useEffect(() => {
    const nextChannel = new BroadcastChannel(CHANNEL_NAME);
    nextChannel.onmessage = (event) => {
      const incoming = event.data as EditorState;
      if (incoming?.items?.length) {
        setItems(syncItemsAcrossViewports(incoming.items));
        setViewport(incoming.viewport ?? "desktop");
      }
    };
    setChannel(nextChannel);

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }
      const incoming = parseState(event.newValue);
      if (incoming?.items?.length) {
        setItems(syncItemsAcrossViewports(incoming.items));
        setViewport(incoming.viewport ?? "desktop");
      }
    };

    window.addEventListener("storage", onStorage);
    return () => {
      nextChannel.close();
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  useEffect(() => {
    if (!interaction) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const deltaX = event.clientX - interaction.startClientX;
      const deltaY = event.clientY - interaction.startClientY;
      const columns = VIEWPORTS[interaction.viewport].columns;

      if (interaction.type === "move") {
        const nextX = clamp(
          interaction.originRect.x + Math.round(deltaX / Math.max(1, interaction.cellWidth + GRID_GAP)),
          0,
          Math.max(0, columns - interaction.originRect.w),
        );
        const nextY = Math.max(0, interaction.originRect.y + Math.round(deltaY / (interaction.rowHeight + GRID_GAP)));
        setItems((current) => packLayout(current, interaction.viewport, interaction.id, { x: nextX, y: nextY }));
      }

      if (interaction.type === "resize") {
        const nextW = clamp(
          interaction.originRect.w + Math.round(deltaX / Math.max(1, interaction.cellWidth + GRID_GAP)),
          1,
          columns,
        );
        const nextH = clamp(interaction.originRect.h + Math.round(deltaY / (interaction.rowHeight + GRID_GAP)), 1, 8);
        setItems((current) =>
          packLayout(current, interaction.viewport, interaction.id, {
            w: nextW,
            h: nextH,
            x: clamp(interaction.originRect.x, 0, Math.max(0, columns - nextW)),
          }),
        );
      }
    };

    const onUp = () => setInteraction(null);

    document.body.style.cursor = interaction.type === "move" ? "grabbing" : "nwse-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [interaction]);

  const updateItems = (updater: (current: BuilderItem[]) => BuilderItem[]) => {
    setItems((current) => syncItemsAcrossViewports(updater(current)));
  };

  const addBlock = (kind: BlockKind, x = 0, y?: number) => {
    const next = makeItem(kind);
    const defaults = next.rects[viewport];
    updateItems((current) =>
      packLayout([...current, { ...next, rects: { ...next.rects, [viewport]: { ...defaults, x, y: y ?? current.length } } }], viewport, next.id),
    );
    setSelectedId(next.id);
  };

  const removeBlock = (id: string) => {
    updateItems((current) => packLayout(current.filter((item) => item.id !== id), viewport));
    if (selectedId === id) {
      const remaining = items.filter((item) => item.id !== id);
      setSelectedId(remaining[0]?.id ?? null);
    }
  };

  const resetLayout = () => {
    const next = syncItemsAcrossViewports(buildDefaultItems());
    setItems(next);
    setViewport("desktop");
    setSelectedId(next[0]?.id ?? null);
  };

  const openPreviewWindow = () => {
    const opened = window.open("/r2go?preview=1", "r2go-preview", "popup,width=1400,height=900,resizable=yes,scrollbars=yes");
    if (!opened) {
      toast({
        title: "Preview blocked",
        description: "Browser blocked the preview window. Allow popups and try again.",
        type: "warning",
      });
      return;
    }

    toast({
      title: "Preview opened",
      description: "The separate preview window stays in sync live with the editor.",
      type: "success",
    });
  };

  const beginMove = (event: React.PointerEvent<HTMLButtonElement>, item: BuilderItem) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canvasRef.current) {
      return;
    }

    const columns = VIEWPORTS[viewport].columns;
    const bounds = canvasRef.current.getBoundingClientRect();
    const cellWidth = (bounds.width - CANVAS_PADDING * 2 - (columns - 1) * GRID_GAP) / columns;
    setSelectedId(item.id);
    setInteraction({
      type: "move",
      id: item.id,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      originRect: { ...item.rects[viewport] },
      cellWidth,
      rowHeight: ROW_HEIGHT,
      viewport,
    });
  };

  const beginResize = (event: React.PointerEvent<HTMLButtonElement>, item: BuilderItem) => {
    event.preventDefault();
    event.stopPropagation();
    if (!canvasRef.current) {
      return;
    }

    const columns = VIEWPORTS[viewport].columns;
    const bounds = canvasRef.current.getBoundingClientRect();
    const cellWidth = (bounds.width - CANVAS_PADDING * 2 - (columns - 1) * GRID_GAP) / columns;
    setSelectedId(item.id);
    setInteraction({
      type: "resize",
      id: item.id,
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      originRect: { ...item.rects[viewport] },
      cellWidth,
      rowHeight: ROW_HEIGHT,
      viewport,
    });
  };

  const generatedCode = useMemo(
    () =>
      `const layout = ${JSON.stringify(
        items.map((item) => ({
          id: item.id,
          kind: item.kind,
          rects: item.rects,
        })),
        null,
        2,
      )};`,
    [items],
  );

  if (isStandalonePreview) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 pb-4">
          <div>
            <p className="text-sm font-semibold">R2Go Live Preview</p>
            <p className="text-xs text-muted-foreground">This window updates from the editor in real time.</p>
          </div>
          <div className="flex items-center gap-2">
            {(Object.entries(VIEWPORTS) as Array<[Viewport, (typeof VIEWPORTS)[Viewport]]>).map(([key, meta]) => (
              <Button key={key} size="sm" variant={viewport === key ? "default" : "outline"} className="gap-2 rounded-xl" onClick={() => setViewport(key)}>
                {meta.icon}
                {meta.label}
              </Button>
            ))}
          </div>
        </div>

        <div className={cn("mx-auto transition-all duration-300", VIEWPORTS[viewport].widthClass)}>
          <CanvasPreview items={items} viewport={viewport} selectedId={null} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-10">
      <div className="w-full px-3 pb-6 pt-3 sm:px-4 lg:px-6">
        <div className="sticky top-[4.75rem] z-30 mb-4 rounded-[30px] border border-border bg-background/90 p-3 shadow-sm backdrop-blur-xl">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg font-semibold tracking-tight sm:text-xl">R2Go Editor</h1>
                <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                  simple layout builder
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                Palette solda. Component editor&apos;e drop edilir. Sistem bloklari grid&apos;e snap eder, padding korur, cakismada digerlerini kaydirir.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(Object.entries(VIEWPORTS) as Array<[Viewport, (typeof VIEWPORTS)[Viewport]]>).map(([key, meta]) => (
                <Button key={key} size="sm" variant={viewport === key ? "default" : "outline"} className="gap-2 rounded-xl" onClick={() => setViewport(key)}>
                  {meta.icon}
                  {meta.label}
                </Button>
              ))}
              <Button size="sm" variant="outline" className="gap-2 rounded-xl" onClick={resetLayout}>
                <RefreshCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button size="sm" className="gap-2 rounded-xl" onClick={openPreviewWindow}>
                <Eye className="h-4 w-4" />
                Open live preview
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
          <aside className="space-y-4">
            <Card className="overflow-hidden rounded-[28px] border-border bg-card shadow-sm">
              <CardHeader className="border-b border-border bg-muted/40 pb-3">
                <CardTitle className="text-sm">Component List</CardTitle>
                <CardDescription className="text-xs">
                  Bir componenti surukleyip editor&apos;e birak veya tiklayip sona ekle.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-3">
                {categories.map((category) => (
                  <div key={category} className="space-y-2">
                    <div className="px-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">{category}</div>
                    <div className="space-y-2">
                      {BLOCKS.filter((block) => block.category === category).map((block) => (
                        <PaletteCard key={block.kind} block={block} onAdd={() => addBlock(block.kind)} />
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Behavior</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs leading-6 text-muted-foreground">
                <div className="rounded-2xl border border-border bg-muted/30 px-3 py-2.5">Move butonu ile saga sola veya alta tasi. Yer uygun degilse sistem en yakin bos hucreye oturtur.</div>
                <div className="rounded-2xl border border-border bg-muted/30 px-3 py-2.5">Resize butonu ile blok boyutunu degistir. Cakisma olursa alttakiler otomatik saga ya da alta kayar.</div>
                <div className="rounded-2xl border border-border bg-muted/30 px-3 py-2.5">Canvas icindeki bosluklar grid gap ve canvas padding ile korunur.</div>
              </CardContent>
            </Card>
          </aside>

          <main className="space-y-4">
            <Card className="overflow-hidden rounded-[30px] border-border bg-card shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                      {VIEWPORTS[viewport].columns} columns
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                      {items.length} blocks
                    </Badge>
                    <Badge variant="secondary" className="rounded-full px-3 py-1 text-[11px]">
                      snap + auto fit
                    </Badge>
                  </div>

                  <Button size="sm" variant="outline" className="gap-2 rounded-xl" onClick={openPreviewWindow}>
                    <ArrowUpRight className="h-4 w-4" />
                    Separate preview window
                  </Button>
                </div>

                <div className="bg-muted/20 p-3 sm:p-4">
                  <div className={cn("mx-auto transition-all duration-300", VIEWPORTS[viewport].widthClass)}>
                    <CanvasPreview
                      items={items}
                      viewport={viewport}
                      selectedId={selectedId}
                      canvasRef={canvasRef}
                      onDropBlock={addBlock}
                      onSelect={setSelectedId}
                      onRemove={removeBlock}
                      onMoveStart={beginMove}
                      onResizeStart={beginResize}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Export</CardTitle>
                <CardDescription className="text-xs">Su anki yerlesim verisini JSON olarak gosterir.</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <Snippet code={generatedCode} language="ts" filename="r2go-layout.ts" />
              </CardContent>
            </Card>
          </main>

          <aside className="space-y-4">
            <Card className="rounded-[28px] border-border bg-card shadow-sm">
              <CardHeader className="border-b border-border bg-muted/40 pb-3">
                <CardTitle className="text-sm">Inspector</CardTitle>
                <CardDescription className="text-xs">Secili blok burada ozetlenir. Move ve resize editor icinden yapilir.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-4">
                {selectedItem ? (
                  <>
                    <div className="rounded-2xl border border-border bg-muted/20 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          {BLOCKS.find((block) => block.kind === selectedItem.kind)?.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{selectedItem.name}</p>
                          <p className="text-xs text-muted-foreground">{selectedItem.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "X", value: selectedItem.rects[viewport].x },
                        { label: "Y", value: selectedItem.rects[viewport].y },
                        { label: "Width", value: selectedItem.rects[viewport].w },
                        { label: "Height", value: selectedItem.rects[viewport].h },
                      ].map((entry) => (
                        <div key={entry.label} className="rounded-2xl border border-border bg-muted/20 p-3">
                          <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{entry.label}</div>
                          <div className="mt-1 text-lg font-semibold">{entry.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/20 p-4 text-xs leading-6 text-muted-foreground">
                      Editor, componentleri serbest piksel bazli birakmiyor. Her hareket grid&apos;e snap oluyor ve cakisan bloklar otomatik olarak en yakin bos alana tasiniyor.
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
                    Canvas icinden bir blok sec.
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border-border bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                <Button className="w-full justify-start gap-2 rounded-xl" variant="outline" onClick={() => addBlock("stats")}>
                  <Plus className="h-4 w-4" />
                  Add stats block
                </Button>
                <Button className="w-full justify-start gap-2 rounded-xl" variant="outline" onClick={() => addBlock("table")}>
                  <Plus className="h-4 w-4" />
                  Add table block
                </Button>
                <Button className="w-full justify-start gap-2 rounded-xl" onClick={openPreviewWindow}>
                  <Smartphone className="h-4 w-4" />
                  Open synced preview
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default function AppLayout() {
  return <R2GoPage />;
}
