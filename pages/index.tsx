/** @format */

import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import config from "config/config";
import { MainPage } from "components/home";
import { useWeb3Provider } from "hooks/web3";
import { Layout } from "components/common";

const HomeContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

const Home = () => {
  return (
    <HomeContainer>
      <MainPage />
    </HomeContainer>
  );
};

export default Home;
