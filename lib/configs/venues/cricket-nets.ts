import type { VenueConfig } from "../../types";

export const cricketNetsConfig: VenueConfig = {
  venueType: "cricket-nets",
  title: "Book a Net",
  facilities: [
    { id: "net-1", label: "Net 1", emoji: "\uD83C\uDFCF", description: "Synthetic pitch" },
    { id: "net-2", label: "Net 2", emoji: "\uD83C\uDFCF", description: "Synthetic pitch" },
    { id: "net-3", label: "Net 3", emoji: "\uD83C\uDFCF", description: "Turf pitch" },
    { id: "bowling-machine", label: "Bowling Machine Net", emoji: "\uD83E\uDD16", description: "Auto-feed machine" },
  ],
  activities: ["Batting Practice", "Bowling Practice", "Team Training", "Coaching Session", "Bowling Machine"],
  durations: [
    { label: "30 min", minutes: 30 },
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
    { label: "2 hours", minutes: 120 },
  ],
  operatingHours: { open: "06:00", close: "21:00" },
  slotInterval: 30,
  maxGroupSize: 6,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a 50% fee.",
  pricePerHour: 40,
  currency: "aud",
};
