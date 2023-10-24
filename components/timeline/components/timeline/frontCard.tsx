/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  sortedHistoryData,
  TokenIds,
} from "../../../../helpers/dataSorting/sortUsersHistory";
import useWindowSize from "hooks/window/useWindowSize";
import { zeroAddress } from "e-labs_web3provider";
import { checkIfIPFSUrl } from "e-labs_web3provider";
import { sortedHashData } from "helpers/dataSorting/compileHistoryIntoDays";
import { dailyHistory } from "./TimeLine";
import shortenTokenId from "helpers/shorternTokenId";
import useNFTimelineProvider from "providers/NFTimelineProvider";
import { NFTMedia } from "e-labs_web3provider";
import { device, mobileL, mobileM, mobileS } from "constants/media";

const Wrapper = styled.div`
  width: 205px;
  @media ${device.mobileL} {
    width: 160px;
  }
  @media ${device.mobileS} {
    width: 105px;
  }
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  align-items: center;
  justify-content: center;
  display: flex;
  box-shadow: 0px 0px 20px 5px rgba(207, 207, 207, 0.682);
  overflow: hidden;

  padding: 2px;
  :hover {
    scale: 1.05;
    cursor: pointer;
  }
`;
//////  CARD BUILD
const SingleCard = styled.div`
  width: 200px;
  @media ${device.mobileL} {
    width: 150px;
  }
  @media ${device.mobileS} {
    width: 100px;
  }

  background-color: #86848447;

  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;
  column-gap: 5px;

  border-radius: 20px;
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
  @media ${device.mobileL} {
    width: 150px;
    height: 45px;
  }
  @media ${device.mobileS} {
    width: 100px;
    height: 40px;
  }

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
  font-size: small;
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

interface FrontCardProps {
  transactionDataBase: sortedHashData;
  date: string;
  handleOpenModal: Function;
  index: number;
  txHashes: string[];
  allData: dailyHistory;
}
const FrontCard = ({
  transactionDataBase,
  date,
  txHashes,
  index,
  handleOpenModal,
  allData,
}: FrontCardProps) => {
  const { getTokenMetadata } = useNFTimelineProvider();
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { width, height } = useWindowSize();

  const [txData, setTxData] = useState<any>();

  const [imageUrl, setImageUrl] = useState<string>(null);

  const { width: windowWidth } = useWindowSize();

  const [showToken, setShowToken] = useState<TokenIds>();

  const network = "mainnet";

  useEffect(() => {
    if (!ready && !loading) {
      if (!!transactionDataBase) {
        setLoading(true);
        let format;
        const toShow: sortedHistoryData = transactionDataBase[txHashes[0]][0];
        setTxData(toShow);
        setShowToken(toShow.groupedTokenIds[0]);
        getTokenMetadata(
          toShow.contractAddress,
          toShow.groupedTokenIds[0].hex,
          toShow.chain
        )
          .then((nft) => {
            if (!!nft.metadata.image) {
              const urlParsed = checkIfIPFSUrl(nft.metadata.image);
              setImageUrl(urlParsed);
            } else {
              console.log("DIDN'T GET METADATA");
            }
            setReady(true);
            setLoading(false);
          })
          .catch((error) => console.log("Error getting token data: ", error));
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

  const getImageSizing = (width: number, option: "width" | "height") => {
    if (width > mobileL) {
      if (option === "width") return "190px";
      else if (option === "height") return "200px";
    } else if (width < mobileM) {
      if (option === "width") return "100px";
      else if (option === "height") return "100px";
    } else {
      if (option === "width") return "150px";
      else if (option === "height") return "150px";
    }
  };

  return ready ? (
    <Wrapper>
      <SingleCard onClick={() => handleOpenModal(allData)}>
        <TopImageContainer>
          <NFTMedia
            mediaUrl={imageUrl}
            width={getImageSizing(width, "width")}
            height={getImageSizing(width, "height")}
            colorA="#41bdff"
            colorB="#f448ee"
            color="white"
            index={`frontCard-${index}`}
            borderRadius="10px 10px 0 0"
          />
        </TopImageContainer>
        <InfoBox>
          <DateLine>{getTXDate(txData)}</DateLine>
          {width > mobileS && (
            <TXData>
              {txData && getTXType(txData)} #
              {shortenTokenId(BigInt(parseInt(showToken.hex, 16)).toString())}
              <MoreText>
                {(txData && txData.groupedTokenIds.length > 1) ||
                  (txHashes.length > 1 && ` + others`)}
              </MoreText>
            </TXData>
          )}
        </InfoBox>
      </SingleCard>
    </Wrapper>
  ) : null;
};

export default FrontCard;
