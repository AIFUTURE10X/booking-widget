import type { IndustryConfig } from "../types";
import { plumbingConfig } from "./plumbing";
import { pestControlConfig } from "./pest-control";
import { hvacConfig } from "./hvac";
import { locksmithConfig } from "./locksmith";
import { cleaningConfig } from "./cleaning";
import { landscapingConfig } from "./landscaping";
import { electricalConfig } from "./electrical";
import { roofingConfig } from "./roofing";
import { paintingConfig } from "./painting";
import { fencingConfig } from "./fencing";
import { handymanConfig } from "./handyman";
import { garageDoorsConfig } from "./garage-doors";
import { poolServiceConfig } from "./pool-service";
import { solarConfig } from "./solar";
import { securityConfig } from "./security";
import { removalistsConfig } from "./removalists";
import { towingConfig } from "./towing";
import { dentalConfig } from "./dental";
import { beautySalonConfig } from "./beauty-salon";
import { realEstateConfig } from "./real-estate";

/** Registry of all industry configs */
export const industryConfigs: Record<string, IndustryConfig> = {
  plumbing: plumbingConfig,
  "pest-control": pestControlConfig,
  hvac: hvacConfig,
  locksmith: locksmithConfig,
  cleaning: cleaningConfig,
  landscaping: landscapingConfig,
  electrical: electricalConfig,
  roofing: roofingConfig,
  painting: paintingConfig,
  fencing: fencingConfig,
  handyman: handymanConfig,
  "garage-doors": garageDoorsConfig,
  "pool-service": poolServiceConfig,
  solar: solarConfig,
  security: securityConfig,
  removalists: removalistsConfig,
  towing: towingConfig,
  dental: dentalConfig,
  "beauty-salon": beautySalonConfig,
  "real-estate": realEstateConfig,
};

export function getIndustryConfig(id: string): IndustryConfig | null {
  return industryConfigs[id] || null;
}

export function getIndustryList() {
  return Object.entries(industryConfigs).map(([id, config]) => ({
    id,
    label: config.title,
    industry: config.industry,
  }));
}
