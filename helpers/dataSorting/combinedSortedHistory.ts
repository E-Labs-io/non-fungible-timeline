/** @format */

import {
  combinedHistory,
  dailyHistory,
} from "components/home/components/timeline/TimeLine";
import { compileHistoryIntoDaysReturn } from "./compileHistoryIntoDays";

const combineHistory = (
  inBound: compileHistoryIntoDaysReturn,
  outBound: compileHistoryIntoDaysReturn
) => {
  const finalisedHistory: combinedHistory = [];
  const inCount = Object.keys(inBound.history).length;
  const outCount = Object.keys(outBound.history).length;
  for (let i = 0; i < inCount; i++) {
    let date = Object.keys(inBound.history)[i];
    let insert: dailyHistory = [
      "left",
      date,
      inBound.hashes[date],
      inBound.history[date],
    ];
    finalisedHistory.push(insert);
  }

  for (let i = 0; i < outCount; i++) {
    let date = Object.keys(outBound.history)[i];
    let insert: dailyHistory = [
      "right",
      date,
      outBound.hashes[date],
      outBound.history[date],
    ];
    finalisedHistory.push(insert);
  }

  finalisedHistory.sort(
    (a, b) => new Date(a[1]).getTime() - new Date(b[1]).getTime()
  );
  console.log("FINAL ORDERED HISTORY: ", new Date(finalisedHistory[0][1]));
  return finalisedHistory;
};

export default combineHistory;
