/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dailyHistory } from "../timeline/TimeLine";
import TransactionView from "./TransactionView";

const Wrapper = styled.div`
  width: 70vw;
  height: 50vh;
  padding: 10px;
  color: black;
`;

const TitleArea = styled.div`
  width: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  columns: 2;
`;

const Title = styled.div`
  width: 60%;
  font-size: x-large;
  text-align: left;
  display: flex;
`;
const Method = styled.u`
  width: 40%;
  text-decoration: none;
  font-size: x-large;
  text-align: right;
  display: flex;
`;

const TxArea = styled.div``;

const Link = styled.a``;

interface DayModalProps {
  allDayData: dailyHistory;
}
const DayModal = ({ allDayData }: DayModalProps) => {
  console.log("in Comp Data: ", allDayData);

  return (
    <Wrapper>
      <TxArea>
        {allDayData &&
          allDayData[2].map((txHash, key) => (
            <TransactionView
              txHash={txHash}
              txData={allDayData[3][txHash]}
              key={key}
              index={key}
            />
          ))}
      </TxArea>
    </Wrapper>
  );
};

export default DayModal;
