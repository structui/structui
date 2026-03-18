"use client";

import { useCallback, useState } from "react";
import {
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  Monitor,
  Moon,
  Palette,
  RotateCcw,
  Shuffle,
  Smartphone,
  Sun,
  Tablet,
} from "lucide-react";

import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Slider } from "@/src/components/ui/slider";
import { Snippet } from "@/src/components/ui/snippet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { cn } from "@/src/lib/utils";

// ─── Presets ──────────────────────────────────────────────────────────────────

const PRESETS: Record<string, Record<string, string>> = {
  default: {
    background: "#f7f8fa",
    foreground: "#1a1a1a",
    card: "#ffffff",
    "card-foreground": "#1a1a1a",
    primary: "#1a1a1a",
    "primary-foreground": "#f7f8fa",
    secondary: "#e2e4e9",
    "secondary-foreground": "#1a1a1a",
    muted: "#e2e4e9",
    "muted-foreground": "#6b7280",
    accent: "#e2e4e9",
    "accent-foreground": "#1a1a1a",
    border: "#e2e4e9",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    radius: "0.25rem",
  },
  midnight: {
    background: "#0a0a0f",
    foreground: "#e8e8f0",
    card: "#111118",
    "card-foreground": "#e8e8f0",
    primary: "#6366f1",
    "primary-foreground": "#ffffff",
    secondary: "#1e1e2e",
    "secondary-foreground": "#e8e8f0",
    muted: "#1e1e2e",
    "muted-foreground": "#8b8ca8",
    accent: "#1e1e2e",
    "accent-foreground": "#6366f1",
    border: "#1e1e2e",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    radius: "0.5rem",
  },
  ocean: {
    background: "#f0f9ff",
    foreground: "#0c2340",
    card: "#ffffff",
    "card-foreground": "#0c2340",
    primary: "#0ea5e9",
    "primary-foreground": "#ffffff",
    secondary: "#e0f2fe",
    "secondary-foreground": "#0c2340",
    muted: "#e0f2fe",
    "muted-foreground": "#0369a1",
    accent: "#bae6fd",
    "accent-foreground": "#0284c7",
    border: "#bae6fd",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    radius: "0.5rem",
  },
  forest: {
    background: "#f0fdf4",
    foreground: "#052e16",
    card: "#ffffff",
    "card-foreground": "#052e16",
    primary: "#16a34a",
    "primary-foreground": "#ffffff",
    secondary: "#dcfce7",
    "secondary-foreground": "#052e16",
    muted: "#dcfce7",
    "muted-foreground": "#166534",
    accent: "#bbf7d0",
    "accent-foreground": "#15803d",
    border: "#bbf7d0",
    destructive: "#dc2626",
    "destructive-foreground": "#ffffff",
    radius: "0.75rem",
  },
  rose: {
    background: "#fff1f2",
    foreground: "#1c0c0c",
    card: "#ffffff",
    "card-foreground": "#1c0c0c",
    primary: "#e11d48",
    "primary-foreground": "#ffffff",
    secondary: "#ffe4e6",
    "secondary-foreground": "#9f1239",
    muted: "#ffe4e6",
    "muted-foreground": "#9f1239",
    accent: "#fecdd3",
    "accent-foreground": "#e11d48",
    border: "#fecdd3",
    destructive: "#991b1b",
    "destructive-foreground": "#ffffff",
    radius: "0.75rem",
  },
  violet: {
    background: "#faf5ff",
    foreground: "#1e0a3c",
    card: "#ffffff",
    "card-foreground": "#1e0a3c",
    primary: "#7c3aed",
    "primary-foreground": "#ffffff",
    secondary: "#f3e8ff",
    "secondary-foreground": "#1e0a3c",
    muted: "#f3e8ff",
    "muted-foreground": "#6d28d9",
    accent: "#e9d5ff",
    "accent-foreground": "#7c3aed",
    border: "#e9d5ff",
    destructive: "#dc2626",
    "destructive-foreground": "#ffffff",
    radius: "0.75rem",
  },
  amber: {
    background: "#fffbeb",
    foreground: "#1c1000",
    card: "#ffffff",
    "card-foreground": "#1c1000",
    primary: "#d97706",
    "primary-foreground": "#ffffff",
    secondary: "#fef3c7",
    "secondary-foreground": "#1c1000",
    muted: "#fef3c7",
    "muted-foreground": "#92400e",
    accent: "#fde68a",
    "accent-foreground": "#d97706",
    border: "#fde68a",
    destructive: "#dc2626",
    "destructive-foreground": "#ffffff",
    radius: "0.5rem",
  },
  slate: {
    background: "#f8fafc",
    foreground: "#0f172a",
    card: "#ffffff",
    "card-foreground": "#0f172a",
    primary: "#3b82f6",
    "primary-foreground": "#ffffff",
    secondary: "#f1f5f9",
    "secondary-foreground": "#0f172a",
    muted: "#f1f5f9",
    "muted-foreground": "#64748b",
    accent: "#eff6ff",
    "accent-foreground": "#1d4ed8",
    border: "#e2e8f0",
    destructive: "#ef4444",
    "destructive-foreground": "#ffffff",
    radius: "0.5rem",
  },
};

