"use client";

import * as React from "react";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  Copy,
  Download,
  Filter,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type CellType = "text" | "number" | "badge" | "date" | "email" | "url" | "boolean";

export interface GridColumn {
  key: string;
  header: string;
  type?: CellType;
  width?: number;       // px
  minWidth?: number;    // px
  editable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  options?: string[];   // for badge/select type
  align?: "left" | "center" | "right";
}

export type GridRow = Record<string, unknown> & { _id: string };

interface DataGridProps {
  columns: GridColumn[];
  rows: GridRow[];
  onChange?: (rows: GridRow[]) => void;
  className?: string;
  height?: number;
  selectable?: boolean;
  addable?: boolean;
  deletable?: boolean;
  downloadable?: boolean;
  title?: string;
}

type SortState = { key: string; dir: "asc" | "desc" } | null;

// ─── Cell renderer ─────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  inactive: "bg-slate-500/10 text-slate-500 border-slate-500/20",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  error: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  draft: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  trial: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  pro: "bg-primary/10 text-primary border-primary/20",
};

function CellView({ value, col }: { value: unknown; col: GridColumn }) {
  const str = String(value ?? "");

  if (col.type === "badge") {
    const lower = str.toLowerCase();
    const colorClass = BADGE_COLORS[lower] ?? "bg-muted text-muted-foreground border-border/60";
    return (
      <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium", colorClass)}>
        {str}
      </span>
    );
  }

  if (col.type === "boolean") {
    const bool = value === true || str === "true" || str === "1" || str === "yes";
    return (
      <span className={cn("inline-block h-4 w-4 rounded-full", bool ? "bg-emerald-500" : "bg-muted-foreground/30")} />
    );
  }

  if (col.type === "email") {
    return <a href={`mailto:${str}`} className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>{str}</a>;
  }

  if (col.type === "url") {
    return (
      <a href={str} target="_blank" rel="noreferrer" className="text-primary hover:underline" onClick={(e) => e.stopPropagation()}>
        {str.replace(/^https?:\/\//, "")}
      </a>
    );
  }

  if (col.type === "number") {
    return <span className="tabular-nums">{Number(value ?? 0).toLocaleString()}</span>;
  }

  return <span>{str}</span>;
}

function CellEditor({
  value,
  col,
  onCommit,
  onCancel,
}: {
  value: unknown;
  col: GridColumn;
  onCommit: (v: unknown) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = React.useState(String(value ?? ""));
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => { ref.current?.focus(); ref.current?.select(); }, []);

  const commit = () => {
    const v = col.type === "number" ? Number(draft) : col.type === "boolean" ? draft === "true" : draft;
    onCommit(v);
  };

  if (col.options) {
    return (
      <select
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") onCancel(); }}
        className="h-7 w-full rounded border border-primary bg-background px-1.5 text-xs outline-none"
        autoFocus
      >
        {col.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    );
  }

  return (
    <input
      ref={ref}
      type={col.type === "number" ? "number" : col.type === "date" ? "date" : "text"}
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") onCancel(); }}
      className="h-7 w-full rounded border border-primary bg-background px-1.5 text-xs outline-none"
    />
  );
}

// ─── Main DataGrid ──────────────────────────────────────────────────────────────

export function DataGrid({
  columns,
  rows: initialRows,
  onChange,
  className,
  height = 420,
  selectable = true,
  addable = true,
  deletable = true,
  downloadable = true,
  title,
}: DataGridProps) {
  const [rows, setRows] = React.useState<GridRow[]>(initialRows);
  const [sort, setSort] = React.useState<SortState>(null);
  const [query, setQuery] = React.useState("");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
  const [editing, setEditing] = React.useState<{ rowId: string; colKey: string } | null>(null);
  const [colWidths, setColWidths] = React.useState<Record<string, number>>({});
  const [resizingCol, setResizingCol] = React.useState<string | null>(null);
  const resizeStartRef = React.useRef<{ x: number; width: number } | null>(null);

  React.useEffect(() => { setRows(initialRows); }, [initialRows]);

  // ── Filtered + sorted rows ──
  const displayRows = React.useMemo(() => {
    let list = [...rows];
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((row) =>
        columns.some((col) => String(row[col.key] ?? "").toLowerCase().includes(q)),
      );
    }
    if (sort) {
      list.sort((a, b) => {
        const av = String(a[sort.key] ?? "");
        const bv = String(b[sort.key] ?? "");
        const cmp = av.localeCompare(bv, undefined, { numeric: true, sensitivity: "base" });
        return sort.dir === "asc" ? cmp : -cmp;
      });
    }
    return list;
  }, [rows, query, sort, columns]);

  const mutateRows = (next: GridRow[]) => { setRows(next); onChange?.(next); };

  const toggleSort = (key: string) => {
    setSort((s) => {
      if (s?.key !== key) return { key, dir: "asc" };
      if (s.dir === "asc") return { key, dir: "desc" };
      return null;
    });
  };

  const commitEdit = (rowId: string, colKey: string, value: unknown) => {
    mutateRows(rows.map((r) => r._id === rowId ? { ...r, [colKey]: value } : r));
    setEditing(null);
  };

  const addRow = () => {
    const blank: GridRow = { _id: `row-${Date.now()}` };
    columns.forEach((c) => { blank[c.key] = c.type === "number" ? 0 : c.type === "boolean" ? false : ""; });
    mutateRows([...rows, blank]);
  };

  const deleteSelected = () => {
    mutateRows(rows.filter((r) => !selectedIds.has(r._id)));
    setSelectedIds(new Set());
  };

  const toggleSelectAll = () => {
    setSelectedIds(selectedIds.size === displayRows.length ? new Set() : new Set(displayRows.map((r) => r._id)));
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const downloadCSV = () => {
    const header = columns.map((c) => c.header).join(",");
    const body = rows.map((r) => columns.map((c) => JSON.stringify(String(r[c.key] ?? ""))).join(",")).join("\n");
    const blob = new Blob([header + "\n" + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const copySelected = () => {
    const selected = rows.filter((r) => selectedIds.has(r._id));
    const text = selected.map((r) => columns.map((c) => r[c.key]).join("\t")).join("\n");
    navigator.clipboard.writeText(text);
  };

  // Column resize
  const startResize = (e: React.MouseEvent, key: string, currentWidth: number) => {
    e.preventDefault();
    e.stopPropagation();
    setResizingCol(key);
    resizeStartRef.current = { x: e.clientX, width: currentWidth };

    const onMove = (me: MouseEvent) => {
      if (!resizeStartRef.current) return;
      const delta = me.clientX - resizeStartRef.current.x;
      const newW = Math.max(60, resizeStartRef.current.width + delta);
      setColWidths((prev) => ({ ...prev, [key]: newW }));
    };
    const onUp = () => {
      setResizingCol(null);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const getColWidth = (col: GridColumn) => colWidths[col.key] ?? col.width ?? col.minWidth ?? 140;

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 border-b bg-muted/20 px-3 py-2">
        <div className="flex items-center gap-2">
          {title && <span className="text-sm font-semibold">{title}</span>}
          {selectedIds.size > 0 && (
            <Badge variant="secondary" className="rounded-full px-2 py-0 text-[11px]">
              {selectedIds.size} selected
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter…" className="h-7 w-44 rounded-lg pl-8 text-xs" />
            {query && <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="h-3 w-3" /></button>}
          </div>
          {selectedIds.size > 0 && (
            <>
              <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs" onClick={copySelected}>
                <Copy className="h-3 w-3" />Copy
              </Button>
              {deletable && (
                <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs text-destructive hover:text-destructive" onClick={deleteSelected}>
                  <Trash2 className="h-3 w-3" />Delete
                </Button>
              )}
            </>
          )}
          {downloadable && (
            <Button variant="ghost" size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs" onClick={downloadCSV}>
              <Download className="h-3 w-3" />CSV
            </Button>
          )}
          {addable && (
            <Button size="sm" className="h-7 gap-1 rounded-lg px-2 text-xs" onClick={addRow}>
              <Plus className="h-3 w-3" />Add row
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto" style={{ height }}>
        <table className="w-full border-collapse" style={{ minWidth: columns.reduce((s, c) => s + getColWidth(c), selectable ? 40 : 0) }}>
          <thead className="sticky top-0 z-10 bg-muted/40">
            <tr>
              {selectable && (
                <th className="w-10 border-b px-3 py-2">
                  <input
                    type="checkbox"
                    checked={displayRows.length > 0 && selectedIds.size === displayRows.length}
                    onChange={toggleSelectAll}
                    className="h-3.5 w-3.5 rounded accent-primary"
                  />
                </th>
              )}
              {columns.map((col) => {
                const w = getColWidth(col);
                const isSorted = sort?.key === col.key;
                return (
                  <th
                    key={col.key}
                    className="group relative select-none border-b px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    style={{ width: w, minWidth: col.minWidth ?? 60 }}
                  >
                    <div
                      className={cn("flex items-center gap-1", col.sortable !== false && "cursor-pointer hover:text-foreground")}
                      onClick={() => col.sortable !== false && toggleSort(col.key)}
                    >
                      {col.header}
                      {col.sortable !== false && (
                        <span className="ml-0.5">
                          {isSorted && sort?.dir === "asc" ? <ChevronUp className="h-3 w-3 text-primary" /> :
                            isSorted && sort?.dir === "desc" ? <ChevronDown className="h-3 w-3 text-primary" /> :
                              <ChevronsUpDown className="h-3 w-3 text-muted-foreground/40" />}
                        </span>
                      )}
                    </div>
                    {/* Resize handle */}
                    <div
                      className={cn(
                        "absolute right-0 top-0 bottom-0 w-1 cursor-col-resize opacity-0 group-hover:opacity-100 hover:bg-primary/40",
                        resizingCol === col.key && "opacity-100 bg-primary/60",
                      )}
                      onMouseDown={(e) => startResize(e, col.key, w)}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center text-sm text-muted-foreground">
                  No data
                </td>
              </tr>
            ) : (
              displayRows.map((row, rowIdx) => {
                const isSelected = selectedIds.has(row._id);
                return (
                  <tr
                    key={row._id}
                    className={cn(
                      "border-b border-border/40 transition-colors",
                      isSelected ? "bg-primary/5" : rowIdx % 2 === 0 ? "bg-background" : "bg-muted/10",
                      "hover:bg-muted/20",
                    )}
                    onClick={() => selectable && toggleRow(row._id)}
                  >
                    {selectable && (
                      <td className="w-10 px-3 py-1.5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(row._id)}
                          className="h-3.5 w-3.5 rounded accent-primary"
                        />
                      </td>
                    )}
                    {columns.map((col) => {
                      const isEditing = editing?.rowId === row._id && editing?.colKey === col.key;
                      return (
                        <td
                          key={col.key}
                          className={cn(
                            "overflow-hidden text-ellipsis whitespace-nowrap px-3 py-1.5 text-sm",
                            col.align === "right" && "text-right",
                            col.align === "center" && "text-center",
                            col.editable !== false && "cursor-pointer",
                          )}
                          style={{ maxWidth: getColWidth(col) }}
                          onDoubleClick={(e) => {
                            if (col.editable === false) return;
                            e.stopPropagation();
                            setEditing({ rowId: row._id, colKey: col.key });
                          }}
                        >
                          {isEditing ? (
                            <CellEditor
                              value={row[col.key]}
                              col={col}
                              onCommit={(v) => commitEdit(row._id, col.key, v)}
                              onCancel={() => setEditing(null)}
                            />
                          ) : (
                            <CellView value={row[col.key]} col={col} />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t bg-muted/10 px-3 py-2 text-[11px] text-muted-foreground">
        <span>{displayRows.length} of {rows.length} rows</span>
        <span>Double-click a cell to edit · Click header to sort</span>
      </div>
    </div>
  );
}

// ─── Sample data ────────────────────────────────────────────────────────────────

export const sampleGridColumns: GridColumn[] = [
  { key: "name", header: "Name", width: 160, sortable: true },
  { key: "email", header: "Email", type: "email", width: 200, sortable: true },
  { key: "status", header: "Status", type: "badge", width: 100, options: ["Active", "Inactive", "Trial", "Pending"], sortable: true },
  { key: "plan", header: "Plan", type: "badge", width: 90, options: ["Free", "Pro", "Enterprise"], sortable: true },
  { key: "mrr", header: "MRR", type: "number", width: 90, align: "right", sortable: true },
  { key: "joined", header: "Joined", type: "date", width: 110, sortable: true },
];

export function generateGridData(count = 50): GridRow[] {
  const names = ["Alice Chen", "Bob Kim", "Carlos Vega", "Diana Park", "Ethan Wu", "Fiona Lee", "George Hall", "Hana Mori"];
  const statuses = ["Active", "Inactive", "Trial", "Pending"];
  const plans = ["Free", "Pro", "Enterprise"];
  return Array.from({ length: count }, (_, i) => ({
    _id: `row-${i}`,
    name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
    email: `user${i + 1}@example.com`,
    status: statuses[i % statuses.length],
    plan: plans[i % plans.length],
    mrr: (i * 47 + 100) % 2000,
    joined: `2024-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
  }));
}
