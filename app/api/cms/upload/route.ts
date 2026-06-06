import { NextResponse } from "next/server";
import crypto from "crypto";
import { verifySession } from "../../../../lib/auth";

export async function POST(request: Request) {
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
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "XIMDW5CdINKad43R0n-5M8YiBFE";
    const apiKey = process.env.CLOUDINARY_API_KEY || "563756515665637";
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "daty5uqxm";

    // Standard upload parameters
    const folder = "mbsys_cms";
    
    // Sort parameters alphabetically
    const params = `folder=${folder}&timestamp=${timestamp}`;
    
    // Sign using SHA-1 (Cloudinary standard)
    const signature = crypto
      .createHash("sha1")
      .update(params + apiSecret)
      .digest("hex");

    return NextResponse.json({
      signature,
      timestamp,
      folder,
      apiKey,
      cloudName,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to generate upload signature" }, { status: 500 });
  }
}
