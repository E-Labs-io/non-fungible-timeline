/** @format */

import { initialVotingState, votingCategoryList } from "types/votingTypes";

const category1: votingCategoryList = {
  name: "degen",
  title: "Degen",
  label: "🤷🏼‍♂️",
  active: true,
  totalVotes: 10,
};
const category2: votingCategoryList = {
  name: "diamondhands",
  title: "DIamond Hands",
  label: "💎🙌🏼",
  active: true,
  totalVotes: 50,
};
const category3: votingCategoryList = {
  name: "whale",
  title: "Whale",
  label: "🐳",
  active: true,
  totalVotes: 50,
};
const category4: votingCategoryList = {
  name: "insider",
  title: "Insider",
  label: "🕵🏼‍♂️",
  active: true,
  totalVotes: 50,
};

const initialVotingState: initialVotingState = {
  categories: [category1, category2, category3, category4],
  votingData: {},
};

export default initialVotingState;
