import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbWidgets } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";

/** GET /api/widgets — list all configured widgets */
export async function GET() {
  const widgets = await db.select().from(bbWidgets).orderBy(desc(bbWidgets.createdAt));

  const mapped = widgets.map((w) => ({
    configId: w.configId,
    industryId: w.industryId,
    businessName: w.businessName,
    phone: w.phone,
    accentColor: w.accentColor,
    notifyEmail: w.notifyEmail,
    notifySms: w.notifySms,
    enabledCategories: w.enabledCategories,
    customServices: w.customServices,
  }));

  return NextResponse.json(mapped);
}

/** POST /api/widgets — create or update a widget config */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.businessName || !data.configId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Upsert: try update first, insert if not found
    const existing = await db.select().from(bbWidgets).where(eq(bbWidgets.configId, data.configId)).limit(1);

    if (existing.length > 0) {
      await db.update(bbWidgets).set({
        industryId: data.industryId || data.configId,
        businessName: data.businessName,
        phone: data.phone,
        accentColor: data.accentColor,
        notifyEmail: data.notifyEmail,
        notifySms: data.notifySms,
        enabledCategories: data.enabledCategories,
        customServices: data.customServices,
        updatedAt: new Date(),
      }).where(eq(bbWidgets.configId, data.configId));
    } else {
      await db.insert(bbWidgets).values({
        configId: data.configId,
        industryId: data.industryId || data.configId,
        businessName: data.businessName,
        phone: data.phone,
        accentColor: data.accentColor,
        notifyEmail: data.notifyEmail,
        notifySms: data.notifySms,
        enabledCategories: data.enabledCategories,
        customServices: data.customServices,
      });
    }

    return NextResponse.json({ success: true, configId: data.configId });
  } catch (err) {
    console.error("[Widget] Error:", err);
    return NextResponse.json({ error: "Invalid widget data" }, { status: 400 });
  }
}

/** DELETE /api/widgets — delete a widget config */
export async function DELETE(req: NextRequest) {
  try {
    const { configId } = await req.json();
    if (!configId) {
      return NextResponse.json({ error: "Missing configId" }, { status: 400 });
    }

    const result = await db.delete(bbWidgets).where(eq(bbWidgets.configId, configId)).returning();
    if (result.length === 0) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
