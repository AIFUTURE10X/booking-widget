/** Core types for the config-driven booking widget */

export interface ServiceCategory {
  id: string;
  label: string;
  emoji: string;
}

export interface IndustryConfig {
  industry: string;
  title: string;
  categories: ServiceCategory[];
  services: Record<string, Record<string, string[]>>;
  serviceTypes: string[];
  timeSlots: string[];
  states: string[];
  propertyQuestion?: string; // e.g. "I am the owner of this property"
  urgencyOptions?: string[]; // e.g. ["Routine", "Urgent", "Emergency"]
  businessHours?: { open: string; close: string }; // e.g. { open: "07:00", close: "18:00" }
}

export interface WidgetConfig {
  /** Which industry config to use */
  configId: string;
  /** Business display name */
  businessName: string;
  /** Business phone number */
  phone: string;
  /** Which industry config this widget uses */
  industryId?: string;
  /** Brand accent color (hex) */
  accentColor: string;
  /** Optional: override which categories to show (subset of industry config) */
  enabledCategories?: string[];
  /** Optional: custom services to add beyond the industry defaults */
  customServices?: Record<string, Record<string, string[]>>;
  /** API endpoint to submit bookings to */
  apiEndpoint?: string;
  /** Email to send booking notifications to */
  notifyEmail?: string;
  /** SMS number to send booking notifications to */
  notifySms?: string;
}

export interface BookingData {
  postcode: string;
  category: string;
  serviceType: string;
  specificService: string;
  preferredDate: string;
  preferredTime: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  isOwner: boolean;
  address: string;
  addressLine2: string;
  city: string;
  state: string;
  notes: string;
  photoUrls?: string[];       // URLs of uploaded photos
  recurring?: string;          // e.g. "weekly", "fortnightly", "monthly", ""
}

export interface BookingSubmission extends BookingData {
  widgetConfigId: string;
  businessName: string;
  submittedAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

/* ─── Reservation Booking (venues / courts / rooms) ──────────────────────── */

export interface Facility {
  id: string;
  label: string;
  emoji: string;
  description?: string;
}

export interface VenueConfig {
  venueType: string;
  title: string;
  facilities: Facility[];
  activities: string[];
  durations: { label: string; minutes: number }[];
  operatingHours: { open: string; close: string }; // e.g. "06:00", "22:00"
  slotInterval: number; // minutes between slots (e.g. 30)
  maxGroupSize: number;
  states: string[];
  cancellationPolicy?: string; // e.g. "Free cancellation up to 24 hours before"
}

export interface ReservationWidgetConfig {
  configId: string;
  businessName: string;
  phone: string;
  venueTypeId?: string;
  accentColor: string;
  enabledFacilities?: string[];
  enabledActivities?: string[];
  apiEndpoint?: string;
  notifyEmail?: string;
  notifySms?: string;
}

export interface ReservationData {
  facility: string;
  activity: string;
  date: string;
  timeSlot: string;
  duration: number; // minutes
  groupSize: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  notes: string;
  recurring?: string; // e.g. "weekly", "fortnightly", "monthly", ""
}

export interface ReservationSubmission extends ReservationData {
  widgetConfigId: string;
  businessName: string;
  submittedAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}
