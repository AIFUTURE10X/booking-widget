import type { IndustryConfig } from "../types";

export const electricalConfig: IndustryConfig = {
  industry: "electrical",
  title: "Book an Electrician",
  categories: [
    { id: "power-points", label: "Power\nPoints", emoji: "🔌" },
    { id: "lighting", label: "Lighting", emoji: "💡" },
    { id: "switchboard", label: "Switchboard", emoji: "⚡" },
    { id: "safety", label: "Safety &\nCompliance", emoji: "🛡️" },
    { id: "solar-electrical", label: "Solar\nElectrical", emoji: "☀️" },
  ],
  serviceTypes: ["Repair", "Install", "Other"],
  services: {
    "power-points": {
      Repair: [
        "Faulty Power Point", "Sparking Outlet", "Loose Connection",
        "Dead Power Point", "USB Outlet Not Working", "Outdoor Outlet Repair",
      ],
      Install: [
        "New Power Point", "Double Power Point Upgrade", "USB Power Point",
        "Outdoor Weatherproof Outlet", "Floor Outlet", "Smart Power Point",
        "Heavy Appliance Outlet (Oven/Dryer)", "Workshop Power Circuit",
      ],
      Other: [
        "Power Point Inspection", "Quote/Estimate", "Childproof Outlet Covers",
        "Other Power Point",
      ],
    },
    lighting: {
      Repair: [
        "Flickering Lights", "Light Not Working", "Dimmer Switch Fault",
        "Outdoor Light Repair", "Sensor Light Fault", "Downlight Replacement",
      ],
      Install: [
        "LED Downlight Install", "Pendant Light Install", "Ceiling Fan with Light",
        "Outdoor/Garden Lighting", "Sensor/Motion Light", "Under-Cabinet Lighting",
        "Dimmer Switch Install", "Smart Lighting System",
      ],
      Other: [
        "Lighting Design Consultation", "Quote/Estimate", "Energy Efficiency Upgrade",
        "Other Lighting",
      ],
    },
    switchboard: {
      Repair: [
        "Tripping Circuit Breaker", "Burnt Fuse", "Switchboard Buzzing/Humming",
        "Power Fluctuations", "Overloaded Circuit", "Earth Fault",
      ],
      Install: [
        "Switchboard Upgrade", "Safety Switch Install", "Surge Protector Install",
        "Sub-Board Install", "Three-Phase Upgrade", "Smart Meter Install",
        "Circuit Breaker Replacement",
      ],
      Other: [
        "Switchboard Inspection", "Electrical Safety Certificate",
        "Quote/Estimate", "Other Switchboard",
      ],
    },
    safety: {
      Repair: [
        "Smoke Alarm Beeping", "Safety Switch Tripping", "Faulty Earth Connection",
        "RCD Not Working", "Exit Light Repair",
      ],
      Install: [
        "Smoke Alarm Install", "Safety Switch/RCD Install", "Emergency Lighting",
        "Exit Sign Install", "Test & Tag Service", "Earth Stake Install",
      ],
      Other: [
        "Electrical Safety Inspection", "Compliance Certificate",
        "Insurance Report", "Quote/Estimate", "Other Safety",
      ],
    },
    "solar-electrical": {
      Repair: [
        "Inverter Fault", "Panel Connection Issue", "Monitoring Not Working",
        "Solar Not Generating", "Isolator Switch Fault", "DC Cable Damage",
      ],
      Install: [
        "Solar Panel Wiring", "Inverter Install", "Battery Connection",
        "Solar Meter Install", "EV Charger Install", "Solar Monitoring System",
        "Micro-Inverter Install",
      ],
      Other: [
        "Solar System Inspection", "Performance Assessment",
        "Quote/Estimate", "Other Solar Electrical",
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
