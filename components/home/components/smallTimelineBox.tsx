/** @format */
import { Button } from "components/common";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import handleClickOpenURLInNewTab from "hooks/window/openLinkInNewTab";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import testImage from "public/images/neil-thakaria-profile.png";
import Image from "next/image";
import { BlockCounter } from "helpers/data/sortUsersHistory";

const Wrapper = styled.div`
  min-width: 30vw;
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  padding: 5px;
  margin: auto;
  box-shadow: 17px 33px 53px 4px rgba(0, 0, 0, 0.27);
`;

const TwoSections = styled.div`
  grid-template-columns: 5fr 2fr;
  columns: 2;
  display: grid;
  flex-direction: column;
`;

const ThreeColum = styled.div`
  flex-direction: column;
  position: relative;
  direction: flex;
  columns: 3;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Rows = styled.div`
  direction: flex;
  flex-direction: row;
  row-gap: 2px;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const BlockData = styled.div`
  text-align: right;
`;

const Title = styled.h3``;

const Text = styled.p``;
const Link = styled.a``;

const TransactionDataArea = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
`;
const SingleTransactionItem = styled.span``;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
  border-radius: 10px;
`;
const ImageBox = styled(Image)`
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

interface SmallTimelineBoxBoxProps {
  transactionDataBase: any;
  blockNumber: string;
}
const SmallTimelineBox = ({
  transactionDataBase,
  blockNumber,
}: SmallTimelineBoxBoxProps) => {
  console.log(transactionDataBase);
  console.log(blockNumber);
  const [ready, setReady] = useState<boolean>(false);
  const [blockNumbers, setBlockNumbers] = useState<any>();

  useEffect(() => {
    if (!blockNumbers && blockNumber && !ready) setBlockNumbers({ hex: blockNumber, number: parseInt(blockNumber) });
    if(!!blockNumbers && !ready) setReady(true);
  });

  return ready ? (
    <Wrapper>
      <BlockData>
        {" "}
        Block:
        <BoldText>
          <Link
            href={buildNetworkScanLink({
              block: blockNumbers.number,
              network: "eth",
            })}
            target={"blank"}
          >
            {blockNumbers.number}{" "}
          </Link>
        </BoldText>
      </BlockData>
      <TransactionDataArea>
        <SingleTransactionItem>
          <BoldText>Transaction: </BoldText>
          {blockNumber[1].hash.length}
        </SingleTransactionItem>
        <SingleTransactionItem>
          <BoldText>Contracts: </BoldText> {blockNumber[1].contracts.length}
        </SingleTransactionItem>
        <SingleTransactionItem>
          <BoldText>Tokens In: </BoldText>{" "}
          {
            transactionDataBase[blockNumbers.hex][blockNumber[1].contracts[0]]
              .tokenCount
          }
        </SingleTransactionItem>
      </TransactionDataArea>
      <TwoSections></TwoSections>
    </Wrapper>
  ) : null;
};

export default SmallTimelineBox;
