import type { IndustryConfig } from "../types";

export const treeServicesConfig: IndustryConfig = {
  industry: "tree-services",
  title: "Book an Arborist",
  categories: [
    { id: "tree-removal", label: "Tree\nRemoval", emoji: "\uD83E\uDE93" },
    { id: "pruning", label: "Pruning &\nTrimming", emoji: "\u2702\uFE0F" },
    { id: "stump", label: "Stump\nGrinding", emoji: "\uD83E\uDEB5" },
    { id: "emergency", label: "Emergency", emoji: "\u26A0\uFE0F" },
  ],
  serviceTypes: ["Small", "Medium", "Large"],
  services: {
    "tree-removal": {
      Small: ["Tree under 5m", "Palm Tree Removal", "Dead Tree Removal"],
      Medium: ["Tree 5-10m", "Multiple Trees (2-3)"],
      Large: ["Tree over 10m", "Multiple Trees (4+)", "Crane-Assisted Removal"],
    },
    pruning: {
      Small: ["Shape & Tidy (1-2 trees)", "Hedge Trimming — Small", "Dead Branch Removal"],
      Medium: ["Canopy Reduction", "Hedge Trimming — Large", "Crown Lifting"],
      Large: ["Full Property Prune", "Powerline Clearance", "Council Approved Pruning"],
    },
    stump: {
      Small: ["Single Stump — under 30cm", "Single Stump — 30-60cm"],
      Medium: ["Single Stump — over 60cm", "Multiple Stumps (2-3)"],
      Large: ["Multiple Stumps (4+)", "Root Removal"],
    },
    emergency: {
      Small: ["Fallen Branch — Small", "Storm Damage Assessment"],
      Medium: ["Fallen Branch — Large", "Leaning Tree — Secure"],
      Large: ["Fallen Tree — Full Removal", "Emergency Storm Cleanup"],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "ASAP / Emergency",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  urgencyOptions: ["Routine", "Urgent — within 48 hours", "Emergency — today"],
};
