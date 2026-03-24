import type { VenueConfig } from "../../types";

export const tutoringConfig: VenueConfig = {
  venueType: "tutoring",
  title: "Book a Session",
  facilities: [
    { id: "tutor-1", label: "Room 1", emoji: "\uD83D\uDCDA", description: "1-on-1 sessions" },
    { id: "tutor-2", label: "Room 2", emoji: "\uD83D\uDCDA", description: "1-on-1 sessions" },
    { id: "group-room", label: "Group Room", emoji: "\uD83D\uDC65", description: "Up to 6 students" },
    { id: "online", label: "Online (Zoom)", emoji: "\uD83D\uDCBB", description: "Remote session" },
  ],
  activities: ["Maths", "English", "Science", "Music Lesson", "Language Lesson", "Exam Prep", "Coaching", "Other"],
  durations: [
    { label: "30 min", minutes: 30 },
    { label: "45 min", minutes: 45 },
    { label: "1 hour", minutes: 60 },
    { label: "1.5 hours", minutes: 90 },
  ],
  operatingHours: { open: "08:00", close: "20:00" },
  slotInterval: 30,
  maxGroupSize: 6,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a fee.",
};
