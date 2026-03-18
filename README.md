# StructUI

StructUI is a registry-first React UI system built with Vite, React, TypeScript, Radix UI, and Tailwind CSS v4.

It now exposes both human-facing docs and machine-readable surfaces from the same source of truth.

## Public Surfaces

- `https://structui.com/registry.json` - full registry export with metrics and component index
- `https://structui.com/registry/components/<slug>.json` - per-component structured metadata
- `https://structui.com/registry/components/<slug>.md` - per-component markdown docs when available
- `https://structui.com/llms.txt` - compact LLM discovery surface
- `https://structui.com/llms-full.txt` - expanded LLM surface with embedded component docs

## Local Development

```bash
npm install
npm run dev
```

## Key Scripts

```bash
npm run generate:registry
npm run build
npx tsc --noEmit
```

## Current Direction

- central typed registry for components
- markdown-backed component docs
- registry-driven marketing and docs surfaces
- public exports for external tools, agents, and LLM workflows

## Notes

- Canonical brand: `StructUI`
- Canonical package: `struct-ui`
- Canonical CLI contract: `strui`
- Source repository: `https://github.com/structui/structui`
