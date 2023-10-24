/** @format */

import { ethers } from "ethers";
import {
  Address,
  AddressBook,
  ActiveChainIndex,
  NetworkKeys,
  SingleNFTDataType,
} from "e-labs_web3provider";
import { type } from "os";
import { VerifiedContractData } from "./verifiedContractsTypes";
import { Ballot, Votes } from "./VotingTypes";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";

export interface NFTimelineProviderContextType {
  submitVote: submitVote;
  getAllRankings: () => Promise<AllBallotRankingData> | AllBallotRankingData;
  getBallotRankings: (ballotId: string) => Ranks;
  getTokenMetadata: getTokenMetadataType;
  getTimelineData: getTimelineData;
  setActiveTimelineData: setActiveTimelineDataType;
  setActiveAddress: (address: Address) => void;
  addNewTimelineData: addNewTimelineData;
  addTimelineFilter: addTimelineFilter;
  removeTimelineFilter: removeTimelineFilter;
  removeAllTimelineFilters: removeAllTimelineFilters;
  checkIfValidContract: checkIfValidContract;
  checkIfAddressVoted: checkIfAddressVoted;
  getSpyList: (usersAddress: string) => Promise<AddressBook>;
  addToSpyList: (usersAddress: string, spyAddress: string) => Promise<boolean>;
  removeFromSpyList: (
    usersAddress: string,
    spyAddress: string
  ) => Promise<false | AddressBook>;
  removeVote: removeVote;
  timelineFilters: timelineFilterStore[];
  activeTimeline: addressSplitHistory;
  verifiedContractList: VerifiedContractData[];
  activeAddress: Address;
  allBallotRankings: AllBallotRankingData;
  spyList: AddressBook;
  selectedChains: ActiveChainIndex;
  onSelectedChainChange: onChainSelection;
}

export type addTimelineFilter = (filterOptions: timelineFilterStore) => void;
export type removeTimelineFilter = (filterType: timelineFilterTypes) => void;
export type removeAllTimelineFilters = () => void;
export type checkIfValidContract = (
  contractAddress: string
) => VerifiedContractData | false;

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
  ballotId: string,
  voteDate: Votes
) => Promise<number>;

export type submitVote = (
  ballotId: string,
  voteDate: Votes
) => Promise<number | false>;

export type getTokenMetadataType = (
  contractAddress: string,
  tokenId: string,
  chain: NetworkKeys
) => Promise<SingleNFTDataType>;

export type getBallotsType = () => Promise<Ballot[]>;

export type getBallotDataType = (ballotTitle: string) => Promise<Ballot>;

export type StoredMetadataType = {
  [chain in NetworkKeys]?: {
    [contractAddress: string]: { [tokenId: string]: SingleNFTDataType };
  };
};

export type getAllRankingData = () =>
  | Promise<AllBallotRankingData>
  | AllBallotRankingData;

export type checkIfAddressVoted = (
  ballotId: string,
  voterAddress: string,
  votedForAddress: string
) => Promise<boolean>;

export type removeVote = (
  ballotId: string,
  voterAddress: string,
  votedForAddress: string
) => Promise<boolean>;

export type onChainSelection = (
  action: "add" | "remove",
  chain: NetworkKeys
) => void;
