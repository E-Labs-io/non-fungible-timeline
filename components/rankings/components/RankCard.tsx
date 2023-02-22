/** @format */

import { VoteRankData } from "hooks/NFTimelineProvider/types/RankingTypes";
import Address from "hooks/web3/helpers/Address";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import StateSkeleton from "components/common/SkeletonLoader";
import { ethers } from "ethers";
import { useWeb3Provider } from "hooks/web3";

const Card = styled.div`
  padding: 5px;
  margin: 3px;
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 5px;
  color: #ffffff;
  background-color: #a3a3a352;
  display: flex;
  column-gap: 5px;
  :hover {
    border-color: #00dbde;
    color: #00dbde;
    cursor: pointer;
  }
`;
const AddressIcon = styled.canvas`
  border-radius: 90px;
  border-color: white;
  border-width: 1px;
  border-style: solid;
`;

const Information = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TopLine = styled.div`
  flex-direction: row;
  display: flex;
  column-gap: 5px;
  padding: 2px;
  align-items: center;
  justify-content: left;
`;

const WalletAddress = styled.div`
  font-size: 1.1rem;
  text-align: left;
  align-items: center;
  justify-content: left;
`;

const Votes = styled.div`
  width: 50%;
  font-size: 0.8rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  column-gap: 25px;
`;
const Rank = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;
const VoteText = styled.div``;

type RankCardProps = {
  rank: VoteRankData;
  percentOfVotes: number;

  handelAddressSelect: (address: Address) => void;
};

export default function RankCard({
  rank,
  percentOfVotes,
  handelAddressSelect,
}: RankCardProps) {
  const { localProvider } = useWeb3Provider();
  const [walletAddress, setWalletAddress] = useState<Address>();
  const [displayAddress, setDisplayAddress] = useState<string>();
  const addressIconRef = useRef(null);

  useEffect(() => {
    if (!walletAddress) {
      setWalletAddress(new Address(rank.walletAddress, localProvider));
    }

    if (!displayAddress && walletAddress) {
      console.log("Waiting for wallet to be ready");
      walletAddress.on("ready", () => {
        setDisplayAddress(
          walletAddress.hasEns()
            ? walletAddress.getEns()
            : walletAddress.shortenAddress()
        );
        walletAddress.renderWalletIcon(35, addressIconRef.current);
      });
      setDisplayAddress(
        walletAddress.hasEns()
          ? walletAddress.getEns()
          : walletAddress.shortenAddress()
      );
      walletAddress.renderWalletIcon(35, addressIconRef.current);
    }
  });
  return (
    <Card onClick={() => handelAddressSelect(walletAddress)}>
      <AddressIcon ref={addressIconRef} width="50px" height="50px" />
      <Information>
        <TopLine>
          <WalletAddress>
            {displayAddress ?? (
              <StateSkeleton
                height="15px"
                width="100px"
                colorA={"#00dbde"}
                colorB={"#fc00ff"}
              />
            )}
          </WalletAddress>
        </TopLine>
        <Votes>
          <Rank>{rank.votes}</Rank>
          <VoteText>
            vote{rank.votes > 1 && "s"} ({percentOfVotes.toFixed(2)}%)
          </VoteText>
        </Votes>
      </Information>
    </Card>
  );
}
