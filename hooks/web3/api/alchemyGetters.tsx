/** @format */

import { GetNftsForOwnerOptions } from "alchemy-sdk";
import { sortAlchemyToStandard } from "../data/buildNFTDataType";
import { SingleNFTDataType } from "../types/nftTypes";
import { web3API } from "../userWeb3Provider";

interface AlchemyGetAddressNFTsProps {
  address: string;
  api?: any;
  options?: {
    pageSize?: number;
    pageKey?: string;
    contractAddresses?: string[];
  };
}

interface AlchemyGetAddressNFTsReturn {
  collection: SingleNFTDataType[];
  pageKey?: string;
  totalCount?: number;
}

const AlchemyGetAddressNFTs = async ({
  address,
  api,
  options,
}: AlchemyGetAddressNFTsProps): Promise<AlchemyGetAddressNFTsReturn> => {
  let searchResults;

  if (options) {
    searchResults = api
      ? await api.nft.getNftsForOwner(address, options).then((result) => result)
      : await web3API.nft
          .getNftsForOwner(address, options)
          .then((result) => result);
  } else {
    searchResults = api
      ? await api.nft.getNftsForOwner(address).then((result) => result)
      : await web3API.nft.getNftsForOwner(address).then((result) => result);
  }

  return {
    collection: sortAlchemyToStandard(searchResults.ownedNfts),
    pageKey: searchResults?.pageKey,
    totalCount: searchResults?.totalCount,
  };
};

const AlchemyGetSingleNFT = async (
  address: string,
  tokenId: string,
  type?: string,
  api?: any
) =>
  api
    ? api.nft
        .getNftMetadata(address, tokenId)
        .then((result) => sortAlchemyToStandard([result]))
    : web3API.nft
        .getNftMetadata(address, tokenId)
        .then((result) => sortAlchemyToStandard([result])[0]);

export { AlchemyGetAddressNFTs, AlchemyGetSingleNFT };
