import fs from "fs";
import path from "path";
import type { BookingSubmission } from "../types";

/**
 * Simple file-based booking storage for MVP.
 * Replace with a real database (Drizzle + PostgreSQL) later.
 */

const DATA_DIR = path.join(process.cwd(), ".data");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readBookings(): (BookingSubmission & { id: string })[] {
  ensureDataDir();
  if (!fs.existsSync(BOOKINGS_FILE)) return [];
  const raw = fs.readFileSync(BOOKINGS_FILE, "utf-8");
  return JSON.parse(raw);
}

function writeBookings(bookings: (BookingSubmission & { id: string })[]) {
  ensureDataDir();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
}

export function saveBooking(booking: BookingSubmission): string {
  const bookings = readBookings();
  const id = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  bookings.unshift({ ...booking, id });
  writeBookings(bookings);
  return id;
}

export function getAllBookings(): (BookingSubmission & { id: string })[] {
  return readBookings();
}

export function getBookingsByWidget(widgetConfigId: string): (BookingSubmission & { id: string })[] {
  return readBookings().filter((b) => b.widgetConfigId === widgetConfigId);
}

export function updateBookingStatus(id: string, status: BookingSubmission["status"]): boolean {
  const bookings = readBookings();
  const booking = bookings.find((b) => b.id === id);
  if (!booking) return false;
  booking.status = status;
  writeBookings(bookings);
  return true;
}
