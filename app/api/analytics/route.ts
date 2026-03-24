import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbAnalytics } from "@/lib/schema";
import { eq, sql, desc } from "drizzle-orm";

/**
 * POST /api/analytics — track widget events (impression, open, step, submit)
 */
export async function POST(req: NextRequest) {
  try {
    const { widgetConfigId, event, step, metadata } = await req.json();
    if (!widgetConfigId || !event) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await db.insert(bbAnalytics).values({
      widgetConfigId,
      event,
      step: step ?? null,
      metadata: metadata ?? null,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

/**
 * GET /api/analytics?widgetId=... — get analytics summary for a widget
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const widgetId = searchParams.get("widgetId");

  const conditions = widgetId ? eq(bbAnalytics.widgetConfigId, widgetId) : undefined;

  const counts = await db
    .select({
      widgetConfigId: bbAnalytics.widgetConfigId,
      event: bbAnalytics.event,
      count: sql<number>`count(*)::int`,
    })
    .from(bbAnalytics)
    .where(conditions)
    .groupBy(bbAnalytics.widgetConfigId, bbAnalytics.event)
    .orderBy(desc(sql`count(*)`));

  // Group by widget
  const byWidget: Record<string, Record<string, number>> = {};
  for (const row of counts) {
    if (!byWidget[row.widgetConfigId]) byWidget[row.widgetConfigId] = {};
    byWidget[row.widgetConfigId][row.event] = row.count;
  }

  const result = Object.entries(byWidget).map(([widgetConfigId, events]) => ({
    widgetConfigId,
    impressions: events.impression || 0,
    opens: events.open || 0,
    submissions: events.submit || 0,
    conversionRate: events.impression > 0 ? Math.round((events.submit || 0) / events.impression * 100) : 0,
  }));

  return NextResponse.json(result);
}
