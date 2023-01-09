/** @format */
import { Button } from "../../../../common";
import { buildNetworkScanLink } from "../../../../../hooks/web3/helpers/etherscanLink";
import handleClickOpenURLInNewTab from "../../../../../hooks/window/openLinkInNewTab";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";
import { BlockCounter } from "../../../../../helpers/data/sortUsersHistory";
import TransactionBox from "../../TransactionBox";
import { BigNumber, ethers } from "ethers";
import useWindowSize from "hooks/window/useWindowSize";
import { NFTMetaDataType, SingleNFTDataType } from "hooks/web3/types/nftTypes";
import { AlchemyGetSingleNFT } from "hooks/web3/api/alchemyGetters";
import { APIKeys, web3API } from "hooks/web3/userWeb3Provider";
import { fromBigNumber } from "hooks/web3/utils/ethersUtilities";
import zeroAddress from "hooks/web3/data/zeroAddress";

const Wrapper = styled.div`
  width: 210px;
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: solid;
  border-color: white;
  padding: 5px;
  box-shadow: 17px 33px 53px 4px rgba(0, 0, 0, 0.27);
  overflow: hidden;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

const BlockData = styled.div`
  text-align: right;
`;

const Title = styled.h3``;

const Text = styled.p``;
const Link = styled.a``;
const SmallButton = styled.button`
  border-radius: 30px;
`;

//////  CARD BUILD
const SingleCard = styled.div`
  width: 200px;
  padding: 5px;
  background-color: #86848447;

  align-items: center;
  justify-content: center;

  display: flex;
  flex-direction: column;
  column-gap: 5px;

  border-radius: 20px;
  border-color: black;
  border-style: solid;
  border-width: 1px;
`;

const InfoBox = styled.div`
  border-radius: 10px;
  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;

  background-color: #dcd7d795;
  padding: 5px;

  width: 190px;
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
  border-radius: 20px;
  background-color: #f5f10946;
  border-width: 1px;
  border-style: solid;

  display: flex;
  align-items: left;
  justify-content: center;
  cursor: ${({ cursor }) => cursor || "default"};
`;

const NFTImage = styled.img`
  border-radius: 10px;
  width: 190px;
  height: 190px;
  overflow: hidden;
  cursor: ${({ cursor }) => cursor || "default"};
  align-items: center;
  justify-content: center;
`;

interface FrontCardProps {
  transactionDataBase: any;
  blockCountData: BlockCounter;
  handleOpenModal: Function;
  contractInstances: {
    [contractAddress: string]: { instance: ethers.Contract; name: string };
  };
}
const FrontCard = ({
  transactionDataBase,
  blockCountData,
  handleOpenModal,
  contractInstances,
}: FrontCardProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [blkNumberFormats, setBlkNumberFormats] = useState<any>();
  const [txData, settxData] = useState<any>();

  const [NFTData, setNFTData] = useState<SingleNFTDataType>();
  const [metadata, setMetadata] = useState<NFTMetaDataType>();
  const [imageUrl, setImageUrl] = useState<string>(
    "/images/placeholder-image.png"
  );

  const { width: windowWidth } = useWindowSize();

  const [showContract, setShowContract] = useState<string>();
  const [showToken, setShowToken] = useState<string>();
  const network = "mainnet";

  useEffect(() => {
    if (!ready && !loading) {
      if (!!transactionDataBase) {
        setLoading(true);
        const firstKey = Object.keys(transactionDataBase)[0];
        const firstTX = Object.keys(transactionDataBase[firstKey])[0];
        const toShow = transactionDataBase[firstKey][firstTX];
        settxData(toShow);
        console.log("FRONT CARD CHECK: ", toShow);
        setShowContract(toShow.contractAddress);
        setShowToken(toShow.groupedTokenIds[0]);
        AlchemyGetSingleNFT(
          toShow.contractAddress,
          toShow.groupedTokenIds[0].toString()
        ).then((nft) => {
          console.log("Returned NFT Data: ", nft);
          setNFTData(nft);
          setMetadata(nft.metadata);
          if (!!nft.metadata.image) {
            console.log("Got metadata: ", nft.metadata);
            setImageUrl(nft.metadata.image);
          }
          setBlkNumberFormats({ number: parseInt(blockCountData[0]) });
          setReady(true);
          setLoading(false);
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

  const shortenTokenId = (tokenId) =>
    tokenId.length > 6
      ? `${tokenId.slice(0, 3)}..${tokenId.slice(-2)}`
      : tokenId;

  const Block = () => (
    <BlockData>
      {" "}
      Block:
      <BoldText>
        <Link
          href={buildNetworkScanLink({
            block: blkNumberFormats.number,
            network: "eth",
          })}
          target={"blank"}
        >
          {blkNumberFormats.number}{" "}
        </Link>
      </BoldText>
    </BlockData>
  );

  return ready ? (
    <Wrapper>
      <SingleCard>
        <TopImageContainer
          onClick={() => handleOpenModal(txData, contractInstances)}
        >
          <NFTImage alt="An NFT" src={imageUrl}></NFTImage>
        </TopImageContainer>
        <InfoBox>
          <DateLine>{getTXDate(txData)}</DateLine>
          <TXData>
            {txData && getTXType(txData)} #{shortenTokenId(showToken)}{" "}
            <MoreText>
              +{txData && txData.groupedTokenIds.length} Other
            </MoreText>{" "}
          </TXData>
        </InfoBox>
      </SingleCard>
    </Wrapper>
  ) : null;
};

export default FrontCard;

/**
 *  
 * 
 *   <br />
        <SingleTransactionItem>
          {blockCountData[1].contracts.length > 0 &&
            blockCountData[1].contracts.map((address) => {
              return (
                <TransactionBox
                  transactionData={
                    transactionDataBase[blockCountData[1].hash[0]][address]
                  }
                  contractConnection={contractInstances[address]?.instance}
                  contractName={contractInstances[address]?.name}
                  handleOpenModal={handleOpenModal}
                />
              );
            })}
        </SingleTransactionItem>
        <br />
 * 
 * 
 */
