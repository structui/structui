import { NextRequest, NextResponse } from "next/server";

import {
  buildShadcnRegistryIndex,
  resolveRegistryType,
} from "@/src/lib/registry/distribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESPONSE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

export async function GET(request: NextRequest) {
  const type = resolveRegistryType(request.nextUrl.searchParams.get("type"));

  if (!type) {
    return NextResponse.json(
      {
        error: "Invalid registry type.",
        message:
          "Query parameter `type` must be one of: all, component, block.",
      },
      { status: 400, headers: RESPONSE_HEADERS },
    );
  }

  const query = request.nextUrl.searchParams.get("q");
  const payload = await buildShadcnRegistryIndex({ type, query });

  return NextResponse.json(payload, { headers: RESPONSE_HEADERS });
}

