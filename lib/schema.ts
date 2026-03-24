import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// ─── Widget Configs ─────────────────────────────────────────────────────────

export const bbWidgets = pgTable("bb_widgets", {
  id: serial("id").primaryKey(),
  configId: text("config_id").unique().notNull(),
  industryId: text("industry_id").notNull(),          // e.g. "plumbing", "pest-control"
  businessName: text("business_name").notNull(),
  phone: text("phone").notNull(),
  accentColor: text("accent_color").default("#0891b2"),
  notifyEmail: text("notify_email"),
  notifySms: text("notify_sms"),
  enabledCategories: jsonb("enabled_categories"),      // string[] or null for all
  customServices: jsonb("custom_services"),             // Record<string, Record<string, string[]>>
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ─── Bookings ───────────────────────────────────────────────────────────────

export const bbBookings = pgTable("bb_bookings", {
  id: serial("id").primaryKey(),
  bookingRef: text("booking_ref").unique().notNull(),   // e.g. "BK-1774305754244-j2iu"
  widgetConfigId: text("widget_config_id").notNull(),
  businessName: text("business_name").notNull(),
  status: text("status").notNull().default("pending"),  // pending | confirmed | completed | cancelled

  // Customer info
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),

  // Service details
  category: text("category").notNull(),
  serviceType: text("service_type").notNull(),
  specificService: text("specific_service").notNull(),

  // Schedule
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),

  // Location
  postcode: text("postcode"),
  address: text("address"),
  addressLine2: text("address_line2"),
  city: text("city"),
  state: text("state"),

  // Extra
  isOwner: text("is_owner"),                             // "true" / "false"
  notes: text("notes"),

  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ─── Widget Analytics ──────────────────────────────────────────────────────

export const bbAnalytics = pgTable("bb_analytics", {
  id: serial("id").primaryKey(),
  widgetConfigId: text("widget_config_id").notNull(),
  event: text("event").notNull(),              // "impression" | "open" | "step" | "submit"
  step: integer("step"),                        // which step (0-4)
  metadata: jsonb("metadata"),                  // extra data
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// ─── Venue Widgets (reservation booking) ───────────────────────────────────

export const bbVenueWidgets = pgTable("bb_venue_widgets", {
  id: serial("id").primaryKey(),
  configId: text("config_id").unique().notNull(),
  venueTypeId: text("venue_type_id").notNull(),       // e.g. "tennis", "function-room"
  businessName: text("business_name").notNull(),
  phone: text("phone").notNull(),
  accentColor: text("accent_color").default("#8b5cf6"),
  notifyEmail: text("notify_email"),
  notifySms: text("notify_sms"),
  enabledFacilities: jsonb("enabled_facilities"),      // string[] or null for all
  enabledActivities: jsonb("enabled_activities"),      // string[] or null for all
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// ─── Reservations ──────────────────────────────────────────────────────────

export const bbReservations = pgTable("bb_reservations", {
  id: serial("id").primaryKey(),
  reservationRef: text("reservation_ref").unique().notNull(), // e.g. "RV-1774305754244-j2iu"
  widgetConfigId: text("widget_config_id").notNull(),
  businessName: text("business_name").notNull(),
  status: text("status").notNull().default("pending"),        // pending | confirmed | completed | cancelled

  // Customer info
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),

  // Reservation details
  facility: text("facility").notNull(),              // e.g. "Court 1"
  activity: text("activity").notNull(),              // e.g. "Tennis"
  date: text("date").notNull(),                      // e.g. "2026-04-15"
  timeSlot: text("time_slot").notNull(),             // e.g. "10:00 AM"
  duration: integer("duration").notNull(),           // minutes
  groupSize: integer("group_size").notNull().default(1),

  // Extra
  notes: text("notes"),

  submittedAt: timestamp("submitted_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});
