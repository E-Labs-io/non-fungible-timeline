/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { AlchemyGetSingleNFT } from "hooks/web3/api/alchemyGetters";
import zeroAddress from "hooks/web3/data/zeroAddress";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import { sortedHistoryData, TokenIds } from "helpers/data/sortUsersHistory";
import getIPFSFormat from "helpers/getIPFSFormat";
import shortenTokenId from "helpers/shorternTokenId";

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
  width: 200px;
  height: 190px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;
const NFTVideo = styled.video`
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
  transactionData,
  handleSelectedNFT,
}: SmallNFTCardProps) {
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [mediaFormat, setMediaFormat] = useState("image");
  const [imageUrl, setImageUrl] = useState<string>(
    "/images/placeholder-image.png"
  );

  useEffect(() => {
    if (!ready && !loading) {
      if (!!contractAddress) {
        setLoading(true);

        AlchemyGetSingleNFT(contractAddress, tokenId.hex).then((nft) => {
          setNFTData(nft);
          setMetadata(nft.metadata);
          if (!!nft.metadata.image) {
            //setImageUrl(nft.metadata.image);
            const urlParsed = checkIfIPFSUrl(nft.metadata.image);
            setImageUrl(urlParsed);
            setMediaFormat("image");
            setReady(true);
            setLoading(false);
            /*  if (isIPFS) {
                const isIPFS = urlParsed.includes("ipfs.io/ipfs/") ? true : false;
              getIPFSFormat(urlParsed).then(({ objectUrl, mediaType }) => {
                setImageUrl(mediaFormat);
                setMediaFormat(mediaType);
              });
            } else {
              getMediaFormat(urlParsed);
              setImageUrl(urlParsed);
              setReady(true);
              setLoading(false);
            } */
          } else {
            setMediaFormat("image");
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

  const getMediaFormat = (theURL) => {
    const extension = theURL.split(".").pop();
    if (
      extension === "jpg" ||
      extension === "jpeg" ||
      extension === "png" ||
      extension === "gif"
    ) {
      setMediaFormat("image");
    } else if (extension === "mp4") {
      setMediaFormat("video");
    } else if (extension === "wav" || extension === "mp3") {
      setMediaFormat("audio");
    }
  };
  return ready ? (
    <SingleCard
      onClick={() => handleSelectedNFT(NFTData, metadata, transactionData)}
    >
      <TopImageContainer onClick={() => {}}>
        {mediaFormat && mediaFormat === "image" ? (
          <NFTImage alt="The NFT" src={imageUrl} />
        ) : mediaFormat === "video" ? (
          <NFTVideo alt="The NFT" src={imageUrl} />
        ) : null}
      </TopImageContainer>
      <InfoBox>
        <DateLine>{getTXDate(transactionData)}</DateLine>
        <TXData>
          {transactionData && getTXType(transactionData)} #
          {transactionData.category === "erc721"
            ? shortenTokenId(tokenId.tokenId)
            : shortenTokenId(BigInt(parseInt(tokenId.hex, 16)).toString())}{" "}
        </TXData>
      </InfoBox>
    </SingleCard>
  ) : null;
}

export default SmallNFTCard;

// <NFTImage alt="An NFT" src={checkIfIPFSUrl(imageUrl)}></NFTImage>
