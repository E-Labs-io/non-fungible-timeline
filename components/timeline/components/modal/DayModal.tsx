/** @format */
import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { dailyHistory } from "../timeline/TimeLine";
import SingleNFTView from "./SingleNFTView";
import TransactionView from "./TransactionView";

const Wrapper = styled.div`
  width: 70vw;
  min-height: ${({ overlay }) => (overlay ? "400px" : "300px")};
  padding: 10px;
  color: black;
`;


const TxArea = styled.div`
  padding: 5px;
`;


interface DayModalProps {
  allDayData: dailyHistory;
}
const DayModal = ({ allDayData }: DayModalProps) => {
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
      if (allDayData[3][allDayData[2][0]].length === 1) {
        setLoading(true);
        console.log("single item TX");
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
  });

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
    <Wrapper overlay={showOverlay}>
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
  );
};

export default DayModal;
