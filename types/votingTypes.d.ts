/** @format */

export type initialVotingState = {
  categories: votingCategoryList[];
  votingData: { [category: string]: votingCategoryData };
};

export type votingCategoryList = {
  name: string;
  label: string;
  icon?: string;
  active: boolean;
  totalVotes: number;
};

export type votingCategoryData = {
  top10: votingPositionData[];
};

export type votingPositionData = {
  address: string;
  totalVotes: number;
  percentOfVote: string;
  categoryName: string;
};

export type votingWalletsStatsReturn = {
  address: string;
  categories: { [categoryName: string]: {} };
};

export type votingCategoriesType = "degen" | "diamondhands";
