/** @format */

import {
  combinedHistory,
  dailyHistory,
} from "components/timeline/components/timeline/TimeLine";
import { compileHistoryIntoDaysReturn } from "./compileHistoryIntoDays";

const combineHistory = (
  inBound: compileHistoryIntoDaysReturn,
  outBound: compileHistoryIntoDaysReturn
) => {
  console.log(outBound);
  const finalisedHistory: combinedHistory = [];
  const inCount = !!inBound.history ? Object.keys(inBound.history).length : 0;
  const outCount = !!outBound.history
    ? Object.keys(outBound.history).length
    : 0;
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
  return finalisedHistory;
};

export default combineHistory;
