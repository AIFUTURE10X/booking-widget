import type { IndustryConfig } from "../types";

export const poolServiceConfig: IndustryConfig = {
  industry: "pool-service",
  title: "Book Pool Service",
  categories: [
    { id: "cleaning", label: "Pool\nCleaning", emoji: "🧹" },
    { id: "equipment", label: "Equipment", emoji: "⚙️" },
    { id: "resurfacing", label: "Resurfacing", emoji: "🏊" },
    { id: "heating", label: "Pool\nHeating", emoji: "🌡️" },
    { id: "safety-compliance", label: "Safety &\nCompliance", emoji: "✅" },
  ],
  serviceTypes: ["One-Off", "Recurring", "Other"],
  services: {
    cleaning: {
      "One-Off": [
        "Green Pool Recovery", "Full Pool Clean & Chemical Balance",
        "Pool Vacuuming & Skim", "Filter Clean", "Salt Cell Clean",
        "Post-Storm Pool Clean", "Pre-Sale Pool Presentation",
      ],
      Recurring: [
        "Weekly Pool Service", "Fortnightly Pool Service", "Monthly Pool Service",
      ],
      Other: [
        "Water Testing & Report", "Chemical Delivery", "Quote/Estimate",
        "Other Cleaning",
      ],
    },
    equipment: {
      "One-Off": [
        "Pump Repair/Replace", "Filter Repair/Replace", "Chlorinator Repair/Replace",
        "Robotic Cleaner Install", "Skimmer Box Repair", "Pool Light Replacement",
        "Automatic Pool Cover Install",
      ],
      Recurring: [
        "Quarterly Equipment Check", "Seasonal Equipment Service",
      ],
      Other: [
        "Equipment Assessment", "Quote/Estimate", "Other Equipment",
      ],
    },
    resurfacing: {
      "One-Off": [
        "Fibreglass Resurface", "Concrete Pool Resurfacing", "Pebblecrete Finish",
        "Pool Tile Repair", "Coping Stone Replacement", "Waterline Tile Replacement",
        "Pool Interior Repaint",
      ],
      Recurring: [],
      Other: [
        "Pool Condition Assessment", "Colour & Finish Consultation",
        "Quote/Estimate", "Other Resurfacing",
      ],
    },
    heating: {
      "One-Off": [
        "Heat Pump Install", "Gas Heater Install", "Solar Heating Install",
        "Heat Pump Repair", "Gas Heater Repair", "Solar Mat Replacement",
      ],
      Recurring: [
        "Annual Heater Service", "Seasonal Start-Up Service",
      ],
      Other: [
        "Heating Assessment & Advice", "Quote/Estimate", "Other Heating",
      ],
    },
    "safety-compliance": {
      "One-Off": [
        "Pool Fence Compliance Check", "CPR Sign Install", "Gate Latch Replacement",
        "Self-Closing Hinge Repair", "Non-Climbable Zone Assessment",
        "Pool Barrier Repair",
      ],
      Recurring: [],
      Other: [
        "Pool Safety Certificate", "Council Inspection Preparation",
        "Quote/Estimate", "Other Safety/Compliance",
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
