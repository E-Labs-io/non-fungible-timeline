/** @format */
import { Button } from "components/common";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import handleClickOpenURLInNewTab from "hooks/window/openLinkInNewTab";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import testImage from "public/images/neil-thakaria-profile.png";
import Image from "next/image";

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

const Title = styled.h3``;

const Text = styled.p``;
const Link = styled.a``;

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

interface TimelineBoxProps {
  transactionData?: any;
}
const TimelineBox = ({ transactionData }: TimelineBoxProps) => {
  return (
    <Wrapper>
      <TwoSections>
        <Rows>
          <Title>{transactionData.asset}</Title>
          <ThreeColum>
            <Text>{transactionData.metadata.blockTimestamp}</Text>
            <Text>
              <BoldText> Type:</BoldText> {transactionData.category}
            </Text>
            <Text>
              <BoldText>
                <Button
                  onClick={() =>
                    handleClickOpenURLInNewTab(
                      buildNetworkScanLink({
                        network: "eth",
                        txHash: transactionData.hash,
                      })
                    )
                  }
                  borderColor={"white"}
                  backgroundColor={"#ff06063ef"}
                  borderRadius={"30px"}
                  color={"#ffffff1ef"}
                  fontSize={"auto"}
                >
                  Etherscan
                </Button>
              </BoldText>
            </Text>
          </ThreeColum>
          <Text>
            <BoldText>Contract: </BoldText>{" "}
            {transactionData.rawContract.address}
          </Text>
          <Text>
            <BoldText>Token Id: </BoldText>
            {parseInt(transactionData.tokenId)}
          </Text>
        </Rows>
        <ImageContainer>
          <ImageBox width={"150"} height={"150"} src={testImage} />
        </ImageContainer>
      </TwoSections>
    </Wrapper>
  );
};

export default TimelineBox;
