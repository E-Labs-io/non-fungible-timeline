/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import Connection from "components/Connection";
import Introduction from "components/Connection/Introduction";
import BallotRanking from "components/rankings/components/BallotRanking";
import { device } from "constants/media";
import { LoadingStates } from "types/stateTypes";

const HomeContainer = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.singleTheme.gradientBackground};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const ConnectionContainer = styled.div`
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 20px;
  flex-direction: row;
  columns: 2;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;

const LogoImageContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding-top: 50px;
`;

const Logo = styled.img`
  width: 60%;
  height: 100%;
  @media ${device.tablet} {
    width: 100%;
  }
`;

const Home = () => {
  const [loadingState, setLoadingState] = useState<LoadingStates>();
  const handelStateChange = (state) => setLoadingState(state);
  return (
    <HomeContainer>
      <LogoImageContainer>
        <Logo src="/images/logo-long_gradient-01.png" />
      </LogoImageContainer>
      <ConnectionContainer>
        <Introduction />
        <Connection
          handleStateChange={handelStateChange}
          state={loadingState}
        />
      </ConnectionContainer>
      <BallotRanking
        maxRankings={3}
        handelStateChange={handelStateChange}
        loadingState={loadingState}
      />
    </HomeContainer>
  );
};

export default Home;
