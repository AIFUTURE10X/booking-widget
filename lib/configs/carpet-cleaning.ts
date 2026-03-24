import type { IndustryConfig } from "../types";

export const carpetCleaningConfig: IndustryConfig = {
  industry: "carpet-cleaning",
  title: "Book Carpet Cleaning",
  categories: [
    { id: "carpet", label: "Carpet", emoji: "\uD83E\uDDF9" },
    { id: "upholstery", label: "Upholstery", emoji: "\uD83D\uDECB\uFE0F" },
    { id: "tile-grout", label: "Tile &\nGrout", emoji: "\u2B1C" },
    { id: "rug", label: "Rug\nCleaning", emoji: "\uD83E\uDDF6" },
  ],
  serviceTypes: ["Standard", "Deep Clean", "Other"],
  services: {
    carpet: {
      Standard: ["1 Room", "2 Rooms", "3 Rooms", "4 Rooms", "5+ Rooms", "Whole House", "Hallway / Stairs"],
      "Deep Clean": ["Pet Stain Removal", "Flood Damage", "Mould Treatment", "Odour Removal", "High Traffic Areas"],
      Other: ["End of Lease Clean", "Pre-Sale Clean", "Scotchgard Protection", "Quote/Estimate"],
    },
    upholstery: {
      Standard: ["Sofa (2-seater)", "Sofa (3-seater)", "Armchair", "Dining Chairs (set)", "Mattress — Single", "Mattress — Double/Queen", "Mattress — King"],
      "Deep Clean": ["Pet Hair Removal", "Stain Treatment", "Leather Conditioning"],
      Other: ["Curtain Cleaning", "Car Interior", "Quote/Estimate"],
    },
    "tile-grout": {
      Standard: ["Kitchen Floor", "Bathroom Floor", "Laundry Floor", "Outdoor Tiles", "Pool Area"],
      "Deep Clean": ["Grout Recolouring", "Grout Sealing", "Mould Removal"],
      Other: ["Quote/Estimate", "Other Tile Cleaning"],
    },
    rug: {
      Standard: ["Small Rug", "Medium Rug", "Large Rug", "Persian/Oriental Rug"],
      "Deep Clean": ["Stain Removal", "Moth Treatment", "Fringe Cleaning"],
      Other: ["Pick-up & Delivery", "Quote/Estimate"],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "All Day",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
