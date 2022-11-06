/** @format */

import { AssetTransfersWithMetadataResult } from "alchemy-sdk";

export type sortedHistoryData = {
  hash: string;
  blockNum: string;
  from: string;
  to: string;
  category: string;
  timestamp: string;
  contractAddress: string;
  tokenId: string;
  ticker: string;
  tokenCount?: number;
  groupedTokenIds?: string[];
};

export type sortedDataFormat = {
  [blockNumber: string]: {
    [txHash: string]: { [contractAddress: string]: sortedHistoryData };
  };
};
export type BlockCounter = {
  blockNumber: string 
  hash: string[];
  contracts: string[];
};
type blockCount = BlockCounter[];

const sortUsersHistory = (
  history: AssetTransfersWithMetadataResult[]
): { sorted: sortedDataFormat; allBlocks: blockCount[] } => {
  //  Counts block numbers & tx Hash within

  const allBlocks: blockCount[] = [];
  //  stores all the transaction data [blockNumber][txHash]
  const sorted: sortedDataFormat = {};

  history.forEach((item) => {
    //  Get block number as string
    const blkNum = item.blockNum;
    //  See if block number has had txHash assigned to it
    if (!!sorted[blkNum]) {
      //  See if the TX hash as been assigned
      if (!!sorted[blkNum][item.hash]) {
        //  See if there is data attached to that contract address
        if (!!sorted[blkNum][item.hash][item.rawContract.address]) {
          //  In here if the block number and TX hash and address have already been assigned
          //  Add the token Ids to the array
          //  Add the count to the array
          sorted[blkNum][item.hash][
            item.rawContract.address
          ].groupedTokenIds.push(parseInt(item.tokenId).toString());
          sorted[blkNum][item.hash][item.rawContract.address].tokenCount++;
        } else {
          //  In here if the block number & hash are in use but not the contract address
          const arg = {
            ...sorted[blkNum][item.hash],
            [item.rawContract.address]: {
              hash: item.hash,
              blockNum: blkNum,
              from: item.from,
              to: item.to,
              category: item.category,
              timestamp: item.metadata.blockTimestamp,
              contractAddress: item.rawContract.address,
              tokenId: parseInt(item.tokenId).toString(),
              ticker: item.asset,
              tokenCount: 1,
              groupedTokenIds: [parseInt(item.tokenId).toString()],
            },
          };
          sorted[blkNum][item.hash] = arg;
        }
      } else {
        //  In here if block number exists but hash doesn't
        let arg = {
          ...sorted[blkNum],
          [item.hash]: {
            [item.rawContract.address]: {
              hash: item.hash,
              blockNum: blkNum,
              from: item.from,
              to: item.to,
              category: item.category,
              timestamp: item.metadata.blockTimestamp,
              contractAddress: item.rawContract.address,
              tokenId: parseInt(item.tokenId).toString(),
              ticker: item.asset,
              tokenCount: 1,
              groupedTokenIds: [parseInt(item.tokenId).toString()],
            },
          },
        };

        sorted[blkNum] = arg;
        allBlocks.forEach((blk: any, index: number) => {
          console.log(blk);
          if (blk[0] === blkNum) {
            allBlocks[index][1].hash.push(item.rawContract.address);
          }
        });
      }
    } else {
      let args = {
        [item.hash]: {
          [item.rawContract.address]: {
            hash: item.hash,
            blockNum: blkNum,
            from: item.from,
            to: item.to,
            category: item.category,
            timestamp: item.metadata.blockTimestamp,
            contractAddress: item.rawContract.address,
            tokenId: parseInt(item.tokenId).toString(),
            ticker: item.asset,
            tokenCount: 1,
            groupedTokenIds: [parseInt(item.tokenId).toString()],
          },
        },
      };
      sorted[blkNum] = args;
      allBlocks.push([
        blkNum,
        { hash: [item.hash], contracts: [item.rawContract.address] },
      ]);
    }
  });

  console.log("sorted: ", sorted);
  console.log("count: ", allBlocks);
  return { sorted, allBlocks };
};

export default sortUsersHistory;
