import path from "node:path";

import { NextRequest, NextResponse } from "next/server";

import {
  findRegistryPackage,
  type RegistryPackageType,
} from "@/src/lib/registry/distribution";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const JSON_HEADERS = {
  "Cache-Control": "public, max-age=60, s-maxage=300",
};

const isRegistryPackageType = (value: string): value is RegistryPackageType =>
  value === "component" || value === "block";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> },
) {
  const { type, slug } = await params;

  if (!isRegistryPackageType(type)) {
    return NextResponse.json(
      {
        error: "Invalid package type.",
        message: "Package type must be either `component` or `block`.",
      },
      { status: 400, headers: JSON_HEADERS },
    );
  }

  const pkg = await findRegistryPackage(type, slug);

  if (!pkg) {
    return NextResponse.json(
      {
        error: "Registry item not found.",
        message: `No ${type} named "${slug.replace(/\.json$/i, "")}" exists in the registry.`,
      },
      { status: 404, headers: JSON_HEADERS },
    );
  }

  const selectedFile = request.nextUrl.searchParams.get("file");
  const file =
    pkg.files.find((item) => item.path === selectedFile) ?? pkg.files.at(0);

  if (!file) {
    return NextResponse.json(
      {
        error: "File not found.",
        message: "The selected registry package does not contain downloadable files.",
      },
      { status: 404, headers: JSON_HEADERS },
    );
  }

  const fileName = path.basename(file.path).replace(/"/g, "");

  return new NextResponse(file.content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${fileName}"`,
      "Cache-Control": "public, max-age=60, s-maxage=300",
    },
  });
}

