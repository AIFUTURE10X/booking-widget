import type { IndustryConfig } from "../types";

export const cleaningConfig: IndustryConfig = {
  industry: "cleaning",
  title: "Book a Cleaner",
  categories: [
    { id: "residential", label: "Home\nCleaning", emoji: "\uD83C\uDFE0" },
    { id: "commercial", label: "Commercial\nCleaning", emoji: "\uD83C\uDFE2" },
    { id: "end-of-lease", label: "End of\nLease", emoji: "\uD83D\uDD11" },
    { id: "carpet", label: "Carpet\nCleaning", emoji: "\uD83E\uDDF9" },
    { id: "windows", label: "Window\nCleaning", emoji: "\u2728" },
  ],
  serviceTypes: ["One-Off", "Recurring", "Other"],
  services: {
    residential: {
      "One-Off": [
        "General House Clean", "Deep Clean", "Spring Clean",
        "Post-Renovation Clean", "Pre-Sale Clean", "Oven & Kitchen Deep Clean",
      ],
      Recurring: [
        "Weekly Clean", "Fortnightly Clean", "Monthly Clean",
      ],
      Other: [
        "Quote/Estimate", "Custom Clean", "Other Residential",
      ],
    },
    commercial: {
      "One-Off": [
        "Office Deep Clean", "Warehouse Clean", "Post-Construction Clean",
        "Event Venue Clean",
      ],
      Recurring: [
        "Daily Office Clean", "Weekly Office Clean", "Fortnightly Clean",
      ],
      Other: [
        "Quote/Estimate", "Custom Commercial Clean", "Other Commercial",
      ],
    },
    "end-of-lease": {
      "One-Off": [
        "Full Bond Clean", "Bond Clean + Carpet", "Bond Clean + Windows",
        "Bond Clean + Carpet + Windows", "Garage/Shed Clean",
      ],
      Recurring: [],
      Other: [
        "Quote/Estimate", "Bond Back Guarantee", "Other End of Lease",
      ],
    },
    carpet: {
      "One-Off": [
        "Steam Clean (Per Room)", "Whole House Carpet Clean",
        "Stain Removal", "Pet Odour Treatment", "Upholstery Cleaning",
        "Mattress Cleaning", "Rug Cleaning",
      ],
      Recurring: [
        "Quarterly Carpet Clean", "6-Monthly Carpet Clean",
      ],
      Other: [
        "Quote/Estimate", "Carpet Protection Treatment", "Other Carpet",
      ],
    },
    windows: {
      "One-Off": [
        "Interior Windows", "Exterior Windows", "Interior + Exterior",
        "High-Rise Windows", "Skylight Cleaning",
      ],
      Recurring: [
        "Monthly Window Clean", "Quarterly Window Clean",
      ],
      Other: [
        "Quote/Estimate", "Screen Cleaning", "Other Window",
      ],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Flexible / Any Time",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner/tenant of this property",
};
