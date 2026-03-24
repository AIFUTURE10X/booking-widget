import { Resend } from "resend";
import type { BookingSubmission } from "../types";

/**
 * Send email notification when a new booking comes in.
 * Requires RESEND_API_KEY env var.
 */

export async function sendBookingEmail(booking: BookingSubmission, toEmail: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY not set — skipping email notification");
    return;
  }

  const resend = new Resend(apiKey);

  const serviceLine = `${booking.category.replace(/-/g, " ")} > ${booking.serviceType} > ${booking.specificService}`;

  await resend.emails.send({
    from: "Booking Widget <bookings@bookbutton.io>",
    to: toEmail,
    subject: `New Booking: ${booking.firstName} ${booking.lastName} — ${booking.specificService}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px;">
        <h2 style="color: #0891b2; margin-bottom: 4px;">New Booking Request</h2>
        <p style="color: #6b7280; margin-top: 0;">from your website booking widget</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600; width: 120px;">Customer</td>
            <td style="padding: 8px 12px;">${booking.firstName} ${booking.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Phone</td>
            <td style="padding: 8px 12px;"><a href="tel:${booking.phone}">${booking.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Email</td>
            <td style="padding: 8px 12px;"><a href="mailto:${booking.email}">${booking.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Service</td>
            <td style="padding: 8px 12px; text-transform: capitalize;">${serviceLine}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Preferred Date</td>
            <td style="padding: 8px 12px;">${booking.preferredDate}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Preferred Time</td>
            <td style="padding: 8px 12px;">${booking.preferredTime}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Address</td>
            <td style="padding: 8px 12px;">${booking.address} ${booking.addressLine2}, ${booking.city} ${booking.state} ${booking.postcode}</td>
          </tr>
          ${booking.notes ? `
          <tr>
            <td style="padding: 8px 12px; background: #f9fafb; font-weight: 600;">Notes</td>
            <td style="padding: 8px 12px;">${booking.notes}</td>
          </tr>
          ` : ""}
        </table>

        <p style="color: #6b7280; font-size: 13px;">
          Call the customer to confirm: <a href="tel:${booking.phone}" style="color: #0891b2; font-weight: 600;">${booking.phone}</a>
        </p>
      </div>
    `,
  });
}
