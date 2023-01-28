/** @format */

import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SmallNFTCard from "../SmallNFTCard";

const Container = styled.div`
  width: 100%;
  padding: 5px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  border-radius: 10px;
`;

const InfoArea = styled.div`
  padding: 5px;
  display: flex;
  width: 100%;
  column-gap: 20px;
  justify-content: space-between;
`;
const Type = styled.div`
  width: 100%;
  padding-left: 20px;
`;
const Etherscan = styled.div`
  width: 100%;
  text-align: right;
`;

const InlineLink = styled.a`
  color: black;
  :hover {
    color: lightblue;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  min-height: 189px;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
  overflow: scroll;
  cursor: pointer;

  padding: 5px;

  border-radius: 10px;
  border-color: black;
  border-width: 0px;
  border-style: solid;
`;

interface TransactionViewProps {
  txHash: string;
  txData: sortedHistoryData[];
  index: number;
  handleSelectedNFT: (
    NFTData: SingleNFTDataType,
    metadata: NFTMetaDataType,
    transactionData: sortedHistoryData
  ) => void;
}

function TransactionView({
  txHash,
  txData,
  index,
  handleSelectedNFT,
}: TransactionViewProps) {
  return (
    <Container>
      <InfoArea>
        <Type>Transaction {index + 1}</Type>
        <Etherscan>
          <InlineLink
            href={buildNetworkScanLink({
              network: "eth",
              txHash: txHash,
            })}
            target="blank"
          >
            Etherscan
          </InlineLink>
        </Etherscan>
      </InfoArea>

      <CardContainer>
        {txData &&
          txData.map((contract, key) =>
            contract.groupedTokenIds.map((id, lowerKey) => (
              <SmallNFTCard
                key={index + lowerKey + key}
                index={`${index}-${key}-${lowerKey}`}
                handleSelectedNFT={handleSelectedNFT}
                contractAddress={contract.contractAddress}
                tokenId={id}
                transactionData={contract}
              />
            ))
          )}
      </CardContainer>
    </Container>
  );
}

export default TransactionView;
