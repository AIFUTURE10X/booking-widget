import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/auth — simple PIN-based dashboard authentication.
 * Set DASHBOARD_PIN env var on Vercel (e.g. "1234").
 * Defaults to "0000" if not set.
 */
export async function POST(req: NextRequest) {
  try {
    const { pin } = await req.json();
    const correctPin = process.env.DASHBOARD_PIN || "0000";

    if (pin === correctPin) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
