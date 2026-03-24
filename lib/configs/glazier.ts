import type { IndustryConfig } from "../types";

export const glazierConfig: IndustryConfig = {
  industry: "glazier",
  title: "Book a Glazier",
  categories: [
    { id: "windows", label: "Windows", emoji: "\uD83E\uDE9F" },
    { id: "doors", label: "Glass\nDoors", emoji: "\uD83D\uDEAA" },
    { id: "shower", label: "Shower\nScreens", emoji: "\uD83D\uDEBF" },
    { id: "mirrors", label: "Mirrors &\nSplashbacks", emoji: "\uD83E\uDE9E" },
  ],
  serviceTypes: ["Repair", "New Install", "Other"],
  services: {
    windows: {
      Repair: ["Broken Window Replacement", "Cracked Glass Repair", "Foggy Double Glazing", "Window Seal Repair"],
      "New Install": ["Double Glazing Upgrade", "Security Glass", "Tinted Glass", "Noise Reduction Glass"],
      Other: ["Window Measurement", "Quote/Estimate"],
    },
    doors: {
      Repair: ["Sliding Door Glass Replacement", "French Door Repair", "Broken Door Panel"],
      "New Install": ["Sliding Door Install", "Stacking Doors", "Bi-fold Doors", "Pet Door (glass cut)"],
      Other: ["Quote/Estimate"],
    },
    shower: {
      Repair: ["Shower Screen Repair", "Seal Replacement", "Hinge Repair"],
      "New Install": ["Frameless Shower Screen", "Semi-Frameless Shower Screen", "Pivot Door Shower", "Bath Screen"],
      Other: ["Measure & Quote"],
    },
    mirrors: {
      Repair: ["Mirror Replacement"],
      "New Install": ["Wall Mirror — Custom", "Bathroom Mirror", "Gym Mirror", "Glass Splashback — Kitchen", "Glass Splashback — Bathroom", "Glass Balustrade"],
      Other: ["Quote/Estimate"],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "ASAP / Emergency",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  urgencyOptions: ["Routine", "Urgent — broken glass", "Emergency — security risk"],
};
