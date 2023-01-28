/** @format */

import { device, mobileL, mobileM, tablet } from "constants/media";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import useWindowSize from "hooks/window/useWindowSize";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import UserStatsBox from "./StatsBox";
import {
  countTokens,
  countTransactions,
  getFirstAndLastTransactions,
  getMostActiveDay,
} from "../../helpers/sortUserStats";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;

  columns: 5;

  @media ${device.tablet} {
    flex-direction: column;
    row-gap: 5px;
  }
`;

const DropdownLabel = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;

  color: ${({ isOpen }) => (isOpen ? "#49c2ff" : "white")};

  justify-content: center;
  align-items: center;
  text-align: center;
  :hover {
    color: #ff47e6;
    cursor: pointer;
  }
`;

interface UserStatsProps {
  sortedInHistory: compileHistoryIntoDaysReturn;
  sortedOutHistory: compileHistoryIntoDaysReturn;
  handleOpenModalForFirstAndLast: (selected: "first" | "last") => void;
  handelOpenModalForActiveDate: (date: string, direction: "in" | "out") => void;
}
function UserStats({
  sortedInHistory,
  sortedOutHistory,
  handleOpenModalForFirstAndLast,
  handelOpenModalForActiveDate,
}: UserStatsProps) {
  const { width } = useWindowSize();
  const [reduceSize, setReduceSize] = useState<boolean>(false);
  const [isStatsOpen, setStatsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setLoaded] = useState(false);
  //    Stats States
  const [activeDay, setActiveDay] = useState<{
    date: string;
    direction: "in" | "out";
  }>();
  const [totalTX, setTotalTX] = useState<number>(0);
  const [firstAndLast, setFirstAndLast] = useState<{
    first: string;
    last: string;
  }>(undefined);
  const [totals, setTotals] = useState<{
    totalIn: number;
    totalOut: number;
  }>(undefined);

  useEffect(() => {
    if (width <= tablet && !reduceSize) {
      setReduceSize(true);
    } else if (reduceSize && width > tablet) {
      setReduceSize(false);
    }
  }, [width]);

  useEffect(() => {
    if (!loading && !allLoaded && sortedInHistory && sortedOutHistory) {
      setLoading(true);
      //  Build the stats data
      const dates = getFirstAndLastTransactions(
        sortedInHistory,
        sortedOutHistory
      );
      const totals = countTokens(sortedInHistory, sortedOutHistory);
      const totalTXs = countTransactions(sortedInHistory, sortedOutHistory);
      const active = getMostActiveDay(sortedInHistory, sortedOutHistory);
      setFirstAndLast(dates);
      setTotals(totals);
      setTotalTX(totalTXs);
      setActiveDay({ date: active.data.date, direction: active.dir });

      setLoaded(true);
    }
  }, [sortedInHistory, sortedOutHistory]);

  const StatBoxs = () => (
    <>
      <UserStatsBox
        active
        onClick={() => handleOpenModalForFirstAndLast("first")}
        title="First Transaction"
        stat={firstAndLast && new Date(firstAndLast.first).toLocaleDateString()}
      />
      <UserStatsBox
        active
        onClick={() => handleOpenModalForFirstAndLast("last")}
        title="Latest Transaction"
        stat={firstAndLast && new Date(firstAndLast.last).toLocaleDateString()}
      />
      <UserStatsBox
        active
        onClick={() =>
          handelOpenModalForActiveDate(activeDay.date, activeDay.direction)
        }
        title="Most Active Day"
        stat={activeDay && new Date(activeDay.date).toLocaleDateString()}
      />
      <UserStatsBox title="Tokens In" stat={totals && totals.totalIn} />
      <UserStatsBox title="Tokens Out" stat={totals && totals.totalOut} />
      <UserStatsBox title="Total Transactions" stat={totalTX && totalTX} />
    </>
  );

  return reduceSize ? (
    <Container>
      <DropdownLabel
        isOpen={isStatsOpen}
        onClick={() => setStatsOpen(isStatsOpen ? false : true)}
      >
        <FontAwesomeIcon icon={isStatsOpen ? faAngleDown : faAngleRight} />
        STATS
      </DropdownLabel>
      {isStatsOpen && <StatBoxs />}
    </Container>
  ) : (
    <Container>
      <StatBoxs />
    </Container>
  );
}

export default UserStats;
