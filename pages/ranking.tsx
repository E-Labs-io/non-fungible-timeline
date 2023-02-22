/** @format */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Layout } from "components/common";
import { Address } from "hooks/web3";
import useNFTimelineProvider, {
  getAllRankingData,
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider";
import BallotRanking from "components/rankings/components/BallotRanking";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

interface RankingProps {}

export default function Ranking(props: RankingProps) {
  const {
    getAllRankings,
    allBallotRankings,
    getTimelineData,
    setActiveTimelineData,
    setActiveAddress,
    addNewTimelineData,
  } = useNFTimelineProvider();

  return (
    <Layout>
      <Wrapper>
        {" "}
        <BallotRanking />
      </Wrapper>
    </Layout>
  );
}
