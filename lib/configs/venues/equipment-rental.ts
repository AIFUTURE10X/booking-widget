import type { VenueConfig } from "../../types";

export const equipmentRentalConfig: VenueConfig = {
  venueType: "equipment-rental",
  title: "Book Equipment",
  facilities: [
    { id: "trailer", label: "Trailer", emoji: "\uD83D\uDE9B", description: "Box or cage trailer" },
    { id: "tools", label: "Power Tools", emoji: "\uD83D\uDD27", description: "Drills, saws, grinders" },
    { id: "boat", label: "Boat", emoji: "\u26F5", description: "Tinny or kayak" },
    { id: "marquee", label: "Marquee / Tent", emoji: "\u26FA", description: "Pop-up or peg-down" },
    { id: "camera-gear", label: "Camera Gear", emoji: "\uD83D\uDCF7", description: "DSLR, lenses, tripods" },
    { id: "sound-system", label: "Sound System", emoji: "\uD83D\uDD0A", description: "PA, speakers, mic" },
  ],
  activities: ["Personal Use", "Business Use", "Event", "Moving House", "Photography", "Fishing Trip"],
  durations: [
    { label: "Half Day (4h)", minutes: 240 },
    { label: "Full Day (8h)", minutes: 480 },
    { label: "Weekend (2 days)", minutes: 2880 },
    { label: "Week (7 days)", minutes: 10080 },
  ],
  operatingHours: { open: "07:00", close: "18:00" },
  slotInterval: 60,
  maxGroupSize: 1,
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  cancellationPolicy: "Free cancellation up to 24 hours before. Late cancellations may incur a fee.",
};
