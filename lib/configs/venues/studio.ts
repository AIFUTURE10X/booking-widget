import type { VenueConfig } from "../../types";

export const studioConfig: VenueConfig = {
  venueType: "studio",
  title: "Book a Studio",
  facilities: [
    { id: "studio-a", label: "Studio A", emoji: "\uD83C\uDFA4", description: "Large — 80 sqm" },
    { id: "studio-b", label: "Studio B", emoji: "\uD83C\uDFB5", description: "Medium — 40 sqm" },
    { id: "studio-c", label: "Studio C", emoji: "\uD83D\uDCF7", description: "Photo studio — lights & backdrop" },
    { id: "podcast-room", label: "Podcast Room", emoji: "\uD83C\uDF99\uFE0F", description: "Soundproofed — 2-4 people" },
  ],
  activities: ["Music Rehearsal", "Recording Session", "Photography Shoot", "Video Production", "Dance Practice", "Podcast Recording", "Private Lesson"],
  durations: [
    { label: "1 hour", minutes: 60 },
    { label: "2 hours", minutes: 120 },
    { label: "3 hours", minutes: 180 },
    { label: "Half Day (4h)", minutes: 240 },
    { label: "Full Day (8h)", minutes: 480 },
  ],
  operatingHours: { open: "07:00", close: "23:00" },
  slotInterval: 60,
  maxGroupSize: 15,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a fee.",
};
