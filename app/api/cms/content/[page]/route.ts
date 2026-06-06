import { NextResponse } from "next/server";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { verifySession } from "../../../../../lib/auth";


export async function POST(
  request: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  // 1. Verify admin session
  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("cms_token="))
    ?.split("=")[1];

  if (!token || !verifySession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { page } = await params;
    const body = await request.json();

    // 2. Perform Convex mutation
    await fetchMutation(api.content.update, {
      pageName: page,
      data: body.data,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update content" }, { status: 500 });
  }
}
