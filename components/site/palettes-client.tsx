"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ColorToken {
  name: string;
  var: string;
  light: string;
  dark?: string;
  grey?: string;
}

interface Palette {
  id: string;
  name: string;
  author?: string;
  description: string;
  tags: string[];
  tokens: ColorToken[];
  css: string;
  designPattern: string;
}

// ─── Helper ─────────────────────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)",
        background: "var(--bg-secondary)", color: copied ? "var(--accent)" : "var(--text-secondary)",
        fontSize: 12, cursor: "pointer", fontWeight: 500,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied!" : label}
    </button>
  );
}

function Swatch({ token, theme }: { token: ColorToken; theme: "light" | "dark" | "grey" }) {
  const value = theme === "light" ? token.light : theme === "dark" ? (token.dark ?? token.light) : (token.grey ?? token.dark ?? token.light);
  const isTransparent = value.includes("rgba") || value.includes("transparent");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: "1px solid var(--border)" }}>
      <div style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: value,
        border: isTransparent ? "1px dashed var(--border)" : "1px solid rgba(255,255,255,.06)",
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ color: "var(--text-primary)", fontSize: 12, fontWeight: 600, margin: 0 }}>{token.name}</p>
        <p style={{ color: "var(--text-muted)", fontSize: 11, margin: "1px 0 0", fontFamily: "monospace" }}>{token.var}</p>
      </div>
      <span style={{ color: "var(--text-secondary)", fontSize: 11, fontFamily: "monospace", flexShrink: 0 }}>{value}</span>
    </div>
  );
}

// ─── Palette Preview UIs ─────────────────────────────────────────────────────

