/** @format */

import useNFTimelineProvider from "./hooks/useNFTimelineProvider";
export default useNFTimelineProvider;

export { default as NFTimelineProvider } from "./components/NFTimelineProvider";
export { default as SearchAndConnectArea } from "hooks/NFTimelineProvider/components/SearchAndConnectArea";

import { getAllRankingData } from "hooks/NFTimelineProvider/api/getRankingData";
import searchUsersHistory from "hooks/NFTimelineProvider/helpers/searchAddressHistory";
import {
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider/types/RankingTypes";

export type {
  addressSplitHistory,
  getTImelineDataReturn,
} from "hooks/NFTimelineProvider/types/ProviderTypes";

export { getAllRankingData, searchUsersHistory };
export type { AllBallotRankingData, Ranks, VoteRankData };
