/** @format */

import { SingleNFTDataType } from "e-labs_web3provider";

const url = process.env.NEXT_PUBLIC_NFT_SERVER
  ? process.env.NEXT_PUBLIC_NFT_SERVER
  : "http://localhost:3003";

const getTokenMetadata = async (
  network: string,
  contractAddress: string,
  tokenId: string
): Promise<SingleNFTDataType> => {
  const baseURL = `${url}/getSingleTokenData/${network}/${contractAddress}/${tokenId}`;
  const returnedData = await fetch(baseURL)
    .then((result) => result.json())
    .then((history) => {
      return history;
    });
  return returnedData;
};

export default getTokenMetadata;

// "https://nftimeline.herokuapp.com"
//  "http://localhost:3003"
