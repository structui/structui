import { NextResponse } from "next/server";
import { SETUP_REGISTRY, SETUP_PAGES, SETUP_ICONS } from "@/src/setups/registry";
import type { AuthProvider, ColorPalette } from "@/src/setups/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const AUTH_PROVIDERS: AuthProvider[] = ["none", "next-auth", "better-auth", "basic-auth"];
export const COLOR_PALETTES: ColorPalette[] = [
  "slate", "blue", "indigo", "violet", "purple",
  "rose", "orange", "emerald", "teal", "zinc",
];

export async function GET() {
  const payload = {
    version: 1,
    setups: SETUP_REGISTRY.map((s) => ({
      name: s.name,
      label: s.label,
      description: s.description,
      icon: SETUP_ICONS[s.name],
      pages: SETUP_PAGES[s.name],
      authProviders: AUTH_PROVIDERS,
      colorPalettes: COLOR_PALETTES,
      installCommand: `npx sui add ${s.name}-setup`,
    })),
  };

  return NextResponse.json(payload, {
    headers: { "Cache-Control": "public, max-age=60, s-maxage=300" },
  });
}
