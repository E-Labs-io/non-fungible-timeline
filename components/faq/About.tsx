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

  @media ${device.laptop} {
    margin-top: 0;
  }
  @media ${device.tablet} {
    margin-top: 15%;
  }
  @media ${device.mobileL} {
    margin-top: 25%;
  }
`;

const AboutContainer = styled.div`
  width: 85%;

  background-color: ${({ theme }) => theme.coloredTheme.transparentBG};
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: ${({ theme }) => theme.coloredTheme.borderColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.innerShadow};
  padding: 5px;
  padding-left: 25px;
  padding-bottom: 10px;
  text-align: center;
  overflow: scroll;
`;
const AboutTitle = styled.h2`
  text-align: left;
  width: 100%;
  font-weight: 300;
  font-size: 2rem;
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
  padding-right: 50px;
`;

function About() {
  return (
    <Container>
      <AboutContainer>
        <AboutTitle>WTF is Non-Fungible Timeline?</AboutTitle>
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
