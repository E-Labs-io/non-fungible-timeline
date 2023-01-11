/** @format */
import { sortedHistoryData } from "helpers/data/sortUsersHistory";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dailyHistory } from "../timeline/TimeLine";
import SingleNFTView from "./SingleNFTView";
import TransactionView from "./TransactionView";

const Wrapper = styled.div`
  width: 70vw;
  height: 50vh;
  padding: 10px;
  color: black;
`;

const TxArea = styled.div``;

const Overlay = styled.div`
  background-color: white;
`;

interface DayModalProps {
  allDayData: dailyHistory;
}
const DayModal = ({ allDayData }: DayModalProps) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [selectedNFT, setSelectedNFT] = useState<{
    NFTData: SingleNFTDataType;
    metadata: NFTMetaDataType;
    transactionData: sortedHistoryData;
  }>();

  const handleSelectedNFT = (
    NFTData: SingleNFTDataType,
    metadata: NFTMetaDataType,
    transactionData: sortedHistoryData
  ) => {
    const toView = {
      NFTData,
      metadata,
      transactionData,
    };
    setSelectedNFT(toView);
    setShowOverlay(true);
  };

  const handleCloseModal = () => setShowOverlay(false);

  return (
    <Wrapper>
      {showOverlay && (
        <Overlay>
          <SingleNFTView
            NFTData={selectedNFT.NFTData}
            metadata={selectedNFT.metadata}
            transactionData={selectedNFT.transactionData}
            closeView={handleCloseModal}
            direction={allDayData[0]}
          />
        </Overlay>
      )}
      <TxArea>
        {allDayData &&
          allDayData[2].map((txHash, key) => (
            <TransactionView
              handleSelectedNFT={handleSelectedNFT}
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
