import type { IndustryConfig } from "../types";

export const realEstateConfig: IndustryConfig = {
  industry: "real-estate",
  title: "Book Real Estate Service",
  categories: [
    { id: "property-appraisal", label: "Property\nAppraisal", emoji: "📋" },
    { id: "open-home", label: "Open\nHome", emoji: "🏠" },
    { id: "rental-inspection", label: "Rental\nInspection", emoji: "🔑" },
    { id: "property-management", label: "Property\nManagement", emoji: "🏢" },
    { id: "auction", label: "Auction", emoji: "🔨" },
  ],
  serviceTypes: ["Booking", "Consultation", "Other"],
  services: {
    "property-appraisal": {
      Booking: [
        "Free Market Appraisal", "Formal Property Valuation",
        "Pre-Purchase Appraisal", "Investment Property Assessment",
        "Development Site Appraisal",
      ],
      Consultation: [
        "Selling Strategy Discussion", "Market Update & Timing Advice",
        "Renovation ROI Consultation", "Suburb & Market Report",
      ],
      Other: [
        "Comparative Market Analysis", "Off-Market Appraisal",
        "Quote/Estimate (Selling Fees)", "Other Appraisal",
      ],
    },
    "open-home": {
      Booking: [
        "Register for Open Home", "Private Inspection Booking",
        "Virtual Tour Booking", "Second Inspection", "Pre-Auction Inspection",
      ],
      Consultation: [
        "Buyer Needs Assessment", "First Home Buyer Guidance",
        "Investment Property Advice", "Downsizer Consultation",
      ],
      Other: [
        "Request Property Details", "Request Contract for Review",
        "Neighbourhood Information", "Other Open Home",
      ],
    },
    "rental-inspection": {
      Booking: [
        "Rental Open Home Registration", "Private Rental Inspection",
        "Routine Inspection (Existing Tenant)", "Entry Condition Report",
        "Exit Condition Report",
      ],
      Consultation: [
        "Rental Application Help", "Tenancy Rights Advice",
        "Rent Review Discussion", "Lease Renewal Discussion",
      ],
      Other: [
        "Maintenance Request", "Bond Dispute Advice",
        "Quote/Estimate", "Other Rental",
      ],
    },
    "property-management": {
      Booking: [
        "New Property Management Setup", "Property Handover Meeting",
        "Routine Inspection Scheduling", "Tenant Move-In Appointment",
        "Tenant Move-Out Appointment",
      ],
      Consultation: [
        "Property Management Fee Discussion", "Landlord Insurance Advice",
        "Investment Strategy Consultation", "Tax Depreciation Advice",
        "Renovation for Rental Return",
      ],
      Other: [
        "Switch Property Manager", "Rent Arrears Discussion",
        "Quote/Estimate", "Other Property Management",
      ],
    },
    auction: {
      Booking: [
        "Register to Bid", "Pre-Auction Offer Meeting",
        "Auction Day Attendance", "Post-Auction Negotiation",
        "Online Auction Registration",
      ],
      Consultation: [
        "Auction Process Explanation", "Bidding Strategy Advice",
        "Reserve Price Discussion (Vendor)", "Auction vs Private Sale Advice",
      ],
      Other: [
        "Auction Results Enquiry", "Expression of Interest",
        "Quote/Estimate", "Other Auction",
      ],
    },
  },
  timeSlots: [
    "Morning (9:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 3:00 PM)",
    "Late Afternoon (3:00 PM - 5:30 PM)",
    "Evening (5:30 PM - 7:30 PM)",
    "Saturday Morning",
    "Saturday Afternoon",
    "Sunday",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
