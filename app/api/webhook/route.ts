import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";
import { bbReservations } from "@/lib/schema";
import { createCalendarEvent } from "@/lib/integrations/google-calendar";

/**
 * POST /api/webhook — Stripe webhook handler.
 * Listens for checkout.session.completed events to auto-confirm reservations.
 *
 * Set STRIPE_WEBHOOK_SECRET env var for signature verification.
 */
export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const stripe = new Stripe(secretKey);
  const body = await req.text();

  let event: Stripe.Event;

  if (webhookSecret) {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      console.error("[Webhook] Signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    event = JSON.parse(body) as Stripe.Event;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const meta = session.metadata || {};

    // Create the reservation in the database
    const reservationRef = `RV-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const reservationData = meta.reservationData ? JSON.parse(meta.reservationData) : {};

    try {
      await db.insert(bbReservations).values({
        reservationRef,
        widgetConfigId: meta.widgetConfigId || "",
        businessName: meta.businessName || "",
        status: "confirmed", // Auto-confirmed because they paid
        firstName: reservationData.firstName || meta.customerName?.split(" ")[0] || "",
        lastName: reservationData.lastName || meta.customerName?.split(" ").slice(1).join(" ") || "",
        phone: reservationData.phone || "",
        email: session.customer_email || reservationData.email || "",
        facility: meta.facility || "",
        activity: meta.activity || "",
        date: meta.date || "",
        timeSlot: meta.timeSlot || "",
        duration: parseInt(meta.duration || "60"),
        groupSize: parseInt(meta.groupSize || "1"),
        notes: reservationData.notes || `Paid $${(session.amount_total || 0) / 100} via Stripe`,
      });

      // Create Google Calendar event
      createCalendarEvent({
        title: `${meta.activity} — ${meta.customerName || "Customer"} (PAID)`,
        description: `Facility: ${meta.facility}\nActivity: ${meta.activity}\nDuration: ${meta.duration} min\nPaid: $${(session.amount_total || 0) / 100}\nStripe Session: ${session.id}`,
        date: meta.date || "",
        timeSlot: meta.timeSlot || "",
        duration: parseInt(meta.duration || "60"),
        customerName: meta.customerName || "",
        customerPhone: reservationData.phone || "",
        customerEmail: session.customer_email || "",
      }).catch(console.error);

      console.log(`[Webhook] Reservation confirmed after payment: ${reservationRef} — $${(session.amount_total || 0) / 100}`);
    } catch (err) {
      console.error("[Webhook] Failed to create reservation:", err);
    }
  }

  return NextResponse.json({ received: true });
}
