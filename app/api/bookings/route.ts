import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbBookings, bbWidgets } from "@/lib/schema";
import { eq, desc } from "drizzle-orm";
import { sendBookingEmail, sendCustomerConfirmationEmail } from "@/lib/notifications/email";
import { sendBookingSms } from "@/lib/notifications/sms";
import { createCalendarEvent } from "@/lib/integrations/google-calendar";

/**
 * POST /api/bookings — receives booking submissions from the widget.
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.firstName || !data.phone || !data.category || !data.specificService) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const bookingRef = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    await db.insert(bbBookings).values({
      bookingRef,
      widgetConfigId: data.widgetConfigId || "",
      businessName: data.businessName || "",
      status: "pending",
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      category: data.category,
      serviceType: data.serviceType,
      specificService: data.specificService,
      preferredDate: data.preferredDate,
      preferredTime: data.preferredTime,
      postcode: data.postcode,
      address: data.address,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      isOwner: data.isOwner ? "true" : "false",
      notes: data.notes,
    });

    // Look up widget config for notifications
    let widgetPhone = "";
    if (data.widgetConfigId) {
      const widgets = await db.select().from(bbWidgets).where(eq(bbWidgets.configId, data.widgetConfigId)).limit(1);
      const widget = widgets[0];
      widgetPhone = widget?.phone || "";
      if (widget?.notifyEmail) {
        sendBookingEmail(data, widget.notifyEmail).catch(console.error);
      }
      if (widget?.notifySms) {
        sendBookingSms(data, widget.notifySms).catch(console.error);
      }
    }

    // Send confirmation email to the customer
    if (data.email) {
      const submissionData = { ...data, widgetConfigId: data.widgetConfigId || "", submittedAt: new Date().toISOString(), status: "pending" as const };
      sendCustomerConfirmationEmail(submissionData, widgetPhone).catch(console.error);
    }

    // Create Google Calendar event (non-blocking)
    createCalendarEvent({
      title: `${data.specificService} — ${data.firstName} ${data.lastName}`,
      description: `${data.category} > ${data.serviceType} > ${data.specificService}${data.notes ? `\nNotes: ${data.notes}` : ""}${data.recurring ? `\nRecurring: ${data.recurring}` : ""}`,
      date: data.preferredDate,
      timeSlot: data.preferredTime,
      location: [data.address, data.city, data.state, data.postcode].filter(Boolean).join(", "),
      customerName: `${data.firstName} ${data.lastName}`,
      customerPhone: data.phone,
      customerEmail: data.email,
    }).catch(console.error);

    console.log(`[Booking] ${bookingRef} — ${data.firstName} ${data.lastName} — ${data.specificService}`);

    return NextResponse.json({ success: true, bookingId: bookingRef });
  } catch (err) {
    console.error("[Booking] Error:", err);
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }
}

/**
 * GET /api/bookings — list all bookings for the dashboard inbox
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const widgetId = searchParams.get("widgetId");

  let bookings;
  if (widgetId) {
    bookings = await db.select().from(bbBookings).where(eq(bbBookings.widgetConfigId, widgetId)).orderBy(desc(bbBookings.submittedAt));
  } else {
    bookings = await db.select().from(bbBookings).orderBy(desc(bbBookings.submittedAt));
  }

  // Map to frontend format
  const mapped = bookings.map((b) => ({
    id: b.bookingRef,
    widgetConfigId: b.widgetConfigId,
    businessName: b.businessName,
    status: b.status,
    firstName: b.firstName,
    lastName: b.lastName,
    phone: b.phone,
    email: b.email,
    category: b.category,
    serviceType: b.serviceType,
    specificService: b.specificService,
    preferredDate: b.preferredDate,
    preferredTime: b.preferredTime,
    postcode: b.postcode,
    address: b.address,
    addressLine2: b.addressLine2,
    city: b.city,
    state: b.state,
    notes: b.notes,
    submittedAt: b.submittedAt,
  }));

  return NextResponse.json(mapped);
}

/**
 * PATCH /api/bookings — update booking status
 */
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const result = await db.update(bbBookings)
      .set({ status, updatedAt: new Date() })
      .where(eq(bbBookings.bookingRef, id))
      .returning();

    if (result.length === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
