/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { sortedHistoryData } from "../../../../../helpers/data/sortUsersHistory";
import useWindowSize from "hooks/window/useWindowSize";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { AlchemyGetSingleNFT } from "hooks/web3/api/alchemyGetters";
import zeroAddress from "hooks/web3/data/zeroAddress";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import { sortedHashData } from "helpers/data/compileHistoryIntoDays";
import { dailyHistory } from "../TimeLine";

const Wrapper = styled.div`
  width: 210px;
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  padding: 5px;
  box-shadow: 17px 33px 53px 4px rgba(0, 0, 0, 0.27);
  overflow: hidden;
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
const SmallButton = styled.button`
  border-radius: 30px;
`;

//////  CARD BUILD
const SingleCard = styled.div`
  width: 200px;
  padding: 5px;
  background-color: #86848447;

  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;
  column-gap: 5px;

  border-radius: 20px;
  border-color: black;
  border-style: nonbe;
  border-width: 1px;
`;

const InfoBox = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;
  border-bottom: none;

  background-color: #dcd7d795;
  padding: 5px;

  width: 191px;
  height: 50px;

  display: flex;
  flex-direction: column;
`;

const DateLine = styled.div`
  color: #000000;
  text-align: left;
  font-size: medium;
`;

const TXData = styled.div`
  color: #000000;
  text-align: left;
  font-size: medium;
`;

const MoreText = styled.a`
  color: #000000;
  text-align: left;
  font-size: medium;
  text-decoration: "none";
`;

const TopImageContainer = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;

  display: flex;
  align-items: left;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;

const NFTImage = styled.img`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 190px;
  height: 189px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

interface FrontCardProps {
  transactionDataBase: sortedHashData;
  date: string;
  handleOpenModal: Function;
  txHashes: string[];
  allData: dailyHistory;
}
const FrontCard = ({
  transactionDataBase,
  date,
  txHashes,
  handleOpenModal,
  allData,
}: FrontCardProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [txData, setTxData] = useState<any>();

  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [imageUrl, setImageUrl] = useState<string>(
    "/images/placeholder-image.png"
  );

  const { width: windowWidth } = useWindowSize();

  const [showContract, setShowContract] = useState<string>();
  const [showToken, setShowToken] = useState<string>();
  const network = "mainnet";

  useEffect(() => {
    if (!ready && !loading) {
      if (!!transactionDataBase) {
        setLoading(true);

        const toShow: sortedHistoryData = transactionDataBase[txHashes[0]][0];
        setTxData(toShow);
        setShowContract(toShow.contractAddress);
        setShowToken(toShow.groupedTokenIds[0]);
        AlchemyGetSingleNFT(
          toShow.contractAddress,
          toShow.groupedTokenIds[0].toString()
        )
          .then((nft) => {
            setNFTData(nft);
            setMetadata(nft.metadata);
            if (!!nft.metadata.image) {
              setImageUrl(nft.metadata.image);
            } else {
              console.log("DIDN'T GET METADATA");
            }
            setReady(true);
            setLoading(false);
          })
          .catch((error) => console.log("Error getting token data: ", error));
      }
    }
  });

  const getTXDate = (toShow) => {
    const fullDate = new Date(toShow.timestamp);
    const toShowDate = fullDate.toLocaleDateString();
    return toShowDate;
  };

  const getTXType = (toShow) => {
    let method = "Transfer";
    if (toShow.from === zeroAddress()) method = "Mint";
    else if (toShow.to === zeroAddress()) method = "Burn";
    return method;
  };

  const shortenTokenId = (tokenId) =>
    tokenId.length > 6
      ? `${tokenId.slice(0, 3)}..${tokenId.slice(-2)}`
      : tokenId;

  return ready ? (
    <Wrapper>
      <SingleCard>
        <TopImageContainer onClick={() => handleOpenModal(allData)}>
          <NFTImage alt="An NFT" src={checkIfIPFSUrl(imageUrl)}></NFTImage>
        </TopImageContainer>
        <InfoBox>
          <DateLine>{getTXDate(txData)}</DateLine>
          <TXData>
            {txData && getTXType(txData)} #{shortenTokenId(showToken)}{" "}
            <MoreText>
              {txData &&
                txData.groupedTokenIds.length > 1 &&
                `+${txData.groupedTokenIds.length - 1} others`}
            </MoreText>
          </TXData>
        </InfoBox>
      </SingleCard>
    </Wrapper>
  ) : null;
};

export default FrontCard;