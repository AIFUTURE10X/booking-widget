import type { VenueConfig } from "../../types";
import { tennisConfig } from "./tennis";
import { basketballConfig } from "./basketball";
import { functionRoomConfig } from "./function-room";
import { studioConfig } from "./studio";
import { meetingRoomConfig } from "./meeting-room";
import { cricketNetsConfig } from "./cricket-nets";
import { sportsFieldConfig } from "./sports-field";
import { equipmentRentalConfig } from "./equipment-rental";
import { salonConfig } from "./salon";
import { tutoringConfig } from "./tutoring";

/** Registry of all venue configs */
export const venueConfigs: Record<string, VenueConfig> = {
  tennis: tennisConfig,
  basketball: basketballConfig,
  "function-room": functionRoomConfig,
  studio: studioConfig,
  "meeting-room": meetingRoomConfig,
  "cricket-nets": cricketNetsConfig,
  "sports-field": sportsFieldConfig,
  "equipment-rental": equipmentRentalConfig,
  salon: salonConfig,
  tutoring: tutoringConfig,
};

export function getVenueConfig(id: string): VenueConfig | null {
  return venueConfigs[id] || null;
}

export function getVenueList() {
  return Object.entries(venueConfigs).map(([id, config]) => ({
    id,
    label: config.title,
    venueType: config.venueType,
  }));
}
