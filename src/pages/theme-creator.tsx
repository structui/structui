import React, { useState, useCallback } from "react";
import { Container } from "@/src/components/layout/container";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Snippet } from "@/src/components/ui/snippet";
import { Badge } from "@/src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { Slider } from "@/src/components/ui/slider";
import {
  Palette, RotateCcw, Download, Eye, Code2, Shuffle,
  Sun, Moon, Copy, Check
} from "lucide-react";

// ─── Default Themes ────────────────────────────────────────────────────────────
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
    accent: "#ffe4e6",
    "accent-foreground": "#e11d48",
    border: "#fecdd3",
    destructive: "#991b1b",
    "destructive-foreground": "#ffffff",
    radius: "0.75rem",
  },
  emerald: {
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
    accent: "#dcfce7",
    "accent-foreground": "#15803d",
    border: "#bbf7d0",
    destructive: "#dc2626",
    "destructive-foreground": "#ffffff",
    radius: "0.5rem",
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
    accent: "#f3e8ff",
    "accent-foreground": "#7c3aed",
    border: "#e9d5ff",
    destructive: "#dc2626",
    "destructive-foreground": "#ffffff",
    radius: "0.75rem",
  },
  dark: {
    background: "#0f1115",
    foreground: "#e2e4e9",
    card: "#14161a",
    "card-foreground": "#e2e4e9",
    primary: "#e2e4e9",
    "primary-foreground": "#0f1115",
    secondary: "#1b1e23",
    "secondary-foreground": "#e2e4e9",
    muted: "#1b1e23",
    "muted-foreground": "#9ca3af",
    accent: "#1b1e23",
    "accent-foreground": "#e2e4e9",
    border: "#1b1e23",
    destructive: "#7f1d1d",
    "destructive-foreground": "#e2e4e9",
    radius: "0.25rem",
  },
};

type ThemeKey = keyof typeof PRESETS.default;

const COLOR_GROUPS = [
  {
    label: "Background",
    keys: ["background", "foreground"] as ThemeKey[],
  },
  {
    label: "Card",
    keys: ["card", "card-foreground"] as ThemeKey[],
  },
  {
    label: "Primary",
    keys: ["primary", "primary-foreground"] as ThemeKey[],
  },
  {
    label: "Secondary",
    keys: ["secondary", "secondary-foreground"] as ThemeKey[],
  },
  {
    label: "Muted",
    keys: ["muted", "muted-foreground"] as ThemeKey[],
  },
  {
    label: "Accent",
    keys: ["accent", "accent-foreground"] as ThemeKey[],
  },
  {
    label: "Borders",
    keys: ["border"] as ThemeKey[],
  },
  {
    label: "Destructive",
    keys: ["destructive", "destructive-foreground"] as ThemeKey[],
  },
];

