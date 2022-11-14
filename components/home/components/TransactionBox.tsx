/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import buildOpenSeaLink from "hooks/web3/helpers/openseaLink";
import { ethers } from "ethers";
import { sortedHistoryData } from "helpers/data/sortUsersHistory";
import zeroAddress from "hooks/web3/data/zeroAddress";

const Container = styled.div`
  width: 100%;
  height: 30px;
  border-color: white;
  border-width: 1px;
  border-style: solid;
  border-radius: 15px;
  display: flex;
  flex-direction: grid;
  grid-template-columns: 5fr 1fr;
  grid-column: span 2;
  margin: auto;
  padding: 2px;
`;

const InfoArea = styled.div`
  width: 94%;
  display: grid;
  flex-direction: row;
  grid-template-columns: 2fr 1fr 3fr 1fr;
  gap: 10px;
  justify-content: space-around;
  padding: 5px;
`;

const EndTab = styled.div`
  background-color: #31a3c6;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 6%;
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-color: white;
  border-style: solid;
  border-width: 1px;

  :hover {
    transform: scale(1.2);
    cursor: pointer;
  }
`;

const ProjectName = styled.a`
  font-weight: bold;
  color: white;
`;
const ProjectTicker = styled.span``;
const Tokens = styled.span``;
const Method = styled.span`
  text-align: right;
`;
const BlackText = styled.span`
  color: black;
`;

interface TransactionBoxProps {
  transactionData: sortedHistoryData;
  contractConnection?: ethers.Contract;
  contractName: string;
  handleOpenModal: Function;
}

function TransactionBox({
  transactionData,
  contractConnection,
  contractName,
  handleOpenModal,
}: TransactionBoxProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<sortedHistoryData>({
    contractAddress: "....",
    groupedTokenIds: ["..., ..., ...,"],
    instance: null,
  });
  const [contractInstance, setContractInstance] = useState<ethers.Contract>();
  const [projectDetails, setProjectDetails] = useState({
    name: "......",
    method: "n/a",
  });

  useEffect(() => {
    if (!ready && !loading) {
      setLoading(true);
      setData(transactionData);
      let method = "TRANSFER";
      if (transactionData?.from === zeroAddress()) method = "MINT";
      setProjectDetails({
        name: contractName,
        instance: contractConnection,
        method: method,
      });
    }
  });

  const sortTokensForDisplay = (tokens: string[]) => {
    if (tokens?.length > 3)
      return `${tokens[0]}, ${tokens[1]}, ${tokens[2]}...`;
    else return tokens;
  };

  const handleExpandClick = () => {
    handleOpenModal(transactionData, contractConnection);
  };
  return (
    <Container>
      <InfoArea>
        <ProjectName
          href={buildOpenSeaLink({
            address: data?.contractAddress,
          })}
          target="blank"
        >
          {projectDetails.name}
        </ProjectName>
        <ProjectTicker>({data?.ticker})</ProjectTicker>
        <Tokens>
          [<BlackText>{sortTokensForDisplay(data?.groupedTokenIds)}</BlackText>]
        </Tokens>
        <Method>{projectDetails.method}</Method>
      </InfoArea>
      <EndTab>
        <FontAwesomeIcon
          icon={faArrowRight}
          onClick={handleExpandClick}
          color={"white"}
          size="lg"
        />
      </EndTab>
    </Container>
  );
}

export default TransactionBox;
