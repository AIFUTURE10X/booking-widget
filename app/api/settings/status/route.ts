import { NextResponse } from "next/server";

/**
 * GET /api/settings/status — check which integrations are configured
 */
export async function GET() {
  return NextResponse.json({
    resend: !!process.env.RESEND_API_KEY,
    sms: !!process.env.SMS_WEBHOOK_URL,
    googleCalendar: !!(process.env.GOOGLE_CALENDAR_CLIENT_EMAIL && process.env.GOOGLE_CALENDAR_PRIVATE_KEY),
    stripe: !!process.env.STRIPE_SECRET_KEY,
    dashboardPin: !!process.env.DASHBOARD_PIN && process.env.DASHBOARD_PIN !== "0000",
  });
}
