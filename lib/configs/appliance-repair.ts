import type { IndustryConfig } from "../types";

export const applianceRepairConfig: IndustryConfig = {
  industry: "appliance-repair",
  title: "Book Appliance Repair",
  categories: [
    { id: "kitchen", label: "Kitchen", emoji: "\uD83C\uDF73" },
    { id: "laundry", label: "Laundry", emoji: "\uD83E\uDDFA" },
    { id: "cooling", label: "Cooling &\nHeating", emoji: "\u2744\uFE0F" },
    { id: "other", label: "Other", emoji: "\uD83D\uDD0C" },
  ],
  serviceTypes: ["Repair", "Service", "Other"],
  services: {
    kitchen: {
      Repair: ["Fridge Not Cooling", "Dishwasher Not Draining", "Oven Not Heating", "Microwave Fault", "Rangehood Motor", "Ice Maker Fault"],
      Service: ["Fridge Service", "Oven Clean & Service", "Dishwasher Service"],
      Other: ["Appliance Installation", "Quote/Estimate"],
    },
    laundry: {
      Repair: ["Washing Machine Not Spinning", "Washing Machine Leaking", "Dryer Not Heating", "Dryer Not Tumbling", "Noisy Machine"],
      Service: ["Washing Machine Service", "Dryer Lint Clean & Service"],
      Other: ["Installation", "Quote/Estimate"],
    },
    cooling: {
      Repair: ["Portable AC Not Cooling", "Heater Not Working", "Dehumidifier Fault"],
      Service: ["AC Filter Clean", "Heater Service"],
      Other: ["Quote/Estimate"],
    },
    other: {
      Repair: ["Vacuum Cleaner Repair", "Coffee Machine Repair", "TV Repair", "Other Appliance"],
      Service: ["Coffee Machine Descale", "General Appliance Check"],
      Other: ["Quote/Estimate"],
    },
  },
  timeSlots: [
    "Morning (7:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 5:00 PM)",
    "Evening (5:00 PM - 8:00 PM)",
  ],
  states: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"],
};
