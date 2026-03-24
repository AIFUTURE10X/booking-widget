import type { IndustryConfig } from "../types";

export const fencingConfig: IndustryConfig = {
  industry: "fencing",
  title: "Book a Fencer",
  categories: [
    { id: "colorbond", label: "Colorbond\nFencing", emoji: "🛡️" },
    { id: "timber", label: "Timber\nFencing", emoji: "🪵" },
    { id: "pool-fencing", label: "Pool\nFencing", emoji: "🏊" },
    { id: "gates", label: "Gates", emoji: "🚪" },
    { id: "retaining-walls", label: "Retaining\nWalls", emoji: "🧱" },
  ],
  serviceTypes: ["New Install", "Repair", "Other"],
  services: {
    colorbond: {
      "New Install": [
        "Full Boundary Fence", "Side Fence", "Front Fence",
        "Colorbond with Lattice Top", "Colorbond Slat Screen",
        "Colorbond Gate & Fence Package",
      ],
      Repair: [
        "Blown-Over Panel", "Dented/Damaged Panel", "Leaning Post Repair",
        "Rail Replacement", "Post Replacement", "Storm Damage Repair",
      ],
      Other: [
        "Fence Measure & Quote", "Neighbour Fence Notice", "Council Permit Help",
        "Other Colorbond",
      ],
    },
    timber: {
      "New Install": [
        "Hardwood Timber Fence", "Treated Pine Fence", "Picket Fence",
        "Paling Fence", "Horizontal Slat Fence", "Merbau Screen Fence",
      ],
      Repair: [
        "Rotted Post Replacement", "Broken Paling Repair", "Leaning Fence Fix",
        "Rail Replacement", "Termite Damage Repair", "Staining & Sealing",
      ],
      Other: [
        "Timber Fence Staining", "Quote/Estimate", "Fence Removal & Disposal",
        "Other Timber",
      ],
    },
    "pool-fencing": {
      "New Install": [
        "Glass Pool Fence", "Aluminium Pool Fence", "Tubular Steel Pool Fence",
        "Semi-Frameless Glass Fence", "Pool Gate Install",
      ],
      Repair: [
        "Glass Panel Replacement", "Self-Closing Gate Repair", "Latch Replacement",
        "Loose Post Repair", "Gate Hinge Repair",
      ],
      Other: [
        "Pool Fence Compliance Check", "Council Inspection Prep",
        "Quote/Estimate", "Other Pool Fencing",
      ],
    },
    gates: {
      "New Install": [
        "Pedestrian Gate", "Driveway Sliding Gate", "Driveway Swing Gate",
        "Automatic Gate (Motor)", "Garden Gate", "Side Access Gate",
      ],
      Repair: [
        "Gate Motor Repair", "Sagging Gate Fix", "Latch/Lock Repair",
        "Hinge Replacement", "Automatic Gate Sensor Repair", "Remote Control Replacement",
      ],
      Other: [
        "Gate Automation Upgrade", "Intercom Integration", "Quote/Estimate",
        "Other Gates",
      ],
    },
    "retaining-walls": {
      "New Install": [
        "Concrete Sleeper Wall", "Timber Sleeper Wall", "Block/Brick Wall",
        "Gabion Basket Wall", "Boulder Wall", "Sandstone Wall",
      ],
      Repair: [
        "Leaning Wall Repair", "Cracked Block Repair", "Drainage Fix Behind Wall",
        "Timber Sleeper Replacement", "Footing Repair",
      ],
      Other: [
        "Retaining Wall Engineering Report", "Drainage Assessment",
        "Quote/Estimate", "Other Retaining Wall",
      ],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Flexible / Any Time",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner of this property",
};
