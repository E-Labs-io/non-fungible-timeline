/** @format */

import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { type } from "os";
import { Ballot } from "./VotingTypes";

export interface NFTimelineProviderContextType {
  //postVote: postVoteType;
  //getBallots: getBallotsType;
  //getBallotData: getBallotDataType;
  getTokenMetadata: getTokenMetadataType;
  getTimelineData: getTimelineData;
  setActiveTimelineData: setActiveTimelineDataType;
  setActiveAddress: (address: string) => void;
  addNewTimelineData: addNewTimelineData;
  addTimelineFilter: addTimelineFilter;
  removeTimelineFilter: removeTimelineFilter;
  removeAllTimelineFilters: removeAllTimelineFilters;
  timelineFilters: timelineFilterStore[];
  activeTimeline: addressSplitHistory;
  verifiedContractList: string[];
  activeAddress: string;
}

export type timelineFilterTypes = "date" | "verified";
export interface timelineFilterStore {
  filterType: timelineFilterTypes;
  optionA?: string;
  optionB?: string;
}
export type addTimelineFilter = (filterOptions: timelineFilterStore) => void;
export type removeTimelineFilter = (filterType: timelineFilterTypes) => void;
export type removeAllTimelineFilters = () => void;

export type addNewTimelineData = (
  address: string,
  timeline: addressSplitHistory
) => void;

export type addressCollection = {
  [address: string]: addressSplitHistory;
};
export type addressSplitHistory = {
  inByDate: compileHistoryIntoDaysReturn;
  outByDate: compileHistoryIntoDaysReturn;
};

export type getTImelineDataReturn = {
  inByDate: compileHistoryIntoDaysReturn;
  outByDate: compileHistoryIntoDaysReturn;
  searchAddress: string;
};

export type setActiveTimelineDataType = (
  timelineData: addressSplitHistory
) => void;

export type getTimelineData = (address: string) => addressSplitHistory | false;

export type postVoteType = (
  category: string,
  voter: string,
  proposed: string
) => Promise<boolean>;

export type getTokenMetadataType = (
  network: string,
  contractAddress: string,
  tokenId: string
) => Promise<SingleNFTDataType>;

export type getBallotsType = () => Promise<Ballot[]>;

export type getBallotDataType = (ballotTitle: string) => Promise<Ballot>;

export type StoredMetadataType = {
  ethereum: {
    [contractAddress: string]: { [tokenId: string]: SingleNFTDataType };
  };
};
