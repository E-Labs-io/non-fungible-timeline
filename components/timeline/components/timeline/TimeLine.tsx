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
//import "react-vertical-timeline-component/style.min.css";

import FrontCard from "./frontCard";
import {
  compileHistoryIntoDaysReturn,
  sortedHashData,
} from "helpers/dataSorting/compileHistoryIntoDays";
import combineHistory from "helpers/dataSorting/combinedSortedHistory";
import useNFTimelineProvider from "providers/NFTimelineProvider";
import filterFilteredDays from "./helpers/filterDays";
import useWindowSize from "hooks/window/useWindowSize";
import { mobileL, tablet } from "constants/media";

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  align-items: center;
  justify-content: center;
`;

const LoadMoreButton = styled.div`
  color: #2d93f8;
  align-items: center;
  justify-content: center;
  display: flex;
  :hover {
    color: #ff55bb;
  }
`;

const MoreContainer = styled.div`
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

export type combinedHistory = dailyHistory[];
export type dailyHistory = ["left" | "right", string, string[], sortedHashData];

interface TimeLineProps {
  sortedInHistory: compileHistoryIntoDaysReturn;
  sortedOutHistory: compileHistoryIntoDaysReturn;
  ready: boolean;
  handleOpenModal: (allSelectedData) => void;
}

function TimeLine({
  sortedInHistory,
  sortedOutHistory,
  ready,
  handleOpenModal,
}: TimeLineProps) {
  const { timelineFilters, checkIfValidContract } = useNFTimelineProvider();
  const { width } = useWindowSize();
  const [isReady, setIsReady] = useState<boolean>(false);
  const [lastItemNumber, setLastItemNumber] = useState<number>(10);
  const [sortedData, setSortedData] = useState<combinedHistory>();
  const [isSmallScreen, setSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    setIsReady(false);
    let history = filterFilteredDays(
      combineHistory(sortedInHistory, sortedOutHistory),
      timelineFilters,
      checkIfValidContract
    );
    setSortedData(history);
  }, [timelineFilters]);

  useEffect(() => {
    if (!isSmallScreen && width <= tablet) {
      setSmallScreen(true);
    } else if (isSmallScreen && width > tablet) setSmallScreen(false);
  });

  const loadMore = () => {
    let lastNum = lastItemNumber + 10;
    setLastItemNumber(lastNum);
  };

  useEffect(() => {
    if (ready && !!sortedInHistory && !!sortedOutHistory && !isReady) {
      const history = filterFilteredDays(
        combineHistory(sortedInHistory, sortedOutHistory),
        timelineFilters,
        checkIfValidContract
      );
      setSortedData(history);
      setIsReady(true);
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

  const timelineElementStyle = (side) => {
    const style: any = {
      background: "transparent",
      alignItems: "left",
      boxShadow: "none",
      display: "flex",
      justifyContent: "left",
    };
    if (isSmallScreen) {
      style.justifyContent = "left";
    } else style.justifyContent = side === "left" ? "right" : "left";
    return style;
  };

  return (
    <Container>
      {isReady && (
        <VerticalTimeline layout={"2-columns"}>
          {!!sortedData &&
            sortedData.slice(0, lastItemNumber).map((day, key) => (
              <VerticalTimelineElement
                key={key}
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
                  margin: "0px 0px 0px 0px",
                }}
                icon={timelineIcon(day[0])}
              >
                <FrontCard
                  key={key}
                  index={key}
                  transactionDataBase={day[3]}
                  date={day[1]}
                  txHashes={day[2]}
                  allData={day}
                  handleOpenModal={handleOpenModal}
                />
              </VerticalTimelineElement>
            ))}
          {!!sortedInHistory && lastItemNumber < sortedData.length && (
            <VerticalTimelineElement
              iconOnClick={loadMore}
              icon={addButton()}
              iconClassName="vertical-timeline-element-icon--button"
            />
          )}
        </VerticalTimeline>
      )}
      <br />
      <br />
      <br />
    </Container>
  );
}

export default TimeLine;
