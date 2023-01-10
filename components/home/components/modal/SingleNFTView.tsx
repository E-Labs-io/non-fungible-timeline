/** @format */

import { sortedHistoryData } from "helpers/data/sortUsersHistory";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  position: absolute;
  background-color: white;
`;

const CloseView = styled.div`
  width: 100%;
  height: 50px;
`;

const ViewArea = styled.div`
  width: 100%;
  height: 100%;
`;

const ImageContainer = styled.div`
  border-radius: 10px;

  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;

  width: 300px;
  height: 300px;

  display: flex;
  align-items: left;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;

const TokenImage = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 300px;
  height: 300px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

interface SingleNFTViewProps {
  NFTData: SingleNFTDataType;
  metadata: NFTMetaDataType;
  transactionData: sortedHistoryData;
  closeView: Function;
}
const SingleNFTView = ({
  NFTData,
  metadata,
  transactionData,
  closeView,
}: SingleNFTViewProps) => {
  return (
    <Container>
      <CloseView onClick={closeView}>Back</CloseView>
      <ViewArea>
        <ImageContainer>
          <TokenImage src={metadata.image} />
        </ImageContainer>
      </ViewArea>
    </Container>
  );
};
export default SingleNFTView;
