/** @format */

import {
  blockCount,
  BlockCounter,
  sortedHistoryData,
  sortUsersHistoryReturn,
} from "./sortUsersHistory";

export type compileHistoryIntoDaysReturn = {
  history: sortedHistoryIntoDays;
  hashes: daysTXHashCounter;
};

export type sortedHistoryIntoDays = {
  [date: string]: sortedHashData;
};
export type sortedHashData = { [txHash: string]: sortedHistoryData[] };
export type daysTXHashCounter = { [date: string]: string[] };

const compileHistoryIntoDays = (
  history: sortUsersHistoryReturn
): compileHistoryIntoDaysReturn => {
  let dateOrderedHistory: sortedHistoryIntoDays = undefined;
  let dateHashes: daysTXHashCounter;

  for (let i = 0; i < history.allBlocks.length; i++) {
    const blockData: BlockCounter = history?.allBlocks[i];

    const blockNum: string = Object.keys(history.sorted)[i];
    const hashs: string[] = blockData[1].hash;
    const contracts = blockData[1].contracts;

    let date;

    for (let h = 0; h < hashs.length; h++) {
      let hash = hashs[h];
      for (let c = 0; c < contracts.length; c++) {
        let contract = contracts[c];

        if (!!history.sorted[blockNum][hash][contract]) {
          let data = history.sorted[blockNum][hash][contract];
          if (!date) {
            let fullDate = new Date(data.timestamp);
            date = fullDate.toDateString();
          }

          if (!!dateOrderedHistory) {
            if (!!dateOrderedHistory[date]) {
              if (!!dateOrderedHistory[date][hash]) {
                //  Date is there & Hash is there
                dateOrderedHistory[date][hash].push(data);
              } else {
                //  Date is there Hash is NOT there
                let newHash = { ...dateOrderedHistory[date], [hash]: [data] };
                dateOrderedHistory[date] = newHash;
              }
            } else {
              dateOrderedHistory = {
                ...dateOrderedHistory,
                [date]: { [hash]: [data] },
              };
            }
          } else {
            dateOrderedHistory = { [date]: { [hash]: [data] } };
          }
          if (dateHashes) {
            if (!!dateHashes[date]) dateHashes[date].push(hash);
            else dateHashes = { ...dateHashes, [date]: [hash] };
          } else dateHashes = { [date]: [hash] };
        }
      }
    }
  }
  return { history: dateOrderedHistory, hashes: dateHashes };
};

export default compileHistoryIntoDays;
