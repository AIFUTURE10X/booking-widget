import type { IndustryConfig } from "../types";

export const concretingConfig: IndustryConfig = {
  industry: "concreting",
  title: "Book a Concreter",
  categories: [
    { id: "driveways", label: "Driveways", emoji: "\uD83D\uDE97" },
    { id: "slabs", label: "Slabs &\nPaths", emoji: "\uD83E\uDDF1" },
    { id: "decorative", label: "Decorative", emoji: "\uD83C\uDFA8" },
    { id: "repairs", label: "Repairs", emoji: "\uD83D\uDD27" },
  ],
  serviceTypes: ["New Install", "Repair", "Other"],
  services: {
    driveways: {
      "New Install": ["Standard Driveway", "Exposed Aggregate Driveway", "Coloured Concrete Driveway", "Stencilled Driveway"],
      Repair: ["Crack Repair", "Resurface Driveway", "Levelling"],
      Other: ["Crossover / Council", "Quote/Estimate"],
    },
    slabs: {
      "New Install": ["Shed Slab", "Garage Slab", "House Slab", "Pathway / Walkway", "Patio Slab"],
      Repair: ["Slab Crack Repair", "Slab Levelling", "Expansion Joint Repair"],
      Other: ["Formwork Only", "Quote/Estimate"],
    },
    decorative: {
      "New Install": ["Exposed Aggregate", "Stamped Concrete", "Polished Concrete", "Coloured Concrete", "Stencilled Concrete"],
      Repair: ["Reseal", "Colour Touch-up"],
      Other: ["Quote/Estimate"],
    },
    repairs: {
      Repair: ["Concrete Crack Repair", "Spalling Repair", "Trip Hazard Grind", "Retaining Wall Repair"],
      "New Install": ["Retaining Wall — New", "Steps / Stairs"],
      Other: ["Concrete Cutting", "Core Drilling", "Quote/Estimate"],
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
