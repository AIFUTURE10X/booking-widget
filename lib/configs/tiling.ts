import type { IndustryConfig } from "../types";

export const tilingConfig: IndustryConfig = {
  industry: "tiling",
  title: "Book a Tiler",
  categories: [
    { id: "bathroom", label: "Bathroom", emoji: "\uD83D\uDEBF" },
    { id: "kitchen", label: "Kitchen", emoji: "\uD83C\uDF73" },
    { id: "floor", label: "Floor\nTiling", emoji: "\u2B1C" },
    { id: "outdoor", label: "Outdoor", emoji: "\uD83C\uDF1E" },
  ],
  serviceTypes: ["New Install", "Repair", "Other"],
  services: {
    bathroom: {
      "New Install": ["Full Bathroom Retile", "Shower Retile", "Floor Only", "Splashback", "Feature Wall"],
      Repair: ["Cracked Tile Replacement", "Regrout", "Waterproofing Repair", "Silicone Replacement"],
      Other: ["Bathroom Renovation", "Quote/Estimate"],
    },
    kitchen: {
      "New Install": ["Splashback", "Floor Tiling", "Feature Wall", "Benchtop Tiling"],
      Repair: ["Cracked Tile Replacement", "Regrout"],
      Other: ["Kitchen Renovation", "Quote/Estimate"],
    },
    floor: {
      "New Install": ["Living Area", "Hallway", "Laundry", "Whole House", "Commercial Floor"],
      Repair: ["Replace Broken Tiles", "Regrout", "Levelling"],
      Other: ["Tile Removal", "Quote/Estimate"],
    },
    outdoor: {
      "New Install": ["Patio / Alfresco", "Pool Surround", "Balcony", "Driveway Pavers", "Steps / Stairs"],
      Repair: ["Loose Tile Repair", "Regrout Outdoor", "Anti-Slip Treatment"],
      Other: ["Quote/Estimate"],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Flexible",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner of this property",
};
