/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { VoteRankData } from "hooks/NFTimelineProvider";
import { Address } from "hooks/web3";
import RankCard from "./RankCard";
import { device } from "constants/media";

interface RankingTableProps {
  maxRankings?: number;
  ballotIds: string[];
  ballotRankings: {
    [ballotId: string]: VoteRankData[];
  };
  handelAddressSelect: (address: Address) => void;
}

function RankingTable({
  maxRankings,
  handelAddressSelect,
  ballotIds,
  ballotRankings,
}: RankingTableProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ready && ballotIds.length > 0 && !!!ballotRankings) {
      setReady(true);
    }
  });

  return (
    <Wrapper>
      <Container>
        {ballotIds &&
          ballotIds.map((id, keyA) => (
            <Ballot key={keyA} count={ballotIds.length}>
              <BallotId>{id}</BallotId>
              {ballotRankings &&
                ballotRankings[id]
                  .slice(0, maxRankings)
                  .map((rank, index) => (
                    <RankCard
                      key={rank.walletAddress}
                      rank={{ ...rank, rank: index + 1 }}
                      percentOfVotes={rank.shareOfVotes}
                      handelAddressSelect={handelAddressSelect}
                    />
                  ))}
            </Ballot>
          ))}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 70%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const Container = styled.div`
  justify-content: center;
  align-items: top;
  padding: 20px;
  width: 100%;
  border: 1px solid #ddd;
  background-color: #ffffff38;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  columns: 3;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  @media ${device.tablet} {
    columns: 2;
  }
  @media ${device.mobileL} {
    columns: 1;
  }
`;

const Ballot = styled.div`
  text-align: center;
  padding: 3px;
  width: ${({ count }) => 100 / count + "%"};
  width: 100%;
  /*   @media ${device.mobileL} {
    width: 100%;
  } */

  overflow: scroll;
`;

const BallotId = styled.h2`
  font-size: 1.5rem;
  /*  :hover {
    color: #00dbde;
    cursor: pointer;
  } */
`;

export default RankingTable;
