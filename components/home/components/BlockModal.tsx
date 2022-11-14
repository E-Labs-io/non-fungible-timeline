/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { Button } from "../../common";
import { buildNetworkScanLink } from "../../../hooks/web3/helpers/etherscanLink";
import handleClickOpenURLInNewTab from "../../../hooks/window/openLinkInNewTab";

import {
  BlockCounter,
  sortedDataFormat,
} from "../../../helpers/data/sortUsersHistory";
import TransactionExpander from "./transactionExpander";
import { ethers } from "ethers";

const Wrapper = styled.div`
  width: 50vw;
  height: 50vh;
  padding: 10px;
  color: black;
`;

const TitleArea = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 10px;
  direction: flex;
  flex-direction: column;
  columns: 2;
`;

const Title = styled.h2``;
const BoldText = styled.span`
  font-weight: bold;
  text-align: right;
`;

const BlockData = styled.div`
  text-align: right;
`;

const InfoArea = styled.div`
  width: 100%;
  min-height: 50px;
  direction: flex;
  flex-direction: column;
  columns: 2;
  border-width: 1px;
  border-style: solid;
  border-color: black;
  border-radius: 15px;
`;

const Link = styled.a``;

interface BlockModalProps {
  selectedData: sortedDataFormat;
  contractConnection: ethers.Contract;
}
const BlockModal = ({ selectedData, contractConnection }: BlockModalProps) => {
  console.log("in Comp Data: ", selectedData);

  return (
    <Wrapper>
      <TitleArea>
        <Title>Block Explorer</Title>
        <BlockData>
          <BoldText>Block:</BoldText>
          <Link
            href={buildNetworkScanLink({
              block: parseInt(selectedData?.blockNum),
              network: "eth",
            })}
            target={"blank"}
          >
            {parseInt(selectedData?.blockNum)}{" "}
          </Link>
        </BlockData>
      </TitleArea>

      <TransactionExpander
        selectedData={selectedData}
        hash={selectedData.hash}
      />
    </Wrapper>
  );
};

export default BlockModal;
