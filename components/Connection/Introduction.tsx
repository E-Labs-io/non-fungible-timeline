/** @format */
import { device } from "constants/media";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
`;
const Content = styled.div`
  text-align: right;
  width: 80%;
  font-size: 1.3rem;
  a {
    text-decoration: nonde;
    :hover {
      color: #70ffde;
    }
  }
  @media ${device.tablet} {
    text-align: center;
  }
`;

interface IntroductionProps {}
const Introduction = ({}: IntroductionProps) => {
  return (
    <Wrapper>
      <Container>
        <Content>
          Where the past and present of your favourite Ethereum wallets come to
          life. With our sleek, vertical timeline, scroll and vote on your
          favourite wallets. Discover the ultimate way to track and engage with
          a wallets NFTs.
          <br />
          <a href="/faq">Read more...</a>
        </Content>
        <br />
      </Container>
    </Wrapper>
  );
};

export default Introduction;
