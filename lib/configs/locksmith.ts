import type { IndustryConfig } from "../types";

export const locksmithConfig: IndustryConfig = {
  industry: "locksmith",
  title: "Book a Locksmith",
  categories: [
    { id: "residential", label: "Residential", emoji: "\uD83C\uDFE0" },
    { id: "commercial", label: "Commercial", emoji: "\uD83C\uDFE2" },
    { id: "automotive", label: "Automotive", emoji: "\uD83D\uDE97" },
    { id: "emergency", label: "Emergency\nLockout", emoji: "\uD83D\uDEA8" },
    { id: "security", label: "Security\nSystems", emoji: "\uD83D\uDD10" },
  ],
  serviceTypes: ["Emergency", "Standard", "Other"],
  services: {
    residential: {
      Emergency: [
        "Locked Out of House", "Broken Key in Lock", "Lock Jammed",
      ],
      Standard: [
        "Lock Replacement", "Lock Rekey", "Deadbolt Install",
        "Window Lock Install", "Screen Door Lock", "Key Cutting",
        "Master Key System", "Smart Lock Install",
      ],
      Other: [
        "Security Assessment", "Quote/Estimate", "Other Residential",
      ],
    },
    commercial: {
      Emergency: [
        "Locked Out of Business", "Broken Lock", "After-Hours Emergency",
      ],
      Standard: [
        "Office Lock Change", "Master Key System", "Access Control Install",
        "Cabinet/Desk Locks", "Fire Exit Hardware", "High-Security Locks",
        "Keypad Lock Install",
      ],
      Other: [
        "Security Audit", "Quote/Estimate", "Other Commercial",
      ],
    },
    automotive: {
      Emergency: [
        "Locked Out of Car", "Key Stuck in Ignition", "Broken Car Key",
      ],
      Standard: [
        "Car Key Replacement", "Transponder Key Programming", "Spare Key Cut",
        "Ignition Repair", "Boot/Trunk Lock Repair",
      ],
      Other: [
        "Key Fob Battery Replacement", "Quote/Estimate", "Other Automotive",
      ],
    },
    emergency: {
      Emergency: [
        "House Lockout", "Car Lockout", "Business Lockout",
        "Safe Lockout", "Broken Key Extraction",
      ],
      Standard: [
        "Lock Change After Break-In", "Emergency Lock Repair",
        "Temporary Security Board-Up",
      ],
      Other: [
        "After-Hours Call-Out", "Other Emergency",
      ],
    },
    security: {
      Emergency: [
        "Alarm System Fault", "CCTV System Down",
      ],
      Standard: [
        "CCTV Install", "Alarm System Install", "Intercom Install",
        "Access Control System", "Safe Supply & Install", "Security Screen Doors",
      ],
      Other: [
        "Security Consultation", "Quote/Estimate", "Other Security",
      ],
    },
  },
  timeSlots: [
    "ASAP / Emergency (24/7)",
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 10:00 PM)",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner/authorised person for this property",
};
