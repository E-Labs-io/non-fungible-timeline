/** @format */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  height: auto;
  width: 100%;
`;

const Container = styled.div`
  width: 60vw;
  min-height: 200px;
  //background-color: #86848436;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.329);
  padding: 5px;
  padding-bottom: 20px;
  padding-left: 25px;
  padding-right: 20px;
  text-align: center;
`;
const Title = styled.h2`
  text-align: left;
  width: 100%;
  font-weight: 300;
  font-size: 2rem;
  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 0.2px;
  -webkit-text-stroke-color: #000000;
`;
const Content = styled.div`
  text-align: center;
  width: 100%;
  font-size: 1.3rem;
`;

interface IntroductionProps {}
const Introduction = ({}: IntroductionProps) => {
  return (
    <Wrapper>
      <Container>
        <Title>Welcome to NFTimeline!</Title>
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
