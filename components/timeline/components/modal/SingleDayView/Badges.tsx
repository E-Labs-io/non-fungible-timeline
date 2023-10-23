/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SingleNFTDataType } from "e-labs_web3provider";
import shortenTokenId from "helpers/shorternTokenId";
import { device } from "constants/media";
import { NetworkKeys } from "e-labs_web3provider";

const BadgeArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  column-gap: 15px;
  padding: 5px;
  @media ${device.laptop} {
    display: grid;
    grid-template-columns: 1fr 1fr;

    padding: 2px;
    column-gap: 5px;
    row-gap: 5px;
  }
`;

const InfoBadge = styled.div`
  flex-direction: row;
  display: flex;
  border-radius: 10px;
  border-color: black;
  border-width: 2px;
  border-style: solid;
  padding: 5px;
  @media ${device.laptop} {
    font-size: 0.8rem;
    text-align: center;
  }
`;

interface SingleDayViewBadgesProps {
  mediaFormat: string;
  verified: boolean;
  NFTData: SingleNFTDataType;
  chain: NetworkKeys;
}

function SingleDayViewBadges({
  mediaFormat,
  NFTData,
  verified,
  chain,
}: SingleDayViewBadgesProps) {
  const [chainLabel, setChainLabel] = useState<string>();

  useEffect(() => {
    if (!chainLabel) {
      if (chain === "ETH_MAINNET") setChainLabel("Ethereum");
      if (chain === "OPT_MAINNET") setChainLabel("Optimism");
      if (chain === "MATIC_MAINNET") setChainLabel("Polygon");
      if (chain === "ARB_MAINNET") setChainLabel("Arbitrim");
      console.log(chainLabel);
    }
  });

  return (
    <BadgeArea>
      <InfoBadge># {shortenTokenId(NFTData.token_id)}</InfoBadge>
      <InfoBadge>{mediaFormat}</InfoBadge>
      <InfoBadge>{NFTData.contract_type}</InfoBadge>
      <InfoBadge>{chainLabel}</InfoBadge>
      {verified && <InfoBadge>Verified</InfoBadge>}
    </BadgeArea>
  );
}

export default SingleDayViewBadges;
