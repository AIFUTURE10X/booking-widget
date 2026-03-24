import type { IndustryConfig } from "../types";

export const roofingConfig: IndustryConfig = {
  industry: "roofing",
  title: "Book a Roofer",
  categories: [
    { id: "roof-repairs", label: "Roof\nRepairs", emoji: "🏠" },
    { id: "gutters", label: "Gutters", emoji: "🌧️" },
    { id: "downpipes", label: "Downpipes", emoji: "⬇️" },
    { id: "roof-restoration", label: "Roof\nRestoration", emoji: "🔨" },
    { id: "metal-roofing", label: "Metal\nRoofing", emoji: "🏗️" },
  ],
  serviceTypes: ["Repair", "Install/Replace", "Other"],
  services: {
    "roof-repairs": {
      Repair: [
        "Roof Leak Repair", "Broken/Cracked Tiles", "Ridge Cap Repair",
        "Flashing Repair", "Storm Damage Repair", "Sagging Roof Repair",
        "Valley Repair", "Pointing & Bedding Repair",
      ],
      "Install/Replace": [
        "Full Roof Replacement", "Tile to Metal Conversion", "Skylight Install",
        "Roof Ventilation Install", "Sarking/Insulation Install", "Whirlybird Install",
      ],
      Other: [
        "Roof Inspection", "Roof Report (Insurance)", "Quote/Estimate",
        "Drone Roof Survey", "Other Roof Repair",
      ],
    },
    gutters: {
      Repair: [
        "Leaking Gutter", "Sagging Gutter", "Rusted Gutter Section",
        "Gutter Joint Repair", "Overflowing Gutter", "Fascia Board Repair",
      ],
      "Install/Replace": [
        "New Gutter Install", "Gutter Replacement", "Gutter Guard Install",
        "Box Gutter Install", "Leaf Screen Install", "Colorbond Gutter Upgrade",
      ],
      Other: [
        "Gutter Cleaning", "Gutter Inspection", "Quote/Estimate", "Other Gutter",
      ],
    },
    downpipes: {
      Repair: [
        "Blocked Downpipe", "Cracked Downpipe", "Disconnected Downpipe",
        "Leaking Downpipe Joint", "Storm Damage Repair",
      ],
      "Install/Replace": [
        "New Downpipe Install", "Downpipe Replacement", "Downpipe Relocation",
        "Rainwater Diverter Install", "Stormwater Connection",
      ],
      Other: [
        "Downpipe Flush & Clear", "Quote/Estimate", "Other Downpipe",
      ],
    },
    "roof-restoration": {
      Repair: [
        "Pressure Clean & Repaint", "Re-Pointing & Re-Bedding", "Tile Replacement",
        "Moss & Lichen Treatment", "Colour Fade Touch-Up",
      ],
      "Install/Replace": [
        "Full Roof Restoration", "Roof Coating/Sealing", "Colorbond Re-Roofing",
        "Terracotta to Concrete Tile Conversion", "Heritage Roof Restoration",
      ],
      Other: [
        "Restoration Consultation", "Colour Matching Advice", "Quote/Estimate",
        "Other Restoration",
      ],
    },
    "metal-roofing": {
      Repair: [
        "Rusted Sheet Repair", "Screw Replacement", "Dent Repair",
        "Leaking Metal Roof", "Flashing Repair", "Expansion Joint Repair",
      ],
      "Install/Replace": [
        "New Metal Roof Install", "Colorbond Roof Install", "Zincalume Roof Install",
        "Metal Roof Replacement", "Polycarbonate Sheet Install", "Standing Seam Install",
      ],
      Other: [
        "Metal Roof Inspection", "Rust Treatment", "Quote/Estimate",
        "Other Metal Roofing",
      ],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "ASAP / Emergency",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner of this property",
};
