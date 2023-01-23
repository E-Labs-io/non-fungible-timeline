/** @format */

import { device, mobileL, mobileM, tablet } from "constants/media";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import useWindowSize from "hooks/window/useWindowSize";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

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

const StatBox = styled.div`
  width: 150px;
  height: 60px;
  padding: 10px;

  box-shadow: 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10%;

  :hover {
    scale: ${({ active }) => (active ? "1.05" : "1")};
    cursor: ${({ active }) => (active ? "pointer" : "default")};
    color: ${({ active }) => (active ? "#49c2ff" : "white")};
  }
`;

const StatTitle = styled.div`
  height: 25%;
  width: 100%;
  padding: 3px;
  text-align: center;
  font-size: 0.8em;
  align-items: center;
  justify-content: center;
`;

const Stat = styled.div`
  height: 75%;
  width: 100%;
  padding: 3px;
  text-align: center;
  font-size: 1.2em;
  align-items: center;
  justify-content: center;
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
  firstAndLast: { first: string; last: string };
  totals: { totalIn: number; totalOut: number };
  totalTX: number;
  handleOpenModal: (selected: "first" | "last") => void;
}
function UserStats({
  firstAndLast,
  totals,
  totalTX,
  handleOpenModal,
}: UserStatsProps) {
  const { width } = useWindowSize();
  const [reduceSize, setReduceSize] = useState<boolean>(false);
  const [isStatsOpen, setStatsOpen] = useState<boolean>(false);

  useEffect(() => {
    console.log("Width change");
    if (width <= tablet && !reduceSize) {
      setReduceSize(true);
    } else if (reduceSize && width > tablet) {
      setReduceSize(false);
    }
  }, [width]);

  const StatBoxs = () => (
    <>
      {" "}
      <StatBox active={true} onClick={() => handleOpenModal("first")}>
        <StatTitle>First Transaction</StatTitle>
        <Stat>{new Date(firstAndLast.first).toLocaleDateString()}</Stat>
      </StatBox>
      <StatBox active={true} onClick={() => handleOpenModal("last")}>
        <StatTitle>Latest Transaction</StatTitle>
        <Stat>{new Date(firstAndLast.last).toLocaleDateString()}</Stat>
      </StatBox>
      <StatBox>
        <StatTitle>Tokens In</StatTitle>
        <Stat>{totals.totalIn}</Stat>
      </StatBox>
      <StatBox>
        <StatTitle>Tokens Out</StatTitle>
        <Stat>{totals.totalOut}</Stat>
      </StatBox>
      <StatBox>
        <StatTitle>Total Transactions</StatTitle>
        <Stat>{totalTX}</Stat>
      </StatBox>
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
