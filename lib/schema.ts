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
