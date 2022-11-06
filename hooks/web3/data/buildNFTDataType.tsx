/** @format */

import { AlchemyNFTDataType, SingleNFTDataType } from "../types/nftTypes";

const sortAlchemyToStandard = (
  NFTs: AlchemyNFTDataType[]
): SingleNFTDataType[] => {
  const arrayOfNFTs = [];
  if (NFTs) {
    NFTs.forEach((nft) => {
      arrayOfNFTs.push({
        token_address: nft.contract.address,
        token_id: nft.tokenId,
        metadata: {
          name: nft.rawMetadata.name,
          description: nft.rawMetadata.description,
          image: nft.rawMetadata.image,
          attributes: nft.rawMetadata.attributes,
        },
        contract_type: nft.tokenType,
        balance: nft.balance ? nft.balance.toString() : "1",
        project_name: nft.title,
        token_uri: nft.tokenUri?.raw,
      });
    });
  }
  return arrayOfNFTs;
};

export { sortAlchemyToStandard };
