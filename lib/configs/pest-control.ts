import type { IndustryConfig } from "../types";

export const pestControlConfig: IndustryConfig = {
  industry: "pest-control",
  title: "Book Pest Control",
  categories: [
    { id: "termites", label: "Termites", emoji: "\uD83E\uDEB3" },
    { id: "rodents", label: "Rodents", emoji: "\uD83D\uDC00" },
    { id: "cockroaches", label: "Cockroaches", emoji: "\uD83E\uDEB3" },
    { id: "ants", label: "Ants", emoji: "\uD83D\uDC1C" },
    { id: "spiders", label: "Spiders", emoji: "\uD83D\uDD77\uFE0F" },
    { id: "wasps-bees", label: "Wasps &\nBees", emoji: "\uD83D\uDC1D" },
    { id: "possums", label: "Possums", emoji: "\uD83D\uDC3F\uFE0F" },
    { id: "birds", label: "Birds", emoji: "\uD83D\uDC26" },
  ],
  serviceTypes: ["Inspection", "Treatment", "Other"],
  services: {
    termites: {
      Inspection: [
        "Pre-Purchase Inspection", "Annual Termite Check", "Damage Assessment",
        "Moisture Detection Scan",
      ],
      Treatment: [
        "Baiting System", "Chemical Barrier", "Spot Treatment",
        "Termite Nest Removal", "Reticulation System",
      ],
      Other: [
        "Prevention Plan", "Quote/Estimate", "Insurance Report", "Other Termite",
      ],
    },
    rodents: {
      Inspection: [
        "Roof Cavity Check", "Full Property Inspection", "Entry Point Assessment",
      ],
      Treatment: [
        "Baiting", "Trapping", "Exclusion Sealing", "Roof Cavity Treatment",
      ],
      Other: [
        "Prevention Advice", "Quote/Estimate", "Other Rodent",
      ],
    },
    cockroaches: {
      Inspection: [
        "Kitchen Inspection", "Full Property Inspection", "Commercial Kitchen Audit",
      ],
      Treatment: [
        "Gel Bait Treatment", "Spray Treatment", "Full Property Fumigation",
        "Commercial Treatment",
      ],
      Other: [
        "Prevention Plan", "Quote/Estimate", "Other Cockroach",
      ],
    },
    ants: {
      Inspection: [
        "Nest Location", "Full Property Inspection", "Garden/Yard Inspection",
      ],
      Treatment: [
        "Ant Baiting", "Perimeter Spray", "Nest Elimination", "Internal Treatment",
      ],
      Other: [
        "Prevention Advice", "Quote/Estimate", "Other Ant",
      ],
    },
    spiders: {
      Inspection: [
        "Full Property Inspection", "Exterior Inspection", "Roof/Subfloor Check",
      ],
      Treatment: [
        "Internal Spray", "External Spray", "Web Removal & Treatment",
        "Full Property Treatment",
      ],
      Other: [
        "Spider Identification", "Quote/Estimate", "Other Spider",
      ],
    },
    "wasps-bees": {
      Inspection: [
        "Nest Location", "Hive Assessment",
      ],
      Treatment: [
        "Wasp Nest Removal", "Bee Hive Relocation", "European Wasp Treatment",
        "Paper Wasp Treatment",
      ],
      Other: [
        "Quote/Estimate", "Emergency Removal", "Other Wasp/Bee",
      ],
    },
    possums: {
      Inspection: [
        "Roof Cavity Inspection", "Entry Point Assessment",
      ],
      Treatment: [
        "Possum Proofing", "One-Way Door Install", "Roof Repair & Seal",
      ],
      Other: [
        "Possum Box Install", "Quote/Estimate", "Other Possum",
      ],
    },
    birds: {
      Inspection: [
        "Nesting Site Assessment", "Property Inspection",
      ],
      Treatment: [
        "Bird Netting", "Spike Installation", "Deterrent System",
        "Nest Removal & Cleanup",
      ],
      Other: [
        "Quote/Estimate", "Other Bird",
      ],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 8:00 PM)",
    "ASAP / Emergency",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner/occupier of this property",
};
