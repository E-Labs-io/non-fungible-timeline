/** @format */
import { device } from "constants/media";
import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";
import useNFTimelineProvider from "hooks/NFTimelineProvider";
import { NFTMetaDataType, SingleNFTDataType } from "e-labs_web3provider";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { dailyHistory } from "../timeline/TimeLine";
import SingleNFTView from "./SingleDayView/SingleNFTView";
import TransactionView from "./TransactionView";

const Wrapper = styled.div`
  width: 70vw;
  min-height: ${({ overlay }) => (overlay ? "400px" : "300px")};
  padding: 10px;
  color: black;
  transition: all 0.3s linear;
  overflow-wrap: break-word;
  @media ${device.laptop} {
    width: 90vw;
  }
`;

const TxArea = styled.div`
  padding: 5px;
`;

interface DayModalProps {
  allDayData: dailyHistory;
}
const DayModal = ({ allDayData }: DayModalProps) => {
  const selectedNFTRef = useRef(null);
  const { getTokenMetadata } = useNFTimelineProvider();
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [selectedNFT, setSelectedNFT] = useState<{
    NFTData: SingleNFTDataType;
    metadata: NFTMetaDataType;
    transactionData: sortedHistoryData;
  }>();

  useEffect(() => {
    if (allDayData && allDayData[2].length === 1 && !loading) {
      setLoading(true);
      if (allDayData[3][allDayData[2][0]][0].groupedTokenIds.length === 1) {
        getTokenMetadata(
          "ethereum",
          allDayData[3][allDayData[2][0]][0].contractAddress,
          allDayData[3][allDayData[2][0]][0].tokenId.hex
        ).then((data: SingleNFTDataType) => {
          const toView = {
            NFTData: data,
            metadata: data.metadata,
            transactionData: allDayData[3][allDayData[2][0]][0],
          };
          setSelectedNFT(toView);
          setShowOverlay(true);
        });
      }
    }
  }, [loading, allDayData]);

  const scrollToTop = () =>
    selectedNFTRef &&
    selectedNFTRef.current &&
    selectedNFTRef.current.scrollIntoView();

  const handleSelectedNFT = (
    NFTData: SingleNFTDataType,
    metadata: NFTMetaDataType,
    transactionData: sortedHistoryData
  ) => {
    setSelectedNFT(null);
    const toView = {
      NFTData,
      metadata,
      transactionData,
    };
    setSelectedNFT(toView);
    setShowOverlay(true);
    scrollToTop();
  };

  const handleCloseModal = () => setShowOverlay(false);

  return allDayData && allDayData.length === 4 ? (
    <Wrapper overlay={showOverlay} ref={selectedNFTRef}>
      {showOverlay && (
        <SingleNFTView
          NFTData={selectedNFT.NFTData}
          metadata={selectedNFT.metadata}
          transactionData={selectedNFT.transactionData}
          closeView={handleCloseModal}
          direction={allDayData[0]}
        />
      )}
      <TxArea>
        {allDayData &&
          allDayData[2].map((txHash, key) => (
            <>
              <TransactionView
                handleSelectedNFT={handleSelectedNFT}
                txHash={txHash}
                txData={allDayData[3][txHash]}
                key={key}
                index={key}
              />
              <br />
            </>
          ))}
      </TxArea>
    </Wrapper>
  ) : null;
};

export default DayModal;
