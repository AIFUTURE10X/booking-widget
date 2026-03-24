import type { IndustryConfig } from "../types";

export const solarConfig: IndustryConfig = {
  industry: "solar",
  title: "Book Solar Service",
  categories: [
    { id: "panels", label: "Solar\nPanels", emoji: "☀️" },
    { id: "batteries", label: "Batteries", emoji: "🔋" },
    { id: "inverters", label: "Inverters", emoji: "⚡" },
    { id: "monitoring", label: "Monitoring", emoji: "📊" },
    { id: "ev-charging", label: "EV\nCharging", emoji: "🚗" },
  ],
  serviceTypes: ["New Install", "Repair/Service", "Other"],
  services: {
    panels: {
      "New Install": [
        "Residential Solar System (6.6kW)", "Residential Solar System (10kW)",
        "Residential Solar System (13kW+)", "Commercial Solar System",
        "Panel Upgrade/Expansion", "Carport Solar Install",
      ],
      "Repair/Service": [
        "Cracked/Damaged Panel Replacement", "Bird Proofing & Mesh Install",
        "Panel Cleaning", "Underperforming System Diagnosis",
        "Roof Leak at Panel Mount", "Wiring Repair",
      ],
      Other: [
        "Solar Assessment & Site Survey", "System Design & Quote",
        "Solar Rebate Advice", "Other Panel Service",
      ],
    },
    batteries: {
      "New Install": [
        "Tesla Powerwall Install", "Enphase Battery Install",
        "BYD Battery Install", "Alpha ESS Install",
        "Whole-Home Backup System", "Partial Backup System",
      ],
      "Repair/Service": [
        "Battery Not Charging", "Battery Firmware Update",
        "Battery Capacity Test", "Gateway/Controller Repair",
        "Battery Replacement",
      ],
      Other: [
        "Battery Suitability Assessment", "Energy Usage Analysis",
        "Quote/Estimate", "Other Battery Service",
      ],
    },
    inverters: {
      "New Install": [
        "String Inverter Install", "Micro-Inverter Install",
        "Hybrid Inverter Install", "Inverter Upgrade/Replacement",
        "Three-Phase Inverter Install",
      ],
      "Repair/Service": [
        "Inverter Error/Fault Code", "Inverter Not Producing",
        "Inverter Making Noise", "DC Isolator Replacement",
        "Inverter Firmware Update", "Inverter Replacement (Warranty)",
      ],
      Other: [
        "Inverter Assessment", "Warranty Claim Assistance",
        "Quote/Estimate", "Other Inverter Service",
      ],
    },
    monitoring: {
      "New Install": [
        "Monitoring System Install", "Smart Meter Install",
        "Consumption Monitor Install", "Wi-Fi Dongle Install",
        "CT Clamp Install",
      ],
      "Repair/Service": [
        "Monitoring Not Reporting", "Wi-Fi Connection Issue",
        "App Not Showing Data", "Meter Reading Discrepancy",
        "Monitoring Hardware Replacement",
      ],
      Other: [
        "System Performance Review", "Data Export & Analysis",
        "Quote/Estimate", "Other Monitoring",
      ],
    },
    "ev-charging": {
      "New Install": [
        "Home EV Charger Install (7kW)", "Home EV Charger Install (22kW)",
        "Solar-Integrated EV Charger", "Commercial EV Charger Install",
        "Dual EV Charger Install", "Smart Load Management System",
      ],
      "Repair/Service": [
        "Charger Not Working", "Charging Speed Issue", "Cable/Plug Damage",
        "Wi-Fi/App Connection Issue", "Circuit Breaker Tripping",
      ],
      Other: [
        "EV Charger Assessment", "Switchboard Upgrade for EV",
        "Quote/Estimate", "Other EV Charging",
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
