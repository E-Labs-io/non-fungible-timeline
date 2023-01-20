/** @format */

import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";

const getFirstAndLastTransactions = (
  sortedInHistory: compileHistoryIntoDaysReturn,
  sortedOutHistory: compileHistoryIntoDaysReturn
): { first: string; last: string } => {
  let first, last;
  let dates = [];

  Object.keys(sortedInHistory.hashes).forEach((date) => dates.push(date));
  Object.keys(sortedOutHistory.hashes).forEach((date) => dates.push(date));

  const sortedDates = dates.sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  first = sortedDates[0];
  last = sortedDates[sortedDates.length - 1];

  return { first, last };
};

const countTokens = (
  sortedInHistory: compileHistoryIntoDaysReturn,
  sortedOutHistory: compileHistoryIntoDaysReturn
): { totalIn: number; totalOut: number } => {
  const inDates = Object.keys(sortedInHistory.hashes);
  const outDates = Object.keys(sortedOutHistory.hashes);

  const countTokens = (history, dates) => {
    let count = 0;
    dates.forEach((date) => {
      for (let h = 0; h < history.hashes[date].length; h++) {
        const hash = history.hashes[date][h];
        for (let c = 0; c < history.history[date][hash].length; c++) {
          const contract = history.history[date][hash][c];
          count += contract.tokenCount;
        }
      }
    });
    return count;
  };

  let totalIn = countTokens(sortedInHistory, inDates);
  let totalOut = countTokens(sortedOutHistory, outDates);

  return { totalIn, totalOut };
};

const countTransactions = (
  sortedInHistory: compileHistoryIntoDaysReturn,
  sortedOutHistory: compileHistoryIntoDaysReturn
): number => {
  let count = 0;

  const inDates = Object.keys(sortedInHistory.hashes);
  const outDates = Object.keys(sortedOutHistory.hashes);

  const countTXs = (history, dates) => {
    let count = 0;
    dates.forEach((date) => {
      count += history.hashes[date].length;
    });
    return count;
  };

  let inTX = countTXs(sortedInHistory, inDates);
  let outTX = countTXs(sortedOutHistory, outDates);

  count = inTX + outTX;

  return count;
};

export { countTokens, countTransactions, getFirstAndLastTransactions };
