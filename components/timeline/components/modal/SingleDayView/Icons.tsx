/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGears, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import { Tooltip } from "react-tooltip";
import handleClickOpenURLInNewTab from "hooks/window/openLinkInNewTab";
import buildOpenSeaLink from "hooks/web3/helpers/openseaLink";
import { sortedHistoryData } from "helpers/dataSorting/sortUsersHistory";
import { SingleNFTDataType } from "hooks/web3/types/nftTypes";

const IconContainer = styled.div`
  justify-content: space-around;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const IconFrame = styled.div`
  height: 50px;
  width: 50px;
  overflow: hidden;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 100%;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  box-shadow: 0px 0px 42px 2px rgba(112, 110, 110, 0.396);
  :hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

const Icon = styled.img`
  height: 50px;
  width: 50px;
`;

export interface SingleNFTViewIconsProps {
  transactionData: sortedHistoryData;
  NFTData: SingleNFTDataType;
}

function SingleNFTViewIcons({
  transactionData,
  NFTData,
}: SingleNFTViewIconsProps) {
  return (
    <IconContainer>
      <IconFrame>
        <Icon
          id="openseaButton"
          data-tooltip-content="View token on opensea"
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
      </IconFrame>
      <IconFrame>
        <Icon
          id="etherscanButton"
          data-tooltip-content="View token on etherscan"
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
      </IconFrame>
      <IconFrame
        id="metadataButton"
        data-tooltip-content="View raw metadata"
        onClick={() => handleClickOpenURLInNewTab(NFTData.token_uri)}
      >
        <FontAwesomeIcon size="2x" icon={faGears} />{" "}
      </IconFrame>
      <Tooltip anchorId="metadataButton" />
      <Tooltip anchorId="etherscanButton" />
      <Tooltip anchorId="openseaButton" />
    </IconContainer>
  );
}

export default SingleNFTViewIcons;
