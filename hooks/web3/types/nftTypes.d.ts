/** @format */

import { StringMappingType } from "typescript";

type NFTTraitType = {
  trait_type: string;
  value: string;
};

type NFTCollectionDataType = SingleNFTDataType[];

type SingleNFTDataType = {
  token_address: string;
  token_id: string;
  contract_type?: string;
  metadata?: NFTMetaDataType;
  balance?: string;
  project_name?: string;
  project_symbol?: string;
  token_uri?: string;
};

type NFTMetaDataType = {
  name?: string;
  description?: string;
  image?: string;
  attributes?: NFTTraitType[];
  external_url?: string;
};

type MoralisNFTDataType = {
  token_address: string;
  token_id: string;
  contract_type: string;
  metadata?: string;
  amount: string;
  name: string;
  symbol: string;
  owner_of: string;
  block_number: string;
  block_number_minted: string;
  token_uri: string;
  synced_at: string;
};

type AlchemyNFTDataType = {
  contract: { address: string };
  tokenId: string;
  tokenType: string;
  rawMetadata?: {
    attributes?: any[];
    description?: string;
    image?: string;
    index?: number;
    name?: string;
  };
  id?: {
    tokenId: string;
    tokenMetadata?: {
      tokenType: string;
    };
  };
  balance?: number;
  title?: string;
  description?: string;
  tokenUri?: { raw: string; gateway: string };
  media?: { raw: string; gateway: string }[];
  metadata?: {
    name: string;
    description: string;
    image: string;
    external_url: string;
    attributes: NFTTraitType[];
  };
  timeLastUpdated?: string;
};

type APINFTDataTypes = MoralisNFTDataType | AlchemyNFTDataType;

type APIFormatType = "moralis" | "alchemy";

export type {
  NFTTraitType,
  SingleNFTDataType,
  APIFormatType,
  AlchemyNFTDataType,
  MoralisNFTDataType,
  APINFTDataTypes,
  NFTMetaDataType,
  NFTCollectionDataType,
};
