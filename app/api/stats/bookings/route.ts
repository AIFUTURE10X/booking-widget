import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbBookings, bbWidgets } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get all widgets
    const widgets = await db.select().from(bbWidgets);

    // Get booking counts grouped by widget and status
    const bookings = await db
      .select({
        widgetConfigId: bbBookings.widgetConfigId,
        status: bbBookings.status,
        count: sql<number>`count(*)::int`,
      })
      .from(bbBookings)
      .groupBy(bbBookings.widgetConfigId, bbBookings.status);

    // Build stats per widget
    const statsMap = new Map<string, { total: number; pending: number; confirmed: number; completed: number; cancelled: number }>();

    for (const b of bookings) {
      if (!statsMap.has(b.widgetConfigId)) {
        statsMap.set(b.widgetConfigId, { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
      }
      const s = statsMap.get(b.widgetConfigId)!;
      s.total += b.count;
      if (b.status === "pending") s.pending = b.count;
      if (b.status === "confirmed") s.confirmed = b.count;
      if (b.status === "completed") s.completed = b.count;
      if (b.status === "cancelled") s.cancelled = b.count;
    }

    // Merge with widget info
    const result = widgets
      .map((w) => {
        const stats = statsMap.get(w.configId);
        return {
          configId: w.configId,
          businessName: w.businessName,
          accentColor: w.accentColor || "#0891b2",
          total: stats?.total || 0,
          pending: stats?.pending || 0,
          confirmed: stats?.confirmed || 0,
          completed: stats?.completed || 0,
          cancelled: stats?.cancelled || 0,
        };
      })
      .filter((w) => w.total > 0)
      .sort((a, b) => b.total - a.total);

    return NextResponse.json(result);
  } catch (err) {
    console.error("[Stats/Bookings] Error:", err);
    return NextResponse.json([]);
  }
}
