import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

/**
 * POST /api/checkout — create a Stripe Checkout session for a reservation.
 *
 * Requires STRIPE_SECRET_KEY env var.
 * Optionally set STRIPE_WEBHOOK_SECRET for webhook verification.
 */
export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  try {
    const data = await req.json();
    const {
      facility,
      activity,
      date,
      timeSlot,
      duration,        // minutes
      groupSize,
      pricePerHour,    // dollars (e.g. 30)
      currency,        // e.g. "aud"
      businessName,
      customerEmail,
      customerName,
      widgetConfigId,
      reservationData, // full reservation data to pass through
    } = data;

    if (!pricePerHour || !duration || !facility) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const stripe = new Stripe(secretKey);

    // Calculate total price
    const hours = duration / 60;
    const totalCents = Math.round(pricePerHour * hours * 100);
    const curr = currency || "aud";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: curr,
            product_data: {
              name: `${facility} — ${activity}`,
              description: `${date} at ${timeSlot} (${duration} min)${groupSize > 1 ? ` · ${groupSize} people` : ""}`,
            },
            unit_amount: totalCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        widgetConfigId: widgetConfigId || "",
        businessName: businessName || "",
        customerName: customerName || "",
        facility,
        activity,
        date,
        timeSlot,
        duration: String(duration),
        groupSize: String(groupSize || 1),
        reservationData: JSON.stringify(reservationData || {}),
      },
      success_url: `${req.nextUrl.origin}/booking-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/preview`,
    });

    return NextResponse.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    console.error("[Checkout] Error:", err);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
