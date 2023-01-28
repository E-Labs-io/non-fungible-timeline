/** @format */

import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";
import shortenTokenId from "helpers/shorternTokenId";
import zeroAddress from "hooks/web3/utils/zeroAddress";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { VerifiedContractData } from "hooks/NFTimelineProvider/types/verifiedContractsTypes";

import NFTMedia from "hooks/web3/components/NFTMedia";
import SingleNFTViewIcons from "./Icons";
import SingleDayViewBadges from "./Badges";

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: block;
  background-color: white;
  padding: 10px;
`;

const CloseView = styled.div`
  width: 100%;
  height: 50px;
`;

const ViewArea = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 10px;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  text-align: left;
`;

const InformationTextLarge = styled.div`
  font-size: 30px;
`;
const InformationTextMedium = styled.div`
  font-size: 1rem;
`;
const InformationDescription = styled.div`
  padding: 5px;
  width: 500px;
  min-height: 50px;
  max-height: 125px;
  overflow-y: scroll;
  overflow-wrap: break-word;
  border-color: black;
  border-style: none;
  border-radius: 10px;
  border-width: 1px;
`;

const Text = styled.p`
  font-size: 20px;
`;
const InlineLine = styled.a`
  :hover {
    color: #00a6ff;
  }
`;

interface SingleNFTViewProps {
  NFTData: SingleNFTDataType;
  metadata: NFTMetaDataType;
  transactionData: sortedHistoryData;
  direction: "left" | "right";
  closeView: Function;
}
const SingleNFTView = ({
  NFTData,
  metadata,
  transactionData,
  closeView,
  direction,
}: SingleNFTViewProps) => {
  const { checkIfValidContract, verifiedContractList } =
    useNFTimelineProvider();
  const [verified, setVerified] = useState(undefined);
  const [verifiedData, setVerifiedData] = useState<VerifiedContractData>();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [mediaFormat, setMediaFormat] = useState("image");
  const [imageUrl, setImageUrl] = useState<string>(null);

  const figureMethod = () => {
    let method;
    let joiner;
    if (direction === "left") {
      //inbound
      if (transactionData.from === zeroAddress()) {
        method = "Minted";
        joiner = " from ";
      } else if (transactionData.from !== zeroAddress()) {
        method = `Transfer`;
        joiner = " from ";
      }
    } else {
      if (transactionData.to === zeroAddress()) {
        method = "Burned";
        joiner = " a ";
      } else if (transactionData.to !== zeroAddress()) {
        method = `Transferred`;
        joiner = " to ";
      }
    }
    return (
      <Text>
        <InlineLine
          href={buildNetworkScanLink({
            network: "eth",
            txHash: transactionData.hash,
          })}
          target={"blank"}
        >
          {method}
        </InlineLine>{" "}
        {joiner}
        <InlineLine
          href={buildNetworkScanLink(
            method === "Minted" || method === "Burned"
              ? {
                  network: "eth",
                  address: transactionData.contractAddress,
                }
              : {
                  network: "eth",
                  address:
                    joiner === " from "
                      ? transactionData.from
                      : transactionData.to,
                }
          )}
          target={"blank"}
        >
          {shortenWalletAddress(
            method === "Minted" || method === "Burned"
              ? transactionData.contractAddress
              : transactionData.to
          )}
        </InlineLine>
      </Text>
    );
  };

  useEffect(() => {
    if (!!!imageUrl && imageLoading && metadata.image) {
      const urlParsed = checkIfIPFSUrl(metadata.image);
      setImageUrl(urlParsed);
      const format = getMediaFormat(urlParsed);
      setMediaFormat(format);
    }
    if (metadata && imageUrl && checkIfIPFSUrl(metadata.image) !== imageUrl) {
      setImageLoading(true);
      const urlParsed = checkIfIPFSUrl(metadata.image);
      setImageUrl(urlParsed);
      const format = getMediaFormat(urlParsed);
      setMediaFormat(format);
    }
    if (!!!verified && verifiedContractList && !loading) {
      setLoading(true);
      let isValied = checkIfValidContract(transactionData.contractAddress);
      if (isValied !== false) {
        setVerified(true);
        setVerifiedData(isValied);
      } else {
        setVerified(false);
        setVerifiedData(undefined);
      }
    }
  });

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

  return (
    <Container>
      <CloseView onClick={closeView}>Back</CloseView>
      <ViewArea>
        <NFTMedia
          mediaUrl={metadata.image}
          width="296px"
          height="296px"
          colorA="#41bdff"
          colorB="#f448ee"
          color="white"
          index="SingleNFTShow"
        />

        <InformationContainer>
          <InformationTextLarge>{metadata.name}</InformationTextLarge>
          {verified && (
            <InformationTextMedium>{verifiedData?.name}</InformationTextMedium>
          )}
          <SingleDayViewBadges
            NFTData={NFTData}
            verified={verified}
            mediaFormat={mediaFormat}
          />
          <InformationDescription>
            {metadata.description}
          </InformationDescription>
          <br />
          <InformationTextMedium>{figureMethod()}</InformationTextMedium>
          <SingleNFTViewIcons
            transactionData={transactionData}
            NFTData={NFTData}
          />
        </InformationContainer>
      </ViewArea>
    </Container>
  );
};
export default SingleNFTView;
