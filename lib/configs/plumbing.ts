import type { IndustryConfig } from "../types";

export const plumbingConfig: IndustryConfig = {
  industry: "plumbing",
  title: "Book a Plumber",
  categories: [
    { id: "plumbing", label: "Plumbing", emoji: "\uD83D\uDEB0" },
    { id: "electrical", label: "Electrical", emoji: "\u26A1" },
    { id: "water-filtration", label: "Water\nFiltration", emoji: "\uD83D\uDCA7" },
    { id: "hot-water", label: "Hot Water\nSystems", emoji: "\uD83C\uDF21\uFE0F" },
    { id: "roofing", label: "Roofing", emoji: "\uD83C\uDFE0" },
  ],
  serviceTypes: ["Repair", "Service/Install", "Other"],
  services: {
    plumbing: {
      Repair: [
        "External Blocked Drain", "Internal Blocked Drain", "Leaking Tap",
        "Food/Waste Disposer", "Gas Leak", "Repair Sewer", "Repair Shower",
        "Repair Toilet", "Repair Water Heater", "Find & Repair Leak", "Pipe Relining",
      ],
      "Service/Install": [
        "Install New Tap", "Install Toilet", "Install Dishwasher", "Install Washing Machine",
        "Water Heater Installation", "Gas Line Installation", "Backflow Prevention",
        "Water Meter Install", "Bathroom Renovation", "Kitchen Plumbing",
      ],
      Other: [
        "Plumbing Inspection", "Quote/Estimate", "Maintenance Plan", "Strata Plumbing",
        "Insurance Claim", "Other Plumbing",
      ],
    },
    electrical: {
      Repair: [
        "Power Outage", "Faulty Wiring", "Flickering Lights", "Tripping Breaker",
        "Damaged Power Point", "Smoke Alarm Beeping", "Other Electrical Repair",
      ],
      "Service/Install": [
        "Light Installation", "Switchboard Upgrade", "Power Point Install",
        "Ceiling Fan Install", "EV Charger Install", "Safety Switch Install",
        "Smoke Alarm Install", "Data/Network Cabling",
      ],
      Other: [
        "Safety Inspection", "Electrical Certificate", "Quote/Estimate", "Other Electrical",
      ],
    },
    "water-filtration": {
      Repair: [
        "Filter Leaking", "Low Water Pressure", "Bad Taste/Odour", "System Not Working",
      ],
      "Service/Install": [
        "New Filter Installation", "Filter Replacement", "UV System Install",
        "Whole House Filtration", "Under Sink Filter",
      ],
      Other: [
        "Water Testing", "Quote/Estimate", "Other Filtration",
      ],
    },
    "hot-water": {
      Repair: [
        "System Not Heating", "Leaking Unit", "Strange Noises", "Pilot Light Out",
        "Tempering Valve Issue", "Low Hot Water Pressure",
      ],
      "Service/Install": [
        "New System Installation", "System Replacement", "Heat Pump Install",
        "Solar Hot Water Install", "Gas to Electric Conversion", "Tempering Valve Install",
      ],
      Other: [
        "Service/Maintenance", "Quote/Estimate", "Energy Efficiency Advice", "Other Hot Water",
      ],
    },
    roofing: {
      Repair: [
        "Roof Leak Repair", "Gutter Repair", "Downpipe Repair", "Flashing Repair",
        "Ridge Cap Repair", "Storm Damage Repair",
      ],
      "Service/Install": [
        "New Gutters", "Gutter Guard Install", "Downpipe Install",
        "Roof Ventilation", "Skylight Install", "Roof Replacement",
      ],
      Other: [
        "Roof Inspection", "Gutter Cleaning", "Quote/Estimate", "Other Roofing",
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
  propertyQuestion: "I am the owner of this residential property",
};
