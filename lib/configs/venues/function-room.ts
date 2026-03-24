import type { VenueConfig } from "../../types";

export const functionRoomConfig: VenueConfig = {
  venueType: "function-room",
  title: "Book a Room",
  facilities: [
    { id: "main-hall", label: "Main Hall", emoji: "\uD83C\uDFDB\uFE0F", description: "Up to 200 guests" },
    { id: "garden-room", label: "Garden Room", emoji: "\uD83C\uDF3F", description: "Up to 80 guests" },
    { id: "rooftop", label: "Rooftop Terrace", emoji: "\uD83C\uDF07", description: "Up to 100 guests" },
    { id: "private-dining", label: "Private Dining", emoji: "\uD83C\uDF7D\uFE0F", description: "Up to 30 guests" },
  ],
  activities: ["Birthday Party", "Wedding Reception", "Corporate Event", "Engagement Party", "Baby Shower", "Farewell", "Other"],
  durations: [
    { label: "2 hours", minutes: 120 },
    { label: "3 hours", minutes: 180 },
    { label: "4 hours", minutes: 240 },
    { label: "Full Day", minutes: 480 },
  ],
  operatingHours: { open: "08:00", close: "23:00" },
  slotInterval: 60,
  maxGroupSize: 200,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a fee.",
  pricePerHour: 150,
  currency: "aud",
};
