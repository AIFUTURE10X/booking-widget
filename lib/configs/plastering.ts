import type { IndustryConfig } from "../types";

export const plasteringConfig: IndustryConfig = {
  industry: "plastering",
  title: "Book a Plasterer",
  categories: [
    { id: "plaster", label: "Plastering", emoji: "\uD83E\uDDF1" },
    { id: "rendering", label: "Rendering", emoji: "\uD83C\uDFE0" },
    { id: "cornice", label: "Cornice &\nCeiling", emoji: "\u2B1C" },
  ],
  serviceTypes: ["New Install", "Repair", "Other"],
  services: {
    plaster: {
      "New Install": ["New Wall Plaster", "Partition Wall", "Plasterboard Install", "Bulkhead"],
      Repair: ["Patch Holes", "Crack Repair", "Water Damage Repair", "Plaster Skim Coat"],
      Other: ["Sand & Prep for Paint", "Quote/Estimate"],
    },
    rendering: {
      "New Install": ["Cement Render", "Acrylic Render", "Texture Coat", "Feature Wall Render"],
      Repair: ["Crack Repair", "Patch Render", "Repaint Render"],
      Other: ["Quote/Estimate"],
    },
    cornice: {
      "New Install": ["Cornice Install", "Ceiling Rose", "Ornamental Moulding", "Shadow Line Cornice"],
      Repair: ["Cornice Repair", "Ceiling Crack Repair", "Sagging Ceiling Fix"],
      Other: ["Ceiling Replacement", "Quote/Estimate"],
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
