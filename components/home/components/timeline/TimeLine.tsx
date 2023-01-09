/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Contract } from "ethers";
import {
  sortedDataFormat,
  sortedHistoryData,
  sortUsersHistoryReturn,
} from "helpers/data/sortUsersHistory";
import FrontCard from "./components/frontCard";
import {
  compileHistoryIntoDaysReturn,
  sortedHashData,
  sortedHistoryIntoDays,
} from "helpers/data/compileHistoryIntoDays";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  align-items: center;
  justify-content: center;
`;

interface TimeLineProps {
  sortedInHistory: compileHistoryIntoDaysReturn;
  sortedOutHistory: compileHistoryIntoDaysReturn;
  ready: boolean;
  handleOpenModal: Function;
  contractInstances: {
    [contractAddress: string]: { instance: Contract; name: string };
  };
}

function TimeLine({
  sortedInHistory,
  sortedOutHistory,
  ready,
  handleOpenModal,
  contractInstances,
}: TimeLineProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [lastItemNumber, setLastItemNumber] = useState<number>(10);
  const [sortedData, setSortedData] = useState<combinedHistory>();

  const loadMore = () => {
    let lastNum = lastItemNumber + 10;
    setLastItemNumber(lastNum);
  };

  const getHistoryDates = (history) => {
    const dates = Object.keys(history.history);
    return dates;
  };

  const getTXHash = (history, date) => Object.keys(history.history[date]);

  type combinedHistory = dailyHistory[];
  type dailyHistory = ["left" | "right", string, string[], sortedHashData];

  const combineHistory = (
    inBound: compileHistoryIntoDaysReturn,
    outBound: compileHistoryIntoDaysReturn
  ) => {
    console.log("combineHistory: Mounted");
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

  useEffect(() => {
    if (ready && !!sortedInHistory && !!sortedOutHistory && !isReady) {
      const history = combineHistory(sortedInHistory, sortedOutHistory);
      setSortedData(history);
      setIsReady(true);
      if (!firstLoad) console.log("Check Combined: ", history);
      setFirstLoad(true);
    }
  });

  const addButton = () => <FontAwesomeIcon icon={faPlusCircle} />;
  return (
    <Container>
      {isReady && (
        <VerticalTimeline layout={"2-columns"}>
          {!!sortedData &&
            sortedData.slice(0, lastItemNumber).map((day, key) => (
              <VerticalTimelineElement
                contentStyle={{
                  background: "transparent",
                  boxShadow: "none",
                }}
                position={day[0]}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(222, 222, 222)",
                  backgroundColor: "transparent",
                  iconStyle: {
                    background: "rgb(33, 150, 243)",
                    color: "#fff",
                  },
                }}
                style={{
                  margin: "auto",
                }}
              >
                <FrontCard
                  transactionDataBase={day[3]}
                  date={day[1]}
                  txHashes={day[2]}
                  handleOpenModal={handleOpenModal}
                />
              </VerticalTimelineElement>
            ))}
          {!!sortedInHistory && (
            //  Load next button
            <VerticalTimelineElement
              iconOnClick={loadMore}
              icon={addButton()}
            />
          )}
        </VerticalTimeline>
      )}
    </Container>
  );
}

export default TimeLine;
