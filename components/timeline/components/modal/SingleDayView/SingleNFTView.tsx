/** @format */

import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useNFTimelineProvider from "providers/NFTimelineProvider";
import { VerifiedContractData } from "providers/NFTimelineProvider/types/verifiedContractsTypes";

import {
  NFTMedia,
  NFTMetaDataType,
  SingleNFTDataType,
  shortenWalletAddress,
  buildNetworkScanLink,
  zeroAddress,
  checkIfIPFSUrl,
} from "e-labs_web3provider";
import SingleNFTViewIcons from "./Icons";
import SingleDayViewBadges from "./Badges";
import getMediaFormat from "helpers/media/getMediaFormat";
import { device } from "constants/media";

const Container = styled.div`
  width: 60%;
  height: 100%;

  display: block;
  background-color: white;
  padding: 10px;
  @media ${device.laptop} {
    width: 100%;
  }
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
  @media ${device.laptop} {
    flex-direction: column;
    overflow: hidden;
    align-items: center;
    justify-content: center;
  }
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
  width: 100%;
  min-height: 50px;
  max-height: 125px;
  overflow-y: scroll;
  overflow-x: scroll;
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
              : direction === "left"
              ? transactionData.from
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
          videoControls
          autoPlayVideo
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
            chain={transactionData.chain}
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
