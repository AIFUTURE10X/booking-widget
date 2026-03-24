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
}

export interface BookingSubmission extends BookingData {
  widgetConfigId: string;
  businessName: string;
  submittedAt: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}
