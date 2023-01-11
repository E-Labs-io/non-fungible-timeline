/** @format */
import React, { ReactElement, useState, useMemo, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import NFTCard from "hooks/web3/components/NFTCard";
import NFTModalExtention from "./NFTModalExtention";
import { ExtraStyleProps } from "types/genericTypes";
import { AlchemyGetSingleNFT } from "../api/alchemyGetters";
import { web3API } from "../userWeb3Provider";
import { SingleNFTDataType } from "../types/nftTypes";

const ModalContainter = styled.div<ExtraStyleProps>`
  align-items: center;
  justify-content: center;
  position: relative;
  margin: auto;
  padding: 40px;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  row-gap: 20px;
`;
interface NFTModalInterface {
  nftData?: SingleNFTDataType;
  width?: string;
  network?: any;
  address?: string;
  tokenId?: string;
  children?: ReactElement[] | ReactElement | string;
  modalExtension?: boolean;
}

function NFTModal({
  nftData,
  width,
  network,
  children,
  modalExtension,
  address,
  tokenId,
}: NFTModalInterface) {
  const theme = useTheme();
  const [NFTData, setNFTData] = useState<any>();
  const [metadata, setMetadata] = useState<any>();
  const [ready, setReady] = useState(false);

  if (!ready) {
    if (address && tokenId) {
      console.log("NFTModal: got Address & Totken ID");
      AlchemyGetSingleNFT(address, tokenId, null, web3API).then((tokenInfo) => {
        setNFTData(tokenInfo);
        if (tokenInfo?.metadata) {
          const meta = tokenInfo?.metadata;
          setMetadata(meta);
        }
        setReady(true);
      });
    }
    if (nftData && !ready) {
      console.log("NFTModal: got nftData");

      setNFTData(nftData);
      if (nftData?.metadata) {
        const meta = nftData?.metadata;
        setMetadata(meta);
      }
      setReady(true);
    }
  }

  if (ready)
    return (
      <ModalContainter width={width}>
        <CardContainer>
          <NFTCard NFTRawData={NFTData} />
          {/* {modalExtension && (
            <NFTModalExtention nftData={NFTData} meta={metadata} />
          )} */}
          {children}
        </CardContainer>
      </ModalContainter>
    );
  if (!ready) return null;
}

export default NFTModal;