function PalettePreview({ palette, theme }: { palette: Palette; theme: "light" | "dark" | "grey" }) {
  const t = (key: string) => {
    const tok = palette.tokens.find(t => t.name === key);
    if (!tok) return "#888";
    return theme === "light" ? tok.light : theme === "dark" ? (tok.dark ?? tok.light) : (tok.grey ?? tok.dark ?? tok.light);
  };

  const bg = t("bg-primary");
  const bgSec = t("bg-secondary");
  const border = t("border");
  const textPrimary = t("text-primary");
  const textSecondary = t("text-secondary");
  const textMuted = t("text-muted");
  const accent = t("accent");
  const accentHover = t("accent-hover");
  const accentSubtle = t("accent-subtle");

  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 16, overflow: "hidden", fontFamily: "inherit" }}>
      {/* Navbar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", background: bgSec, borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: accent }} />
          <span style={{ color: textPrimary, fontSize: 13, fontWeight: 700, fontFamily: "var(--font-merriweather), serif" }}>Brand</span>
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["Home", "Docs", "Blog"].map(n => <span key={n} style={{ color: textMuted, fontSize: 12 }}>{n}</span>)}
        </div>
        <div style={{ background: accent, color: "var(--text-primary)", borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 600 }}>Get started</div>
      </div>

      {/* Hero */}
      <div style={{ padding: "28px 20px 20px", background: bg }}>
        <div style={{ display: "inline-block", background: accentSubtle, border: `1px solid ${accentHover}30`, borderRadius: 99, padding: "3px 12px", fontSize: 11, color: accent, marginBottom: 10, fontWeight: 600 }}>
          Design System
        </div>
        <h2 style={{ color: textPrimary, fontSize: 20, fontWeight: 800, fontFamily: "var(--font-merriweather), serif", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
          {palette.name}
        </h2>
        <p style={{ color: textSecondary, fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>
          Consistent, beautiful, and accessible UI tokens for your design system.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ background: accent, color: "var(--text-primary)", borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 600 }}>Try it free</div>
          <div style={{ background: "transparent", color: textSecondary, border: `1px solid ${border}`, borderRadius: 8, padding: "8px 16px", fontSize: 12 }}>View docs</div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: "0 16px 20px" }}>
        {[
          { label: "Components", value: "140+", icon: "⬡" },
          { label: "Themes", value: "3", icon: "◑" },
          { label: "Tokens", value: "24", icon: "◈" },
        ].map(c => (
          <div key={c.label} style={{ background: bgSec, border: `1px solid ${border}`, borderRadius: 12, padding: "14px 12px" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
            <p style={{ color: textPrimary, fontWeight: 700, fontFamily: "var(--font-merriweather), serif", fontSize: 16, margin: 0 }}>{c.value}</p>
            <p style={{ color: textMuted, fontSize: 11, margin: "2px 0 0" }}>{c.label}</p>
          </div>
        ))}
      </div>

      {/* Input + button row */}
      <div style={{ padding: "0 16px 18px", display: "flex", gap: 8 }}>
        <input
          readOnly
          value="your@email.com"
          style={{ flex: 1, background: bgSec, border: `1px solid ${border}`, borderRadius: 8, padding: "8px 12px", color: textMuted, fontSize: 12, outline: "none" }}
        />
        <div style={{ background: accent, color: "var(--text-primary)", borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>Subscribe</div>
      </div>
    </div>
  );
}

// ─── Palette Definitions ─────────────────────────────────────────────────────

const PALETTES: Palette[] = [
  {
    id: "lyra",
    name: "Lyra",
    author: "User",
    description: "A professional dual-tone palette with cool blue accents, balanced for both light and dark environments.",
    tags: ["blue", "neutral", "professional", "light", "dark", "grey"],
    tokens: [
      { name: "bg-primary", var: "--bg-primary", light: "#FFFFFF", dark: "#0F0F10", grey: "#1B1E23" },
      { name: "bg-secondary", var: "--bg-secondary", light: "#F3F4F6", dark: "#1A1A1D", grey: "#23272C" },
      { name: "border", var: "--border", light: "#E5E7EB", dark: "#2A2A2E", grey: "#333840" },
      { name: "text-primary", var: "--text-primary", light: "var(--bg-primary)827", dark: "#EAEAEA", grey: "#F3F4F6" },
      { name: "text-secondary", var: "--text-secondary", light: "#4B5563", dark: "#A1A1AA", grey: "#A9B2C0" },
      { name: "text-muted", var: "--text-muted", light: "#9CA3AF", dark: "#6B7280", grey: "#6F7A89" },
      { name: "accent", var: "--accent", light: "#2D5FA6", dark: "#5B8ECD", grey: "#5B8ECD" },
      { name: "accent-hover", var: "--accent-hover", light: "#3B72BF", dark: "#6B9ED8", grey: "#6B9ED8" },
      { name: "accent-subtle", var: "--accent-subtle", light: "rgba(45,95,166,0.10)", dark: "rgba(91,142,205,0.12)", grey: "rgba(91,142,205,0.12)" },
      { name: "accent-ring", var: "--accent-ring", light: "rgba(45,95,166,0.25)", dark: "rgba(91,142,205,0.25)", grey: "rgba(91,142,205,0.25)" },
    ],
    css: `@layer base {
  :root {
    --bg-primary: #FFFFFF;
    --bg-secondary: #F3F4F6;
    --border: #E5E7EB;
    --text-primary: var(--bg-primary)827;
    --text-secondary: #4B5563;
    --text-muted: #9CA3AF;
    --accent: #2D5FA6;
    --accent-hover: #3B72BF;
    --accent-subtle: rgba(45, 95, 166, 0.10);
    --accent-ring: rgba(45, 95, 166, 0.25);
  }

  [data-theme="dark"] {
    --bg-primary: #0F0F10;
    --bg-secondary: #1A1A1D;
    --border: #2A2A2E;
    --text-primary: #EAEAEA;
    --text-secondary: #A1A1AA;
    --text-muted: #6B7280;
    --accent: #5B8ECD;
    --accent-hover: #6B9ED8;
    --accent-subtle: rgba(91, 142, 205, 0.12);
    --accent-ring: rgba(91, 142, 205, 0.25);
  }

  [data-theme="grey"] {
    --bg-primary: #1B1E23;
    --bg-secondary: #23272C;
    --border: #333840;
    --text-primary: #F3F4F6;
    --text-secondary: #A9B2C0;
    --text-muted: #6F7A89;
    --accent: #5B8ECD;
    --accent-hover: #6B9ED8;
    --accent-subtle: rgba(91, 142, 205, 0.12);
    --accent-ring: rgba(91, 142, 205, 0.25);
  }
}`,
    designPattern: `# Lyra Design System — DESIGN_PATTERN.md

## Overview
Lyra is a professional, dual-tone design system built around a cool periwinkle-blue accent palette.
It ships three themes: **light**, **dark**, and **grey** (elevated dark).

## Color Tokens

| Token | Light | Dark | Grey | Purpose |
|---|---|---|---|---|
| \`--bg-primary\` | #FFFFFF | #0F0F10 | #1B1E23 | Page/canvas background |
| \`--bg-secondary\` | #F3F4F6 | #1A1A1D | #23272C | Cards, sidebars, inputs |
| \`--border\` | #E5E7EB | #2A2A2E | #333840 | Dividers, input borders |
| \`--text-primary\` | var(--bg-primary)827 | #EAEAEA | #F3F4F6 | Headings, labels |
| \`--text-secondary\` | #4B5563 | #A1A1AA | #A9B2C0 | Body copy, descriptions |
| \`--text-muted\` | #9CA3AF | #6B7280 | #6F7A89 | Placeholders, metadata |
| \`--accent\` | #2D5FA6 | #5B8ECD | #5B8ECD | Primary CTA, links, focus rings |
| \`--accent-hover\` | #3B72BF | #6B9ED8 | #6B9ED8 | Hover state for accent |
| \`--accent-subtle\` | rgba(45,95,166,.10) | rgba(91,142,205,.12) | rgba(91,142,205,.12) | Badge backgrounds, alert fills |
| \`--accent-ring\` | rgba(45,95,166,.25) | rgba(91,142,205,.25) | rgba(91,142,205,.25) | Focus outlines |

## Usage Guidelines

### Backgrounds
- Use \`--bg-primary\` for the page root and full-bleed sections.
- Use \`--bg-secondary\` for cards, drawers, sidebars, and form inputs.
- Never stack more than two background levels; use borders instead.

### Typography
- Headlines: \`--text-primary\` at weight 700–800, tracking \`-0.02em\`.
- Body: \`--text-secondary\` at weight 400, line-height 1.6–1.8.
- Metadata / labels: \`--text-muted\` at weight 400–500, font-size 11–12px.
- Recommended fonts: Merriweather (serif) for headings, Inter / Geist for body.

### Accent
- Use \`--accent\` for primary buttons, active nav links, and focus rings.
- Use \`--accent-hover\` exclusively on hover/pressed states.
- Use \`--accent-subtle\` for badge backgrounds, alert fills, and selected states.
- Apply \`--accent-ring\` as \`outline\` or \`box-shadow\` for keyboard focus.

### Borders
- Standard UI borders: 1px solid \`--border\`.
- Elevated borders (cards inside cards): increase opacity of \`--border\` by 1.5×.

### Theme Switching
\`\`\`html
<!-- Apply to <html> or top-level wrapper -->
<html data-theme="dark">
<html data-theme="grey">
<!-- default (no attribute) → light -->
\`\`\`

## Component Patterns

### Button
\`\`\`css
.btn-primary {
  background: var(--accent);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 8px 16px;
  font-weight: 600;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--accent-hover); }
\`\`\`

### Input
\`\`\`css
.input {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  color: var(--text-primary);
  border-radius: 8px;
  padding: 8px 12px;
}
.input:focus {
  outline: 2px solid var(--accent-ring);
  border-color: var(--accent);
}
\`\`\`

### Card
\`\`\`css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}
.card:hover {
  border-color: var(--accent);
  box-shadow: 0 8px 32px -8px var(--accent-subtle);
}
\`\`\`

## Spacing Scale
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96

## Border Radius Scale
4px (xs) · 6px (sm) · 8px (md) · 12px (lg) · 16px (xl) · 20px (2xl) · 9999px (full)

## AI Consumption Notes
- All semantic tokens are on \`:root\` / \`[data-theme]\` selectors.
- No hardcoded colours in component styles — always reference tokens.
- The grey theme is an "elevated dark" variant, NOT a neutral/greyscale palette.
- Accent colour shifts between light and dark to maintain WCAG AA contrast.
`,
  },

  // ── Aurora ──────────────────────────────────────────────────────────────────
  {
    id: "aurora",
    name: "Aurora",
    description: "A deep forest-green dark-first palette inspired by natural bioluminescence.",
    tags: ["green", "teal", "dark", "nature", "minimal"],
    tokens: [
      { name: "bg-primary", var: "--bg-primary", light: "#F0FDF4", dark: "#0A0F0C" },
      { name: "bg-secondary", var: "--bg-secondary", light: "#DCFCE7", dark: "var(--bg-primary)A14" },
      { name: "border", var: "--border", light: "#BBF7D0", dark: "#1E3326" },
      { name: "text-primary", var: "--text-primary", light: "#052E16", dark: "#D1FAE5" },
      { name: "text-secondary", var: "--text-secondary", light: "#166534", dark: "#6EE7B7" },
      { name: "text-muted", var: "--text-muted", light: "#4ADE80", dark: "#34D399" },
      { name: "accent", var: "--accent", light: "#16A34A", dark: "#22C55E" },
      { name: "accent-hover", var: "--accent-hover", light: "#15803D", dark: "#4ADE80" },
      { name: "accent-subtle", var: "--accent-subtle", light: "rgba(22,163,74,0.10)", dark: "rgba(34,197,94,0.12)" },
      { name: "accent-ring", var: "--accent-ring", light: "rgba(22,163,74,0.25)", dark: "rgba(34,197,94,0.30)" },
    ],
    css: `@layer base {
  :root {
    --bg-primary: #F0FDF4;
    --bg-secondary: #DCFCE7;
    --border: #BBF7D0;
    --text-primary: #052E16;
    --text-secondary: #166534;
    --text-muted: #4ADE80;
    --accent: #16A34A;
    --accent-hover: #15803D;
    --accent-subtle: rgba(22, 163, 74, 0.10);
    --accent-ring: rgba(22, 163, 74, 0.25);
  }

  [data-theme="dark"] {
    --bg-primary: #0A0F0C;
    --bg-secondary: var(--bg-primary)A14;
    --border: #1E3326;
    --text-primary: #D1FAE5;
    --text-secondary: #6EE7B7;
    --text-muted: #34D399;
    --accent: #22C55E;
    --accent-hover: #4ADE80;
    --accent-subtle: rgba(34, 197, 94, 0.12);
    --accent-ring: rgba(34, 197, 94, 0.30);
  }
}`,
    designPattern: `# Aurora Design System — DESIGN_PATTERN.md

## Overview
Aurora is a bioluminescent green palette, dark-first and nature-inspired.
Best suited for developer tools, sustainability dashboards, and health/wellness products.

## Color Tokens

| Token | Light | Dark | Purpose |
|---|---|---|---|
| \`--bg-primary\` | #F0FDF4 | #0A0F0C | Page background |
| \`--bg-secondary\` | #DCFCE7 | var(--bg-primary)A14 | Cards, inputs, sidebars |
| \`--border\` | #BBF7D0 | #1E3326 | UI borders |
| \`--text-primary\` | #052E16 | #D1FAE5 | Headings, labels |
| \`--text-secondary\` | #166534 | #6EE7B7 | Body copy |
| \`--text-muted\` | #4ADE80 | #34D399 | Metadata, placeholders |
| \`--accent\` | #16A34A | #22C55E | CTAs, links, focus |
| \`--accent-hover\` | #15803D | #4ADE80 | Hover state |
| \`--accent-subtle\` | rgba(22,163,74,.10) | rgba(34,197,94,.12) | Fills, badges |
| \`--accent-ring\` | rgba(22,163,74,.25) | rgba(34,197,94,.30) | Focus rings |

## Usage Guidelines
- Use dark theme as the primary shipped theme.
- Pair with monospace fonts for developer-tool contexts.
- Reserve the bright accent (#22C55E) only for interactive elements.
- Avoid saturated greens in body copy; use \`--text-secondary\` desaturated tones.
`,
  },

  // ── Crimson ─────────────────────────────────────────────────────────────────
  {
    id: "crimson",
    name: "Crimson",
    description: "A warm, high-contrast palette with deep crimson accents — bold and dramatic.",
    tags: ["red", "warm", "dark", "bold", "dramatic"],
    tokens: [
      { name: "bg-primary", var: "--bg-primary", light: "#FFF5F5", dark: "#0D0608" },
      { name: "bg-secondary", var: "--bg-secondary", light: "#FEE2E2", dark: "#180A0B" },
      { name: "border", var: "--border", light: "#FECACA", dark: "#2C1214" },
      { name: "text-primary", var: "--text-primary", light: "#1C0607", dark: "#FEE2E2" },
      { name: "text-secondary", var: "--text-secondary", light: "#7F1D1D", dark: "#FCA5A5" },
      { name: "text-muted", var: "--text-muted", light: "#F87171", dark: "#F87171" },
      { name: "accent", var: "--accent", light: "#DC2626", dark: "#EF4444" },
      { name: "accent-hover", var: "--accent-hover", light: "#B91C1C", dark: "#F87171" },
      { name: "accent-subtle", var: "--accent-subtle", light: "rgba(220,38,38,0.08)", dark: "rgba(239,68,68,0.12)" },
      { name: "accent-ring", var: "--accent-ring", light: "rgba(220,38,38,0.25)", dark: "rgba(239,68,68,0.30)" },
    ],
    css: `@layer base {
  :root {
    --bg-primary: #FFF5F5;
    --bg-secondary: #FEE2E2;
    --border: #FECACA;
    --text-primary: #1C0607;
    --text-secondary: #7F1D1D;
    --text-muted: #F87171;
    --accent: #DC2626;
    --accent-hover: #B91C1C;
    --accent-subtle: rgba(220, 38, 38, 0.08);
    --accent-ring: rgba(220, 38, 38, 0.25);
  }

  [data-theme="dark"] {
    --bg-primary: #0D0608;
    --bg-secondary: #180A0B;
    --border: #2C1214;
    --text-primary: #FEE2E2;
    --text-secondary: #FCA5A5;
    --text-muted: #F87171;
    --accent: #EF4444;
    --accent-hover: #F87171;
    --accent-subtle: rgba(239, 68, 68, 0.12);
    --accent-ring: rgba(239, 68, 68, 0.30);
  }
}`,
    designPattern: `# Crimson Design System — DESIGN_PATTERN.md

## Overview
Crimson is a bold, warm-toned palette with deep red accents. Ideal for media, gaming, finance dashboards, or any product that demands attention.

## Color Tokens

| Token | Light | Dark | Purpose |
|---|---|---|---|
| \`--bg-primary\` | #FFF5F5 | #0D0608 | Page background |
| \`--bg-secondary\` | #FEE2E2 | #180A0B | Cards, inputs |
| \`--border\` | #FECACA | #2C1214 | UI borders |
| \`--text-primary\` | #1C0607 | #FEE2E2 | Headings |
| \`--text-secondary\` | #7F1D1D | #FCA5A5 | Body copy |
| \`--text-muted\` | #F87171 | #F87171 | Placeholders |
| \`--accent\` | #DC2626 | #EF4444 | CTAs, links |
| \`--accent-hover\` | #B91C1C | #F87171 | Hover state |
| \`--accent-subtle\` | rgba(220,38,38,.08) | rgba(239,68,68,.12) | Fills |
| \`--accent-ring\` | rgba(220,38,38,.25) | rgba(239,68,68,.30) | Focus rings |

## Usage Guidelines
- Use dark theme for immersive / entertainment contexts.
- Limit accent to interactive elements only; it is very stimulating.
- Prefer \`--text-secondary\` for body copy rather than pure accent tones.
- Ensure error states use a *different* red tone (e.g. lighter ring) to differentiate from accent.
`,
  },

  // ── Slate Pro ────────────────────────────────────────────────────────────────
  {
    id: "slate-pro",
    name: "Slate Pro",
    description: "A refined neutral palette with violet undertones. Timeless and enterprise-ready.",
    tags: ["violet", "neutral", "enterprise", "minimal", "clean"],
    tokens: [
      { name: "bg-primary", var: "--bg-primary", light: "#FAFAFA", dark: "#0C0C0F" },
      { name: "bg-secondary", var: "--bg-secondary", light: "#F4F4F6", dark: "#141417" },
      { name: "border", var: "--border", light: "#E4E4E9", dark: "#252530" },
      { name: "text-primary", var: "--text-primary", light: "#09090B", dark: "#F4F4F6" },
      { name: "text-secondary", var: "--text-secondary", light: "#52525B", dark: "#A1A1AA" },
      { name: "text-muted", var: "--text-muted", light: "#A1A1AA", dark: "#52525B" },
      { name: "accent", var: "--accent", light: "#7C3AED", dark: "#8B5CF6" },
      { name: "accent-hover", var: "--accent-hover", light: "#6D28D9", dark: "#A78BFA" },
      { name: "accent-subtle", var: "--accent-subtle", light: "rgba(124,58,237,0.08)", dark: "rgba(139,92,246,0.12)" },
      { name: "accent-ring", var: "--accent-ring", light: "rgba(124,58,237,0.25)", dark: "rgba(139,92,246,0.30)" },
    ],
    css: `@layer base {
  :root {
    --bg-primary: #FAFAFA;
    --bg-secondary: #F4F4F6;
    --border: #E4E4E9;
    --text-primary: #09090B;
    --text-secondary: #52525B;
    --text-muted: #A1A1AA;
    --accent: #7C3AED;
    --accent-hover: #6D28D9;
    --accent-subtle: rgba(124, 58, 237, 0.08);
    --accent-ring: rgba(124, 58, 237, 0.25);
  }

  [data-theme="dark"] {
    --bg-primary: #0C0C0F;
    --bg-secondary: #141417;
    --border: #252530;
    --text-primary: #F4F4F6;
    --text-secondary: #A1A1AA;
    --text-muted: #52525B;
    --accent: #8B5CF6;
    --accent-hover: #A78BFA;
    --accent-subtle: rgba(139, 92, 246, 0.12);
    --accent-ring: rgba(139, 92, 246, 0.30);
  }
}`,
    designPattern: `# Slate Pro Design System — DESIGN_PATTERN.md

## Overview
Slate Pro is a refined, nearly-neutral palette with violet undertones. Designed for enterprise SaaS, admin dashboards, and professional tools.

## Color Tokens

| Token | Light | Dark | Purpose |
|---|---|---|---|
| \`--bg-primary\` | #FAFAFA | #0C0C0F | Page background |
| \`--bg-secondary\` | #F4F4F6 | #141417 | Cards, inputs |
| \`--border\` | #E4E4E9 | #252530 | UI borders |
| \`--text-primary\` | #09090B | #F4F4F6 | Headings |
| \`--text-secondary\` | #52525B | #A1A1AA | Body copy |
| \`--text-muted\` | #A1A1AA | #52525B | Metadata |
| \`--accent\` | #7C3AED | #8B5CF6 | CTAs, links, focus |
| \`--accent-hover\` | #6D28D9 | #A78BFA | Hover |
| \`--accent-subtle\` | rgba(124,58,237,.08) | rgba(139,92,246,.12) | Fills |
| \`--accent-ring\` | rgba(124,58,237,.25) | rgba(139,92,246,.30) | Focus rings |

## Usage Guidelines
- Light theme is the primary theme for enterprise contexts.
- Violet accent pairs well with cool grey backgrounds.
- Use \`--accent-subtle\` for selected states in sidebars and tables.
- This palette works well with Inter, Geist, or Neue Haas Grotesk.
`,
  },

  // ── Copper ──────────────────────────────────────────────────────────────────
  {
    id: "copper",
    name: "Copper",
    description: "Warm amber and copper tones — perfect for editorial, fintech, and luxury brands.",
    tags: ["amber", "warm", "luxury", "editorial", "copper"],
    tokens: [
      { name: "bg-primary", var: "--bg-primary", light: "#FFFBF0", dark: "#0F0C07" },
      { name: "bg-secondary", var: "--bg-secondary", light: "#FEF3C7", dark: "#1A1508" },
      { name: "border", var: "--border", light: "#FDE68A", dark: "#2D2310" },
      { name: "text-primary", var: "--text-primary", light: "#1C1400", dark: "#FEF3C7" },
      { name: "text-secondary", var: "--text-secondary", light: "#92400E", dark: "#FCD34D" },
      { name: "text-muted", var: "--text-muted", light: "#D97706", dark: "#B45309" },
      { name: "accent", var: "--accent", light: "#B45309", dark: "#F59E0B" },
      { name: "accent-hover", var: "--accent-hover", light: "#92400E", dark: "#FCD34D" },
      { name: "accent-subtle", var: "--accent-subtle", light: "rgba(180,83,9,0.08)", dark: "rgba(245,158,11,0.12)" },
      { name: "accent-ring", var: "--accent-ring", light: "rgba(180,83,9,0.25)", dark: "rgba(245,158,11,0.30)" },
    ],
    css: `@layer base {
  :root {
    --bg-primary: #FFFBF0;
    --bg-secondary: #FEF3C7;
    --border: #FDE68A;
    --text-primary: #1C1400;
    --text-secondary: #92400E;
    --text-muted: #D97706;
    --accent: #B45309;
    --accent-hover: #92400E;
    --accent-subtle: rgba(180, 83, 9, 0.08);
    --accent-ring: rgba(180, 83, 9, 0.25);
  }

  [data-theme="dark"] {
    --bg-primary: #0F0C07;
    --bg-secondary: #1A1508;
    --border: #2D2310;
    --text-primary: #FEF3C7;
    --text-secondary: #FCD34D;
    --text-muted: #B45309;
    --accent: #F59E0B;
    --accent-hover: #FCD34D;
    --accent-subtle: rgba(245, 158, 11, 0.12);
    --accent-ring: rgba(245, 158, 11, 0.30);
  }
}`,
    designPattern: `# Copper Design System — DESIGN_PATTERN.md

## Overview
Copper is a warm amber-gold palette evoking craftsmanship, luxury, and editorial quality.
Ideal for fintech, premium SaaS, e-commerce, and content-heavy sites.

## Color Tokens

| Token | Light | Dark | Purpose |
|---|---|---|---|
| \`--bg-primary\` | #FFFBF0 | #0F0C07 | Page background |
| \`--bg-secondary\` | #FEF3C7 | #1A1508 | Cards, inputs |
| \`--border\` | #FDE68A | #2D2310 | UI borders |
| \`--text-primary\` | #1C1400 | #FEF3C7 | Headings |
| \`--text-secondary\` | #92400E | #FCD34D | Body copy |
| \`--text-muted\` | #D97706 | #B45309 | Metadata |
| \`--accent\` | #B45309 | #F59E0B | CTAs, links |
| \`--accent-hover\` | #92400E | #FCD34D | Hover |
| \`--accent-subtle\` | rgba(180,83,9,.08) | rgba(245,158,11,.12) | Fills |
| \`--accent-ring\` | rgba(180,83,9,.25) | rgba(245,158,11,.30) | Focus rings |

## Usage Guidelines
- Pairs beautifully with serif typography (Playfair Display, Lora, Cormorant).
- Use the amber accent sparingly — less than 10% of UI surface area.
- Dark theme creates a premium "candlelit" atmosphere.
- Avoid pure white backgrounds; always use the warm cream \`--bg-primary\`.
`,
  },

  // ── Neon Void ───────────────────────────────────────────────────────────────
  {
    id: "neon-void",
    name: "Neon Void",
    description: "Cyberpunk-inspired pitch-black canvas with electric cyan and magenta accents.",
    tags: ["cyan", "neon", "dark", "cyberpunk", "electric"],
    tokens: [
      { name: "bg-primary", var: "--bg-primary", light: "#F0FFFE", dark: "#020407" },
      { name: "bg-secondary", var: "--bg-secondary", light: "#CCFBF1", dark: "#080E12" },
      { name: "border", var: "--border", light: "#99F6E4", dark: "#0D1E26" },
      { name: "text-primary", var: "--text-primary", light: "#042F2E", dark: "#E0FFFD" },
      { name: "text-secondary", var: "--text-secondary", light: "#0F766E", dark: "#67E8F9" },
      { name: "text-muted", var: "--text-muted", light: "#2DD4BF", dark: "#164E63" },
      { name: "accent", var: "--accent", light: "#0891B2", dark: "#22D3EE" },
      { name: "accent-hover", var: "--accent-hover", light: "#0E7490", dark: "#67E8F9" },
      { name: "accent-subtle", var: "--accent-subtle", light: "rgba(8,145,178,0.08)", dark: "rgba(34,211,238,0.10)" },
      { name: "accent-ring", var: "--accent-ring", light: "rgba(8,145,178,0.30)", dark: "rgba(34,211,238,0.35)" },
    ],
    css: `@layer base {
  :root {
    --bg-primary: #F0FFFE;
    --bg-secondary: #CCFBF1;
    --border: #99F6E4;
    --text-primary: #042F2E;
    --text-secondary: #0F766E;
    --text-muted: #2DD4BF;
    --accent: #0891B2;
    --accent-hover: #0E7490;
    --accent-subtle: rgba(8, 145, 178, 0.08);
    --accent-ring: rgba(8, 145, 178, 0.30);
  }

  [data-theme="dark"] {
    --bg-primary: #020407;
    --bg-secondary: #080E12;
    --border: #0D1E26;
    --text-primary: #E0FFFD;
    --text-secondary: #67E8F9;
    --text-muted: #164E63;
    --accent: #22D3EE;
    --accent-hover: #67E8F9;
    --accent-subtle: rgba(34, 211, 238, 0.10);
    --accent-ring: rgba(34, 211, 238, 0.35);
  }
}`,
    designPattern: `# Neon Void Design System — DESIGN_PATTERN.md

## Overview
Neon Void is a cyberpunk dark palette — near-black backgrounds with electric cyan accents.
Best for developer tools, gaming, creative portfolios, and night-mode-first products.

## Color Tokens

| Token | Light | Dark | Purpose |
|---|---|---|---|
| \`--bg-primary\` | #F0FFFE | #020407 | Page background |
| \`--bg-secondary\` | #CCFBF1 | #080E12 | Cards, inputs |
| \`--border\` | #99F6E4 | #0D1E26 | UI borders |
| \`--text-primary\` | #042F2E | #E0FFFD | Headings |
| \`--text-secondary\` | #0F766E | #67E8F9 | Body copy |
| \`--text-muted\` | #2DD4BF | #164E63 | Placeholders |
| \`--accent\` | #0891B2 | #22D3EE | CTAs, links |
| \`--accent-hover\` | #0E7490 | #67E8F9 | Hover |
| \`--accent-subtle\` | rgba(8,145,178,.08) | rgba(34,211,238,.10) | Fills |
| \`--accent-ring\` | rgba(8,145,178,.30) | rgba(34,211,238,.35) | Focus rings |

## Usage Guidelines
- The dark theme is the **primary theme** for this palette — light is a fallback.
- Use monospace or geometric sans-serif fonts (JetBrains Mono, Space Grotesk).
- Limit text-secondary to interactive or highlighted content — the bright cyan is high-stimulus.
- Pair with subtle scanline or grid background textures for full cyberpunk effect.
- Never use this palette for healthcare or accessibility-critical UIs.
`,
  },
];

// ─── Main Component ──────────────────────────────────────────────────────────

type Tab = "preview" | "tokens" | "css" | "pattern";

export function PalettesClient() {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("preview");
  const [previewTheme, setPreviewTheme] = useState<"light" | "dark" | "grey">("dark");

  const filtered = PALETTES.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tags.some(t => t.includes(search.toLowerCase()))
  );

  const open = openId ? PALETTES.find(p => p.id === openId) : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", color: "var(--text-primary)", fontFamily: "inherit" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "60px 32px 80px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,.12)", border: "1px solid rgba(99,102,241,.25)", borderRadius: 99, padding: "4px 14px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600 }}>AI-Ready · DESIGN_PATTERN.md</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, fontFamily: "var(--font-merriweather), serif", margin: "0 0 12px", letterSpacing: "-0.02em", background: "linear-gradient(to right,var(--text-primary),var(--text-secondary))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Design Palettes
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 16, maxWidth: 560, lineHeight: 1.6, margin: 0 }}>
            Production-ready color palettes with live previews, token tables, CSS variables, and AI-readable <code style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 5, padding: "1px 7px", fontSize: 13, color: "var(--text-muted)" }}>DESIGN_PATTERN.md</code> docs.
          </p>
        </div>

        {/* Search */}
        <input
          type="search"
          placeholder="Search palettes (blue, dark, green…)"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: 380, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 12, padding: "10px 16px", color: "var(--text-primary)", fontSize: 14, outline: "none", marginBottom: 32, boxSizing: "border-box" }}
        />

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))", gap: 20 }}>
          {filtered.map(palette => (
            <PaletteCard
              key={palette.id}
              palette={palette}
              isOpen={openId === palette.id}
              onToggle={() => {
                if (openId === palette.id) { setOpenId(null); }
                else { setOpenId(palette.id); setActiveTab("preview"); setPreviewTheme("dark"); }
              }}
            />
          ))}
        </div>

        {/* Expanded Detail Panel */}
        {open && (
          <DetailPanel
            palette={open}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            previewTheme={previewTheme}
            setPreviewTheme={setPreviewTheme}
          />
        )}
      </div>
    </div>
  );
}

