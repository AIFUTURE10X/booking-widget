import type { IndustryConfig } from "../types";

export const garageDoorsConfig: IndustryConfig = {
  industry: "garage-doors",
  title: "Book Garage Door Service",
  categories: [
    { id: "roller-doors", label: "Roller\nDoors", emoji: "🔄" },
    { id: "sectional-doors", label: "Sectional\nDoors", emoji: "🚗" },
    { id: "tilt-doors", label: "Tilt\nDoors", emoji: "↕️" },
    { id: "motors-openers", label: "Motors &\nOpeners", emoji: "⚙️" },
    { id: "commercial", label: "Commercial\nDoors", emoji: "🏭" },
  ],
  serviceTypes: ["Repair", "Install", "Other"],
  services: {
    "roller-doors": {
      Repair: [
        "Door Won't Open/Close", "Noisy Roller Door", "Off-Track Repair",
        "Dented/Bent Curtain", "Spring Replacement", "Guide Rail Repair",
        "Weather Seal Replacement",
      ],
      Install: [
        "New Roller Door Install", "Roller Door Replacement", "Insulated Roller Door",
        "Manual to Automatic Conversion", "Colour Change/Upgrade",
      ],
      Other: [
        "Roller Door Service & Lube", "Quote/Estimate", "Other Roller Door",
      ],
    },
    "sectional-doors": {
      Repair: [
        "Panel Replacement", "Broken Spring Repair", "Cable Snapped/Frayed",
        "Hinge Replacement", "Track Alignment", "Weather Seal Repair",
      ],
      Install: [
        "New Sectional Door Install", "Sectional Door Replacement",
        "Insulated Sectional Door", "Windlock Sectional Door", "Custom Panel Design",
      ],
      Other: [
        "Sectional Door Service", "Quote/Estimate", "Other Sectional Door",
      ],
    },
    "tilt-doors": {
      Repair: [
        "Tilt Door Not Closing Flush", "Spring/Arm Repair", "Counter-Balance Adjustment",
        "Panel Dent Repair", "Lock Mechanism Repair",
      ],
      Install: [
        "New Tilt Door Install", "Tilt Door Replacement", "Tilt to Sectional Conversion",
        "Custom Tilt Door",
      ],
      Other: [
        "Tilt Door Service & Adjustment", "Quote/Estimate", "Other Tilt Door",
      ],
    },
    "motors-openers": {
      Repair: [
        "Motor Not Responding", "Remote Not Working", "Motor Grinding Noise",
        "Safety Sensor Fault", "Chain/Belt Drive Repair", "Wall Button Fault",
      ],
      Install: [
        "New Motor Install", "Motor Upgrade/Replacement", "Smart Opener Install (Wi-Fi)",
        "Battery Backup Install", "Additional Remote Programming",
        "Keypad Entry Install",
      ],
      Other: [
        "Motor Service & Tune-Up", "Remote Replacement", "Quote/Estimate",
        "Other Motor/Opener",
      ],
    },
    commercial: {
      Repair: [
        "Industrial Roller Shutter Repair", "Loading Dock Door Repair",
        "Fire Door Repair", "High-Speed Door Repair",
        "Commercial Motor Repair", "Security Grille Repair",
      ],
      Install: [
        "Industrial Roller Shutter Install", "Loading Dock Door Install",
        "Fire-Rated Door Install", "High-Speed Door Install",
        "Security Grille Install", "Commercial Motor Install",
      ],
      Other: [
        "Commercial Door Maintenance Contract", "Compliance Inspection",
        "Quote/Estimate", "Other Commercial Door",
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
  propertyQuestion: "I am the owner of this property",
};
