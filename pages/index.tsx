/** @format */

import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import config from "config/config";
import { MainPage } from "components/home";
import { useWeb3Provider } from "hooks/web3";
import { Layout } from "components/common";

const HomeContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 52px);
`;

const Home = () => {
  return (
    <HomeContainer>
      <MainPage />
    </HomeContainer>
  );
};

export default Home;
