/** @format */
import { device } from "constants/media";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 80%;
  padding-left: 5px;
`;

const Container = styled.div`
  width: 100%;
  min-height: 200px;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h2`
  text-align: right;
  width: 100%;
  font-weight: 300;
  font-size: 4rem;
  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: #000000;
  @media ${device.tablet} {
    text-align: center;
  }
`;
const Content = styled.div`
  text-align: right;
  width: 100%;
  font-size: 1.3rem;
  @media ${device.tablet} {
    text-align: center;
  }
`;

interface IntroductionProps {}
const Introduction = ({}: IntroductionProps) => {
  return (
    <Wrapper>
      <Container>
        <Title>Welcome</Title>
        <Content>
          Where the past and present of your favourite Ethereum wallets come to
          life. With our sleek, vertical timeline, scroll and vote on your
          favourite wallets. Discover the ultimate way to track and engage with
          a wallets NFTs.
        </Content>
      </Container>
    </Wrapper>
  );
};

export default Introduction;