export const ThemeCreatorPage = () => {
  const [theme, setTheme] = useState<Record<ThemeKey, string>>(PRESETS.default as any);
  const [activePreset, setActivePreset] = useState("default");
  const [copied, setCopied] = useState(false);
  const [radiusPx, setRadiusPx] = useState(4); // in px

  const handleColorChange = useCallback((key: ThemeKey, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
    setActivePreset("custom");
  }, []);

  const applyPreset = (name: string) => {
    setTheme(PRESETS[name] as any);
    setActivePreset(name);
    // Sync radius slider
    const r = PRESETS[name].radius;
    const px = parseFloat(r) * 16;
    setRadiusPx(isNaN(px) ? 4 : px);
  };

  const handleRadiusChange = (val: number[]) => {
    const px = val[0];
    setRadiusPx(px);
    setTheme(prev => ({ ...prev, radius: `${(px / 16).toFixed(3)}rem` }));
    setActivePreset("custom");
  };

  const cssOutput = `:root {
${Object.entries(theme)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n")}
}`;

  const copyCSS = () => {
    navigator.clipboard.writeText(cssOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isColor = (key: string) => key !== "radius";

  return (
    <div className="py-12 min-h-screen">
      <Container>
        {/* Header */}
        <div className="mb-10 space-y-3">
          <Badge variant="secondary" className="px-3 rounded-full flex w-fit items-center gap-2">
            <Palette className="w-3 h-3" /> Theme Creator
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">Create Your Theme</h1>
          <p className="text-muted-foreground max-w-xl">
            Customize every design token and instantly see the result. Export the CSS variables to use in your project.
          </p>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-2 mb-8">
          {Object.keys(PRESETS).map(name => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all capitalize ${
                activePreset === name
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {name}
            </button>
          ))}
          {activePreset === "custom" && (
            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-accent text-accent-foreground border border-border">
              custom
            </span>
          )}
          <button
            onClick={() => applyPreset("default")}
            className="px-3 py-1.5 rounded-full text-xs font-medium border border-border bg-transparent text-muted-foreground hover:text-foreground flex items-center gap-1.5 ml-auto"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Controls Panel ── */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="sticky top-20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Palette className="w-4 h-4" /> Design Tokens
                </CardTitle>
                <CardDescription className="text-xs">Adjust colors and border radius</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5 max-h-[65vh] overflow-y-auto pr-2">
                {COLOR_GROUPS.map(group => (
                  <div key={group.label} className="space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">{group.label}</p>
                    {group.keys.map(key => (
                      <div key={key} className="flex items-center justify-between gap-3">
                        <label className="text-xs text-muted-foreground truncate font-mono">--{key}</label>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-mono text-zinc-400 hidden sm:block w-14 text-right tabular-nums">
                            {theme[key]}
                          </span>
                          <div className="relative w-7 h-7 rounded-full border border-border overflow-hidden shadow-sm hover:scale-110 transition-transform cursor-pointer">
                            <input
                              type="color"
                              value={isColor(key) ? theme[key] : "#000000"}
                              onChange={e => handleColorChange(key, e.target.value)}
                              className="absolute -inset-1 w-12 h-12 cursor-pointer opacity-0"
                              title={key}
                            />
                            <div className="absolute inset-0 rounded-full" style={{ background: theme[key] }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Radius Slider */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Border Radius</p>
                    <span className="text-[10px] font-mono text-muted-foreground">{radiusPx}px</span>
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
              </CardContent>
            </Card>
          </div>

          {/* ── Preview + Export ── */}
          <div className="lg:col-span-8 space-y-6">
            <Tabs defaultValue="preview">
              <TabsList>
                <TabsTrigger value="preview" className="gap-1.5"><Eye className="w-3.5 h-3.5" /> Preview</TabsTrigger>
                <TabsTrigger value="code" className="gap-1.5"><Code2 className="w-3.5 h-3.5" /> Export CSS</TabsTrigger>
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                {/* Live Preview */}
                <div
                  className="p-8 rounded-2xl border space-y-6 transition-all duration-300"
                  style={{
                    backgroundColor: theme.background,
                    color: theme.foreground,
                    borderColor: theme.border,
                    borderRadius: theme.radius,
                  }}
                >
                  {/* Navbar preview */}
                  <div
                    className="flex items-center justify-between px-4 py-3 rounded-xl border"
                    style={{ backgroundColor: theme.card, borderColor: theme.border, borderRadius: theme.radius }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md" style={{ backgroundColor: theme.primary, borderRadius: theme.radius }} />
                      <span className="text-sm font-bold" style={{ color: theme["card-foreground"] }}>MyApp</span>
                    </div>
                    <div className="flex gap-3">
                      {["Dashboard", "Analytics", "Settings"].map(n => (
                        <span key={n} className="text-xs" style={{ color: theme["muted-foreground"] }}>{n}</span>
                      ))}
                    </div>
                    <button
                      className="px-3 py-1.5 text-xs font-medium rounded-lg"
                      style={{ backgroundColor: theme.primary, color: theme["primary-foreground"], borderRadius: theme.radius }}
                    >
                      Sign In
                    </button>
                  </div>

                  {/* Cards row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Total Users", value: "12,482", delta: "+8.2%" },
                      { label: "Revenue", value: "$48,290", delta: "+14.1%" },
                      { label: "Active Now", value: "1,893", delta: "+3.4%" },
                    ].map(stat => (
                      <div
                        key={stat.label}
                        className="p-4 rounded-xl border"
                        style={{ backgroundColor: theme.card, borderColor: theme.border, borderRadius: theme.radius }}
                      >
                        <p className="text-xs mb-1" style={{ color: theme["muted-foreground"] }}>{stat.label}</p>
                        <p className="text-xl font-bold" style={{ color: theme["card-foreground"] }}>{stat.value}</p>
                        <p className="text-xs mt-1 font-medium" style={{ color: theme.primary }}>{stat.delta}</p>
                      </div>
                    ))}
                  </div>

                  {/* Form elements preview */}
                  <div
                    className="p-5 rounded-xl border space-y-4"
                    style={{ backgroundColor: theme.card, borderColor: theme.border, borderRadius: theme.radius }}
                  >
                    <p className="text-sm font-semibold" style={{ color: theme["card-foreground"] }}>Component Preview</p>
                    <div className="flex flex-wrap gap-3">
                      <button
                        className="px-4 py-2 text-sm font-medium"
                        style={{ backgroundColor: theme.primary, color: theme["primary-foreground"], borderRadius: theme.radius }}
                      >Primary</button>
                      <button
                        className="px-4 py-2 text-sm font-medium border"
                        style={{ borderColor: theme.border, color: theme.foreground, borderRadius: theme.radius, backgroundColor: theme.secondary }}
                      >Secondary</button>
                      <button
                        className="px-4 py-2 text-sm font-medium border"
                        style={{ borderColor: theme.destructive, color: theme.destructive, borderRadius: theme.radius, backgroundColor: "transparent" }}
                      >Destructive</button>
                    </div>
                    <div className="flex gap-3">
                      <input
                        className="flex-1 px-3 py-2 text-sm border outline-none"
                        placeholder="Text input..."
                        readOnly
                        style={{
                          backgroundColor: theme.background,
                          borderColor: theme.border,
                          color: theme.foreground,
                          borderRadius: theme.radius,
                        }}
                      />
                      <span
                        className="px-2.5 py-1 text-xs font-semibold rounded-full self-center"
                        style={{ backgroundColor: theme["accent"], color: theme["accent-foreground"] }}
                      >Badge</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: theme.primary, color: theme["primary-foreground"] }}>JD</div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: theme["card-foreground"] }}>John Doe</p>
                        <p className="text-[10px]" style={{ color: theme["muted-foreground"] }}>john@example.com</p>
                      </div>
                      <div className="ml-auto w-9 h-5 rounded-full relative" style={{ backgroundColor: theme.primary }}>
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Copy and paste into your global CSS file.</p>
                    <Button size="sm" variant="outline" className="gap-1.5" onClick={copyCSS}>
                      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied!" : "Copy CSS"}
                    </Button>
                  </div>
                  <Snippet code={cssOutput} language="css" filename="globals.css" />
                  <p className="text-xs text-muted-foreground">
                    Paste these variables into the <code className="font-mono bg-muted px-1 py-0.5 rounded">:root</code> selector of your CSS file, or wrap in <code className="font-mono bg-muted px-1 py-0.5 rounded">.custom-theme</code> for scoped theming.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Container>
    </div>
  );
};
