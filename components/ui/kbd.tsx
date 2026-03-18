import React from "react";
import { cn } from "@/src/lib/utils";

// ─── Single key ─────────────────────────────────────────────────────────────

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

export function Kbd({ children, size = "md", className, ...props }: KbdProps) {
  const sizes = {
    sm: "px-1 py-px text-[10px] min-w-[18px]",
    md: "px-1.5 py-0.5 text-xs min-w-[22px]",
    lg: "px-2 py-1 text-sm min-w-[28px]",
  };

  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded border border-b-2 border-border bg-muted font-mono font-medium text-muted-foreground shadow-sm select-none",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

// ─── Shortcut (sequence of keys with separator) ──────────────────────────────

type Key = string;

interface ShortcutProps {
  keys: Key[];
  separator?: "+" | "then" | string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const KEY_SYMBOLS: Record<string, string> = {
  cmd: "⌘",
  command: "⌘",
  meta: "⌘",
  ctrl: "⌃",
  control: "⌃",
  alt: "⌥",
  option: "⌥",
  shift: "⇧",
  enter: "↵",
  return: "↵",
  backspace: "⌫",
  delete: "⌦",
  tab: "⇥",
  esc: "⎋",
  escape: "⎋",
  up: "↑",
  down: "↓",
  left: "←",
  right: "→",
  space: "Space",
  capslock: "⇪",
};

function normalizeKey(key: string): string {
  const lower = key.toLowerCase();
  return KEY_SYMBOLS[lower] ?? key.toUpperCase();
}

export function Shortcut({ keys, separator = "+", size = "md", className }: ShortcutProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && separator !== "+" && (
            <span className="mx-0.5 text-xs text-muted-foreground">{separator}</span>
          )}
          {i > 0 && separator === "+" && (
            <span className="text-xs text-muted-foreground mx-0.5">+</span>
          )}
          <Kbd size={size}>{normalizeKey(key)}</Kbd>
        </React.Fragment>
      ))}
    </span>
  );
}

// ─── Inline hint (label + shortcut on the same line) ─────────────────────────

interface KeyHintProps {
  label: string;
  keys: Key[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function KeyHint({ label, keys, size = "sm", className }: KeyHintProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <Shortcut keys={keys} size={size} />
    </span>
  );
}

// ─── Shortcut list (cheatsheet / help panel) ──────────────────────────────────

interface ShortcutItem {
  keys: Key[];
  description: string;
}

interface ShortcutGroup {
  title: string;
  items: ShortcutItem[];
}

interface ShortcutListProps {
  groups: ShortcutGroup[];
  columns?: 1 | 2;
  className?: string;
}

export function ShortcutList({ groups, columns = 1, className }: ShortcutListProps) {
  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {groups.map((group) => (
        <div key={group.title} className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {group.title}
          </h4>
          <ul className="space-y-1.5">
            {group.items.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-4 text-sm"
              >
                <span className="text-foreground">{item.description}</span>
                <Shortcut keys={item.keys} size="sm" />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
