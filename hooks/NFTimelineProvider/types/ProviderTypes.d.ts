/** @format */

import { ethers } from "ethers";
import Address from "hooks/web3/helpers/Address";
import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { type } from "os";
import { VerifiedContractData } from "./verifiedContractsTypes";
import { Ballot, Votes } from "./VotingTypes";
import AddressBook from "hooks/web3/helpers/AddressManager";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import { ActiveChainIndex, NetworkKeys } from "hooks/web3/types/Chains";

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

export type submitVote = (ballotId: string, voteDate: Votes) => Promise<number>;

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
