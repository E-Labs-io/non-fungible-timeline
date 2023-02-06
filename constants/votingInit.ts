/** @format */

import { initialVotingState, votingCategoryList } from "types/votingTypes";

const category1: votingCategoryList = {
  name: "degen",
  label: "Degen",
  active: true,
  totalVotes: 10,
};
const category2: votingCategoryList = {
  name: "diamondhands",
  label: "💎 Hands",
  active: true,
  totalVotes: 50,
};
const category3: votingCategoryList = {
  name: "whale",
  label: "🐳",
  active: true,
  totalVotes: 50,
};

const initialVotingState: initialVotingState = {
  categories: [category1, category2, category3],
  votingData: {},
};

export default initialVotingState;
