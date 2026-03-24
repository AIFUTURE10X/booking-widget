import type { IndustryConfig } from "../types";

export const removalistsConfig: IndustryConfig = {
  industry: "removalists",
  title: "Book Removalists",
  categories: [
    { id: "house-moves", label: "House\nMoves", emoji: "🏠" },
    { id: "office-moves", label: "Office\nMoves", emoji: "🏢" },
    { id: "interstate", label: "Interstate\nMoves", emoji: "🚛" },
    { id: "packing", label: "Packing\nServices", emoji: "📦" },
    { id: "storage", label: "Storage", emoji: "🏪" },
  ],
  serviceTypes: ["Full Service", "Labour Only", "Other"],
  services: {
    "house-moves": {
      "Full Service": [
        "1 Bedroom Move", "2 Bedroom Move", "3 Bedroom Move",
        "4+ Bedroom Move", "Unit/Apartment Move", "Townhouse Move",
        "Granny Flat Move", "Partial Home Move (Select Items)",
      ],
      "Labour Only": [
        "Loading Truck Only", "Unloading Truck Only", "Furniture Rearrangement",
        "Heavy Item Move (Piano, Pool Table)", "Appliance Move",
      ],
      Other: [
        "Pre-Move Assessment", "Quote/Estimate", "Elderly/Assisted Move",
        "Other House Move",
      ],
    },
    "office-moves": {
      "Full Service": [
        "Small Office Move (1-10 Desks)", "Medium Office Move (10-30 Desks)",
        "Large Office Move (30+ Desks)", "Retail/Shop Relocation",
        "Medical Practice Move", "Server Room Relocation",
      ],
      "Labour Only": [
        "Desk & Chair Move Only", "IT Equipment Move Only",
        "Filing Cabinet & Archive Move", "Office Furniture Rearrange",
      ],
      Other: [
        "Office Move Planning", "After-Hours Move", "Quote/Estimate",
        "Other Office Move",
      ],
    },
    interstate: {
      "Full Service": [
        "Sydney to Melbourne", "Sydney to Brisbane", "Melbourne to Brisbane",
        "Perth Move (Any Origin)", "Adelaide Move (Any Origin)",
        "Hobart/Tasmania Move", "Darwin Move", "Custom Interstate Route",
      ],
      "Labour Only": [
        "Interstate Loading Only", "Interstate Unloading Only",
        "Backloading (Shared Truck)", "Container Loading/Unloading",
      ],
      Other: [
        "Interstate Quote", "Transit Insurance", "Vehicle Transport",
        "Other Interstate",
      ],
    },
    packing: {
      "Full Service": [
        "Full House Pack", "Kitchen Pack", "Fragile Items Pack",
        "Art & Antiques Pack", "Wardrobe/Clothing Pack",
        "Full Unpack at Destination",
      ],
      "Labour Only": [
        "Packing Materials Delivery", "Box Assembly",
        "Fragile Wrapping Only", "Disassembly/Reassembly (Furniture)",
      ],
      Other: [
        "Packing Materials Supply", "Eco-Friendly Packing Options",
        "Quote/Estimate", "Other Packing",
      ],
    },
    storage: {
      "Full Service": [
        "Short-Term Storage (1-3 Months)", "Long-Term Storage (3+ Months)",
        "Climate-Controlled Storage", "Pickup & Deliver to Storage",
        "Pod/Container Storage at Property",
      ],
      "Labour Only": [
        "Load Into Storage Unit", "Unload From Storage Unit",
        "Storage Unit Reorganise",
      ],
      Other: [
        "Storage Facility Tour", "Size & Duration Estimate",
        "Quote/Estimate", "Other Storage",
      ],
    },
  },
  timeSlots: [
    "Morning (6:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Full Day Booking",
    "Flexible / Any Time",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner/tenant of this property",
};
