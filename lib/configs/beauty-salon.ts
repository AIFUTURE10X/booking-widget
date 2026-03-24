import type { IndustryConfig } from "../types";

export const beautySalonConfig: IndustryConfig = {
  industry: "beauty-salon",
  title: "Book Beauty Salon",
  categories: [
    { id: "hair", label: "Hair", emoji: "💇" },
    { id: "nails", label: "Nails", emoji: "💅" },
    { id: "lashes-brows", label: "Lashes &\nBrows", emoji: "👁️" },
    { id: "facials-skin", label: "Facials &\nSkin", emoji: "✨" },
    { id: "waxing", label: "Waxing", emoji: "🌸" },
    { id: "massage", label: "Massage", emoji: "💆" },
  ],
  serviceTypes: ["Appointment", "Package", "Other"],
  services: {
    hair: {
      Appointment: [
        "Women's Cut & Style", "Men's Cut", "Cut & Colour",
        "Full Head Colour", "Highlights/Foils", "Balayage/Ombre",
        "Blowdry & Style", "Keratin Treatment",
        "Hair Extensions", "Updo/Formal Style",
      ],
      Package: [
        "Cut + Colour + Blowdry", "Highlights + Toner + Cut",
        "Bridal Hair Package", "Colour Correction Package",
      ],
      Other: [
        "Colour Consultation", "Hair Treatment (Olaplex/Repair)",
        "Quote/Estimate", "Other Hair Service",
      ],
    },
    nails: {
      Appointment: [
        "Manicure (Classic)", "Pedicure (Classic)", "Gel Manicure",
        "Gel Pedicure", "Acrylic Full Set", "Acrylic Infill",
        "SNS/Dip Powder Nails", "Nail Art",
        "Gel Removal", "Nail Repair",
      ],
      Package: [
        "Mani + Pedi Combo", "Gel Mani + Gel Pedi", "Pamper Package (Mani + Pedi + Scrub)",
        "Bridal Nail Package",
      ],
      Other: [
        "Nail Consultation", "Quote/Estimate", "Other Nail Service",
      ],
    },
    "lashes-brows": {
      Appointment: [
        "Lash Lift & Tint", "Classic Lash Extensions", "Volume Lash Extensions",
        "Hybrid Lash Extensions", "Lash Infill (2 Week)", "Lash Infill (3 Week)",
        "Brow Wax & Shape", "Brow Tint", "Brow Lamination",
        "Henna Brows",
      ],
      Package: [
        "Lash Lift + Brow Lamination", "Brow Shape + Tint + Lamination",
        "Full Eye Package (Lashes + Brows)",
      ],
      Other: [
        "Lash Removal", "Patch Test (New Client)", "Quote/Estimate",
        "Other Lash/Brow Service",
      ],
    },
    "facials-skin": {
      Appointment: [
        "Express Facial (30 min)", "Signature Facial (60 min)",
        "Anti-Ageing Facial", "Hydrating Facial", "Acne/Breakout Facial",
        "LED Light Therapy", "Microdermabrasion", "Chemical Peel",
        "Dermaplaning",
      ],
      Package: [
        "Facial + LED Combo", "Skin Transformation Package (3 Sessions)",
        "Monthly Skin Membership", "Bridal Skin Prep Package",
      ],
      Other: [
        "Skin Consultation", "Product Recommendation", "Quote/Estimate",
        "Other Skin Service",
      ],
    },
    waxing: {
      Appointment: [
        "Full Leg Wax", "Half Leg Wax", "Brazilian Wax", "Bikini Wax",
        "Full Arm Wax", "Underarm Wax", "Lip & Chin Wax",
        "Full Face Wax", "Back Wax", "Chest Wax",
      ],
      Package: [
        "Full Body Wax", "Brazilian + Full Leg + Underarm",
        "Face + Underarm Combo", "Men's Wax Package",
      ],
      Other: [
        "First-Time Wax Consultation", "Quote/Estimate", "Other Waxing",
      ],
    },
    massage: {
      Appointment: [
        "Relaxation Massage (30 min)", "Relaxation Massage (60 min)",
        "Deep Tissue Massage", "Hot Stone Massage", "Pregnancy Massage",
        "Sports Massage", "Head & Neck Massage",
      ],
      Package: [
        "Massage + Facial Combo", "Couples Massage", "Pamper Day Package",
        "Monthly Massage Membership",
      ],
      Other: [
        "Gift Voucher", "Quote/Estimate", "Other Massage Service",
      ],
    },
  },
  timeSlots: [
    "Early Morning (8:00 AM - 10:00 AM)",
    "Morning (10:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 3:00 PM)",
    "Late Afternoon (3:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 8:00 PM)",
    "Saturday",
    "Sunday",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
