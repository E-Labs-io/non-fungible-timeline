/** @format */

import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useEffect, useState, createContext } from "react";
import { getBallotData, getBallots } from "../helpers/ballots";
import getTokenMetadata from "../hooks/getTokenMetadata";
import { postVote } from "../helpers/voting";
import { Ballot, NFTimelineProviderContextType } from "../types";
import { StoredMetadataType } from "../types/ProviderTypes";

export const NFTimelineProviderContext = createContext({
  postVote: postVote,
  getBallots: getBallots,
  getBallotData: getBallotData,
  verifiedContractList: [],
} as NFTimelineProviderContextType);

const NFTimelineProvider = ({ children }) => {
  const [verifiedContractList, setVerifiedContractList] = useState<string[]>();
  const [storedMetadata, setStoredMetadata] = useState<StoredMetadataType>({
    ethereum: {},
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
      console.log("Token is in local");
      return storedMetadata.ethereum[contractAddress][tokenId];
    } else {
      console.log("Get token from API");
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
      return tokenData;
    }
  };

  return (
    <NFTimelineProviderContext.Provider
      value={{
        postVote,
        getTokenMetadata: getMetadata,
        getBallots,
        getBallotData,
        verifiedContractList,
      }}
    >
      {children}
    </NFTimelineProviderContext.Provider>
  );
};

export default NFTimelineProvider;
