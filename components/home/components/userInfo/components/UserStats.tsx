/** @format */

import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: space-around;

  columns: 5;
`;

const StatBox = styled.div`
  width: 150px;
  height: 60px;
  padding: 10px;

  box-shadow: 0px 0px 20px 5px rgba(207, 207, 207, 0.682);
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

interface UserStatsProps {
  firstAndLast: { first: string; last: string };
  totals: { totalIn: number; totalOut: number };
  totalTX: number;
}
function UserStats({ firstAndLast, totals, totalTX }: UserStatsProps) {
  return (
    <Container>
      <StatBox active={true}>
        <StatTitle>First Transactions</StatTitle>
        <Stat>{new Date(firstAndLast.first).toLocaleDateString()}</Stat>
      </StatBox>
      <StatBox active={true}>
        <StatTitle>Latest Transactions</StatTitle>
        <Stat>{new Date(firstAndLast.last).toLocaleDateString()}</Stat>
      </StatBox>
      <StatBox>
        <StatTitle>Total In</StatTitle>
        <Stat>{totals.totalIn}</Stat>
      </StatBox>
      <StatBox>
        <StatTitle>Total Out</StatTitle>
        <Stat>{totals.totalOut}</Stat>
      </StatBox>
      <StatBox>
        <StatTitle>Total Transactions</StatTitle>
        <Stat>{totalTX}</Stat>
      </StatBox>
    </Container>
  );
}

export default UserStats;
