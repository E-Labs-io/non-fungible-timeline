/** @format */

import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { Ballot } from "./VotingTypes";

export interface NFTimelineProviderContextType {
  postVote: postVoteType;
  getTokenMetadata: getTokenMetadataType;
  getBallots: getBallotsType;
  getBallotData: getBallotDataType;
  verifiedContractList: string[];
}

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
