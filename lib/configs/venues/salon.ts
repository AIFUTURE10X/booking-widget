import type { VenueConfig } from "../../types";

export const salonConfig: VenueConfig = {
  venueType: "salon",
  title: "Book an Appointment",
  facilities: [
    { id: "stylist-1", label: "Stylist 1", emoji: "\u2702\uFE0F", description: "Senior stylist" },
    { id: "stylist-2", label: "Stylist 2", emoji: "\u2702\uFE0F", description: "Senior stylist" },
    { id: "stylist-3", label: "Stylist 3", emoji: "\u2702\uFE0F", description: "Junior stylist" },
    { id: "barber-chair", label: "Barber Chair", emoji: "\uD83D\uDC88", description: "Walk-ins welcome" },
  ],
  activities: ["Haircut", "Colour", "Blow Dry", "Highlights", "Balayage", "Beard Trim", "Shave", "Treatment"],
  durations: [
    { label: "30 min", minutes: 30 },
    { label: "45 min", minutes: 45 },
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
    { label: "2 hours", minutes: 120 },
  ],
  operatingHours: { open: "09:00", close: "19:00" },
  slotInterval: 15,
  maxGroupSize: 1,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a fee.",
  pricePerHour: 60,
  currency: "aud",
};
