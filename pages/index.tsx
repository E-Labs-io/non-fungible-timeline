/** @format */

import React from "react";
import styled from "styled-components";
import Connection from "components/Connection";
import Introduction from "components/Connection/Introduction";
import BallotRanking from "components/rankings/components/BallotRanking";
import { device } from "constants/media";

const HomeContainer = styled.div`
  position: absolute;
  width: 100vw;
  min-height: 100vh;
  background: ${({ theme }) => theme.coloredTheme.gradient};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  row-gap: 15px;
`;

const ConnectionContainer = styled.div`
  height: auto;
  align-items: center;
  justify-content: center;
  margin: auto;
  display: flex;
  padding: 20px;
  flex-direction: row;
  columns: 2;
  @media ${device.tablet} {
    flex-direction: column;
  }
`;
const TitleContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: auto;
  justify-content: center;
  display: flex;
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
  font-size: 4rem;
  font-size-adjust: auto;
  text-align: center;

  @media ${device.tablet} {
    font-size: 3rem;
    font-size-adjust: auto;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <TitleContainer>
        <PageTitle>Non-Fungible Timeline</PageTitle>
      </TitleContainer>
      <ConnectionContainer>
        <Introduction />
        <Connection />
      </ConnectionContainer>
      <BallotRanking maxRankings={3} />
      <br />
    </HomeContainer>
  );
};

export default Home;
