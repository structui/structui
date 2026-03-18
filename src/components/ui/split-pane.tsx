"use client";

import * as React from "react";
import { GripVertical, GripHorizontal } from "lucide-react";
import { cn } from "@/src/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface SplitPaneProps {
  direction?: "horizontal" | "vertical";
  defaultSize?: number;      // percentage 0-100
  minSize?: number;          // percentage
  maxSize?: number;          // percentage
  className?: string;
  children: [React.ReactNode, React.ReactNode];
  onResize?: (size: number) => void;
  storageKey?: string;
  handleClassName?: string;
}

// ─── Component ─────────────────────────────────────────────────────────────────

export function SplitPane({
  direction = "horizontal",
  defaultSize = 50,
  minSize = 15,
  maxSize = 85,
  className,
  children,
  onResize,
  storageKey,
  handleClassName,
}: SplitPaneProps) {
  const [size, setSize] = React.useState<number>(() => {
    if (storageKey && typeof window !== "undefined") {
      const stored = localStorage.getItem(`splitpane:${storageKey}`);
      if (stored) return Math.min(maxSize, Math.max(minSize, Number(stored)));
    }
    return defaultSize;
  });

  const [isDragging, setIsDragging] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isHorizontal = direction === "horizontal";

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const container = containerRef.current;
    if (!container) return;

    const startPos = isHorizontal ? e.clientX : e.clientY;
    const containerSize = isHorizontal
      ? container.getBoundingClientRect().width
      : container.getBoundingClientRect().height;

    const startSize = size;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
      const delta = currentPos - startPos;
      const deltaPercent = (delta / containerSize) * 100;
      const newSize = Math.min(maxSize, Math.max(minSize, startSize + deltaPercent));
      setSize(newSize);
      onResize?.(newSize);
      if (storageKey) localStorage.setItem(`splitpane:${storageKey}`, String(newSize));
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  // Touch support
  const handleTouchStart = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const startPos = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
    const containerSize = isHorizontal
      ? container.getBoundingClientRect().width
      : container.getBoundingClientRect().height;
    const startSize = size;

    setIsDragging(true);

    const onTouchMove = (te: TouchEvent) => {
      const currentPos = isHorizontal ? te.touches[0].clientX : te.touches[0].clientY;
      const delta = currentPos - startPos;
      const deltaPercent = (delta / containerSize) * 100;
      const newSize = Math.min(maxSize, Math.max(minSize, startSize + deltaPercent));
      setSize(newSize);
      onResize?.(newSize);
    };

    const onTouchEnd = () => {
      setIsDragging(false);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };

    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
  };

  // Double-click to reset
  const handleDoubleClick = () => {
    setSize(defaultSize);
    onResize?.(defaultSize);
    if (storageKey) localStorage.removeItem(`splitpane:${storageKey}`);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex overflow-hidden",
        isHorizontal ? "flex-row" : "flex-col",
        isDragging && "select-none",
        className,
      )}
    >
      {/* First pane */}
      <div
        className="overflow-auto"
        style={{ [isHorizontal ? "width" : "height"]: `${size}%`, flexShrink: 0 }}
      >
        {children[0]}
      </div>

      {/* Drag handle */}
      <div
        className={cn(
          "group relative z-10 flex shrink-0 items-center justify-center bg-border/0 transition-colors hover:bg-border/30",
          isHorizontal
            ? "w-px cursor-col-resize hover:w-1.5"
            : "h-px cursor-row-resize hover:h-1.5",
          isDragging && (isHorizontal ? "w-1.5 bg-primary/40" : "h-1.5 bg-primary/40"),
          handleClassName,
        )}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={handleDoubleClick}
        title="Drag to resize · Double-click to reset"
      >
        {/* Handle grip icon */}
        <div
          className={cn(
            "absolute flex items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-opacity",
            isHorizontal ? "h-8 w-4" : "h-4 w-8",
            isDragging
              ? "opacity-100 text-primary border-primary/30"
              : "opacity-0 group-hover:opacity-100",
          )}
        >
          {isHorizontal
            ? <GripVertical className="h-3.5 w-3.5" />
            : <GripHorizontal className="h-3.5 w-3.5" />}
        </div>
      </div>

      {/* Second pane */}
      <div className="min-w-0 flex-1 overflow-auto">
        {children[1]}
      </div>
    </div>
  );
}

// ─── Nested split helper ────────────────────────────────────────────────────────

interface TriplePaneProps {
  leftWidth?: number;
  rightWidth?: number;
  className?: string;
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
  storageKey?: string;
}

export function TriplePane({
  leftWidth = 20,
  rightWidth = 25,
  className,
  left,
  center,
  right,
  storageKey,
}: TriplePaneProps) {
  return (
    <SplitPane
      direction="horizontal"
      defaultSize={leftWidth}
      minSize={10}
      maxSize={40}
      className={className}
      storageKey={storageKey ? `${storageKey}-left` : undefined}
    >
      {left}
      <SplitPane
        direction="horizontal"
        defaultSize={100 - (rightWidth / (1 - leftWidth / 100)) * 100}
        minSize={20}
        maxSize={80}
        storageKey={storageKey ? `${storageKey}-right` : undefined}
      >
        {center}
        {right}
      </SplitPane>
    </SplitPane>
  );
}
