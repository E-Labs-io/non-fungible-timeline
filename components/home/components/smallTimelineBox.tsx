/** @format */
import { Button } from "../../common";
import { buildNetworkScanLink } from "../../../hooks/web3/helpers/etherscanLink";
import handleClickOpenURLInNewTab from "../../../hooks/window/openLinkInNewTab";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";
import { BlockCounter } from "../../../helpers/data/sortUsersHistory";
import TransactionBox from "./TransactionBox";
import { ethers } from "ethers";

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

const TwoColums = styled.div`
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
const SingleTransactionItem = styled.span`
  width: 45vw;
`;

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

const SmallButton = styled.button`
  border-radius: 30px;
`;

interface SmallTimelineBoxBoxProps {
  transactionDataBase: any;
  blockCountData: BlockCounter;
  handleOpenModal: Function;
  contractInstances: {
    [contractAddress: string]: { instance: ethers.Contract; name: string };
  };
}
const SmallTimelineBox = ({
  transactionDataBase,
  blockCountData,
  handleOpenModal,
  contractInstances,
}: SmallTimelineBoxBoxProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [blkNumberFormats, setBlkNumberFormats] = useState<any>();
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (!blkNumberFormats && blockCountData && !ready)
      setBlkNumberFormats({
        hex: blockCountData[0],
        number: parseInt(blockCountData[0]),
      });

    if (!!transactionDataBase && !ready) {
    }
    if (!!blkNumberFormats && !ready) setReady(true);
  });

  const Block = () => (
    <BlockData>
      {" "}
      Block:
      <BoldText>
        <Link
          href={buildNetworkScanLink({
            block: blkNumberFormats.number,
            network: "eth",
          })}
          target={"blank"}
        >
          {blkNumberFormats.number}{" "}
        </Link>
      </BoldText>
    </BlockData>
  );

  return ready ? (
    <Wrapper>
      <Block />
      <TransactionDataArea>
        <br />
        <SingleTransactionItem>
          {blockCountData[1].contracts.length > 0 &&
            blockCountData[1].contracts.map((address) => {
              return (
                <TransactionBox
                  transactionData={
                    transactionDataBase[blockCountData[1].hash[0]][address]
                  }
                  contractConnection={contractInstances[address]?.instance}
                  contractName={contractInstances[address]?.name}
                  handleOpenModal={handleOpenModal}
                />
              );
            })}
        </SingleTransactionItem>
        <br />
      </TransactionDataArea>
    </Wrapper>
  ) : null;
};

export default SmallTimelineBox;
