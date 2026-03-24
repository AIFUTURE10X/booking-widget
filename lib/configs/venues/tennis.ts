import type { VenueConfig } from "../../types";

export const tennisConfig: VenueConfig = {
  venueType: "tennis",
  title: "Book a Court",
  facilities: [
    { id: "court-1", label: "Court 1", emoji: "\uD83C\uDFBE", description: "Hard court — outdoor" },
    { id: "court-2", label: "Court 2", emoji: "\uD83C\uDFBE", description: "Hard court — outdoor" },
    { id: "court-3", label: "Court 3", emoji: "\uD83C\uDFBE", description: "Grass court — outdoor" },
    { id: "court-4", label: "Court 4", emoji: "\uD83C\uDFBE", description: "Indoor court — covered" },
  ],
  activities: ["Tennis", "Pickleball", "Coaching Session", "Social Hit"],
  durations: [
    { label: "30 min", minutes: 30 },
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
    { label: "2 hours", minutes: 120 },
  ],
  operatingHours: { open: "06:00", close: "22:00" },
  slotInterval: 30,
  maxGroupSize: 8,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before your booking. Late cancellations may incur a 50% fee.",
};