type ThemeValues = Record<string, string>;
type Viewport = "desktop" | "tablet" | "mobile";

const COLOR_GROUPS = [
  { label: "Background", keys: ["background", "foreground"] },
  { label: "Card", keys: ["card", "card-foreground"] },
  { label: "Primary", keys: ["primary", "primary-foreground"] },
  { label: "Secondary", keys: ["secondary", "secondary-foreground"] },
  { label: "Muted", keys: ["muted", "muted-foreground"] },
  { label: "Accent", keys: ["accent", "accent-foreground"] },
  { label: "Border", keys: ["border"] },
  { label: "Destructive", keys: ["destructive", "destructive-foreground"] },
];

const PRESET_META: Record<string, { label: string; emoji: string }> = {
  default: { label: "Default", emoji: "⬜" },
  midnight: { label: "Midnight", emoji: "🌙" },
  ocean: { label: "Ocean", emoji: "🌊" },
  forest: { label: "Forest", emoji: "🌿" },
  rose: { label: "Rose", emoji: "🌹" },
  violet: { label: "Violet", emoji: "💜" },
  amber: { label: "Amber", emoji: "🟡" },
  slate: { label: "Slate", emoji: "🔷" },
};

const VIEWPORT_WIDTHS: Record<Viewport, string> = {
  desktop: "100%",
  tablet: "768px",
  mobile: "375px",
};

function randomHex(): string {
  return (
    "#" +
    Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padStart(6, "0")
  );
}

