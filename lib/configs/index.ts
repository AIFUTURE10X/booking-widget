import type { IndustryConfig } from "../types";
import { plumbingConfig } from "./plumbing";
import { pestControlConfig } from "./pest-control";
import { hvacConfig } from "./hvac";
import { locksmithConfig } from "./locksmith";
import { cleaningConfig } from "./cleaning";
import { landscapingConfig } from "./landscaping";

/** Registry of all industry configs */
export const industryConfigs: Record<string, IndustryConfig> = {
  plumbing: plumbingConfig,
  "pest-control": pestControlConfig,
  hvac: hvacConfig,
  locksmith: locksmithConfig,
  cleaning: cleaningConfig,
  landscaping: landscapingConfig,
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
