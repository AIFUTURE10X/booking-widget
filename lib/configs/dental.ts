import type { IndustryConfig } from "../types";

export const dentalConfig: IndustryConfig = {
  industry: "dental",
  title: "Book a Dentist",
  categories: [
    { id: "general", label: "General\nDentistry", emoji: "🦷" },
    { id: "cosmetic", label: "Cosmetic\nDentistry", emoji: "✨" },
    { id: "orthodontics", label: "Orthodontics", emoji: "😁" },
    { id: "emergency", label: "Emergency\nDental", emoji: "🚨" },
    { id: "childrens", label: "Children's\nDentistry", emoji: "👶" },
  ],
  serviceTypes: ["Check-Up", "Treatment", "Other"],
  services: {
    general: {
      "Check-Up": [
        "Routine Check-Up & Clean", "Scale & Polish", "Full Mouth Examination",
        "X-Rays (OPG/Bitewing)", "Gum Health Assessment",
      ],
      Treatment: [
        "Filling (Tooth Coloured)", "Root Canal Treatment", "Tooth Extraction",
        "Wisdom Tooth Removal", "Crown & Bridge", "Dentures (Full/Partial)",
        "Night Guard/Splint", "Gum Disease Treatment",
      ],
      Other: [
        "New Patient Consultation", "Second Opinion", "Treatment Plan Discussion",
        "Quote/Estimate", "Other General",
      ],
    },
    cosmetic: {
      "Check-Up": [
        "Cosmetic Consultation", "Smile Assessment", "Shade Matching",
      ],
      Treatment: [
        "Teeth Whitening (In-Chair)", "Take-Home Whitening Kit", "Porcelain Veneers",
        "Composite Bonding", "Gum Contouring", "Smile Makeover",
        "Tooth Reshaping",
      ],
      Other: [
        "Before & After Portfolio Review", "Payment Plan Discussion",
        "Quote/Estimate", "Other Cosmetic",
      ],
    },
    orthodontics: {
      "Check-Up": [
        "Orthodontic Assessment", "Progress Check (Existing Braces)",
        "Retainer Check",
      ],
      Treatment: [
        "Metal Braces", "Ceramic Braces", "Invisalign/Clear Aligners",
        "Lingual Braces", "Retainer Fitting", "Expander Fitting",
        "Wire Adjustment",
      ],
      Other: [
        "Orthodontic Consultation", "Treatment Timeline Discussion",
        "Quote/Estimate", "Other Orthodontics",
      ],
    },
    emergency: {
      "Check-Up": [
        "Emergency Assessment",
      ],
      Treatment: [
        "Severe Toothache", "Broken/Chipped Tooth", "Knocked-Out Tooth",
        "Lost Filling or Crown", "Abscess/Infection", "Swollen Face/Jaw",
        "Bleeding Gums (Acute)", "Broken Denture Repair",
      ],
      Other: [
        "After-Hours Emergency", "Pain Management Advice", "Other Emergency",
      ],
    },
    childrens: {
      "Check-Up": [
        "Child's First Visit (Age 1-3)", "Routine Child Check-Up & Clean",
        "Child X-Rays", "Fluoride Treatment",
      ],
      Treatment: [
        "Fissure Sealants", "Child Filling", "Baby Tooth Extraction",
        "Space Maintainer", "Mouthguard (Custom Sports)",
        "Early Orthodontic Assessment",
      ],
      Other: [
        "Child Dental Benefits Schedule Enquiry", "Anxious Child Consultation",
        "Quote/Estimate", "Other Children's Dental",
      ],
    },
  },
  timeSlots: [
    "Early Morning (7:00 AM - 9:00 AM)",
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 3:00 PM)",
    "Late Afternoon (3:00 PM - 5:30 PM)",
    "Evening (5:30 PM - 8:00 PM)",
    "Saturday Morning",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
