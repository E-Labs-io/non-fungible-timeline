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

const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: scroll;
  align-items: center;
  justify-content: center;
`;

interface TimeLineProps {
  sortedInHistory: sortUsersHistoryReturn;
  ready: boolean;
  handleOpenModal: Function;
  contractInstances: {
    [contractAddress: string]: { instance: Contract; name: string };
  };
}

function TimeLine({
  sortedInHistory,
  ready,
  handleOpenModal,
  contractInstances,
}: TimeLineProps) {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);
  const [lastItemNumber, setLastItemNumber] = useState<number>(10);

  const loadMore = () => {
    let lastNum = lastItemNumber + 10;
    setLastItemNumber(lastNum);
  };

  useEffect(() => {
    if (ready && !!sortedInHistory && !isReady) {
      setIsReady(true);
      if (!firstLoad) console.log("Check Timeline Props: ", sortedInHistory);
      setFirstLoad(true);
    }
  });

  const addButton = () => <FontAwesomeIcon icon={faPlusCircle} />;
  return (
    <Container>
      {isReady && (
        <VerticalTimeline layout={"2-columns"}>
          {!!sortedInHistory &&
            sortedInHistory.allBlocks
              .slice(0, lastItemNumber)
              .map((item, key) => (
                <VerticalTimelineElement
                  contentStyle={{
                    background: "transparent",
                    boxShadow: "none",
                  }}
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
                    transactionDataBase={sortedInHistory.sorted[item[0]]}
                    contractInstances={contractInstances}
                    blockCountData={item}
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
