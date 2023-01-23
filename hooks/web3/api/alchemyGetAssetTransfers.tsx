/** @format */

export interface alchemyGetAssetTransfersOptions {
  fromAddress?: string;
  toAddress?: string;
  toBlock?: string;
  fromBlock?: string;
  pageKey?: string;
  withMetadata?: true;
  category: alchemyGetAssetTransferCategoryType[];
  contractAddresses?: string[];
  maxCount?: string;
  excludeZeroValue?: true;
}

export type alchemyGetAssetTransferCategoryType =
  | "erc721"
  | "erc1155"
  | "erc20";

const alchemyGetAssetTransfers = async (
  options: alchemyGetAssetTransfersOptions
) => {
  if (!!!options.fromAddress && !!!options.toAddress)
    throw "Need to provide at least a To or From";
  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [options],
  });

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`;

  const returnedData = await fetch(baseURL, requestOptions)
    .then((result) => result.json())
    .then((history) => {
      return history;
    });

  return returnedData;
};

export default alchemyGetAssetTransfers;
