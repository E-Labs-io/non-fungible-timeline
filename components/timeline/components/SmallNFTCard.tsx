/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import zeroAddress from "hooks/web3/utils/zeroAddress";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import {
  sortedHistoryData,
  TokenIds,
} from "helpers/dataSorting/sortUsersHistory";
import shortenTokenId from "helpers/shorternTokenId";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import NFTMedia from "components/common/NFTMedia";

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

  box-shadow: 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
`;

const InfoBox = styled.div`
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;

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

interface SmallNFTCardProps {
  contractAddress: string;
  index: string;
  tokenId: TokenIds;
  transactionData: sortedHistoryData;
  handleSelectedNFT: (
    NFTData: SingleNFTDataType,
    metadata: NFTMetaDataType,
    transactionData: sortedHistoryData
  ) => void;
}

function SmallNFTCard({
  contractAddress,
  tokenId,
  index,
  transactionData,
  handleSelectedNFT,
}: SmallNFTCardProps) {
  const { getTokenMetadata } = useNFTimelineProvider();
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [imageUrl, setImageUrl] = useState<string>(null);

  useEffect(() => {
    if (!ready && !loading) {
      if (!!contractAddress) {
        setLoading(true);
        getTokenMetadata("eth", contractAddress, tokenId.hex).then((nft) => {
          setNFTData(nft);
          setMetadata(nft.metadata);
          if (!!nft.metadata.image) {
            const urlParsed = checkIfIPFSUrl(nft.metadata.image);
            setImageUrl(urlParsed);
            setReady(true);
            setLoading(false);
          } else {
            setReady(true);
            setLoading(false);
          }
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

  return ready ? (
    <SingleCard
      onClick={() => handleSelectedNFT(NFTData, metadata, transactionData)}
    >
      <NFTMedia
        mediaUrl={imageUrl}
        width="200px"
        height="190px"
        colorA="#41bdff"
        colorB="#f448ee"
        color="white"
        index={`smallNFTCard-${index}`}
        borderRadius="10px 10px 0 0"
      />
      <InfoBox>
        <DateLine>{getTXDate(transactionData)}</DateLine>
        <TXData>
          {transactionData && getTXType(transactionData)} #
          {shortenTokenId(BigInt(parseInt(tokenId.hex, 16)).toString())}
        </TXData>
      </InfoBox>
    </SingleCard>
  ) : null;
}

export default SmallNFTCard;

// <NFTImage alt="An NFT" src={checkIfIPFSUrl(imageUrl)}></NFTImage>
