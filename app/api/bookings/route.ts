import { NextRequest, NextResponse } from "next/server";
import type { BookingSubmission } from "@/lib/types";
import { saveBooking, getAllBookings, updateBookingStatus } from "@/lib/storage/bookings";
import { getWidget } from "@/lib/storage/widgets";
import { sendBookingEmail } from "@/lib/notifications/email";
import { sendBookingSms } from "@/lib/notifications/sms";

/**
 * POST /api/bookings — receives booking submissions from the widget.
 * Level 1: Stores booking + sends email/SMS notifications
 * Level 2: Available in dashboard inbox via GET
 */
export async function POST(req: NextRequest) {
  try {
    const booking: BookingSubmission = await req.json();

    if (!booking.firstName || !booking.phone || !booking.category || !booking.specificService) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Store the booking
    const bookingId = saveBooking(booking);

    // Send notifications (non-blocking)
    const widget = getWidget(booking.widgetConfigId);
    if (widget?.notifyEmail) {
      sendBookingEmail(booking, widget.notifyEmail).catch(console.error);
    }
    if (widget?.notifySms) {
      sendBookingSms(booking, widget.notifySms).catch(console.error);
    }

    console.log(`[Booking] ${bookingId} — ${booking.firstName} ${booking.lastName} — ${booking.specificService}`);

    return NextResponse.json({ success: true, bookingId });
  } catch {
    return NextResponse.json({ error: "Invalid booking data" }, { status: 400 });
  }
}

/**
 * GET /api/bookings — list all bookings for the dashboard inbox
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const widgetId = searchParams.get("widgetId");

  const bookings = getAllBookings();
  const filtered = widgetId ? bookings.filter((b) => b.widgetConfigId === widgetId) : bookings;

  return NextResponse.json(filtered);
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
    const updated = updateBookingStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
