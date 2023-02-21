/** @format */

import Address from "hooks/web3/helpers/Address";
import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useEffect, useState, createContext } from "react";
import { ApiError } from "types/genericTypes";
import { getAllRankingData } from "../api/getRankingData";
import postVote from "../api/postVote";
import getTokenMetadata from "../hooks/getTokenMetadata";
import getVerifiedContractList from "../hooks/getVerifiedContracts";
import { NFTimelineProviderContextType, Votes } from "../types";
import { timelineFilterStore, timelineFilterTypes } from "../types/FilterTypes";
import {
  addressCollection,
  addressSplitHistory,
  StoredMetadataType,
} from "../types/ProviderTypes";
import { AllBallotRankingData, Ranks } from "../types/RankingTypes";
import { VerifiedContractData } from "../types/verifiedContractsTypes";

export const NFTimelineProviderContext = createContext(
  {} as NFTimelineProviderContextType
);

//let storedMetadata: StoredMetadataType = { ethereum: {} };

const NFTimelineProvider = ({ children }) => {
  const [verifiedContractList, setVerifiedContractList] =
    useState<VerifiedContractData[]>();
  const [storedMetadata, setStoredMetadata] = useState<StoredMetadataType>({
    ethereum: {},
  });
  const [timelineData, setTimelineData] = useState<addressCollection>({});
  const [activeTimeline, setActiveTimeline] = useState<addressSplitHistory>();
  const [activeAddress, setActiveAddress] = useState<Address>();
  const [timelineFilters, setTimelineFilters] = useState<timelineFilterStore[]>(
    []
  );

  const [initalRankingLoad, setInitalRankingLoad] = useState<boolean>(false);
  const [allBallotRankings, setAllBallotRankings] =
    useState<AllBallotRankingData>();

  useEffect(() => {
    if (!!!verifiedContractList) {
      //  Get verified contract data from API
      getVerifiedContractList().then((list) => setVerifiedContractList(list));
    }

    if (!!!allBallotRankings && !initalRankingLoad) {
      setInitalRankingLoad(true);
      updateRankingData();
    }
  });

  /**
   *  Metadata Management
   */

  const getMetadata = async (
    network: string,
    contractAddress: string,
    tokenId: string
  ): Promise<SingleNFTDataType> => {
    let metadata: SingleNFTDataType;

    if (
      !!storedMetadata.ethereum &&
      !!storedMetadata.ethereum[contractAddress] &&
      !!storedMetadata.ethereum[contractAddress][tokenId]
    ) {
      //  If the metadata is stored locally
      metadata = storedMetadata.ethereum[contractAddress][tokenId];
    } else {
      //  If not local get from API
      metadata = await getTokenMetadata(network, contractAddress, tokenId);
      const update = {
        ...storedMetadata,
        ethereum: { [contractAddress]: { [tokenId]: metadata } },
      };
      setStoredMetadata({
        ...storedMetadata,
        ethereum: { [contractAddress]: { [tokenId]: metadata } },
      });
    }
    return metadata;
  };
  /**
   * Timeline Management
   */

  const setActiveTimelineData = (timelineData: addressSplitHistory) =>
    setActiveTimeline(timelineData);

  const getTimelineData = (address: string): addressSplitHistory | false =>
    !!timelineData[address] ? timelineData[address] : false;

  const addNewTimelineData = (address: string, timeline: addressSplitHistory) =>
    setTimelineData({ ...timelineData, [address]: timeline });

  /**
   * Timeline Filter Management
   */
  const addTimelineFilter = (filterOptions: timelineFilterStore) => {
    let i = null;
    if (!!timelineFilters) {
      timelineFilters.forEach((filter, index) => {
        if (filter.filterType === filterOptions.filterType) {
          i = index;
        }
      });
    }

    if (!!i) {
      let newFilters = timelineFilters;
      newFilters[i] = filterOptions;
      setTimelineFilters(newFilters);
    } else {
      setTimelineFilters([...timelineFilters, filterOptions]);
    }
  };

  const removeAllTimelineFilters = () => setTimelineFilters([]);

  const removeTimelineFilter = (filterType: timelineFilterTypes) => {
    if (timelineFilters) {
      const newFilters: timelineFilterStore[] = [];
      timelineFilters.forEach((filter) => {
        if (filter.filterType !== filterType) newFilters.push(filter);
      });
      setTimelineFilters(newFilters);
    }
  };

  /**
   * Verified Contract Management
   */
  const checkIfValidContract = (
    contractAddress: string
  ): false | VerifiedContractData => {
    let isVerified: false | VerifiedContractData = false;
    if (verifiedContractList.length > 0) {
      verifiedContractList.forEach((contractItem) => {
        contractItem.contracts.forEach((address) => {
          if (address.toLowerCase() === contractAddress)
            isVerified = contractItem;
        });
      });
    }
    return isVerified;
  };
  /**
   * Ranking Management
   */
  const updateRankingData = async () => {
    getAllRankingData().then((result: AllBallotRankingData | ApiError) => {
      console.log(result);
      if (typeof result === typeof ApiError) {
        console.log("Error getting Ranking Data: ", result.message);
        setInitalRankingLoad(false);
      } else {
        setAllBallotRankings(result as AllBallotRankingData);
        setInitalRankingLoad(false);
      }
    });
  };
  const getAllRankings = async (): Promise<AllBallotRankingData> => {
    if (!!allBallotRankings) return allBallotRankings;
    else return updateRankingData().then(() => allBallotRankings);
  };
  const getBallotRankings = (ballotId: string): Ranks =>
    allBallotRankings[ballotId];

  const submitVote = async (
    ballotId: string,
    voteDate: Votes
  ): Promise<number> =>
    postVote(ballotId, voteDate).then(async (result: number) => {
      if (result === 5) {
        await updateRankingData();
        return 5;
      } else return result;
    });

  return (
    <NFTimelineProviderContext.Provider
      value={{
        getTokenMetadata: getMetadata,
        getTimelineData,
        setActiveTimelineData,
        setActiveAddress,
        addNewTimelineData,
        addTimelineFilter,
        removeAllTimelineFilters,
        removeTimelineFilter,
        checkIfValidContract,
        submitVote,
        getAllRankings,
        getBallotRankings,
        timelineFilters,
        activeTimeline,
        verifiedContractList,
        activeAddress,
        allBallotRankings,
      }}
    >
      {children}
    </NFTimelineProviderContext.Provider>
  );
};

export default NFTimelineProvider;
