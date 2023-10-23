/** @format */

import { sortedHashData } from "helpers/dataSorting/compileHistoryIntoDays";
import { timelineFilterStore } from "hooks/NFTimelineProvider/types/FilterTypes";
import { checkIfValidContract } from "hooks/NFTimelineProvider/types/ProviderTypes";
import { combinedHistory } from "../TimeLine";
import { NetworkKeys } from "e-labs_web3provider";

const filterFilteredDays = (
  history: combinedHistory,
  filters: timelineFilterStore[],
  checkIfValidContract: checkIfValidContract
) => {
  let filteredHistory: combinedHistory = history;
  //  Check what filters are active
  const isData = filters.find((a) => a.filterType === "date");
  const isVerified = filters.find((a) => a.filterType === "verified");
  const isOrder = filters.find((a) => a.filterType === "order");
  const isChain = filters.find((a) => a.filterType === "chain");

  console.log("FILTERS : ", filters);
  //  Selected chain check
  if (isChain) {
    // Get teh active Chains
    const chains = [];
    Object.keys(isChain.optionA).forEach((chain) => {
      if (isChain.optionA[chain]) chains.push(chain);
    });
    const filtered: combinedHistory = [];
    for (let day = 0; day < filteredHistory.length; day++) {
      //  For each day, lets check if the contracts are allowed
      //  Set the vars to collect allowed data
      const allowedHash: string[] = [];
      const allowedSortedData: sortedHashData = {};
      //  Get the original data
      const dayData = filteredHistory[day];
      const hashes = dayData[2];
      const contracts = dayData[3];

      hashes.forEach((hash) => {
        contracts[hash].forEach((contract) => {
          if (chains.includes(contract.chain)) {
            allowedSortedData[hash]
              ? allowedSortedData[hash].push(contract)
              : (allowedSortedData[hash] = [contract]);
          }
        });
        if (!!allowedSortedData[hash] && allowedSortedData[hash].length > 0)
          allowedHash.push(hash);
      });
      if (allowedHash.length > 0)
        filtered.push([dayData[0], dayData[1], allowedHash, allowedSortedData]);
    }
    console.log("Filtered for networks : ", isChain);
    console.log("Filtered  : ", filtered);

    filteredHistory = filtered;
  }
  //  Date ranges check
  if (!!isData) {
    const filtered: combinedHistory = [];
    //  Filter for days
    const start = new Date(isData.optionA).getTime();
    const end = new Date(isData.optionB).getTime();
    filteredHistory.forEach((day) => {
      const thisDay = new Date(day[1]).getTime();
      if (thisDay > start && thisDay < end) filtered.push(day);
    });

    filteredHistory = filtered;
  }
  //  Verified Contract Checks
  if (!!isVerified) {
    const filtered: combinedHistory = [];
    //  Filter for verified contracts
    for (let day = 0; day < filteredHistory.length; day++) {
      //  For each day, lets check if the contracts are allowed
      //  Set the vars to collect allowed data
      const allowedHash: string[] = [];
      const allowedSortedData: sortedHashData = {};
      //  Get the original data
      const dayData = filteredHistory[day];
      const hashes = dayData[2];
      const contracts = dayData[3];

      //  Check each contract
      hashes.forEach((hash) => {
        contracts[hash].forEach((contract) => {
          if (checkIfValidContract(contract.contractAddress)) {
            allowedSortedData[hash]
              ? allowedSortedData[hash].push(contract)
              : (allowedSortedData[hash] = [contract]);
          }
        });
        if (!!allowedSortedData[hash] && allowedSortedData[hash].length > 0)
          allowedHash.push(hash);
      });
      if (allowedHash.length > 0)
        filtered.push([dayData[0], dayData[1], allowedHash, allowedSortedData]);
    }
    //  Save the filtered contracts as the history
    filteredHistory = filtered;
  }
  //  Revers order check
  if (!!isOrder) {
    const filtered = [];
    for (let i = filteredHistory.length; i > 0; i--) {
      const item = filteredHistory[i - 1];
      filtered.push(item);
    }

    filteredHistory = filtered;
  }

  return filteredHistory;
};

export default filterFilteredDays;
