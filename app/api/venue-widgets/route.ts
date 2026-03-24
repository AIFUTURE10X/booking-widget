import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbVenueWidgets } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

/** GET /api/venue-widgets — list all configured venue widgets */
export async function GET() {
  const widgets = await db.select().from(bbVenueWidgets).orderBy(desc(bbVenueWidgets.createdAt));

  const mapped = widgets.map((w) => ({
    configId: w.configId,
    venueTypeId: w.venueTypeId,
    businessName: w.businessName,
    phone: w.phone,
    accentColor: w.accentColor,
    notifyEmail: w.notifyEmail,
    notifySms: w.notifySms,
    enabledFacilities: w.enabledFacilities,
    enabledActivities: w.enabledActivities,
  }));

  return NextResponse.json(mapped);
}

/** POST /api/venue-widgets — create or update a venue widget config */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.businessName || !data.configId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const existing = await db.select().from(bbVenueWidgets).where(eq(bbVenueWidgets.configId, data.configId)).limit(1);

    if (existing.length > 0) {
      await db.update(bbVenueWidgets).set({
        venueTypeId: data.venueTypeId || data.configId,
        businessName: data.businessName,
        phone: data.phone,
        accentColor: data.accentColor,
        notifyEmail: data.notifyEmail,
        notifySms: data.notifySms,
        enabledFacilities: data.enabledFacilities,
        enabledActivities: data.enabledActivities,
        updatedAt: new Date(),
      }).where(eq(bbVenueWidgets.configId, data.configId));
    } else {
      await db.insert(bbVenueWidgets).values({
        configId: data.configId,
        venueTypeId: data.venueTypeId || data.configId,
        businessName: data.businessName,
        phone: data.phone,
        accentColor: data.accentColor,
        notifyEmail: data.notifyEmail,
        notifySms: data.notifySms,
        enabledFacilities: data.enabledFacilities,
        enabledActivities: data.enabledActivities,
      });
    }

    return NextResponse.json({ success: true, configId: data.configId });
  } catch (err) {
    console.error("[VenueWidget] Error:", err);
    return NextResponse.json({ error: "Invalid widget data" }, { status: 400 });
  }
}

/** DELETE /api/venue-widgets — delete a venue widget config */
export async function DELETE(req: NextRequest) {
  try {
    const { configId } = await req.json();
    if (!configId) {
      return NextResponse.json({ error: "Missing configId" }, { status: 400 });
    }

    const result = await db.delete(bbVenueWidgets).where(eq(bbVenueWidgets.configId, configId)).returning();
    if (result.length === 0) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
