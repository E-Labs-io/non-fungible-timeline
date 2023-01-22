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
} from "helpers/dataSorting/compileHistoryIntoDays";
import combineHistory from "helpers/dataSorting/combinedSortedHistory";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { timelineFilterStore } from "hooks/NFTimelineProvider/types/ProviderTypes";

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
  const [isReady, setIsReady] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [lastItemNumber, setLastItemNumber] = useState<number>(10);
  const [sortedData, setSortedData] = useState<combinedHistory>();
  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const loadMore = () => {
    let lastNum = lastItemNumber + 10;
    setLastItemNumber(lastNum);
  };

  useEffect(() => {
    if (ready && !!sortedInHistory && !!sortedOutHistory && !isReady) {
      timelineFilters && timelineFilters.length > 0
        ? setActiveFilter(true)
        : setActiveFilter(false);
      const history = filterFilteredDays(
        combineHistory(sortedInHistory, sortedOutHistory),
        activeFilter
      );
      setSortedData(history);
      setIsReady(true);
      setFirstLoad(true);
    }
  });

  useEffect(() => {
    const active = checkIfFilterIsActive();
    let changed = active !== activeFilter;
    setActiveFilter(active);
  }, [timelineFilters]);

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

  const checkIfFilterIsActive = () => {
    if (timelineFilters && timelineFilters.length > 0) return true;
    else return false;
  };

  const filterFilteredDays = (history: combinedHistory, active: boolean) => {
    if (active) {
      let filteredHistory: combinedHistory = history;
      console.log(timelineFilters);
      //  Get the filters
      //  Check what filters are active
      const filters: timelineFilterStore[] = timelineFilters;
      const isData = filters.find((a) => a.filterType === "date");
      const isVerified = filters.find((a) => a.filterType === "verified");

      if (!!isData) {
        //  Filter for days
      }
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
          filtered.push([
            dayData[0],
            dayData[1],
            allowedHash,
            allowedSortedData,
          ]);
        }
        //  Save the filtered contracts as the history
        filteredHistory = filtered;
      }

      return filteredHistory;
    } else return history;
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
