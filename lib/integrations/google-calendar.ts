import { google } from "googleapis";

/**
 * Create a Google Calendar event for a new booking.
 *
 * Requires these env vars:
 *   GOOGLE_CALENDAR_CLIENT_EMAIL  — service account email
 *   GOOGLE_CALENDAR_PRIVATE_KEY   — service account private key (with \n line breaks)
 *   GOOGLE_CALENDAR_ID            — calendar ID (e.g. "primary" or a specific calendar)
 *
 * The service account must have write access to the calendar.
 * In Google Calendar settings, share the calendar with the service account email.
 */

interface BookingEvent {
  title: string;
  description: string;
  date: string;        // e.g. "2026-04-15"
  timeSlot: string;    // e.g. "Morning (7:00 AM - 12:00 PM)" or "10:00 AM"
  duration?: number;   // minutes, defaults to 60
  location?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
}

function parseTimeToHour(timeStr: string): { hour: number; minute: number } | null {
  // Try to extract time like "10:00 AM" or "2:30 PM"
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (match) {
    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const ampm = match[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return { hour, minute };
  }

  // Handle "Morning (7:00 AM - 12:00 PM)" style — use the start time
  const rangeMatch = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (rangeMatch) {
    let hour = parseInt(rangeMatch[1]);
    const minute = parseInt(rangeMatch[2]);
    const ampm = rangeMatch[3].toUpperCase();
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;
    return { hour, minute };
  }

  return null;
}

export async function createCalendarEvent(booking: BookingEvent): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_CALENDAR_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_CALENDAR_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  if (!clientEmail || !privateKey) {
    console.warn("[Calendar] Google Calendar credentials not set — skipping event creation");
    return null;
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.events"],
  });

  const calendar = google.calendar({ version: "v3", auth });

  // Parse the time slot
  const time = parseTimeToHour(booking.timeSlot);
  const durationMins = booking.duration || 60;

  let startDateTime: string;
  let endDateTime: string;

  if (time) {
    const start = new Date(`${booking.date}T${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(2, "0")}:00`);
    const end = new Date(start.getTime() + durationMins * 60 * 1000);
    startDateTime = start.toISOString();
    endDateTime = end.toISOString();
  } else {
    // All-day event if we can't parse the time
    startDateTime = `${booking.date}T09:00:00`;
    endDateTime = `${booking.date}T10:00:00`;
  }

  const event = {
    summary: booking.title,
    description: [
      booking.description,
      "",
      `Customer: ${booking.customerName}`,
      `Phone: ${booking.customerPhone}`,
      `Email: ${booking.customerEmail}`,
      "",
      "Created by BookButton.io",
    ].join("\n"),
    location: booking.location || undefined,
    start: {
      dateTime: startDateTime,
      timeZone: "Australia/Sydney",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "Australia/Sydney",
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: "popup", minutes: 30 },
      ],
    },
  };

  try {
    const result = await calendar.events.insert({
      calendarId,
      requestBody: event,
    });

    console.log(`[Calendar] Event created: ${result.data.id}`);
    return result.data.id || null;
  } catch (err) {
    console.error("[Calendar] Failed to create event:", err);
    return null;
  }
}
