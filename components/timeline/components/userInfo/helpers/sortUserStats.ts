/** @format */

import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";

const getFirstAndLastTransactions = (
  sortedInHistory: compileHistoryIntoDaysReturn,
  sortedOutHistory: compileHistoryIntoDaysReturn
): { first: string; last: string } => {
  let first, last;
  let dates = [];

  if (!!sortedInHistory.hashes)
    Object.keys(sortedInHistory.hashes).forEach((date) => dates.push(date));
  if (!!sortedOutHistory.hashes)
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
  const inDates = !!sortedInHistory.history
    ? Object.keys(sortedInHistory.hashes)
    : [];
  const outDates = !!sortedOutHistory.history
    ? Object.keys(sortedOutHistory.hashes)
    : [];

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

  const inDates = !!sortedInHistory.history
    ? Object.keys(sortedInHistory.hashes)
    : [];
  const outDates = !!sortedOutHistory.history
    ? Object.keys(sortedOutHistory.hashes)
    : [];

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

const getMostActiveDay = (
  sortedInHistory: compileHistoryIntoDaysReturn,
  sortedOutHistory: compileHistoryIntoDaysReturn
) => {
  const inDates = !!sortedInHistory.history
    ? Object.keys(sortedInHistory.hashes)
    : [];
  const outDates = !!sortedOutHistory.history
    ? Object.keys(sortedOutHistory.hashes)
    : [];

  const countAction = (
    history: compileHistoryIntoDaysReturn,
    dates,
    dir: "in" | "out"
  ): {
    data: { date: string; index: number };
    top: number;
    dir: "in" | "out";
  } => {
    let top = 0;
    let data: { date: string; index: number };
    dates.forEach((date, index) => {
      let tokens = 0;
      let tx = history.hashes[date].length;
      history.hashes[date].forEach((hash) => {
        history.history[date][hash].forEach((contract) => {
          tokens += contract.groupedTokenIds.length;
        });
        if (tokens + tx > top) {
          top = tokens + tx;
          data = { date, index };
        }
      });
    });
    return { data, top, dir };
  };

  const inMost = countAction(sortedInHistory, inDates, "in");
  const outMost = countAction(sortedOutHistory, outDates, "out");

  if (inMost.top > outMost.top) return inMost;
  else return outMost;
};

export {
  countTokens,
  countTransactions,
  getFirstAndLastTransactions,
  getMostActiveDay,
};
