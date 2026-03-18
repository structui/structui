"use client";

import * as React from "react";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Clock,
  Code2,
  Command,
  Component,
  FileText,
  Hash,
  Home,
  LayoutGrid,
  Loader2,
  Palette,
  Search,
  Settings,
  Star,
  Terminal,
  User,
  Zap,
} from "lucide-react";

import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  category?: string;
  shortcut?: string[];
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  onSelect?: () => void;
  href?: string;
  keywords?: string[];
}

export interface CommandBarProps {
  items?: CommandItem[];
  placeholder?: string;
  loading?: boolean;
  onSelect?: (item: CommandItem) => void;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

// ─── Default items ────────────────────────────────────────────────────────────

const DEFAULT_ITEMS: CommandItem[] = [
  {
    id: "home",
    label: "Go to Home",
    icon: Home,
    category: "Navigation",
    shortcut: ["G", "H"],
    href: "/",
    keywords: ["home", "index", "main"],
  },
  {
    id: "components",
    label: "Browse Components",
    description: "Explore the component catalog",
    icon: Component,
    category: "Navigation",
    shortcut: ["G", "C"],
    href: "/components",
    keywords: ["components", "ui", "library"],
  },
  {
    id: "blocks",
    label: "View Blocks",
    description: "Production-ready section templates",
    icon: LayoutGrid,
    category: "Navigation",
    shortcut: ["G", "B"],
    href: "/blocks",
    keywords: ["blocks", "templates", "sections"],
  },
  {
    id: "docs",
    label: "Read Docs",
    description: "Documentation and guides",
    icon: BookOpen,
    category: "Navigation",
    shortcut: ["G", "D"],
    href: "/docs",
    keywords: ["docs", "documentation", "guide"],
  },
  {
    id: "theme",
    label: "Theme Creator",
    description: "Design and export your theme",
    icon: Palette,
    category: "Tools",
    href: "/theme-creator",
    keywords: ["theme", "colors", "design", "tokens"],
  },
  {
    id: "cli",
    label: "Copy CLI Command",
    description: "npx sui add button",
    icon: Terminal,
    category: "Tools",
    shortcut: ["⌘", "K"],
    keywords: ["cli", "install", "command", "terminal"],
    onSelect: () => navigator.clipboard?.writeText("npx sui add button"),
  },
  {
    id: "github",
    label: "View on GitHub",
    description: "Source code and issues",
    icon: Code2,
    category: "Links",
    href: "https://github.com/structui/structui",
    keywords: ["github", "source", "code", "repo"],
  },
  {
    id: "button",
    label: "Button Component",
    icon: Hash,
    category: "Components",
    href: "/components/button",
    keywords: ["button", "click", "action"],
  },
  {
    id: "badge",
    label: "Badge Component",
    icon: Hash,
    category: "Components",
    href: "/components/badge",
    keywords: ["badge", "tag", "label"],
  },
  {
    id: "accordion",
    label: "Accordion Component",
    icon: Hash,
    category: "Components",
    href: "/components/accordion",
    keywords: ["accordion", "collapse", "expand"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    category: "App",
    keywords: ["settings", "preferences", "config"],
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    category: "App",
    keywords: ["profile", "account", "user"],
  },
];

// ─── Keyboard shortcut display ────────────────────────────────────────────────

function Kbd({ keys }: { keys: string[] }) {
  return (
    <div className="flex items-center gap-0.5">
      {keys.map((k, i) => (
        <kbd
          key={i}
          className="flex h-5 min-w-5 items-center justify-center rounded border border-border/70 bg-muted px-1 font-mono text-[10px] text-muted-foreground"
        >
          {k}
        </kbd>
      ))}
    </div>
  );
}

// ─── CommandBar ───────────────────────────────────────────────────────────────

export function CommandBar({
  items = DEFAULT_ITEMS,
  placeholder = "Search or jump to...",
  loading = false,
  onSelect,
  className,
  open: controlledOpen,
  onOpenChange,
  trigger,
}: CommandBarProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  // Filter and group items
  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.keywords?.some((k) => k.toLowerCase().includes(q)) ||
        item.category?.toLowerCase().includes(q),
    );
  }, [items, query]);

  const grouped = React.useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      const cat = item.category ?? "Other";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    return Object.entries(groups);
  }, [filtered]);

  const flatItems = filtered;

  // Keyboard navigation
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) setQuery("");
      }
      if (!isOpen) return;
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, flatItems.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && flatItems[selected]) {
        handleSelect(flatItems[selected]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, flatItems, selected, setIsOpen]);

  // Scroll selected into view
  React.useEffect(() => {
    setSelected(0);
  }, [query]);

  React.useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = (item: CommandItem) => {
    item.onSelect?.();
    onSelect?.(item);
    if (item.href) {
      if (item.href.startsWith("http")) {
        window.open(item.href, "_blank");
      } else {
        window.location.href = item.href;
      }
    }
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Trigger */}
      {trigger ? (
        <div onClick={() => setIsOpen(true)}>{trigger}</div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            "flex h-8 items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground",
            className,
          )}
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:block">{placeholder}</span>
          <Kbd keys={["⌘", "K"]} />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/60 pt-[15vh] backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-border/80 bg-background shadow-2xl shadow-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              {loading ? (
                <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
              ) : (
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              )}
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <kbd className="flex h-5 items-center rounded border border-border/70 bg-muted px-1.5 font-mono text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              className="max-h-80 overflow-y-auto overscroll-contain p-2"
            >
              {grouped.length === 0 ? (
                <div className="px-3 py-8 text-center text-sm text-muted-foreground">
                  No results for &ldquo;{query}&rdquo;
                </div>
              ) : (
                grouped.map(([category, categoryItems]) => (
                  <div key={category} className="mb-3 last:mb-0">
                    <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                      {category}
                    </div>
                    <div className="space-y-0.5">
                      {categoryItems.map((item) => {
                        const globalIdx = flatItems.indexOf(item);
                        const isActive = globalIdx === selected;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onMouseEnter={() => setSelected(globalIdx)}
                            onClick={() => handleSelect(item)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                              isActive
                                ? "bg-primary/10 text-foreground"
                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                            )}
                          >
                            {Icon && (
                              <div
                                className={cn(
                                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border",
                                  isActive
                                    ? "border-primary/20 bg-primary/10 text-primary"
                                    : "border-border/60 bg-muted/40",
                                )}
                              >
                                <Icon className="h-3.5 w-3.5" />
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="truncate text-xs font-medium text-foreground">
                                {item.label}
                              </p>
                              {item.description && (
                                <p className="truncate text-[11px] text-muted-foreground">
                                  {item.description}
                                </p>
                              )}
                            </div>
                            <div className="flex shrink-0 items-center gap-2">
                              {item.badge && (
                                <Badge
                                  variant={item.badgeVariant ?? "secondary"}
                                  className="rounded-full px-1.5 py-0 text-[10px]"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              {item.shortcut && <Kbd keys={item.shortcut} />}
                              {isActive && (
                                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/60 px-4 py-2">
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60">
                <span className="flex items-center gap-1">
                  <Kbd keys={["↑", "↓"]} /> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <Kbd keys={["↵"]} /> Select
                </span>
                <span className="flex items-center gap-1">
                  <Kbd keys={["ESC"]} /> Close
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
                <Zap className="h-3 w-3" />
                SUI
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Demo ─────────────────────────────────────────────────────────────────────

export function CommandBarDemo() {
  return (
    <div className="flex flex-col items-center gap-6 p-10">
      <p className="text-sm text-muted-foreground">
        Press <kbd className="rounded border px-1.5 font-mono text-xs">⌘K</kbd> to open
      </p>
      <CommandBar />
    </div>
  );
}
