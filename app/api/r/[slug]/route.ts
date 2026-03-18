import { NextRequest, NextResponse } from "next/server";

import { buildShadcnRegistryItem } from "@/src/lib/registry/distribution";

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
  const payload = await buildShadcnRegistryItem(slug);

  if (!payload) {
    return NextResponse.json(
      {
        error: "Registry item not found.",
        message: `No registry package named "${slug.replace(/\.json$/i, "")}" exists.`,
      },
      { status: 404, headers: RESPONSE_HEADERS },
    );
  }

  return NextResponse.json(payload, { headers: RESPONSE_HEADERS });
}

