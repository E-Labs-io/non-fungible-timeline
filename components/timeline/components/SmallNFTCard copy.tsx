/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { AlchemyGetSingleNFT } from "hooks/web3/api/alchemyGetters";
import zeroAddress from "hooks/web3/utils/zeroAddress";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import {
  sortedHistoryData,
  TokenIds,
} from "helpers/dataSorting/sortUsersHistory";
import getIPFSFormat from "helpers/getIPFSFormat";
import shortenTokenId from "helpers/shorternTokenId";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import StateSkeleton from "components/common/SkeletonLoader";

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

const TopImageContainer = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;
  background: solid;
  background-color: transparent;
  display: flex;
  align-items: left;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;

const NFTImage = styled.img`
  background: solid;
  background-color: transparent;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  width: 200px;
  height: 190px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "pointer"};
  align-items: center;
  justify-content: center;
`;
const NFTVideo = styled.video`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: white;
  width: 200px;
  height: 190px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
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

  const [loaded, setLoaded] = useState<boolean>(false);
  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [mediaFormat, setMediaFormat] = useState("image");
  const [imageUrl, setImageUrl] = useState<string>(null);
  const [loadError, setLoadError] = useState<boolean>(false);

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
            const format = getMediaFormat(urlParsed);
            setMediaFormat(format);
            setReady(true);
            setLoading(false);
          } else {
            setMediaFormat("image");
            setReady(true);
            setLoading(false);
          }
        });
      }
    }
    if (mediaFormat === "video" && ready) {
      var vid = document.getElementById(`smallNFTCardVideo-${index}`);
      vid.onloadeddata = function () {
        handelOnLoad(null);
      };
      vid.onerror = () => {
        handelMediaError(null);
      };
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

  const getMediaFormat = (theURL) => {
    const extension = theURL.split(".").pop();
    if (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    ) {
      return "image";
    } else if (extension === "mp4") {
      return "video";
    } else if (extension === "wav" || extension === "mp3") {
      return "audio";
    } else return "image";
  };

  const handelOnLoad = (e) => {
    setLoaded(true);
  };
  const handelMediaError = (e) => {
    console.log("Media Load Error: ", e);
    setLoadError(true);
  };

  return ready ? (
    <SingleCard
      onClick={() => handleSelectedNFT(NFTData, metadata, transactionData)}
    >
      <TopImageContainer onClick={() => {}}>
        {(!!!imageUrl || loadError) && (
          <StateSkeleton
            width="200px"
            height="190px"
            message="Image Not Available"
            colorA="#41bdff"
            colorB="#f448ee"
          />
        )}
        {!loaded && !loadError && (
          <StateSkeleton
            width="200px"
            height="190px"
            message="Loading Media"
            colorA="#41bdff"
            colorB="#f448ee"
          />
        )}
        {mediaFormat && mediaFormat === "image" && (
          <NFTImage
            id={`smallNFTCardVideo-${index}`}
            alt="The NFT Image"
            crossorigin="anonymous"
            src={imageUrl}
            onLoad={handelOnLoad}
            onerror={handelMediaError}
          />
        )}

        {mediaFormat && mediaFormat === "video" && (
          <NFTVideo
            id={`smallNFTCardVideo-${index}`}
            alt="The NFT Video"
            crossorigin="anonymous"
            src={imageUrl}
            onerror={handelMediaError}
          />
        )}
      </TopImageContainer>
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
