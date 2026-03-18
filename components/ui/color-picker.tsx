"use client";

import React, { useState, useCallback } from "react";
import { cn } from "@/src/lib/utils";
import { Check, ChevronDown, Pipette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const PRESETS = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899",
  "#64748b", "#0f172a", "#ffffff", "#f1f5f9",
];

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null;
}

function isValidHex(hex: string) {
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  showOpacity?: boolean;
  className?: string;
}

export function ColorPicker({
  value = "#3b82f6",
  onChange,
  showOpacity = true,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const [hex, setHex] = useState(value);
  const [opacity, setOpacity] = useState(100);
  const [inputVal, setInputVal] = useState(value);

  const rgb = hexToRgb(hex);

  const commit = useCallback(
    (newHex: string, newOpacity = opacity) => {
      if (!isValidHex(newHex)) return;
      setHex(newHex);
      setInputVal(newHex);
      const alpha = Math.round((newOpacity / 100) * 255)
        .toString(16)
        .padStart(2, "0");
      onChange?.(newOpacity === 100 ? newHex : `${newHex}${alpha}`);
    },
    [opacity, onChange]
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.startsWith("#") ? e.target.value : `#${e.target.value}`;
    setInputVal(v);
    if (isValidHex(v)) commit(v);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex h-9 items-center gap-2 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent transition-colors",
            className
          )}
        >
          <span
            className="h-4 w-4 rounded-sm border border-black/10 shadow-inner flex-shrink-0"
            style={{ background: hex, opacity: opacity / 100 }}
          />
          <span className="font-mono text-xs text-muted-foreground uppercase">
            {hex}
          </span>
          {showOpacity && opacity < 100 && (
            <span className="text-xs text-muted-foreground">{opacity}%</span>
          )}
          <ChevronDown className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="w-56 p-3 space-y-3" align="start">
        {/* Preview */}
        <div
          className="h-10 w-full rounded-md border border-border shadow-inner"
          style={{
            background:
              rgb
                ? `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity / 100})`
                : hex,
          }}
        />

        {/* Presets */}
        <div className="grid grid-cols-6 gap-1.5">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              className="relative h-6 w-6 rounded-md border border-black/10 shadow-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ background: preset }}
              onClick={() => commit(preset)}
              title={preset}
            >
              {hex.toLowerCase() === preset.toLowerCase() && (
                <Check
                  className="absolute inset-0 m-auto h-3 w-3"
                  style={{ color: parseInt(preset.slice(1), 16) > 0x888888 ? "#000" : "#fff" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Hex input */}
        <div className="flex items-center gap-2">
          <Pipette className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
          <input
            className="flex-1 font-mono text-xs bg-muted rounded px-2 py-1 border border-input focus:outline-none focus:ring-1 focus:ring-ring uppercase"
            value={inputVal}
            onChange={handleInput}
            maxLength={7}
            spellCheck={false}
          />
        </div>

        {/* Opacity slider */}
        {showOpacity && (
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Opacity</span>
              <span>{opacity}%</span>
            </div>
            <div className="relative h-4 flex items-center">
              <div
                className="absolute inset-0 h-2 my-auto rounded-full"
                style={{
                  background: rgb
                    ? `linear-gradient(to right, rgba(${rgb.r},${rgb.g},${rgb.b},0), rgba(${rgb.r},${rgb.g},${rgb.b},1))`
                    : `linear-gradient(to right, transparent, ${hex})`,
                }}
              />
              <input
                type="range"
                min={0}
                max={100}
                value={opacity}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setOpacity(v);
                  commit(hex, v);
                }}
                className="relative w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-gray-300 [&::-webkit-slider-thumb]:shadow [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-track]:h-0"
              />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

// Compact swatch-only variant
interface ColorSwatchProps {
  color: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ColorSwatch({ color, selected, onClick, size = "md", className }: ColorSwatchProps) {
  const sizes = { sm: "h-5 w-5", md: "h-7 w-7", lg: "h-9 w-9" };
  return (
    <button
      className={cn(
        "relative rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        selected ? "border-foreground shadow-md scale-110" : "border-transparent",
        sizes[size],
        className
      )}
      style={{ background: color }}
      onClick={onClick}
      title={color}
    >
      {selected && (
        <Check
          className="absolute inset-0 m-auto h-3 w-3"
          style={{ color: parseInt(color.replace("#", ""), 16) > 0x888888 ? "#000" : "#fff" }}
        />
      )}
    </button>
  );
}

// Palette group
interface ColorPaletteProps {
  colors: string[];
  value?: string;
  onChange?: (color: string) => void;
  className?: string;
}

export function ColorPalette({ colors, value, onChange, className }: ColorPaletteProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {colors.map((c) => (
        <ColorSwatch
          key={c}
          color={c}
          selected={value === c}
          onClick={() => onChange?.(c)}
        />
      ))}
    </div>
  );
}
