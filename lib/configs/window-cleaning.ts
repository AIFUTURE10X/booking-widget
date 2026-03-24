import type { IndustryConfig } from "../types";

export const windowCleaningConfig: IndustryConfig = {
  industry: "window-cleaning",
  title: "Book Window Cleaning",
  categories: [
    { id: "residential", label: "Residential", emoji: "\uD83C\uDFE0" },
    { id: "commercial", label: "Commercial", emoji: "\uD83C\uDFE2" },
    { id: "extras", label: "Extras", emoji: "\u2728" },
  ],
  serviceTypes: ["Interior", "Exterior", "Both"],
  services: {
    residential: {
      Interior: ["All Windows — Single Storey", "All Windows — Double Storey", "Selected Rooms Only"],
      Exterior: ["All Windows — Single Storey", "All Windows — Double Storey", "Hard to Reach Windows"],
      Both: ["Full House — Single Storey", "Full House — Double Storey"],
    },
    commercial: {
      Interior: ["Office Windows", "Shopfront", "Showroom"],
      Exterior: ["Low Rise (1-3 floors)", "Mid Rise (4-8 floors)", "Shopfront Exterior"],
      Both: ["Full Commercial Clean"],
    },
    extras: {
      Interior: ["Screen Cleaning", "Track & Sill Cleaning", "Mirror Cleaning"],
      Exterior: ["Gutter Cleaning", "Solar Panel Cleaning", "Pressure Washing — Windows"],
      Both: ["Flyscreen Repair", "Quote/Estimate"],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "All Day",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
