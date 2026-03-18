"use client";

import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface VirtualListItem {
  id: string | number;
  [key: string]: unknown;
}

export interface VirtualListColumn<T extends VirtualListItem> {
  key: keyof T;
  header: string;
  width?: number | string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
}

interface VirtualListProps<T extends VirtualListItem> {
  items: T[];
  columns: VirtualListColumn<T>[];
  height?: number;
  rowHeight?: number;
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  className?: string;
  onRowClick?: (item: T) => void;
  selectedId?: string | number | null;
  emptyText?: string;
  overscan?: number;
}

type SortDir = "asc" | "desc" | null;

// ─── Component ─────────────────────────────────────────────────────────────────

export function VirtualList<T extends VirtualListItem>({
  items,
  columns,
  height = 400,
  rowHeight = 48,
  searchable = true,
  searchKeys,
  className,
  onRowClick,
  selectedId,
  emptyText = "No items found.",
  overscan = 5,
}: VirtualListProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>(null);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const searchableKeys = searchKeys ?? columns.map((c) => c.key);

  const filtered = React.useMemo(() => {
    let list = [...items];

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((item) =>
        searchableKeys.some((key) => String(item[key] ?? "").toLowerCase().includes(q)),
      );
    }

    if (sortKey && sortDir) {
      list.sort((a, b) => {
        const av = String(a[sortKey] ?? "");
        const bv = String(b[sortKey] ?? "");
        const cmp = av.localeCompare(bv, undefined, { numeric: true });
        return sortDir === "asc" ? cmp : -cmp;
      });
    }

    return list;
  }, [items, query, sortKey, sortDir, searchableKeys]);

  const rowVirtualizer = useVirtualizer({
    count: filtered.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  });

  const toggleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === "desc") setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ col }: { col: VirtualListColumn<T> }) => {
    if (!col.sortable) return null;
    const active = sortKey === col.key;
    return (
      <span className={cn("ml-1 text-[10px]", active ? "text-primary" : "text-muted-foreground/40")}>
        {active && sortDir === "asc" ? "↑" : active && sortDir === "desc" ? "↓" : "↕"}
      </span>
    );
  };

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card", className)}>
      {/* Toolbar */}
      {searchable && (
        <div className="flex items-center gap-2 border-b px-3 py-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="h-8 rounded-lg pl-8 text-xs"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Badge variant="secondary" className="rounded-full px-2 py-0 text-[11px]">
              {filtered.length} / {items.length}
            </Badge>
            {(sortKey || query) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 rounded-lg px-2 text-xs text-muted-foreground"
                onClick={() => { setQuery(""); setSortKey(null); setSortDir(null); }}
              >
                <SlidersHorizontal className="h-3 w-3" />
                Clear
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex border-b bg-muted/30 px-3">
        {columns.map((col) => (
          <div
            key={String(col.key)}
            className={cn(
              "py-2.5 pr-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
              col.sortable && "cursor-pointer select-none hover:text-foreground",
            )}
            style={{ width: col.width ?? `${100 / columns.length}%`, flexShrink: 0 }}
            onClick={() => col.sortable && toggleSort(col.key)}
          >
            {col.header}
            <SortIcon col={col} />
          </div>
        ))}
      </div>

      {/* Virtual rows */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height }}
      >
        {filtered.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <Search className="h-8 w-8 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground">{emptyText}</p>
          </div>
        ) : (
          <div
            style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}
          >
            {rowVirtualizer.getVirtualItems().map((vRow) => {
              const item = filtered[vRow.index];
              const isSelected = selectedId !== undefined && item.id === selectedId;

              return (
                <div
                  key={vRow.key}
                  data-index={vRow.index}
                  ref={rowVirtualizer.measureElement}
                  className={cn(
                    "absolute left-0 right-0 flex items-center border-b border-border/40 px-3 transition-colors",
                    onRowClick && "cursor-pointer hover:bg-muted/30",
                    isSelected && "bg-primary/6 hover:bg-primary/8",
                    vRow.index % 2 === 0 && !isSelected && "bg-background",
                  )}
                  style={{ top: vRow.start, height: rowHeight }}
                  onClick={() => onRowClick?.(item)}
                >
                  {columns.map((col) => (
                    <div
                      key={String(col.key)}
                      className="overflow-hidden text-ellipsis whitespace-nowrap pr-3 text-sm"
                      style={{ width: col.width ?? `${100 / columns.length}%`, flexShrink: 0 }}
                    >
                      {col.render
                        ? col.render(item[col.key], item)
                        : String(item[col.key] ?? "")}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Demo data generator ────────────────────────────────────────────────────────

const NAMES = ["Alice Chen", "Bob Kim", "Carlos Vega", "Diana Park", "Ethan Wu", "Fiona Lee", "George Hall", "Hana Mori", "Ivan Petrov", "Julia Ruiz", "Kevin Brooks", "Laura Stein", "Mia Torres", "Noah Clark", "Olivia Scott", "Paul Nguyen", "Quinn Adams", "Rosa Martinez", "Sam White", "Tara Jones", "Uma Singh", "Victor Cruz", "Wendy Baker", "Xiao Li", "Yuki Tanaka", "Zoe Williams"];
const STATUSES = ["Active", "Inactive", "Trial", "Suspended"];
const ROLES = ["Admin", "Member", "Viewer", "Editor"];
const PLANS = ["Free", "Starter", "Pro", "Enterprise"];

export function generateVirtualListData(count = 500) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: NAMES[i % NAMES.length] + (i >= NAMES.length ? ` (${Math.floor(i / NAMES.length) + 1})` : ""),
    status: STATUSES[i % STATUSES.length],
    role: ROLES[i % ROLES.length],
    plan: PLANS[i % PLANS.length],
    joined: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    mrr: `$${((i * 37 + 100) % 2000).toLocaleString()}`,
  }));
}