// ─── Palette Card ────────────────────────────────────────────────────────────

function PaletteCard({ palette, isOpen, onToggle }: { palette: Palette; isOpen: boolean; onToggle: () => void }) {
  const accent = palette.tokens.find(t => t.name === "accent")?.dark ?? "var(--accent)";
  const bg = palette.tokens.find(t => t.name === "bg-primary")?.dark ?? "#111";
  const bgSec = palette.tokens.find(t => t.name === "bg-secondary")?.dark ?? "#18181b";
  const border = palette.tokens.find(t => t.name === "border")?.dark ?? "var(--border)";
  const textPrimary = palette.tokens.find(t => t.name === "text-primary")?.dark ?? "var(--text-primary)";
  const textMuted = palette.tokens.find(t => t.name === "text-muted")?.dark ?? "var(--text-secondary)";

  return (
    <div
      onClick={onToggle}
      style={{
        background: "var(--bg-primary)", border: `1px solid ${isOpen ? accent + "66" : "var(--border)"}`,
        borderRadius: 18, overflow: "hidden", cursor: "pointer",
        transition: "border-color .2s, transform .15s, box-shadow .2s",
        boxShadow: isOpen ? `0 0 0 1px ${accent}33, 0 16px 40px -12px ${accent}44` : "none",
        transform: isOpen ? "scale(1.005)" : "scale(1)",
      }}
    >
      {/* Mini palette preview */}
      <div style={{ height: 110, background: bg, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {palette.tokens.filter(t => ["accent", "bg-secondary", "border", "text-muted"].includes(t.name)).map(t => (
              <div key={t.name} style={{ width: 20, height: 20, borderRadius: 6, background: t.dark ?? t.light, border: "1px solid rgba(255,255,255,.1)" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {palette.tags.slice(0, 2).map(tag => (
              <span key={tag} style={{ fontSize: 10, color: textMuted, background: bgSec, border: `1px solid ${border}`, borderRadius: 5, padding: "1px 6px" }}>{tag}</span>
            ))}
          </div>
        </div>
        {/* Mini UI mockup */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <div style={{ width: 28, height: 8, borderRadius: 4, background: accent }} />
          <div style={{ width: 20, height: 8, borderRadius: 4, background: bgSec, border: `1px solid ${border}` }} />
          <div style={{ width: 14, height: 8, borderRadius: 4, background: bgSec, border: `1px solid ${border}` }} />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <h3 style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "var(--font-merriweather), serif", fontSize: 15, margin: 0 }}>{palette.name}</h3>
          {palette.author && <span style={{ fontSize: 11, color: "var(--text-muted)" }}>by {palette.author}</span>}
        </div>
        <p style={{ color: "var(--text-secondary)", fontSize: 12, margin: "0 0 10px", lineHeight: 1.5 }}>{palette.description}</p>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {palette.tags.map(tag => (
            <span key={tag} style={{ fontSize: 10, color: "var(--text-muted)", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 5, padding: "1px 6px" }}>{tag}</span>
          ))}
        </div>
      </div>

      <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{palette.tokens.length} tokens</span>
        <span style={{ fontSize: 12, color: isOpen ? accent : "var(--text-muted)", fontWeight: 500 }}>{isOpen ? "Close ↑" : "Expand ↓"}</span>
      </div>
    </div>
  );
}

// ─── Detail Panel ────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "preview", label: "Preview" },
  { id: "tokens", label: "Tokens" },
  { id: "css", label: "CSS" },
  { id: "pattern", label: "DESIGN_PATTERN.md" },
];

function DetailPanel({ palette, activeTab, setActiveTab, previewTheme, setPreviewTheme }: {
  palette: Palette;
  activeTab: Tab;
  setActiveTab: (t: Tab) => void;
  previewTheme: "light" | "dark" | "grey";
  setPreviewTheme: (t: "light" | "dark" | "grey") => void;
}) {
  const hasGrey = palette.tokens.some(t => t.grey);
  const accent = palette.tokens.find(t => t.name === "accent")?.dark ?? "var(--accent)";

  return (
    <div style={{ marginTop: 32, background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderBottom: "1px solid var(--border)", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 4, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: 4 }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "5px 14px", borderRadius: 7, border: "none", cursor: "pointer",
                fontSize: 12, fontWeight: 500,
                background: activeTab === tab.id ? "var(--border)" : "transparent",
                color: activeTab === tab.id ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Theme switcher (only for preview/tokens) */}
        {(activeTab === "preview" || activeTab === "tokens") && (
          <div style={{ display: "flex", gap: 4, background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: 10, padding: 4 }}>
            {(["light", "dark", ...(hasGrey ? ["grey"] : [])] as const).map(th => (
              <button
                key={th}
                onClick={() => setPreviewTheme(th as "light" | "dark" | "grey")}
                style={{
                  padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: 11, fontWeight: 500,
                  background: previewTheme === th ? accent + "33" : "transparent",
                  color: previewTheme === th ? "var(--text-primary)" : "var(--text-secondary)",
                }}
              >
                {th}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: 24 }}>
        {activeTab === "preview" && (
          <PalettePreview palette={palette} theme={previewTheme} />
        )}

        {activeTab === "tokens" && (
          <div>
            {palette.tokens.map(token => (
              <Swatch key={token.name} token={token} theme={previewTheme} />
            ))}
          </div>
        )}

        {activeTab === "css" && (
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
              <CopyButton text={palette.css} label="Copy CSS" />
            </div>
            <pre style={{
              margin: 0, padding: "18px 18px 18px 18px", overflowX: "auto",
              fontSize: 12, lineHeight: 1.7, color: "var(--text-secondary)",
              background: "var(--bg-secondary)", borderRadius: 14, fontFamily: "'Fira Code','Menlo',monospace",
            }}>
              <code>{palette.css}</code>
            </pre>
          </div>
        )}

        {activeTab === "pattern" && (
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, zIndex: 1 }}>
              <CopyButton text={palette.designPattern} label="Copy .md" />
            </div>
            <pre style={{
              margin: 0, padding: "18px 18px 18px 18px", overflowX: "auto",
              fontSize: 12, lineHeight: 1.75, color: "var(--text-secondary)",
              background: "var(--bg-secondary)", borderRadius: 14, fontFamily: "'Fira Code','Menlo',monospace",
              whiteSpace: "pre-wrap", wordBreak: "break-word",
            }}>
              <code>{palette.designPattern}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
