import type { IndustryConfig } from "../types";

export const towingConfig: IndustryConfig = {
  industry: "towing",
  title: "Book Towing Service",
  categories: [
    { id: "car-towing", label: "Car\nTowing", emoji: "🚗" },
    { id: "motorcycle", label: "Motorcycle\nTowing", emoji: "🏍️" },
    { id: "truck-heavy", label: "Truck &\nHeavy", emoji: "🚛" },
    { id: "roadside-assist", label: "Roadside\nAssist", emoji: "🛠️" },
    { id: "accident-recovery", label: "Accident\nRecovery", emoji: "🚨" },
  ],
  serviceTypes: ["Emergency", "Scheduled", "Other"],
  services: {
    "car-towing": {
      Emergency: [
        "Breakdown Tow", "Flat Tyre (No Spare)", "Overheated Vehicle Tow",
        "Won't Start - Tow to Mechanic", "Illegally Parked Vehicle Recovery",
      ],
      Scheduled: [
        "Car to Mechanic/Service", "Car to Wreckers", "Project Car Transport",
        "Auction Vehicle Pickup", "Dealership to Home Delivery",
        "Airport Vehicle Relocation",
      ],
      Other: [
        "Quote/Estimate", "Long Distance Vehicle Transport",
        "Enclosed Transport", "Other Car Towing",
      ],
    },
    motorcycle: {
      Emergency: [
        "Motorcycle Breakdown Tow", "Dropped Bike Recovery", "Flat Tyre Tow",
      ],
      Scheduled: [
        "Bike to Mechanic/Service", "Bike Purchase Pickup", "Track Day Transport",
        "Motorcycle Storage Transport", "Interstate Motorcycle Transport",
      ],
      Other: [
        "Motorcycle Cradle Tow", "Quote/Estimate", "Other Motorcycle Towing",
      ],
    },
    "truck-heavy": {
      Emergency: [
        "Truck Breakdown Recovery", "Bogged Truck Extraction", "Bus/Coach Tow",
        "Trailer Breakdown Tow", "Crane Truck Required",
      ],
      Scheduled: [
        "Heavy Equipment Transport", "Machinery Relocation", "Container Transport",
        "Caravan/RV Transport", "Boat Transport", "Forklift Transport",
      ],
      Other: [
        "Tilt Tray Hire", "Low Loader Hire", "Quote/Estimate",
        "Other Heavy Towing",
      ],
    },
    "roadside-assist": {
      Emergency: [
        "Jump Start / Flat Battery", "Flat Tyre Change", "Locked Out of Car",
        "Out of Fuel Delivery", "Overheating Assistance",
      ],
      Scheduled: [
        "Pre-Trip Vehicle Check", "Battery Replacement (Mobile)",
        "Tyre Replacement (Mobile)",
      ],
      Other: [
        "Roadside Membership Info", "Quote/Estimate", "Other Roadside",
      ],
    },
    "accident-recovery": {
      Emergency: [
        "Accident Vehicle Tow", "Multi-Vehicle Accident Recovery",
        "Rollover Recovery", "Vehicle in Ditch/Off-Road Recovery",
        "Water/Flood Damaged Vehicle Recovery",
      ],
      Scheduled: [
        "Insurance Tow to Assessor", "Tow from Panel Beater to Home",
        "Write-Off Vehicle Removal",
      ],
      Other: [
        "Insurance Liaison/Paperwork", "Accident Scene Cleanup",
        "Quote/Estimate", "Other Accident Recovery",
      ],
    },
  },
  timeSlots: [
    "ASAP / Emergency (24/7)",
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 10:00 PM)",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
