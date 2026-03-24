import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbReservations, bbVenueWidgets } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { sendBookingEmail } from "@/lib/notifications/email";
import { sendBookingSms } from "@/lib/notifications/sms";
import { createCalendarEvent } from "@/lib/integrations/google-calendar";

/**
 * POST /api/reservations — receives reservation submissions from the widget.
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.firstName || !data.phone || !data.facility || !data.timeSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reservationRef = `RV-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    await db.insert(bbReservations).values({
      reservationRef,
      widgetConfigId: data.widgetConfigId || "",
      businessName: data.businessName || "",
      status: "pending",
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      facility: data.facility,
      activity: data.activity,
      date: data.date,
      timeSlot: data.timeSlot,
      duration: data.duration,
      groupSize: data.groupSize || 1,
      notes: data.notes,
    });

    // Send notifications (non-blocking)
    if (data.widgetConfigId) {
      const widgets = await db.select().from(bbVenueWidgets).where(eq(bbVenueWidgets.configId, data.widgetConfigId)).limit(1);
      const widget = widgets[0];
      if (widget?.notifyEmail) {
        // Reuse booking email with reservation-specific fields
        const emailData = {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          category: data.facility,
          serviceType: data.activity,
          specificService: `${data.date} at ${data.timeSlot} (${data.duration} min)`,
          preferredDate: data.date,
          preferredTime: data.timeSlot,
          widgetConfigId: data.widgetConfigId || "",
          businessName: data.businessName || "",
          submittedAt: new Date().toISOString(),
          status: "pending" as const,
          postcode: "", address: "", addressLine2: "", city: "", state: "",
          isOwner: false, notes: data.notes || "",
        };
        sendBookingEmail(emailData, widget.notifyEmail).catch(console.error);
      }
      if (widget?.notifySms) {
        const smsData = {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          category: data.facility,
          serviceType: data.activity,
          specificService: `${data.facility} — ${data.activity}`,
          preferredDate: data.date,
          preferredTime: data.timeSlot,
          widgetConfigId: data.widgetConfigId || "",
          businessName: data.businessName || "",
          submittedAt: new Date().toISOString(),
          status: "pending" as const,
          postcode: "", address: "", addressLine2: "", city: "", state: "",
          isOwner: false, notes: data.notes || "",
        };
        sendBookingSms(smsData, widget.notifySms).catch(console.error);
      }
    }

    // Create Google Calendar event (non-blocking)
    createCalendarEvent({
      title: `${data.activity} — ${data.firstName} ${data.lastName}`,
      description: `Facility: ${data.facility}\nActivity: ${data.activity}\nDuration: ${data.duration} min\nGroup size: ${data.groupSize || 1}${data.notes ? `\nNotes: ${data.notes}` : ""}`,
      date: data.date,
      timeSlot: data.timeSlot,
      duration: data.duration,
      customerName: `${data.firstName} ${data.lastName}`,
      customerPhone: data.phone,
      customerEmail: data.email,
    }).catch(console.error);

    console.log(`[Reservation] ${reservationRef} — ${data.firstName} ${data.lastName} — ${data.facility} ${data.activity} ${data.date} ${data.timeSlot}`);

    return NextResponse.json({ success: true, reservationId: reservationRef });
  } catch (err) {
    console.error("[Reservation] Error:", err);
    return NextResponse.json({ error: "Invalid reservation data" }, { status: 400 });
  }
}

/**
 * GET /api/reservations — list all reservations for the dashboard
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const widgetId = searchParams.get("widgetId");

  let reservations;
  if (widgetId) {
    reservations = await db.select().from(bbReservations).where(eq(bbReservations.widgetConfigId, widgetId)).orderBy(desc(bbReservations.submittedAt));
  } else {
    reservations = await db.select().from(bbReservations).orderBy(desc(bbReservations.submittedAt));
  }

  const mapped = reservations.map((r) => ({
    id: r.reservationRef,
    widgetConfigId: r.widgetConfigId,
    businessName: r.businessName,
    status: r.status,
    firstName: r.firstName,
    lastName: r.lastName,
    phone: r.phone,
    email: r.email,
    facility: r.facility,
    activity: r.activity,
    date: r.date,
    timeSlot: r.timeSlot,
    duration: r.duration,
    groupSize: r.groupSize,
    notes: r.notes,
    submittedAt: r.submittedAt,
  }));

  return NextResponse.json(mapped);
}

/**
 * PATCH /api/reservations — update reservation status
 */
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const result = await db.update(bbReservations)
      .set({ status, updatedAt: new Date() })
      .where(eq(bbReservations.reservationRef, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
