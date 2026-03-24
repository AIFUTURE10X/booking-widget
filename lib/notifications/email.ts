import { Resend } from "resend";
import type { BookingSubmission } from "../types";

/**
 * Send confirmation email to the CUSTOMER who made the booking.
 */
export async function sendCustomerConfirmationEmail(booking: BookingSubmission, businessPhone: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || !booking.email) {
    console.warn("[Email] Skipping customer confirmation — no API key or customer email");
    return;
  }

  const resend = new Resend(apiKey);

  const serviceLine = `${booking.category.replace(/-/g, " ")} > ${booking.serviceType} > ${booking.specificService}`;

  await resend.emails.send({
    from: "BookButton <bookings@bookbutton.io>",
    to: booking.email,
    subject: `Booking Confirmed — ${booking.businessName}`,
    html: `
      <div style="font-family: system-ui, sans-serif; max-width: 500px;">
        <h2 style="color: #0891b2; margin-bottom: 4px;">Booking Received!</h2>
        <p style="color: #6b7280; margin-top: 0;">Hi ${booking.firstName}, your booking with <strong>${booking.businessName}</strong> has been received.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #e5e7eb; border-radius: 8px;">
          <tr>
            <td style="padding: 10px 14px; background: #f0fdfa; font-weight: 600; width: 130px; border-bottom: 1px solid #e5e7eb;">Service</td>
            <td style="padding: 10px 14px; text-transform: capitalize; border-bottom: 1px solid #e5e7eb;">${serviceLine}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; background: #f0fdfa; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Date</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb;">${booking.preferredDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; background: #f0fdfa; font-weight: 600; border-bottom: 1px solid #e5e7eb;">Time</td>
            <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb;">${booking.preferredTime}</td>
          </tr>
          <tr>
            <td style="padding: 10px 14px; background: #f0fdfa; font-weight: 600;">Location</td>
            <td style="padding: 10px 14px;">${booking.address || ""} ${booking.city || ""} ${booking.state || ""} ${booking.postcode || ""}</td>
          </tr>
        </table>

        <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #374151;">
            <strong>${booking.businessName}</strong> will contact you shortly to confirm.
          </p>
          <p style="margin: 8px 0 0; font-size: 13px; color: #6b7280;">
            Questions? Call them at <a href="tel:${businessPhone}" style="color: #0891b2; font-weight: 600;">${businessPhone}</a>
          </p>
        </div>

        <p style="color: #9ca3af; font-size: 11px; margin-top: 24px;">Powered by BookButton.io</p>
      </div>
    `,
  });
}

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
