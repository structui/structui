import { NextRequest, NextResponse } from "next/server";

import { buildRegistryIndex } from "@/src/lib/registry/distribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESPONSE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");
  const payload = await buildRegistryIndex({ type: "component", query });

  return NextResponse.json(payload, { headers: RESPONSE_HEADERS });
}

