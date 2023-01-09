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
  value;
};

export type sortedDataFormat = {
  [blockNumber: string]: {
    [txHash: string]: { [contractAddress: string]: sortedHistoryData };
  };
};
export type BlockCounter = [string, { hash: string[]; contracts: string[] }];
export type blockCount = BlockCounter[];


export type sortUsersHistoryReturn = {
  sorted: sortedDataFormat;
  allBlocks: blockCount[];
};

const sortUsersHistory = (
  history: AssetTransfersWithMetadataResult[]
): sortUsersHistoryReturn => {

  //  Counts block numbers & tx Hash within

  const allBlocks: blockCount[] = [];
  //  stores all the transaction data [blockNumber][txHash]
  const sorted: sortedDataFormat = {};

  history.forEach((item) => {
    //  Get block number as string
    //  Get the hash
    //  Get the contract address
    const blkNum: string = item.blockNum;
    const contAddr: string = item.rawContract.address
      ? item.rawContract.address
      : "";
    const hash: string = item.hash;
    const tId: string = item.tokenId ? parseInt(item.tokenId).toString() : "0";
    //  See if block number has had txHash assigned to it
    if (!!sorted[blkNum]) {
      //  See if the TX hash as been assigned
      if (!!sorted[blkNum][hash]) {
        //  See if there is data attached to that contract address
        if (!!sorted[blkNum][hash][contAddr]) {
          //  In here if the block number and TX hash and address have already been assigned
          //  Add the token Ids to the array
          //  Add the count to the array
          let value = sorted[blkNum][hash][contAddr].value;
          sorted[blkNum][hash][contAddr].groupedTokenIds.push(tId);
          sorted[blkNum][hash][contAddr].tokenCount++;
          sorted[blkNum][hash][contAddr].value =
            sorted[blkNum][hash][contAddr].value + value;
        } else {
          //  In here if the block number & hash are in use but not the contract address
          const arg = {
            ...sorted[blkNum][item.hash],
            [contAddr]: {
              hash: item.hash,
              blockNum: blkNum,
              from: item.from,
              to: item.to,
              category: item.category,
              timestamp: item.metadata.blockTimestamp,
              contractAddress: item.rawContract.address,
              tokenId: tId,
              ticker: item.asset,
              tokenCount: 1,
              groupedTokenIds: [tId],
              vaule: item.value,
            },
          };
          sorted[blkNum][hash] = arg;
        }
      } else {
        //  In here if block number exists but hash doesn't
        let arg = {
          ...sorted[blkNum],
          [item.hash]: {
            [contAddr]: {
              hash: hash,
              blockNum: blkNum,
              from: item.from,
              to: item.to,
              category: item.category,
              timestamp: item.metadata.blockTimestamp,
              contractAddress: item.rawContract.address,
              tokenId: tId,
              ticker: item.asset,
              tokenCount: 1,
              groupedTokenIds: [tId],
              value: item.value,
            },
          },
        };

        sorted[blkNum] = arg;
        allBlocks.forEach((blk: any, index: number) => {
          if (blk[0] === blkNum) {
            allBlocks[index][1].hash.push(hash);
            allBlocks[index][1].contracts.push(contAddr);
          }
        });
      }
    } else {
      let args = {
        [hash]: {
          [contAddr]: {
            hash: item.hash,
            blockNum: blkNum,
            from: item.from,
            to: item.to,
            category: item.category,
            timestamp: item.metadata.blockTimestamp,
            contractAddress: item.rawContract.address,
            tokenId: tId,
            ticker: item.asset,
            tokenCount: 1,
            groupedTokenIds: [tId],
          },
        },
      };
      sorted[blkNum] = args;
      let count = [blkNum, { hash: [hash], contracts: [contAddr] }];
      allBlocks.push(count);
    }
  });

  console.log("sorted: ", sorted);
  console.log("count: ", allBlocks);
  return { sorted, allBlocks };
};

export default sortUsersHistory;
