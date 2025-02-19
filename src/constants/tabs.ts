import { TabType } from "../types/tabs.type";

export const TABS: Record<string, TabType> = {
  THREE_DAYS: "3days",
  SEVEN_DAYS: "7days",
  FOURTEEN_DAYS: "14days",
};

export const TAB_DAYS_MAP: Record<TabType, number> = {
  "3days": 3,
  "7days": 7,
  "14days": 14,
};
