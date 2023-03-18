/** @format */

import { device } from "constants/media";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: 10px;
  overflow: hidden;
  padding: 10px;
`;

const AboutContainer = styled.div`
  width: 85%;
  max-height: 400px;

  background-color: ${({ theme }) => theme.coloredTheme.transparentBG};
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: ${({ theme }) => theme.coloredTheme.borderColor};


  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.innerShadow};
  padding: 10px;
  padding-left: 20px;
  padding-bottom: 10px;
  text-align: center;
  overflow: scroll;
  overflow-wrap: break-word;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const AboutTitle = styled.h2`
  text-align: center;
  width: 100%;

  font-size: 2rem;

  font-size: 40px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.primaryLight};
  margin: auto;

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
  }
`;
const AboutContent = styled.div`
  text-align: left;
  width: 100%;
  font-size: 1rem;
  text-justify: distribute;
`;

const AboutParagraph = styled.div`
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
`;

function About() {
  return (
    <Container>
      <AboutTitle>WTF is Non-Fungible Timeline?</AboutTitle>
      <AboutContainer>
        <AboutContent>
          <AboutParagraph>
            At NFTimeline, we're passionate about making the world of NFTs more
            accessible and engaging. Our platform offers a unique and visually
            stunning way to track your favorite Ethereum wallets' NFT history.
          </AboutParagraph>
          <AboutParagraph>
            With our sleek, vertical timeline, you can scroll through past
            transactions and easily understand the buying and selling patterns
            of each wallet. But we don't stop there, our community-driven voting
            allows you to vote on wallets in category's; 'degen', 'whale' &
            'diamond hands' to name 3, adding a fun, social element to the
            experience.
          </AboutParagraph>
          <AboutParagraph>
            Join the conversation and see where your favorite wallets stand
            amongst the community. We believe that NFTs are a powerful tool for
            digital ownership and self-expression, and we're here to help you
            navigate the ever-evolving non-fungible world.
          </AboutParagraph>
          <AboutParagraph>
            Whether you're a seasoned collector or just getting started,
            NFTimeline is the ultimate destination for tracking, understanding
            and engaging with NFTs
          </AboutParagraph>
        </AboutContent>
      </AboutContainer>
    </Container>
  );
}

export default About;
