import type { VenueConfig } from "../../types";

export const basketballConfig: VenueConfig = {
  venueType: "basketball",
  title: "Book a Court",
  facilities: [
    { id: "court-1", label: "Court 1", emoji: "\uD83C\uDFC0", description: "Full court — indoor" },
    { id: "court-2", label: "Court 2", emoji: "\uD83C\uDFC0", description: "Full court — indoor" },
    { id: "half-court", label: "Half Court", emoji: "\uD83C\uDFC0", description: "Half court — outdoor" },
  ],
  activities: ["Basketball", "Futsal", "Netball", "Volleyball", "Team Training", "Private Hire"],
  durations: [
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
    { label: "2 hours", minutes: 120 },
    { label: "3 hours", minutes: 180 },
  ],
  operatingHours: { open: "06:00", close: "22:00" },
  slotInterval: 30,
  maxGroupSize: 20,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a 50% fee.",
};
