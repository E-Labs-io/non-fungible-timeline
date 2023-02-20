/** @format */

import React from "react";
import styled from "styled-components";
import Connection from "components/Connection";
import Introduction from "components/Connection/Introduction";
import BallotRanking from "components/Connection/components/BallotRanking";

const HomeContainer = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.coloredTheme.gradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  margin: auto;
  row-gap: 15px;
`;

const TitleContainer = styled.div`
  width: 100%;
  height: 100px;
  margin-top: 100px;
  justify-content: center;
  display: flex;
`;

const ConnectionContainer = styled.div`
  height: auto;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
const PageTitle = styled.div`
  justify-content: center;
  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000000;
  font-family: ${({ theme }) => theme.fontFamily.titleFont};
  font-size: 5rem;
  font-size-adjust: auto;
  text-align: center;
`;

const Home = () => {
  return (
    <HomeContainer>
      <TitleContainer>
        <PageTitle>Non-Fungible Timeline</PageTitle>
      </TitleContainer>

      <ConnectionContainer>
        <Introduction />
        <br />
        <Connection />
      </ConnectionContainer>
      <BallotRanking maxRankings={5} />
    </HomeContainer>
  );
};

export default Home;
