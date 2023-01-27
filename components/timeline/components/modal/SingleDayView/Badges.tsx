/** @format */

import React from "react";
import styled from "styled-components";
import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import shortenTokenId from "helpers/shorternTokenId";

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

interface SingleDayViewBadgesProps {
  mediaFormat: string;
  verified: boolean;
  NFTData: SingleNFTDataType;
}

function SingleDayViewBadges({
  mediaFormat,
  NFTData,
  verified,
}: SingleDayViewBadgesProps) {
  return (
    <BadgeArea>
      <InfoBadge># {shortenTokenId(NFTData.token_id)}</InfoBadge>
      <InfoBadge>{mediaFormat}</InfoBadge>
      <InfoBadge>{NFTData.contract_type}</InfoBadge>
      <InfoBadge>Ethereum</InfoBadge>
      {verified && <InfoBadge>Verified</InfoBadge>}
    </BadgeArea>
  );
}

export default SingleDayViewBadges;
