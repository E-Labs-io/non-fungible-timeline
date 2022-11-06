/** @format */
import React, { ReactElement, useEffect, useMemo, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import Image from "next/image";

import { device, tablet } from "config/media";
import placeHolder from "../assets/placeHolder.jpeg";

import { ExtraStyleProps } from "types/genericTypes";
import { AlchemyGetSingleNFT } from "../api/alchemyGetters";
import { NFTMetaDataType, SingleNFTDataType } from "../types/nftTypes";
import useWindowSize from "hooks/window/useWindowSize";
import { checkIfIPFSUrl } from "../helpers/isIPFS";

const moveGradient = keyframes`
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
  }
`;

const flashyBackgroundCSS = css`
  ::before,
  ::after {
    content: "";
    border-radius: 8px;
    position: absolute;
    top: -4px;
    left: -4px;
    background: linear-gradient(
      45deg,
      red,
      blue,
      green,
      yellow,
      #e11d74,
      black,
      #ffff00,
      #aa0000
    );
    background-size: 400%;
    width: calc(100% + 8px);
    height: calc(100% + 8px);

    animation: ${moveGradient} 25s linear infinite;
  }

  ::after {
    filter: blur(25px);
  }
`;

const CardContainer = styled.div`
  position: relative;
  width: ${({ width }) => width || "280px"};
  height: ${({ height }) => height || "345px"};
  align-items: center;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};

  ${({ withFlashyBackground }) =>
    withFlashyBackground ? flashyBackgroundCSS : "overflow: hidden;"};

  @media ${device.tablet} {
    width: ${({ width }) => width || "calc(30vw - 20px)"};
    height: ${({ height }) => height || "calc(40vw - 20px)"};
  }
`;

const CardWrapper = styled.div<ExtraStyleProps>`
  width: 100%;
  height: 100%;

  cursor: ${({ cursor }) => cursor || "default"};
  position: relative;
  border-radius: ${({ borderRadius }) => borderRadius || "8px"};
  padding: ${({ padding }) => padding || "10px"};
  border: ${({ color, theme }) =>
    color ? `4px solid ${color}` : `4px solid ${theme.primaryDark}`};
  background: ${({ theme, backgroundColor }) =>
    backgroundColor
      ? backgroundColor
      : theme
      ? theme.primaryLight
      : "transparent"};
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: bold;
  font-size: ${({ fontSize }) => fontSize || "26px"};
  color: ${({ color, theme }) => color || theme.primaryDark};
  overflow: hidden;
  padding: ${({ padding }) => (padding ? padding : "0")};

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
  z-index: 1;
`;

const ImageContainer = styled.div<ExtraStyleProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;
const CardImage = styled(Image)`
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

const NFTTitle = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: 2px 5px 5px 5px;
  color: ${({ color, theme }) => color || theme.primaryDark};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NFTInfoText = styled.div`
  font-weight: 400;

  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ color, theme }) => color || theme.primaryDark};
  padding: 2px 5px 5px 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NFTInfoContainer = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.small};
  background: ${({ theme }) => theme.primaryLight};
  align-items: center;
  justify-content: center;
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const TwoColumnInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

interface INFTCard {
  contractAddress?: string;
  tokenId?: string;
  NFTRawData?: SingleNFTDataType;
  network?: any;
  cursor?: string;
  showMeta?: boolean;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
  disabled?: boolean;
  type?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  children?: ReactElement[] | ReactElement | string;
  web3Api?: any;
  withFlashyBackground?: boolean;
}

function NFTCard({
  contractAddress,
  tokenId,
  NFTRawData,
  network,
  showMeta,
  color,
  backgroundColor,
  padding,
  cursor,
  fontSize,
  borderRadius,
  width,
  height,
  onClick,
  children,
  web3Api,
  withFlashyBackground = false,
}: INFTCard) {
  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [ready, setReady] = useState(false);
  const { width: windowWidth } = useWindowSize();

  useEffect(() => {
    if (NFTRawData && NFTData !== NFTRawData)
      Array.isArray(NFTRawData)
        ? setNFTData(NFTRawData[0])
        : setNFTData(NFTRawData);
  }, [NFTRawData]);

  useEffect(() => {
    if (!ready) {
      if (NFTRawData) {
        Array.isArray(NFTRawData)
          ? setNFTData(NFTRawData[0])
          : setNFTData(NFTRawData);
        if (!NFTRawData?.metadata) {
          AlchemyGetSingleNFT(
            Array.isArray(NFTRawData)
              ? NFTRawData[0].token_address
              : NFTRawData.token_address,
            Array.isArray(NFTRawData)
              ? NFTRawData[0].token_id
              : NFTRawData.token_id,
            web3Api
          ).then((tokenInfo) => {
            if (tokenInfo?.metadata) {
              const meta = tokenInfo.metadata;
              setMetadata(meta);
            }
          });
        } else setMetadata(NFTRawData?.metadata);
        setReady(true);
      } else if (contractAddress && tokenId) {
        AlchemyGetSingleNFT(contractAddress, tokenId, web3Api).then(
          (tokenInfo) => {
            setNFTData(tokenInfo[0]);
            if (tokenInfo?.metadata) {
              const meta = tokenInfo.metadata;
              setMetadata(meta);
            }
            setReady(true);
          }
        );
      }
    }
  }, [NFTRawData, contractAddress, tokenId]);

  const getNFTWidth = useMemo(() => {
    if (windowWidth < tablet) {
      return `${windowWidth * 0.3 - 10}px`;
    }
    return "280px";
  }, [windowWidth]);

  if (ready) {
    return (
      <CardContainer
        withFlashyBackground={withFlashyBackground}
        height={height}
        width={width}
        cursor={cursor}
      >
        <CardWrapper
          color={color}
          backgroundColor={backgroundColor}
          padding={padding}
          fontSize={fontSize}
          borderRadius={borderRadius}
          onClick={onClick}
          disabled={true}
          cursor={cursor}
        >
          <ImageContainer borderRadius={borderRadius} cursor={cursor}>
            <CardImage
              src={
                (metadata?.image && checkIfIPFSUrl(metadata.image)) ||
                placeHolder
              }
              width={getNFTWidth}
              height={getNFTWidth}
              unoptimized
              cursor={cursor}
            />
          </ImageContainer>
          <NFTInfoContainer>
            <NFTTitle>{metadata?.name || NFTData?.project_name}</NFTTitle>
            <TwoColumnInfo>
              <NFTInfoText>Token ID: </NFTInfoText>
              <NFTInfoText>{NFTData?.token_id}</NFTInfoText>
            </TwoColumnInfo>
          </NFTInfoContainer>
        </CardWrapper>
      </CardContainer>
    );
  } else {
    return null;
  }
}

export default NFTCard;

//  width={({ width }) => width - width / 10 || "270px"}
