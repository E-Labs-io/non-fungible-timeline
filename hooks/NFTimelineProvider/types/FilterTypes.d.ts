/** @format */

export type timelineFilterTypes = "date" | "verified" | "order";
export interface filtersInitalState {
  date: boolean;
  verified: boolean;
  order: boolean;
}
export interface timelineFilterStore {
  filterType: timelineFilterTypes;
  optionA?: any;
  optionB?: any;
}
