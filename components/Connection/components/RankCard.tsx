/** @format */

import { getAllRankingData } from "hooks/NFTimelineProvider/api/getRankingData";
import {
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider/types/RankingTypes";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import Address from "hooks/web3/helpers/Address";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useWeb3Provider } from "hooks/web3";
import StateSkeleton from "components/common/SkeletonLoader";
import { ethers } from "ethers";
import { renderIcon } from "hooks/web3/helpers/generateAddressIcon";

const Card = styled.div`
  padding: 5px;
  margin: 3px;
  border: 1px solid #ddd;
  width: 100%;
  border-radius: 5px;
  color: #ffffff;
  background-color: #a3a3a352;
  justify-content: space-between;
  align-items: center;
  display: flex;
  column-gap: 5px;
`;

const TopLine = styled.div`
  flex-direction: row;
  display: flex;
  column-gap: 5px;
  padding: 2px;
  width: 40%;
`;

const Rank = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const WalletAddress = styled.div`
  font-size: 1.1rem;
  :hover {
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

const Votes = styled.div`
  font-size: 0.8rem;
  align-items: center;
  display: flex;
  flex-direction: row;
  column-gap: 5px;
`;

type RankCardProps = {
  rank: VoteRankData;
  percentOfVotes: number;
  totalVotes: number;
  provider: ethers.providers.Provider;
  handelAddressSelect: (address: Address) => void;
};

export default function RankCard({
  rank,
  percentOfVotes,
  totalVotes,
  provider,
  handelAddressSelect,
}: RankCardProps) {
  const [walletAddress, setWalletAddress] = useState<Address>();
  const [displayAddress, setDisplayAddress] = useState<string>();
  const addressIconRef = useRef(null);

  useEffect(() => {
    if (!walletAddress) {
      setWalletAddress(new Address(rank.walletAddress, provider));
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
    <Card>
      <AddressIcon ref={addressIconRef} width="50px" height="50px" />
      <TopLine>
        <WalletAddress onClick={() => handelAddressSelect(walletAddress)}>
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
        vote{rank.votes > 1 && "s"} ({percentOfVotes.toFixed(2)}%)
      </Votes>
    </Card>
  );
}
