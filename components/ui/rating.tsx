"use client";

import React, { useState } from "react";
import { cn } from "@/src/lib/utils";
import { Star, Heart, ThumbsUp, Zap } from "lucide-react";

type RatingIcon = "star" | "heart" | "thumbs" | "zap";
type RatingSize = "sm" | "md" | "lg" | "xl";

const ICONS: Record<RatingIcon, React.ElementType> = {
  star: Star,
  heart: Heart,
  thumbs: ThumbsUp,
  zap: Zap,
};

const SIZES: Record<RatingSize, { icon: string; gap: string; text: string }> = {
  sm: { icon: "h-3.5 w-3.5", gap: "gap-0.5", text: "text-xs" },
  md: { icon: "h-5 w-5", gap: "gap-1", text: "text-sm" },
  lg: { icon: "h-6 w-6", gap: "gap-1.5", text: "text-base" },
  xl: { icon: "h-8 w-8", gap: "gap-2", text: "text-lg" },
};

interface RatingProps {
  value?: number;
  max?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  allowHalf?: boolean;
  icon?: RatingIcon;
  size?: RatingSize;
  color?: string;
  showValue?: boolean;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export function Rating({
  value = 0,
  max = 5,
  onChange,
  readOnly = false,
  allowHalf = false,
  icon = "star",
  size = "md",
  color = "#f59e0b",
  showValue = false,
  showCount = false,
  count,
  className,
}: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const Icon = ICONS[icon];
  const sizeConfig = SIZES[size];

  const getDisplayValue = () => hovered ?? value;
  const display = getDisplayValue();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (readOnly) return;
    if (allowHalf) {
      const rect = e.currentTarget.getBoundingClientRect();
      const half = e.clientX - rect.left < rect.width / 2;
      setHovered(half ? index - 0.5 : index);
    } else {
      setHovered(index);
    }
  };

  const getFill = (index: number) => {
    const d = display;
    if (d >= index) return "full";
    if (allowHalf && d >= index - 0.5) return "half";
    return "empty";
  };

  return (
    <div className={cn("flex items-center", sizeConfig.gap, className)}>
      {Array.from({ length: max }, (_, i) => i + 1).map((index) => {
        const fill = getFill(index);

        return (
          <button
            key={index}
            type="button"
            disabled={readOnly}
            className={cn(
              "relative focus:outline-none transition-transform",
              !readOnly && "hover:scale-110 cursor-pointer",
              readOnly && "cursor-default"
            )}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            onClick={() => {
              if (readOnly) return;
              const newVal = hovered ?? index;
              onChange?.(newVal === value ? 0 : newVal);
            }}
            aria-label={`Rate ${index} out of ${max}`}
          >
            {fill === "half" ? (
              <span className="relative inline-block">
                <Icon
                  className={cn(sizeConfig.icon, "text-muted-foreground/30")}
                  strokeWidth={1.5}
                />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Icon
                    className={sizeConfig.icon}
                    strokeWidth={1.5}
                    fill={color}
                    style={{ color }}
                  />
                </span>
              </span>
            ) : (
              <Icon
                className={cn(
                  sizeConfig.icon,
                  fill === "full" ? "" : "text-muted-foreground/30"
                )}
                strokeWidth={1.5}
                fill={fill === "full" ? color : "none"}
                style={{ color: fill === "full" ? color : undefined }}
              />
            )}
          </button>
        );
      })}

      {(showValue || showCount) && (
        <span className={cn("text-muted-foreground ml-1", sizeConfig.text)}>
          {showValue && (
            <span className="font-semibold text-foreground">
              {value % 1 === 0 ? value : value.toFixed(1)}
            </span>
          )}
          {showValue && showCount && (
            <span className="mx-0.5">/</span>
          )}
          {showCount && count !== undefined && (
            <span>({count.toLocaleString()})</span>
          )}
        </span>
      )}
    </div>
  );
}

// Read-only display with aggregate stats
interface RatingBreakdownItem {
  stars: number;
  count: number;
}

interface RatingStatsProps {
  average: number;
  total: number;
  breakdown: RatingBreakdownItem[];
  className?: string;
}

export function RatingStats({ average, total, breakdown, className }: RatingStatsProps) {
  const max = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <div className={cn("flex gap-6 items-center", className)}>
      <div className="text-center shrink-0">
        <div className="text-4xl font-bold tracking-tight">
          {average.toFixed(1)}
        </div>
        <Rating value={average} readOnly allowHalf size="sm" className="justify-center my-1" />
        <div className="text-xs text-muted-foreground">{total.toLocaleString()} reviews</div>
      </div>

      <div className="flex-1 space-y-1.5">
        {[...breakdown].reverse().map(({ stars, count }) => (
          <div key={stars} className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-3 shrink-0">{stars}</span>
            <Star className="h-3 w-3 text-amber-400 shrink-0" fill="#f59e0b" />
            <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-amber-400 transition-all"
                style={{ width: `${(count / max) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
