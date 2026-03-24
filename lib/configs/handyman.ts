import type { IndustryConfig } from "../types";

export const handymanConfig: IndustryConfig = {
  industry: "handyman",
  title: "Book a Handyman",
  categories: [
    { id: "repairs", label: "General\nRepairs", emoji: "🔧" },
    { id: "assembly", label: "Assembly", emoji: "📦" },
    { id: "hanging-mounting", label: "Hanging &\nMounting", emoji: "🖼️" },
    { id: "doors-windows", label: "Doors &\nWindows", emoji: "🚪" },
    { id: "outdoor", label: "Outdoor", emoji: "🏡" },
  ],
  serviceTypes: ["Standard", "Urgent", "Other"],
  services: {
    repairs: {
      Standard: [
        "Leaking Tap (Minor)", "Wall Hole Repair", "Skirting Board Repair",
        "Tile Replacement", "Grout Repair", "Drawer/Cabinet Repair",
        "Squeaky Floor Fix", "Silicone Resealing",
      ],
      Urgent: [
        "Broken Door Lock", "Burst Pipe Temporary Fix", "Broken Window Boarding",
        "Emergency Leak Stop", "Broken Toilet Seat",
      ],
      Other: [
        "General Inspection", "Quote/Estimate", "Odd Jobs (Hourly Rate)",
        "Other Repairs",
      ],
    },
    assembly: {
      Standard: [
        "Flat-Pack Furniture Assembly", "Desk & Office Furniture", "Bunk Bed Assembly",
        "Wardrobe Assembly", "Outdoor Furniture Assembly", "Trampoline Assembly",
        "Gym Equipment Assembly", "BBQ Assembly",
      ],
      Urgent: [
        "Same-Day Assembly", "Office Setup (After Hours)",
      ],
      Other: [
        "Disassembly & Reassembly (Moving)", "Quote/Estimate", "Other Assembly",
      ],
    },
    "hanging-mounting": {
      Standard: [
        "TV Wall Mounting", "Shelf Install", "Picture/Mirror Hanging",
        "Curtain Rod Install", "Blind Install", "Towel Rail Install",
        "Floating Shelf Install", "Whiteboard/Corkboard Mounting",
      ],
      Urgent: [
        "Fallen Shelf Refix", "Curtain Rail Emergency Repair",
      ],
      Other: [
        "Heavy Item Mounting Advice", "Quote/Estimate", "Other Mounting",
      ],
    },
    "doors-windows": {
      Standard: [
        "Door Hanging/Install", "Door Handle Replacement", "Window Lock Install",
        "Screen Door Install", "Sliding Door Track Repair", "Weatherstrip Install",
        "Cat/Dog Door Install", "Barn Door Install",
      ],
      Urgent: [
        "Jammed Door Fix", "Broken Window Temporary Repair", "Lock Replacement (Urgent)",
      ],
      Other: [
        "Door Adjustment & Planing", "Draft Proofing", "Quote/Estimate",
        "Other Doors & Windows",
      ],
    },
    outdoor: {
      Standard: [
        "Deck Repair", "Pergola Minor Repair", "Fence Paling Replacement",
        "Clothesline Install", "Letterbox Install/Repair", "Pressure Washing",
        "Shed Assembly", "Garden Bed Edging",
      ],
      Urgent: [
        "Storm Damage Temporary Repair", "Loose Railing Fix",
      ],
      Other: [
        "Outdoor Maintenance Package", "Quote/Estimate", "Other Outdoor",
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
  propertyQuestion: "I am the owner/tenant of this property",
};
