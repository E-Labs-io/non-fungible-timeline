/** @format */
import { AssetTransfersWithMetadataResult } from "alchemy-sdk";
import { AssetTransferData } from "helpers/dataSorting/sortUsersHistory";
import alchemyGetAssetTransfers, {
  alchemyGetAssetTransfersOptions,
} from "hooks/web3/api/alchemyGetAssetTransfers";
import { NetworkKeys } from "hooks/web3/types/Chains";

export interface GetUSersHistoryProps {
  from?: string;
  to?: string;
  startingBlock?: string;
  endingBlock?: string;
  chain: NetworkKeys;
}

const getUsersHistory = async ({
  from,
  to,
  startingBlock,
  endingBlock,
  chain,
}: GetUSersHistoryProps): Promise<AssetTransferData[]> => {
  const transfers = [];
  let pageKey: string | undefined = undefined;
  let options: alchemyGetAssetTransfersOptions = {
    category: ["erc721", "erc1155"],
    withMetadata: true,
  };

  //  Reusable getData function
  const search = async (options: alchemyGetAssetTransfersOptions) =>
    await alchemyGetAssetTransfers(options, chain).then(
      (result) => result.result
    );

  //  Start of 2021 block - "0xAA2644"
  //  Set the start & end blocks if there
  if (!!startingBlock) options.fromBlock = startingBlock;
  if (!!endingBlock) options.toBlock = endingBlock;

  //  Add the address if there
  if (to) options.toAddress = to;
  if (from) options.fromAddress = from;

  //  Get the first run of data
  const batchedTXData = await search(options);
  batchedTXData.transfers.forEach((tx) => {
    tx.chain = chain;
    transfers.push(tx);
  });

  //  Check if there is an other page of data
  //  Set the pageKey to the next page of data
  if (!!batchedTXData.pageKey) pageKey = batchedTXData.pageKey;
  else pageKey = undefined;

  //  While there is another page of data
  while (!!pageKey) {
    options.pageKey = pageKey;
    //  Get the next page of data
    await search(options).then((returnedData) => {
      //  Check if there is another page
      if (!!returnedData.pageKey) {
        pageKey = returnedData.pageKey;
      } else pageKey = undefined;
      //  Add the new data to the array
      returnedData.transfers.forEach((tx) => transfers.push(tx));
    });
  }

  return transfers;
};

export default getUsersHistory;
