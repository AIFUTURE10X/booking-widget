import type { IndustryConfig } from "../types";

export const hvacConfig: IndustryConfig = {
  industry: "hvac",
  title: "Book HVAC Service",
  categories: [
    { id: "air-conditioning", label: "Air Con", emoji: "\u2744\uFE0F" },
    { id: "heating", label: "Heating", emoji: "\uD83D\uDD25" },
    { id: "ventilation", label: "Ventilation", emoji: "\uD83C\uDF2C\uFE0F" },
    { id: "ducting", label: "Ducting", emoji: "\uD83D\uDEE0\uFE0F" },
  ],
  serviceTypes: ["Repair", "Service/Install", "Other"],
  services: {
    "air-conditioning": {
      Repair: [
        "Not Cooling", "Leaking Water", "Strange Noises", "Bad Smell",
        "Remote Not Working", "Unit Tripping Power", "Frozen Coils",
      ],
      "Service/Install": [
        "Split System Install", "Ducted System Install", "Multi-Split Install",
        "Regular Service/Clean", "Gas Top-Up", "Filter Replacement",
        "Thermostat Install",
      ],
      Other: [
        "Pre-Summer Check", "Quote/Estimate", "Energy Efficiency Advice",
        "Other Air Con",
      ],
    },
    heating: {
      Repair: [
        "Not Heating", "Pilot Light Out", "Strange Noises", "Gas Smell",
        "Uneven Heating", "Thermostat Issues",
      ],
      "Service/Install": [
        "Gas Heater Install", "Ducted Heating Install", "Hydronic Heating Install",
        "Heat Pump Install", "Underfloor Heating", "Regular Service",
      ],
      Other: [
        "Pre-Winter Check", "Carbon Monoxide Test", "Quote/Estimate",
        "Other Heating",
      ],
    },
    ventilation: {
      Repair: [
        "Exhaust Fan Not Working", "Poor Airflow", "Noisy Fan",
        "Bathroom Ventilation Issue",
      ],
      "Service/Install": [
        "Exhaust Fan Install", "Roof Ventilator Install", "Bathroom Fan Install",
        "Kitchen Rangehood Install", "Heat Recovery Ventilator",
      ],
      Other: [
        "Ventilation Assessment", "Quote/Estimate", "Other Ventilation",
      ],
    },
    ducting: {
      Repair: [
        "Duct Leak Repair", "Damaged Ducting", "Duct Noise", "Poor Airflow",
      ],
      "Service/Install": [
        "New Ductwork Install", "Duct Replacement", "Duct Cleaning",
        "Duct Insulation", "Zone Control Install",
      ],
      Other: [
        "Duct Inspection", "Quote/Estimate", "Other Ducting",
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
