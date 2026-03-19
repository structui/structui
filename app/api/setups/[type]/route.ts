import { NextRequest, NextResponse } from "next/server";
import { findSetup } from "@/src/setups/registry";
import type { AuthProvider, ColorPalette, SetupOptions } from "@/src/setups/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const VALID_AUTH: AuthProvider[] = ["none", "next-auth", "better-auth", "basic-auth"];
const VALID_COLORS: ColorPalette[] = [
  "slate", "blue", "indigo", "violet", "purple",
  "rose", "orange", "emerald", "teal", "zinc",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  const setup = findSetup(type);

  if (!setup) {
    return NextResponse.json(
      { error: `Unknown setup type: "${type}". Valid types: crm, erp, saas, auth.` },
      { status: 404 }
    );
  }

  const sp = request.nextUrl.searchParams;
  const title = (sp.get("title") ?? `${setup.label} App`).trim() || `${setup.label} App`;

  const rawColor = sp.get("color") ?? "blue";
  const colorPalette: ColorPalette = VALID_COLORS.includes(rawColor as ColorPalette)
    ? (rawColor as ColorPalette)
    : "blue";

  const rawAuth = sp.get("auth") ?? "none";
  const authProvider: AuthProvider = VALID_AUTH.includes(rawAuth as AuthProvider)
    ? (rawAuth as AuthProvider)
    : "none";

  const options: SetupOptions = {
    projectTitle: title,
    colorPalette,
    authProvider,
    basePath: "", // not used on server side
  };

  const result = setup.generate(options);

  return NextResponse.json(
    {
      name: setup.name,
      label: setup.label,
      description: setup.description,
      options: { title, colorPalette, authProvider },
      files: result.files,
      dependencies: result.dependencies,
      devDependencies: result.devDependencies,
      instructions: result.instructions,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
