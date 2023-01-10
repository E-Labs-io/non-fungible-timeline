/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCirclePlus,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import FrontCard from "./components/frontCard";
import {
  compileHistoryIntoDaysReturn,
  sortedHashData,
} from "helpers/data/compileHistoryIntoDays";
import combineHistory from "helpers/data/combinedSortedHistory";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  align-items: center;
  justify-content: center;
`;

const LoadMoreButton = styled.div`
  color: #ffffff;
  align-items: center;
  justify-content: center;
  :hover {
    color: #2d93f8;
  }
`;

export type combinedHistory = dailyHistory[];
export type dailyHistory = ["left" | "right", string, string[], sortedHashData];

interface TimeLineProps {
  sortedInHistory: compileHistoryIntoDaysReturn;
  sortedOutHistory: compileHistoryIntoDaysReturn;
  ready: boolean;
  handleOpenModal: Function;
}

function TimeLine({
  sortedInHistory,
  sortedOutHistory,
  ready,
  handleOpenModal,
}: TimeLineProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [lastItemNumber, setLastItemNumber] = useState<number>(10);
  const [sortedData, setSortedData] = useState<combinedHistory>();

  const loadMore = () => {
    let lastNum = lastItemNumber + 10;
    setLastItemNumber(lastNum);
  };

  useEffect(() => {
    if (ready && !!sortedInHistory && !!sortedOutHistory && !isReady) {
      const history = combineHistory(sortedInHistory, sortedOutHistory);
      setSortedData(history);
      setIsReady(true);;
      setFirstLoad(true);
    }
  });

  const addButton = () => (
    <LoadMoreButton>
      <FontAwesomeIcon swapOpacity={true} size="4x" icon={faPlus} />
    </LoadMoreButton>
  );

  const timelineIcon = (dir) =>
    dir === "left" ? (
      <>
        <FontAwesomeIcon size="2xl" icon={faCirclePlus} />
      </>
    ) : (
      <FontAwesomeIcon size="2xl" icon={faCircleMinus} />
    );

  const timelineElementStyle = (side) =>
    side === "left"
      ? {
          alignItems: "center",
          justifyContent: "right",
          background: "transparent",
          boxShadow: "none",
          display: "flex",
        }
      : {
          background: "transparent",
          justifyContent: "left",
          alignItems: "left",
          boxShadow: "none",
          display: "flex",
        };

  return (
    <Container>
      {isReady && (
        <VerticalTimeline layout={"2-columns"}>
          {!!sortedData &&
            sortedData.slice(0, lastItemNumber).map((day, key) => (
              <VerticalTimelineElement
                date={day[1]}
                contentStyle={timelineElementStyle(day[0])}
                position={day[0]}
                iconStyle={{
                  background: day[0] === "left" ? "#7acd22" : "#e8650e",
                  color: "#ffffff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(2, 2, 2)",
                  backgroundColor: "transparent",
                }}
                icon={timelineIcon(day[0])}
              >
                <FrontCard
                  transactionDataBase={day[3]}
                  date={day[1]}
                  txHashes={day[2]}
                  allData={day}
                  handleOpenModal={handleOpenModal}
                />
              </VerticalTimelineElement>
            ))}
          {!!sortedInHistory && (
            //  Load next button
            <VerticalTimelineElement
              iconOnClick={loadMore}
              icon={addButton()}
              iconClassName="vertical-timeline-element-icon--button"
            />
          )}
        </VerticalTimeline>
      )}
    </Container>
  );
}

export default TimeLine;
