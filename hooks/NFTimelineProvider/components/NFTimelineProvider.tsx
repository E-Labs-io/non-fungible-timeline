/** @format */

import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useEffect, useState, createContext } from "react";
import getTokenMetadata from "../hooks/getTokenMetadata";
import { NFTimelineProviderContextType } from "../types";
import {
  addressCollection,
  addressSplitHistory,
  StoredMetadataType,
} from "../types/ProviderTypes";

export const NFTimelineProviderContext = createContext({
  //postVote: postVote,
  //getBallots: getBallots,
  //getBallotData: getBallotData,
  verifiedContractList: [],
} as NFTimelineProviderContextType);

const NFTimelineProvider = ({ children }) => {
  const [verifiedContractList, setVerifiedContractList] = useState<string[]>();
  const [storedMetadata, setStoredMetadata] = useState<StoredMetadataType>({
    ethereum: {},
  });
  const [timelineData, setTimelineData] = useState<addressCollection>({});
  const [activeTimeline, setActiveTimeline] = useState<addressSplitHistory>();
  const [activeAddress, setActiveAddress] = useState<string>();

  useEffect(() => {
    if (!!!verifiedContractList) {
      //  Get verified contract data from API
    }
  });

  const getMetadata = async (
    network: string,
    contractAddress: string,
    tokenId: string
  ): Promise<SingleNFTDataType> => {
    const storedData: StoredMetadataType = storedMetadata;

    if (
      !!storedMetadata.ethereum &&
      !!storedMetadata.ethereum[contractAddress] &&
      !!storedMetadata.ethereum[contractAddress][tokenId]
    ) {
      return storedMetadata.ethereum[contractAddress][tokenId];
    } else {
      const tokenData = await getTokenMetadata(
        network,
        contractAddress,
        tokenId
      );

      if (
        !!storedMetadata.ethereum &&
        !!storedMetadata.ethereum[contractAddress]
      ) {
        storedData.ethereum[contractAddress][tokenId] = tokenData;
      } else {
        storedData.ethereum[contractAddress] = { [tokenId]: tokenData };
      }
      setStoredMetadata(storedData);
      console.log(tokenData);
      return tokenData;
    }
  };

  const setActiveTimelineData = (timelineData: addressSplitHistory) =>
    setActiveTimeline(timelineData);

  const getTimelineData = (address: string): addressSplitHistory | false =>
    !!timelineData[address] ? timelineData[address] : false;

  const addNewTimelineData = (
    address: string,
    timeline: addressSplitHistory
  ) => {
    const oldState = timelineData;
    oldState[address] = timeline;
    setTimelineData(oldState);
  };

  return (
    <NFTimelineProviderContext.Provider
      value={{
        getTokenMetadata: getMetadata,
        getTimelineData,
        setActiveTimelineData,
        setActiveAddress,
        addNewTimelineData,
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
