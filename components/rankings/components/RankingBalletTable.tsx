/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VoteRankData } from "providers/NFTimelineProvider";
import { Address } from "e-labs_web3provider";
import RankCard from "./RankCard";

interface RankingTableProps {
  maxRankings?: number;
  ballotId: string;
  ballotRankings: VoteRankData[];
  handelAddressSelect: (address: Address) => void;
}

function RankingBallotTable({
  maxRankings,
  handelAddressSelect,
  ballotId,
  ballotRankings,
}: RankingTableProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ready && ballotId && ballotRankings) {
      console.log("All Votes for ballot: ", ballotId, ballotRankings);
      setReady(true);
    }
  });

  return (
    <Wrapper>
      <BallotId>{ballotId}</BallotId>
      <Container>
        {ballotRankings &&
          ballotRankings
            .slice(0, maxRankings ?? ballotRankings.length)
            .map((rank, index) => (
              <RankCard
                key={rank.walletAddress}
                rank={{ ...rank, rank: index + 1 }}
                percentOfVotes={rank.shareOfVotes}
                handelAddressSelect={handelAddressSelect}
              />
            ))}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: scroll;
`;

const Container = styled.div`
  height: 100%;
  max-width: 90%;
  max-height: 100%; /* Set a maximum height for the grid */

  background-color: #ffffff38;
  padding: 10px;

  display: grid;
  align-items: top;
  flex-wrap: wrap;
  justify-content: space-evenly;

  overflow: hidden;
  overflow-x: scroll;

  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: auto;
  grid-gap: 10px;
`;

const Ballots = styled.div`
  text-align: center;
  padding: 3px;
  overflow: hidden;
  scroll-behavior: none;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-auto-columns: 1fr;
  grid-gap: 20px;
  flex-wrap: wrap;
`;

const BallotId = styled.h2`
  font-size: 1.5rem;
  text-align: left;
  width: 70%;
`;

export default RankingBallotTable;
