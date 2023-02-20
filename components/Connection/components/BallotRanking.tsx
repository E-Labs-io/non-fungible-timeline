/** @format */

import { ethers } from "ethers";
import { getAllRankingData } from "hooks/NFTimelineProvider/api/getRankingData";
import {
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider/types/RankingTypes";
import { useWeb3Provider } from "hooks/web3";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getSortedBallotRankings from "./helpers/sortRankings";
import RankCard from "./RankCard";

interface BallotRankingProps {
  maxRankings?: number;
}

function BallotRanking({ maxRankings }: BallotRankingProps) {
  const { connectToGivenProvider } = useWeb3Provider();
  const [ranking, setRanking] = useState<AllBallotRankingData>();
  const [provider, setProvider] = useState<ethers.providers.Provider>();
  const [ballotIds, setBallotIds] = useState<string[]>([]);
  const [ballotRankings, setBallotRankings] = useState<{
    [ballotId: string]: VoteRankData[];
  }>();

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ready) {
      if (!ranking) {
        getAllRankingData().then((data: AllBallotRankingData) => {
          console.log("got ranking data: Ballot Ranking");
          setRanking(data);
          const ids = Object.keys(data);
          const ranks = {};
          const sorted = getSortedBallotRankings(data);
          ids.forEach((id) => {
            ranks[id] = sorted[id].rankings;
          });
          setBallotIds(ids);
          setBallotRankings(ranks);
          if (!!!provider)
            console.log("connecting to provider: Ballot Ranking");
          connectToGivenProvider("alchemy", "mainnet").then((prov) => {
            console.log("connected to provider: Ballot Ranking");
            setProvider(prov);
            setReady(true);
          });
        });
      }
    }
  });

  return (
    <Wrapper>
      <Title>Rankings</Title>
      <Container>
        {ready &&
          ballotIds.map((id, keyA) => (
            <Ballot key={keyA} count={ballotIds.length}>
              <BallotId>{id}</BallotId>
              {ready &&
                ballotRankings[id]
                  .slice(0, maxRankings)
                  .map((rank, index) => (
                    <RankCard
                      key={rank.walletAddress}
                      rank={{ ...rank, rank: index + 1 }}
                      percentOfVotes={rank.shareOfVotes}
                      totalVotes={ranking[id].totalVotes}
                      provider={provider}
                    />
                  ))}
            </Ballot>
          ))}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-width: 80vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: left;
  text-align: left;
  width: 70%;
`;

const Container = styled.div`
  justify-content: center;
  align-items: top;
  padding: 20px;
  width: 70%;
  border: 1px solid #ddd;
  border-radius: 10px;
  display: flex;

  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
`;

const Ballot = styled.div`
  text-align: center;
  padding: 3px;
  width: ${({ count }) => 100 / count + "%"};
`;

const BallotId = styled.h2`
  font-size: 1.5rem;
`;

export default BallotRanking;
