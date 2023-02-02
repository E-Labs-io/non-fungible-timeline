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
  label: "Diamond Hands",
  active: true,
  totalVotes: 50,
};

const initialVotingState: initialVotingState = {
  categories: [category1, category2],
  votingData: {},
};

export default initialVotingState;
