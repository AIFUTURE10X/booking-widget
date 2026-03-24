import type { IndustryConfig } from "../types";

export const petGroomingConfig: IndustryConfig = {
  industry: "pet-grooming",
  title: "Book Pet Grooming",
  categories: [
    { id: "dog", label: "Dog\nGrooming", emoji: "\uD83D\uDC36" },
    { id: "cat", label: "Cat\nGrooming", emoji: "\uD83D\uDC31" },
    { id: "mobile", label: "Mobile\nGrooming", emoji: "\uD83D\uDE90" },
  ],
  serviceTypes: ["Full Groom", "Wash & Dry", "Other"],
  services: {
    dog: {
      "Full Groom": ["Small Dog (under 10kg)", "Medium Dog (10-25kg)", "Large Dog (25-40kg)", "Extra Large Dog (40kg+)"],
      "Wash & Dry": ["Small Dog — Wash & Dry", "Medium Dog — Wash & Dry", "Large Dog — Wash & Dry"],
      Other: ["Nail Trim", "Ear Clean", "Teeth Brushing", "De-shedding Treatment", "Flea Treatment Bath", "Puppy First Groom"],
    },
    cat: {
      "Full Groom": ["Short Hair Cat", "Long Hair Cat", "Persian / Flat Face"],
      "Wash & Dry": ["Cat Wash & Dry", "Lion Cut"],
      Other: ["Nail Trim", "Mat Removal", "Sanitary Clip"],
    },
    mobile: {
      "Full Groom": ["Mobile Full Groom — Small", "Mobile Full Groom — Medium", "Mobile Full Groom — Large"],
      "Wash & Dry": ["Mobile Wash — Small", "Mobile Wash — Medium", "Mobile Wash — Large"],
      Other: ["Mobile Nail Trim", "Mobile De-shedding"],
    },
  },
  timeSlots: [
    "Morning (8:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Flexible",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
