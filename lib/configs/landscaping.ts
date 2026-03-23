import type { IndustryConfig } from "../types";

export const landscapingConfig: IndustryConfig = {
  industry: "landscaping",
  title: "Book Landscaping",
  categories: [
    { id: "lawn-mowing", label: "Lawn\nMowing", emoji: "\uD83C\uDF3F" },
    { id: "garden", label: "Garden\nCare", emoji: "\uD83C\uDF3A" },
    { id: "tree-services", label: "Tree\nServices", emoji: "\uD83C\uDF33" },
    { id: "landscaping", label: "Landscaping\nDesign", emoji: "\uD83C\uDFE1" },
    { id: "irrigation", label: "Irrigation", emoji: "\uD83D\uDCA6" },
  ],
  serviceTypes: ["One-Off", "Recurring", "Other"],
  services: {
    "lawn-mowing": {
      "One-Off": [
        "Lawn Mow & Edge", "Overgrown Lawn Clearance", "Lawn Dethatching",
        "Top Dressing & Levelling", "New Turf Install",
      ],
      Recurring: [
        "Weekly Mow", "Fortnightly Mow", "Monthly Mow",
      ],
      Other: [
        "Quote/Estimate", "Lawn Health Assessment", "Other Lawn",
      ],
    },
    garden: {
      "One-Off": [
        "Garden Tidy-Up", "Hedge Trimming", "Weed Removal",
        "Mulching", "Plant Installation", "Garden Bed Edging",
      ],
      Recurring: [
        "Weekly Garden Maintenance", "Fortnightly Maintenance", "Monthly Maintenance",
      ],
      Other: [
        "Quote/Estimate", "Seasonal Planting Plan", "Other Garden",
      ],
    },
    "tree-services": {
      "One-Off": [
        "Tree Pruning", "Tree Removal", "Stump Grinding", "Palm Cleaning",
        "Deadwood Removal", "Storm Damage Cleanup",
      ],
      Recurring: [],
      Other: [
        "Arborist Report", "Quote/Estimate", "Council Permit Help", "Other Tree",
      ],
    },
    landscaping: {
      "One-Off": [
        "Garden Design & Build", "Retaining Wall", "Paving & Pathways",
        "Deck/Pergola Area", "Fencing", "Artificial Turf Install",
        "Raised Garden Beds", "Outdoor Lighting",
      ],
      Recurring: [],
      Other: [
        "Design Consultation", "Quote/Estimate", "3D Design Render", "Other Landscaping",
      ],
    },
    irrigation: {
      "One-Off": [
        "New System Install", "System Repair", "Sprinkler Head Replacement",
        "Drip System Install", "Controller/Timer Install",
      ],
      Recurring: [
        "Seasonal System Check", "Quarterly Maintenance",
      ],
      Other: [
        "Water Efficiency Audit", "Quote/Estimate", "Other Irrigation",
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
