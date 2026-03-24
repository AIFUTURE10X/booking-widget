import type { IndustryConfig } from "../types";

export const securityConfig: IndustryConfig = {
  industry: "security",
  title: "Book Security Service",
  categories: [
    { id: "alarms", label: "Alarm\nSystems", emoji: "🚨" },
    { id: "cctv", label: "CCTV", emoji: "📹" },
    { id: "access-control", label: "Access\nControl", emoji: "🔐" },
    { id: "intercoms", label: "Intercoms", emoji: "🔔" },
    { id: "safes", label: "Safes", emoji: "🗄️" },
  ],
  serviceTypes: ["Install", "Repair", "Other"],
  services: {
    alarms: {
      Install: [
        "Home Alarm System", "Business Alarm System", "Wireless Alarm System",
        "Back-to-Base Monitoring Setup", "Motion Sensor Install",
        "Door/Window Sensor Install", "Panic Button Install",
        "Smart Alarm (App-Controlled)",
      ],
      Repair: [
        "False Alarm Fix", "Sensor Not Working", "Keypad Fault",
        "Siren Fault", "Battery Replacement", "Control Panel Repair",
        "Communication Module Repair",
      ],
      Other: [
        "Alarm System Upgrade", "Monitoring Plan Setup", "Security Assessment",
        "Quote/Estimate", "Other Alarm Service",
      ],
    },
    cctv: {
      Install: [
        "Home CCTV System (2-4 Cameras)", "Home CCTV System (6-8 Cameras)",
        "Business CCTV System", "Doorbell Camera Install",
        "IP Camera System", "Wireless Camera Install",
        "Number Plate Recognition Camera", "Night Vision Camera Install",
      ],
      Repair: [
        "Camera Not Recording", "Blurry/Fuzzy Image", "DVR/NVR Fault",
        "Hard Drive Replacement", "Camera Repositioning", "Night Vision Not Working",
        "Remote Viewing Not Working",
      ],
      Other: [
        "CCTV System Upgrade", "Footage Retrieval Assistance",
        "Quote/Estimate", "Other CCTV Service",
      ],
    },
    "access-control": {
      Install: [
        "Keypad Entry System", "Card/Fob Reader System", "Biometric Access (Fingerprint)",
        "Electric Strike Install", "Magnetic Lock Install",
        "Automatic Door Opener", "Boom Gate System",
      ],
      Repair: [
        "Keypad Not Responding", "Card Reader Fault", "Electric Lock Stuck",
        "System Not Logging Access", "Wiring Fault", "Controller Replacement",
      ],
      Other: [
        "Access Control Audit", "User Management Setup", "System Integration",
        "Quote/Estimate", "Other Access Control",
      ],
    },
    intercoms: {
      Install: [
        "Video Intercom Install", "Audio Intercom Install", "Wireless Intercom System",
        "Multi-Unit Intercom System", "Gate Intercom Install",
        "Smart Intercom (App-Controlled)",
      ],
      Repair: [
        "No Sound/Audio Fault", "No Video/Screen Fault", "Buzzer/Release Not Working",
        "Static/Interference", "Handset Replacement", "Wiring Repair",
      ],
      Other: [
        "Intercom System Upgrade", "Strata Intercom Upgrade",
        "Quote/Estimate", "Other Intercom Service",
      ],
    },
    safes: {
      Install: [
        "Home Safe Supply & Install", "Floor Safe Install", "Wall Safe Install",
        "Commercial Safe Install", "Fire-Rated Safe Supply & Install",
        "Gun Safe Install",
      ],
      Repair: [
        "Safe Won't Open", "Combination Lock Repair", "Digital Keypad Fault",
        "Lock Mechanism Repair", "Hinge Repair", "Safe Relocation",
      ],
      Other: [
        "Safe Recommendation & Sizing", "Combination Change",
        "Quote/Estimate", "Other Safe Service",
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
  propertyQuestion: "I am the owner/authorised person for this property",
};
