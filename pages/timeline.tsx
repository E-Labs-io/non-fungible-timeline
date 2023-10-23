/** @format */

import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import config from "config/config";
import { MainPage } from "components/timeline";
import { Layout } from "components/common";

const HomeContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const TimelinePage = () => {
  return (
    <Layout>
      <HomeContainer>
        <MainPage />
      </HomeContainer>
    </Layout>
  );
};

export default TimelinePage;
