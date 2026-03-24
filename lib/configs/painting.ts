import type { IndustryConfig } from "../types";

export const paintingConfig: IndustryConfig = {
  industry: "painting",
  title: "Book a Painter",
  categories: [
    { id: "interior", label: "Interior\nPainting", emoji: "🎨" },
    { id: "exterior", label: "Exterior\nPainting", emoji: "🏠" },
    { id: "commercial", label: "Commercial\nPainting", emoji: "🏢" },
    { id: "strata", label: "Strata &\nMulti-Unit", emoji: "🏬" },
    { id: "specialty", label: "Specialty\nFinishes", emoji: "✨" },
  ],
  serviceTypes: ["Full Paint", "Touch-Up", "Other"],
  services: {
    interior: {
      "Full Paint": [
        "Whole House Interior", "Single Room Repaint", "Kitchen & Bathroom",
        "Ceiling Repaint", "Hallways & Stairwell", "Multi-Room Package",
      ],
      "Touch-Up": [
        "Wall Patch & Paint", "Scuff & Mark Repair", "Ceiling Spot Repair",
        "Door & Frame Touch-Up", "Skirting Board Touch-Up",
      ],
      Other: [
        "Colour Consultation", "Quote/Estimate", "Pre-Sale Freshen Up",
        "Rental Property Repaint", "Other Interior",
      ],
    },
    exterior: {
      "Full Paint": [
        "Full House Exterior", "Weatherboard Repaint", "Brick Render & Paint",
        "Eaves & Fascia", "Fence & Gate Painting", "Deck & Pergola Staining",
      ],
      "Touch-Up": [
        "Peeling Paint Repair", "Window Frame Touch-Up", "Front Door Repaint",
        "Post & Railing Touch-Up", "Render Crack Repair & Paint",
      ],
      Other: [
        "Exterior Colour Consultation", "Pressure Wash & Prep", "Quote/Estimate",
        "Lead Paint Assessment", "Other Exterior",
      ],
    },
    commercial: {
      "Full Paint": [
        "Office Repaint", "Retail Shop Fit-Out", "Warehouse & Factory",
        "Restaurant/Cafe Repaint", "Medical/Dental Surgery",
        "School & Childcare Centre",
      ],
      "Touch-Up": [
        "High-Traffic Area Repaint", "Stairwell & Corridor Touch-Up",
        "Reception Area Freshen Up", "Bathroom & Amenities Touch-Up",
      ],
      Other: [
        "After-Hours Painting", "Epoxy Floor Coating", "Line Marking",
        "Quote/Estimate", "Other Commercial",
      ],
    },
    strata: {
      "Full Paint": [
        "Common Area Repaint", "Building Exterior Repaint", "Garage & Carpark",
        "Stairwell & Lift Lobby", "Balcony & Balustrade",
      ],
      "Touch-Up": [
        "Hallway Touch-Up", "Entry & Foyer Refresh", "Mailbox Area Repaint",
        "Bollard & Line Marking",
      ],
      Other: [
        "Strata Colour Scheme Plan", "Body Corporate Quote",
        "Heritage Colour Matching", "Quote/Estimate", "Other Strata",
      ],
    },
    specialty: {
      "Full Paint": [
        "Feature Wall (Textured)", "Wallpaper Installation", "Limewash Finish",
        "Venetian Plaster", "Metallic/Pearlescent Finish", "Mural & Artwork",
      ],
      "Touch-Up": [
        "Wallpaper Repair", "Textured Wall Patch", "Feature Wall Touch-Up",
        "Faux Finish Repair",
      ],
      Other: [
        "Wallpaper Removal", "Specialty Finish Consultation", "Quote/Estimate",
        "Colour Matching (Custom Mix)", "Other Specialty",
      ],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Flexible / Any Time",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner/tenant of this property",
};
