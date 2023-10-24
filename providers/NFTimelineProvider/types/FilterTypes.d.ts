/** @format */

export type timelineFilterTypes = "date" | "verified" | "order" | "chain";
export interface filtersInitalState {
  date: boolean;
  verified: boolean;
  order: boolean;
  chain: boolean;
}
export interface timelineFilterStore {
  filterType: timelineFilterTypes;
  optionA?: any;
  optionB?: any;
}
