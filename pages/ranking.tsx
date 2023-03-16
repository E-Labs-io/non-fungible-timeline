/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "components/common";

import BallotRanking from "components/rankings/components/BallotRanking";
import { LoadingStates } from "types/stateTypes";

const Wrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: column;
  column-gap: 50px;
  width: 100%;
`;

interface RankingProps {}

export default function Ranking(props: RankingProps) {
  const [loadingState, setLoadingState] = useState<LoadingStates>(0);
  const handelStateChange = (state) => setLoadingState(state);
  return (
    <Layout>
      <Wrapper>
        <BallotRanking
          maxRankings={15}
          loadingState={loadingState}
          handelStateChange={handelStateChange}
        />
      </Wrapper>
    </Layout>
  );
}
