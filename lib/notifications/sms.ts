import type { BookingSubmission } from "../types";

/**
 * Send SMS notification when a new booking comes in.
 * Uses a simple webhook approach — compatible with Twilio, MessageBird, or any SMS API.
 * Requires SMS_WEBHOOK_URL env var.
 */

export async function sendBookingSms(booking: BookingSubmission, toPhone: string) {
  const webhookUrl = process.env.SMS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[SMS] SMS_WEBHOOK_URL not set — skipping SMS notification");
    return;
  }

  const serviceLine = `${booking.category.replace(/-/g, " ")} > ${booking.specificService}`;
  const message = [
    `NEW BOOKING`,
    `${booking.firstName} ${booking.lastName}`,
    `Service: ${serviceLine}`,
    `When: ${booking.preferredDate} ${booking.preferredTime}`,
    `Call: ${booking.phone}`,
  ].join("\n");

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: toPhone,
        message,
      }),
    });
  } catch (err) {
    console.error("[SMS] Failed to send notification:", err);
  }
}
