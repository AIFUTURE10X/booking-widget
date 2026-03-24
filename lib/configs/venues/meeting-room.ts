import type { VenueConfig } from "../../types";

export const meetingRoomConfig: VenueConfig = {
  venueType: "meeting-room",
  title: "Book a Room",
  facilities: [
    { id: "boardroom", label: "Boardroom", emoji: "\uD83D\uDCBC", description: "12-seat — AV equipped" },
    { id: "conf-room-1", label: "Conference Room 1", emoji: "\uD83D\uDCDD", description: "8-seat — whiteboard" },
    { id: "conf-room-2", label: "Conference Room 2", emoji: "\uD83D\uDCDD", description: "6-seat — screen" },
    { id: "hot-desk", label: "Hot Desk Area", emoji: "\uD83D\uDDA5\uFE0F", description: "Open plan — per seat" },
  ],
  activities: ["Meeting", "Workshop", "Presentation", "Interview", "Training Session", "Co-working"],
  durations: [
    { label: "30 min", minutes: 30 },
    { label: "1 hour", minutes: 60 },
    { label: "2 hours", minutes: 120 },
    { label: "Half Day (4h)", minutes: 240 },
    { label: "Full Day (8h)", minutes: 480 },
  ],
  operatingHours: { open: "07:00", close: "21:00" },
  slotInterval: 30,
  maxGroupSize: 30,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a fee.",
  pricePerHour: 35,
  currency: "aud",
};
