import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bbBookings } from "@/lib/schema";
import { eq, or, desc } from "drizzle-orm";

/**
 * GET /api/portal?email=...&phone=...
 * Client self-serve portal — look up bookings by email or phone.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  if (!email && !phone) {
    return NextResponse.json({ error: "Provide email or phone" }, { status: 400 });
  }

  const conditions = [];
  if (email) conditions.push(eq(bbBookings.email, email));
  if (phone) conditions.push(eq(bbBookings.phone, phone));

  const bookings = await db
    .select()
    .from(bbBookings)
    .where(conditions.length > 1 ? or(...conditions) : conditions[0])
    .orderBy(desc(bbBookings.submittedAt));

  const mapped = bookings.map((b) => ({
    id: b.bookingRef,
    businessName: b.businessName,
    status: b.status,
    category: b.category,
    serviceType: b.serviceType,
    specificService: b.specificService,
    preferredDate: b.preferredDate,
    preferredTime: b.preferredTime,
    notes: b.notes,
    submittedAt: b.submittedAt,
  }));

  return NextResponse.json(mapped);
}
