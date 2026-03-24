import type { VenueConfig } from "../../types";

export const sportsFieldConfig: VenueConfig = {
  venueType: "sports-field",
  title: "Book a Field",
  facilities: [
    { id: "field-a", label: "Field A", emoji: "\u26BD", description: "Full-size — natural turf" },
    { id: "field-b", label: "Field B", emoji: "\u26BD", description: "Full-size — synthetic" },
    { id: "field-c", label: "Field C", emoji: "\uD83C\uDFC8", description: "Half field — synthetic" },
    { id: "futsal-court", label: "Futsal Court", emoji: "\u26BD", description: "Indoor — hard court" },
  ],
  activities: ["Soccer", "Football", "Rugby", "Futsal", "Touch Football", "Cricket", "Team Training", "Private Hire"],
  durations: [
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
    { label: "2 hours", minutes: 120 },
    { label: "3 hours", minutes: 180 },
  ],
  operatingHours: { open: "06:00", close: "22:00" },
  slotInterval: 30,
  maxGroupSize: 30,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a 50% fee.",
  pricePerHour: 40,
  currency: "aud",
};
