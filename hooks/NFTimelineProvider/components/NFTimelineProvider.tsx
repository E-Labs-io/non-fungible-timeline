/** @format */

import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useEffect, useState, createContext } from "react";
import getTokenMetadata from "../hooks/getTokenMetadata";
import getVerifiedContractList from "../hooks/getVerifiedContracts";
import { NFTimelineProviderContextType } from "../types";
import {
  addressCollection,
  addressSplitHistory,
  StoredMetadataType,
  timelineFilterStore,
  timelineFilterTypes,
} from "../types/ProviderTypes";
import { VerifiedContractData } from "../types/verifiedContractsTypes";

export const NFTimelineProviderContext = createContext({
  //postVote: postVote,
  //getBallots: getBallots,
  //getBallotData: getBallotData,
  verifiedContractList: [],
} as NFTimelineProviderContextType);

//let storedMetadata: StoredMetadataType = { ethereum: {} };

const NFTimelineProvider = ({ children }) => {
  const [verifiedContractList, setVerifiedContractList] =
    useState<VerifiedContractData[]>();
  const [storedMetadata, setStoredMetadata] = useState<StoredMetadataType>({
    ethereum: {},
  });
  const [timelineData, setTimelineData] = useState<addressCollection>({});
  const [activeTimeline, setActiveTimeline] = useState<addressSplitHistory>();
  const [activeAddress, setActiveAddress] = useState<string>();
  const [timelineFilters, setTimelineFilters] =
    useState<timelineFilterStore[]>();

  useEffect(() => {
    if (!!!verifiedContractList) {
      //  Get verified contract data from API
      getVerifiedContractList().then((list) => setVerifiedContractList(list));
    }
  });

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

  const setActiveTimelineData = (timelineData: addressSplitHistory) =>
    setActiveTimeline(timelineData);

  const getTimelineData = (address: string): addressSplitHistory | false =>
    !!timelineData[address] ? timelineData[address] : false;

  const addNewTimelineData = (address: string, timeline: addressSplitHistory) =>
    setTimelineData({ ...timelineData, [address]: timeline });

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

  const removeAllTimelineFilters = () => {
    setTimelineFilters([]);
  };

  const removeTimelineFilter = (filterType: timelineFilterTypes) => {};

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

  const getVerifiedContractData = (contractAddress) =>
    verifiedContractList[contractAddress];

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
        getVerifiedContractData,
        timelineFilters,
        activeTimeline,
        verifiedContractList,
        activeAddress,
      }}
    >
      {children}
    </NFTimelineProviderContext.Provider>
  );
};

export default NFTimelineProvider;
