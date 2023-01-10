/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { AlchemyGetSingleNFT } from "hooks/web3/api/alchemyGetters";
import zeroAddress from "hooks/web3/data/zeroAddress";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import { sortedHistoryData } from "helpers/data/sortUsersHistory";

//////  CARD BUILD
const SingleCard = styled.div`
  width: 200px;
  height: 240px;
  padding: 5px;
  background-color: #84868646;

  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;
  column-gap: 5px;

  border-radius: 10px;
  border-color: black;
  border-style: none;
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

  width: 200px;
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
  width: 200px;
  height: 190px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

interface SmallNFTCardProps {
  contractAddress: string;
  tokenId: string;
  transactionData: sortedHistoryData;
}

function SmallNFTCard({
  contractAddress,
  tokenId,
  transactionData,
}: SmallNFTCardProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [imageUrl, setImageUrl] = useState<string>(
    "/images/placeholder-image.png"
  );

  useEffect(() => {
    if (!ready && !loading) {
      if (!!contractAddress) {
        setLoading(true);

        AlchemyGetSingleNFT(contractAddress, tokenId).then((nft) => {
          setNFTData(nft);
          setMetadata(nft.metadata);
          if (!!nft.metadata.image) {
            console.log("Got metadata: ", nft.metadata);
            setImageUrl(nft.metadata.image);
          }
          setReady(true);
          setLoading(false);
        });
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
    <SingleCard>
      <TopImageContainer onClick={() => {}}>
        <NFTImage alt="An NFT" src={checkIfIPFSUrl(imageUrl)}></NFTImage>
      </TopImageContainer>
      <InfoBox>
        <DateLine>{getTXDate(transactionData)}</DateLine>
        <TXData>
          {transactionData && getTXType(transactionData)} #
          {shortenTokenId(tokenId)}{" "}
        </TXData>
      </InfoBox>
    </SingleCard>
  ) : null;
}

export default SmallNFTCard;