function randomizeTheme(base: ThemeValues): ThemeValues {
  const hue = Math.floor(Math.random() * 360);
  const primaryHSL = `hsl(${hue}, 70%, 50%)`;
  const primaryHex = hslToHex(hue, 70, 50);
  const bgLightness = 95 + Math.random() * 4;
  return {
    ...base,
    primary: primaryHex,
    "accent-foreground": primaryHex,
    background: hslToHex(hue, 15, bgLightness),
    muted: hslToHex(hue, 20, 93),
    "muted-foreground": hslToHex(hue, 10, 45),
    accent: hslToHex(hue, 30, 88),
    border: hslToHex(hue, 20, 88),
    secondary: hslToHex(hue, 20, 93),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

// ─── Preview Component ────────────────────────────────────────────────────────

function ThemePreview({ theme, viewport }: { theme: ThemeValues; viewport: Viewport }) {
  const s = (key: string) => theme[key] ?? "#000";
  const br = theme.radius ?? "0.5rem";

  return (
    <div
      className="overflow-hidden transition-all duration-300"
      style={{ maxWidth: VIEWPORT_WIDTHS[viewport], margin: "0 auto" }}
    >
      <div
        className="space-y-4 p-6 transition-all duration-300"
        style={{ backgroundColor: s("background"), color: s("foreground") }}
      >
        {/* Navbar */}
        <div
          className="flex items-center justify-between px-4 py-3 border"
          style={{
            backgroundColor: s("card"),
            borderColor: s("border"),
            borderRadius: br,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: s("primary"),
                color: s("primary-foreground"),
                borderRadius: br,
              }}
            >
              S
            </div>
            <span className="text-sm font-bold" style={{ color: s("card-foreground") }}>
              SUI App
            </span>
          </div>
          <div className="hidden sm:flex gap-4 text-xs" style={{ color: s("muted-foreground") }}>
            {["Dashboard", "Analytics", "Settings"].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
          <button
            className="px-3 py-1.5 text-xs font-medium"
            style={{
              backgroundColor: s("primary"),
              color: s("primary-foreground"),
              borderRadius: br,
            }}
          >
            Sign In
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Users", value: "12,482", delta: "+8.2%" },
            { label: "Revenue", value: "$48k", delta: "+14%" },
            { label: "Active", value: "1,893", delta: "+3%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-3 border"
              style={{
                backgroundColor: s("card"),
                borderColor: s("border"),
                borderRadius: br,
              }}
            >
              <p className="text-[10px] mb-1" style={{ color: s("muted-foreground") }}>
                {stat.label}
              </p>
              <p className="text-base font-bold" style={{ color: s("card-foreground") }}>
                {stat.value}
              </p>
              <p className="text-[10px] font-medium" style={{ color: s("primary") }}>
                {stat.delta}
              </p>
            </div>
          ))}
        </div>

        {/* Content area */}
        <div
          className="p-4 border space-y-4"
          style={{
            backgroundColor: s("card"),
            borderColor: s("border"),
            borderRadius: br,
          }}
        >
          <p className="text-sm font-semibold" style={{ color: s("card-foreground") }}>
            Component Preview
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              className="px-4 py-2 text-xs font-medium"
              style={{
                backgroundColor: s("primary"),
                color: s("primary-foreground"),
                borderRadius: br,
              }}
            >
              Primary
            </button>
            <button
              className="px-4 py-2 text-xs font-medium border"
              style={{
                borderColor: s("border"),
                color: s("foreground"),
                backgroundColor: s("secondary"),
                borderRadius: br,
              }}
            >
              Secondary
            </button>
            <button
              className="px-4 py-2 text-xs font-medium border"
              style={{
                borderColor: s("destructive"),
                color: s("destructive"),
                backgroundColor: "transparent",
                borderRadius: br,
              }}
            >
              Destructive
            </button>
            <span
              className="px-2.5 py-1 text-[10px] font-semibold self-center"
              style={{
                backgroundColor: s("accent"),
                color: s("accent-foreground"),
                borderRadius: "9999px",
              }}
            >
              Badge
            </span>
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 text-xs border outline-none"
              placeholder="Search components..."
              readOnly
              style={{
                backgroundColor: s("background"),
                borderColor: s("border"),
                color: s("foreground"),
                borderRadius: br,
              }}
            />
            <button
              className="px-3 py-2 text-xs font-medium"
              style={{
                backgroundColor: s("primary"),
                color: s("primary-foreground"),
                borderRadius: br,
              }}
            >
              Go
            </button>
          </div>

          {/* User row */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center text-xs font-bold shrink-0"
              style={{
                backgroundColor: s("primary"),
                color: s("primary-foreground"),
                borderRadius: "9999px",
              }}
            >
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: s("card-foreground") }}>
                John Doe
              </p>
              <p className="text-[10px] truncate" style={{ color: s("muted-foreground") }}>
                john@example.com
              </p>
            </div>
            {/* Toggle */}
            <div
              className="w-9 h-5 relative shrink-0"
              style={{ backgroundColor: s("primary"), borderRadius: "9999px" }}
            >
              <div className="w-4 h-4 bg-white absolute right-0.5 top-0.5 shadow-sm" style={{ borderRadius: "9999px" }} />
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-2">
            {[
              { label: "Performance", pct: 87 },
              { label: "Accessibility", pct: 94 },
              { label: "SEO", pct: 78 },
            ].map((item) => (
              <div key={item.label} className="space-y-1">
                <div className="flex justify-between text-[10px]" style={{ color: s("muted-foreground") }}>
                  <span>{item.label}</span>
                  <span>{item.pct}%</span>
                </div>
                <div
                  className="h-1.5 w-full overflow-hidden"
                  style={{ backgroundColor: s("muted"), borderRadius: "9999px" }}
                >
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${item.pct}%`,
                      backgroundColor: s("primary"),
                      borderRadius: "9999px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom cards */}
        <div className="grid grid-cols-2 gap-3">
          <div
            className="p-3 border space-y-2"
            style={{ backgroundColor: s("secondary"), borderColor: s("border"), borderRadius: br }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: s("muted-foreground") }}>
              Notifications
            </p>
            {["New message", "Build complete", "PR approved"].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s("primary") }} />
                <span className="text-[10px]" style={{ color: s("foreground") }}>{n}</span>
              </div>
            ))}
          </div>
          <div
            className="p-3 border space-y-2"
            style={{ backgroundColor: s("accent"), borderColor: s("border"), borderRadius: br }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: s("muted-foreground") }}>
              Quick Actions
            </p>
            {["Create project", "Invite team", "View docs"].map((n) => (
              <button
                key={n}
                className="w-full text-left text-[10px] px-2 py-1 transition-opacity hover:opacity-70"
                style={{
                  color: s("accent-foreground"),
                  backgroundColor: "transparent",
                }}
              >
                → {n}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ThemeCreatorClient() {
  const [theme, setTheme] = useState<ThemeValues>(PRESETS.default);
  const [activePreset, setActivePreset] = useState("default");
  const [copied, setCopied] = useState(false);
  const [radiusPx, setRadiusPx] = useState(4);
  const [viewport, setViewport] = useState<Viewport>("desktop");

  const handleColorChange = useCallback((key: string, value: string) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
    setActivePreset("custom");
  }, []);

  const applyPreset = (name: string) => {
    const preset = PRESETS[name];
    if (!preset) return;
    setTheme(preset);
    setActivePreset(name);
    const px = parseFloat(preset.radius) * 16;
    setRadiusPx(isNaN(px) ? 4 : px);
  };

  const handleRadiusChange = (val: number[]) => {
    const px = val[0];
    setRadiusPx(px);
    setTheme((prev) => ({ ...prev, radius: `${(px / 16).toFixed(3)}rem` }));
    setActivePreset("custom");
  };

  const handleRandomize = () => {
    const randomized = randomizeTheme(theme);
    setTheme(randomized);
    setActivePreset("custom");
  };

  const cssOutput = `:root {\n${Object.entries(theme)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n")}\n}`;

  const tailwindConfig = `// tailwind.config.ts
theme: {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      border: "var(--border)",
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
    },
    borderRadius: {
      DEFAULT: "var(--radius)",
    },
  },
}`;

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCSS = () => {
    const blob = new Blob([cssOutput], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "theme.css";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex w-fit items-center gap-1.5 rounded-full px-3">
              <Palette className="h-3 w-3" />
              Theme Creator
            </Badge>
            <Badge variant="outline" className="rounded-full px-3 text-xs text-muted-foreground">
              v2
            </Badge>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Design Your Theme</h1>
          <p className="max-w-xl text-muted-foreground">
            Customize every design token visually and instantly preview how it looks across
            components. Export CSS variables or Tailwind config for your project.
          </p>
        </div>

        {/* Preset chips */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {Object.entries(PRESET_META).map(([name, meta]) => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                activePreset === name
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-muted/50 text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              <span>{meta.emoji}</span>
              {meta.label}
            </button>
          ))}
          {activePreset === "custom" && (
            <span className="flex items-center gap-1.5 rounded-full border border-border bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground">
              ✦ Custom
            </span>
          )}
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-full gap-1.5 text-xs"
              onClick={handleRandomize}
            >
              <Shuffle className="h-3 w-3" />
              Randomize
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full gap-1.5 text-xs"
              onClick={() => applyPreset("default")}
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* ── Controls ── */}
          <div className="lg:col-span-4">
            <Card className="sticky top-14">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Palette className="h-4 w-4" />
                  Design Tokens
                </CardTitle>
                <CardDescription className="text-xs">
                  Adjust colors and border radius
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[calc(100vh-280px)] space-y-5 overflow-y-auto pr-2">
                {COLOR_GROUPS.map((group) => (
                  <div key={group.label} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      {group.label}
                    </p>
                    {group.keys.map((key) => (
                      <div key={key} className="flex items-center justify-between gap-3">
                        <label className="truncate font-mono text-xs text-muted-foreground">
                          --{key}
                        </label>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="hidden w-16 text-right font-mono text-[10px] tabular-nums text-zinc-400 sm:block">
                            {theme[key]}
                          </span>
                          <div className="relative h-7 w-7 cursor-pointer overflow-hidden rounded-full border border-border shadow-sm transition-transform hover:scale-110">
                            <input
                              type="color"
                              value={theme[key] ?? "#000000"}
                              onChange={(e) => handleColorChange(key, e.target.value)}
                              className="absolute -inset-1 h-12 w-12 cursor-pointer opacity-0"
                            />
                            <div
                              className="absolute inset-0 rounded-full"
                              style={{ background: theme[key] }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Radius Slider */}
                <div className="space-y-2 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                      Border Radius
                    </p>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {radiusPx}px ({theme.radius})
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={24}
                    step={1}
                    value={[radiusPx]}
                    onValueChange={handleRadiusChange}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground/50">
                    <span>Sharp</span>
                    <span>Rounded</span>
                    <span>Pill</span>
                  </div>
                </div>

                {/* Color palette display */}
                <div className="space-y-2 border-t pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                    Palette
                  </p>
                  <div className="grid grid-cols-8 gap-1">
                    {Object.entries(theme)
                      .filter(([k]) => k !== "radius")
                      .map(([key, val]) => (
                        <div
                          key={key}
                          className="h-6 w-6 rounded cursor-pointer border border-border/50 transition-transform hover:scale-110"
                          style={{ backgroundColor: val }}
                          title={`--${key}: ${val}`}
                          onClick={() => {
                            const input = document.createElement("input");
                            input.type = "color";
                            input.value = val;
                            input.addEventListener("change", (e) =>
                              handleColorChange(key, (e.target as HTMLInputElement).value),
                            );
                            input.click();
                          }}
                        />
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Preview + Export ── */}
          <div className="lg:col-span-8 space-y-4">
            <Tabs defaultValue="preview">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <TabsList>
                  <TabsTrigger value="preview" className="gap-1.5 text-xs">
                    <Eye className="h-3.5 w-3.5" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="css" className="gap-1.5 text-xs">
                    <Code2 className="h-3.5 w-3.5" />
                    CSS Variables
                  </TabsTrigger>
                  <TabsTrigger value="tailwind" className="gap-1.5 text-xs">
                    <Code2 className="h-3.5 w-3.5" />
                    Tailwind Config
                  </TabsTrigger>
                </TabsList>

                {/* Viewport switcher */}
                <div className="flex items-center gap-1 rounded-full border border-border/70 p-1">
                  {(
                    [
                      { v: "desktop", icon: Monitor },
                      { v: "tablet", icon: Tablet },
                      { v: "mobile", icon: Smartphone },
                    ] as { v: Viewport; icon: React.FC<{ className?: string }> }[]
                  ).map(({ v, icon: Icon }) => (
                    <button
                      key={v}
                      onClick={() => setViewport(v)}
                      className={cn(
                        "rounded-full p-1.5 transition-colors",
                        viewport === v
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </button>
                  ))}
                </div>
              </div>

              <TabsContent value="preview" className="mt-4">
                <Card className="overflow-hidden border-border/60">
                  <CardContent className="p-0">
                    <div
                      className="overflow-auto transition-all duration-500"
                      style={{ minHeight: "500px" }}
                    >
                      <ThemePreview theme={theme} viewport={viewport} />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="css" className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Copy and paste into your global CSS file.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-xs rounded-full"
                      onClick={downloadCSS}
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 gap-1.5 text-xs rounded-full"
                      onClick={copyCSS}
                    >
                      {copied ? (
                        <Check className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      {copied ? "Copied!" : "Copy CSS"}
                    </Button>
                  </div>
                </div>
                <Snippet code={cssOutput} language="css" filename="globals.css" />
                <p className="text-xs text-muted-foreground">
                  Paste into the{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono">:root</code> selector.
                  For dark mode, add a second block under{" "}
                  <code className="rounded bg-muted px-1 py-0.5 font-mono">.dark</code>.
                </p>
              </TabsContent>

              <TabsContent value="tailwind" className="mt-4 space-y-4">
                <p className="text-sm text-muted-foreground">
                  Reference CSS variables in your Tailwind config for full integration.
                </p>
                <Snippet code={tailwindConfig} language="typescript" filename="tailwind.config.ts" />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
