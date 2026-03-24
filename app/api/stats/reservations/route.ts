import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbReservations, bbVenueWidgets } from "@/lib/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    // Get all venue widgets
    const widgets = await db.select().from(bbVenueWidgets);

    // Get reservation counts grouped by widget and status
    const reservations = await db
      .select({
        widgetConfigId: bbReservations.widgetConfigId,
        status: bbReservations.status,
        count: sql<number>`count(*)::int`,
      })
      .from(bbReservations)
      .groupBy(bbReservations.widgetConfigId, bbReservations.status);

    // Build stats per widget
    const statsMap = new Map<string, { total: number; pending: number; confirmed: number; completed: number; cancelled: number }>();

    for (const r of reservations) {
      if (!statsMap.has(r.widgetConfigId)) {
        statsMap.set(r.widgetConfigId, { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0 });
      }
      const s = statsMap.get(r.widgetConfigId)!;
      s.total += r.count;
      if (r.status === "pending") s.pending = r.count;
      if (r.status === "confirmed") s.confirmed = r.count;
      if (r.status === "completed") s.completed = r.count;
      if (r.status === "cancelled") s.cancelled = r.count;
    }

    // Merge with widget info
    const result = widgets
      .map((w) => {
        const stats = statsMap.get(w.configId);
        return {
          configId: w.configId,
          businessName: w.businessName,
          accentColor: w.accentColor || "#7c3aed",
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
    console.error("[Stats/Reservations] Error:", err);
    return NextResponse.json([]);
  }
}
