/** @format */

import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";
import shortenTokenId from "helpers/shorternTokenId";
import zeroAddress from "hooks/web3/utils/zeroAddress";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import { checkIfIPFSUrl } from "hooks/web3/helpers/isIPFS";
import buildOpenSeaLink from "hooks/web3/helpers/openseaLink";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import handleClickOpenURLInNewTab from "hooks/window/openLinkInNewTab";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { VerifiedContractData } from "hooks/NFTimelineProvider/types/verifiedContractsTypes";

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

const ImageContainer = styled.div`
  border-radius: 10px;
  background-color: #ff00f2d8;
  border-width: 2px;
  border-style: solid;

  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.682);

  width: 300px;
  height: 300px;

  display: flex;
  align-items: left;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;

const TokenImage = styled.img`
  border-radius: 10px;
  width: 296px;
  height: 296px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  text-align: left;
`;

const BadgeArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  padding: 5px;
`;

const InfoBadge = styled.div`
  border-radius: 10px;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  padding: 5px;
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

const IconContainer = styled.div`
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100%;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  box-shadow: 0px 0px 42px 2px rgba(112, 110, 110, 0.682);
  :hover {
    cursor: pointer;
    scale: 1.1;
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
  //console.log(NFTData, metadata, transactionData);
  const {
    checkIfValidContract,
    verifiedContractList,
    getVerifiedContractData,
  } = useNFTimelineProvider();
  const [verified, setVerified] = useState(undefined);
  const [verifiedData, setVerifiedData] = useState<VerifiedContractData>();
  const [loading, setLoading] = useState(false);

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
        <ImageContainer>
          <TokenImage src={checkIfIPFSUrl(metadata.image)} />
        </ImageContainer>
        <InformationContainer>
          <InformationTextLarge>{metadata.name}</InformationTextLarge>
          {verified && (
            <InformationTextMedium>{verifiedData?.name}</InformationTextMedium>
          )}
          <BadgeArea>
            <InfoBadge># {shortenTokenId(NFTData.token_id)}</InfoBadge>
            <InfoBadge>{NFTData.contract_type}</InfoBadge>
            <InfoBadge>Ethereum</InfoBadge>
            {verified && <InfoBadge>Verified</InfoBadge>}
          </BadgeArea>

          <InformationDescription>
            {metadata.description}
          </InformationDescription>
          <br />
          <InformationTextMedium>{figureMethod()}</InformationTextMedium>
          <IconContainer>
            <Icon
              src="/images/opensea-icon.png"
              onClick={() =>
                handleClickOpenURLInNewTab(
                  buildOpenSeaLink({
                    address: transactionData.contractAddress,
                    tokenId: NFTData.token_id,
                  })
                )
              }
            />
            <Icon
              src="/images/etherscan-logo-circle.png"
              onClick={() =>
                handleClickOpenURLInNewTab(
                  buildNetworkScanLink({
                    network: "eth",
                    address: transactionData.contractAddress,
                    tokenId: Number(NFTData.token_id),
                  })
                )
              }
            />
          </IconContainer>
        </InformationContainer>
      </ViewArea>
    </Container>
  );
};
export default SingleNFTView;
