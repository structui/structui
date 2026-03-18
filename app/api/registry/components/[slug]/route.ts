import { NextRequest, NextResponse } from "next/server";

import { buildRegistryDetail } from "@/src/lib/registry/distribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESPONSE_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const detail = await buildRegistryDetail("component", slug);

  if (!detail) {
    return NextResponse.json(
      {
        error: "Registry item not found.",
        message: `No component named "${slug.replace(/\.json$/i, "")}" exists in the registry.`,
      },
      { status: 404, headers: RESPONSE_HEADERS },
    );
  }

  return NextResponse.json(detail, { headers: RESPONSE_HEADERS });
}

