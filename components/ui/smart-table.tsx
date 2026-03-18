"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | null;

export interface SmartTableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  className?: string;
}

export interface SmartTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: SmartTableColumn<T>[];
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  className?: string;
  striped?: boolean;
  bordered?: boolean;
  compact?: boolean;
  stickyHeader?: boolean;
  emptyMessage?: string;
  loading?: boolean;
  onRowClick?: (row: T) => void;
  rowClassName?: (row: T, index: number) => string;
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc") return <ArrowUp className="h-3 w-3 text-primary" />;
  if (direction === "desc") return <ArrowDown className="h-3 w-3 text-primary" />;
  return <ArrowUpDown className="h-3 w-3 text-muted-foreground/40" />;
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function TableSkeleton({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="border-b border-border/50 animate-pulse">
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div
                className="h-4 rounded-full bg-muted/60"
                style={{ width: `${40 + Math.random() * 50}%` }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SmartTable<T extends Record<string, unknown>>({
  data,
  columns,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = "Search...",
  className,
  striped = false,
  bordered = false,
  compact = false,
  stickyHeader = false,
  emptyMessage = "No data found.",
  loading = false,
  onRowClick,
  rowClassName,
}: SmartTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>(null);
  const [page, setPage] = React.useState(1);
  const [activeFilters, setActiveFilters] = React.useState<Record<string, string>>({});

  // Filter columns that are filterable
  const filterableCols = columns.filter((c) => c.filterable);

  // Apply search and filters
  const filtered = React.useMemo(() => {
    let result = [...data];

    // Global search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((row) =>
        Object.values(row).some((v) =>
          String(v ?? "").toLowerCase().includes(q),
        ),
      );
    }

    // Column filters
    for (const [key, val] of Object.entries(activeFilters)) {
      if (!val) continue;
      result = result.filter((row) =>
        String(row[key] ?? "").toLowerCase().includes(val.toLowerCase()),
      );
    }

    return result;
  }, [data, search, activeFilters]);

  // Sort
  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const paginated = sorted.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  };

  const getCellValue = (row: T, key: string): unknown => {
    return key.split(".").reduce((obj: unknown, k) => {
      if (obj && typeof obj === "object") return (obj as Record<string, unknown>)[k];
      return undefined;
    }, row);
  };

  const padCell = compact ? "px-3 py-2" : "px-4 py-3";

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Toolbar */}
      {(searchable || filterableCols.length > 0) && (
        <div className="flex flex-wrap items-center gap-2">
          {searchable && (
            <div className="relative flex-1 min-w-40">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="h-8 pl-8 text-xs"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          )}
          {filterableCols.length > 0 && (
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              {filterableCols.map((col) => (
                <Input
                  key={String(col.key)}
                  placeholder={`Filter ${col.header}...`}
                  value={activeFilters[String(col.key)] ?? ""}
                  onChange={(e) => {
                    setActiveFilters((prev) => ({
                      ...prev,
                      [String(col.key)]: e.target.value,
                    }));
                    setPage(1);
                  }}
                  className="h-8 w-32 text-xs"
                />
              ))}
            </div>
          )}
          {sorted.length !== data.length && (
            <Badge variant="secondary" className="h-7 rounded-full text-xs font-mono">
              {sorted.length} / {data.length}
            </Badge>
          )}
        </div>
      )}

      {/* Table */}
      <div
        className={cn(
          "overflow-hidden rounded-xl",
          bordered ? "border border-border" : "border border-border/70",
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead
              className={cn(
                "border-b border-border/70 bg-muted/30",
                stickyHeader && "sticky top-0 z-10",
              )}
            >
              <tr>
                {columns.map((col) => (
                  <th
                    key={String(col.key)}
                    style={{ width: col.width }}
                    className={cn(
                      padCell,
                      "text-left text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
                      col.align === "center" && "text-center",
                      col.align === "right" && "text-right",
                      col.sortable && "cursor-pointer select-none hover:text-foreground",
                      col.className,
                    )}
                    onClick={() => col.sortable && handleSort(String(col.key))}
                  >
                    <div
                      className={cn(
                        "flex items-center gap-1.5",
                        col.align === "center" && "justify-center",
                        col.align === "right" && "justify-end",
                      )}
                    >
                      {col.header}
                      {col.sortable && (
                        <SortIcon
                          direction={sortKey === String(col.key) ? sortDir : null}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {loading ? (
                <TableSkeleton rows={pageSize} cols={columns.length} />
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-12 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row, i) => (
                  <tr
                    key={i}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      "transition-colors",
                      striped && i % 2 === 1 && "bg-muted/20",
                      onRowClick && "cursor-pointer hover:bg-muted/40",
                      rowClassName?.(row, i),
                    )}
                  >
                    {columns.map((col) => {
                      const value = getCellValue(row, String(col.key));
                      return (
                        <td
                          key={String(col.key)}
                          className={cn(
                            padCell,
                            "text-sm",
                            col.align === "center" && "text-center",
                            col.align === "right" && "text-right",
                            col.className,
                          )}
                        >
                          {col.render
                            ? col.render(value, row, i)
                            : String(value ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            Page {safePage} of {totalPages} — {sorted.length} result{sorted.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage(1)}
              disabled={safePage === 1}
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={safePage === 1}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, safePage - 2)) + i;
              return (
                <Button
                  key={pageNum}
                  variant={safePage === pageNum ? "default" : "ghost"}
                  size="icon"
                  className="h-7 w-7 text-xs"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setPage(totalPages)}
              disabled={safePage === totalPages}
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

const DEMO_DATA = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: ["Alice Johnson", "Bob Smith", "Carol White", "David Brown", "Eva Davis"][i % 5],
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Editor", "Viewer", "Manager"][i % 4],
  status: i % 3 === 0 ? "Inactive" : "Active",
  joined: new Date(2024, i % 12, (i % 28) + 1).toLocaleDateString(),
  revenue: `$${(Math.random() * 10000).toFixed(0)}`,
}));

type DemoRow = (typeof DEMO_DATA)[number];

export function SmartTableDemo() {
  const columns: SmartTableColumn<DemoRow>[] = [
    {
      key: "id",
      header: "#",
      sortable: true,
      width: "50px",
      align: "center",
      render: (v) => <span className="font-mono text-xs text-muted-foreground">{String(v)}</span>,
    },
    { key: "name", header: "Name", sortable: true },
    {
      key: "email",
      header: "Email",
      sortable: true,
      render: (v) => <span className="text-muted-foreground">{String(v)}</span>,
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      filterable: true,
      render: (v) => (
        <Badge
          variant="secondary"
          className={cn(
            "rounded-full px-2 text-[11px]",
            v === "Admin" && "bg-primary/10 text-primary",
            v === "Manager" && "bg-violet-500/10 text-violet-600 dark:text-violet-400",
          )}
        >
          {String(v)}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      align: "center",
      render: (v) => (
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            v === "Active"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-muted text-muted-foreground",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              v === "Active" ? "bg-emerald-500" : "bg-muted-foreground/50",
            )}
          />
          {String(v)}
        </span>
      ),
    },
    { key: "revenue", header: "Revenue", sortable: true, align: "right" },
    { key: "joined", header: "Joined", sortable: true, align: "right" },
  ];

  return (
    <div className="p-6">
      <SmartTable
        data={DEMO_DATA}
        columns={columns}
        pageSize={8}
        striped
        searchPlaceholder="Search users..."
        onRowClick={(row) => console.log("Row clicked:", row)}
      />
    </div>
  );
}
