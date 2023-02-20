/** @format */

import { getAllRankingData } from "hooks/NFTimelineProvider/api/getRankingData";
import {
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider/types/RankingTypes";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import Address from "hooks/web3/helpers/Address";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWeb3Provider } from "hooks/web3";
import StateSkeleton from "components/common/SkeletonLoader";
import { ethers } from "ethers";

const Card = styled.div`
  padding: 5px;
  margin: 3px;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: black;
  background-color: #a3a3a398;
`;

const TopLine = styled.div`
  flex-direction: row;
  display: flex;
  column-gap: 5px;
  padding: 2px;
`;

const Rank = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const WalletAddress = styled.div`
  font-size: 1.1rem;
  :hover {
    color: aliceblue;
    cursor: pointer;
  }
`;

const Votes = styled.div`
  font-size: 0.8rem;
`;

type RankCardProps = {
  rank: VoteRankData;
  percentOfVotes: number;
  totalVotes: number;
  provider: ethers.providers.Provider;
};

export default function RankCard({
  rank,
  percentOfVotes,
  totalVotes,
  provider,
}: RankCardProps) {
  const [walletAddress, setWalletAddress] = useState<Address>();
  const [displayAddress, setDisplayAddress] = useState<string>();

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
      });
      setDisplayAddress(
        walletAddress.hasEns()
          ? walletAddress.getEns()
          : walletAddress.shortenAddress()
      );
    }
  });
  return (
    <Card>
      <TopLine>
        <Rank>{rank.rank}.</Rank>
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
        {rank.votes} vote{rank.votes > 1 && "s"} ({percentOfVotes.toFixed(2)}%
        of {totalVotes})
      </Votes>
    </Card>
  );
}
