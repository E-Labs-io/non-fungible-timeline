/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { Layout } from "components/common";

import BallotRanking from "components/rankings/components/BallotRanking";
import { LoadingStates } from "types/stateTypes";

const Wrapper = styled.div`
  justify-content: space-evenly;
  align-items: center;
  display: flex;
  flex-direction: column;
  column-gap: 50px;
  width: 100%;
  min-height: 100%;
`;

interface RankingProps {}

export default function Ranking(props: RankingProps) {
  const [loadingState, setLoadingState] = useState<LoadingStates>(0);
  const handelStateChange = (state) => setLoadingState(state);
  return (
    <Layout>
      <Wrapper>
        <BallotRanking
          loadingState={loadingState}
          handelStateChange={handelStateChange}
          individualBallots
        />
      </Wrapper>
    </Layout>
  );
}
