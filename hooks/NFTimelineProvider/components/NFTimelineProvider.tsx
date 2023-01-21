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
} from "../types/ProviderTypes";

export const NFTimelineProviderContext = createContext({
  //postVote: postVote,
  //getBallots: getBallots,
  //getBallotData: getBallotData,
  verifiedContractList: [],
} as NFTimelineProviderContextType);

//let storedMetadata: StoredMetadataType = { ethereum: {} };

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
