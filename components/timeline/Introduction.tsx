/** @format */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 40%;
`;

const Container = styled.div`
  width: 50vw;
  min-height: 200px;
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  padding: 10px;
  padding-left: 25px;
  text-align: left;
`;
const Title = styled.h2`
  text-align: left;
  width: 100%;
`;
const Content = styled.div`
  text-align: left;
  width: 100%;
  font-size: 1.2rem;
`;

interface IntroductionProps {}
const Introduction = ({}: IntroductionProps) => {
  return (
    <Wrapper>
      <Container>
        <Title>Welcome to NFTimeline!</Title>
        <Content>
          Dive into the history of your wallets NFT lifetime. See the trades
          that make a wallet, and break! Vote on wallets that you think are
          special!
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Introduction;
