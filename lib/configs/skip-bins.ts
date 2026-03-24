import type { IndustryConfig } from "../types";

export const skipBinsConfig: IndustryConfig = {
  industry: "skip-bins",
  title: "Book a Skip Bin",
  categories: [
    { id: "general", label: "General\nWaste", emoji: "\uD83D\uDDD1\uFE0F" },
    { id: "green", label: "Green\nWaste", emoji: "\uD83C\uDF3F" },
    { id: "construction", label: "Construction", emoji: "\uD83C\uDFD7\uFE0F" },
    { id: "mixed", label: "Mixed\nWaste", emoji: "\u267B\uFE0F" },
  ],
  serviceTypes: ["2-3 cubic m", "4-6 cubic m", "8-10 cubic m"],
  services: {
    general: {
      "2-3 cubic m": ["Mini Skip — Household Cleanout", "Mini Skip — Garage Cleanout"],
      "4-6 cubic m": ["Medium Skip — Renovation Waste", "Medium Skip — Moving House"],
      "8-10 cubic m": ["Large Skip — Major Cleanout", "Large Skip — Estate Clearance"],
    },
    green: {
      "2-3 cubic m": ["Small Garden Cleanup", "Hedge Trimmings"],
      "4-6 cubic m": ["Medium Garden Cleanup", "Tree Branches & Leaves"],
      "8-10 cubic m": ["Large Property Cleanup", "Land Clearing Waste"],
    },
    construction: {
      "2-3 cubic m": ["Small Reno — Bathroom/Kitchen"],
      "4-6 cubic m": ["Medium Reno — Multiple Rooms", "Demolition Waste"],
      "8-10 cubic m": ["Large Reno / Full House", "Commercial Demolition"],
    },
    mixed: {
      "2-3 cubic m": ["Small Mixed Load"],
      "4-6 cubic m": ["Medium Mixed Load"],
      "8-10 cubic m": ["Large Mixed Load"],
    },
  },
  timeSlots: [
    "Morning Delivery (7:00 AM - 12:00 PM)",
    "Afternoon Delivery (12:00 PM - 5:00 PM)",
    "Flexible",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
  propertyQuestion: "I am the owner of this property",
};
