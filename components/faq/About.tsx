/** @format */

import { device } from "constants/media";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const AboutContainer = styled.div`
  width: 70%;
  height: 50%;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => "#cfafaff"};
  box-shadow: ${({ theme }) => theme.singleTheme.shadow.innerShadow};
  padding: 10px;
  overflow-y: scroll; /* Allow scrolling within this container */
`;

const AboutTitle = styled.h2`
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  color: ${({ theme }) => theme.singleTheme.color};

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
  }
`;
const AboutContent = styled.div`
  width: 100%;
  height: 100%;

  font-size: 1.15rem;
  text-justify: distribute;
  row-gap: 10px;

  justify-content: start;
  align-items: center;
  display: flex;
  flex-direction: column;

  padding: 20px;
`;

const AboutParagraph = styled.p`
  margin: 10px 0;
  text-align: justify;
  line-height: 150%;
`;

const About: FC = () => {
  return (
    <Container>
      <AboutTitle>WTF is Non-Fungible Timeline?</AboutTitle>
      <AboutContainer>
        <AboutContent>
          <AboutParagraph>
            At NFTimeline, we're dedicated to transforming your NFT experience.
            Our platform redefines accessibility, offering an innovative and
            visually stunning way to explore NFTs across the Ethereum Ecosystem.
            Dive into the fascinating world of NFT history, focusing on your
            favorite wallets, with our sleek vertical timeline, spanning across
            Ethereum, Polygon, Optimism, and Arbitrum.
          </AboutParagraph>
          <AboutParagraph>
            NFTimeline is your gateway to tracking, understanding, and engaging
            with NFTs like never before. Our user-friendly interface lets you
            navigate through the digital art world with ease. You'll explore the
            rich history of your chosen wallets, observe their transaction
            patterns, and gain insights into the NFT market.
          </AboutParagraph>
          <AboutParagraph>
            But that's not all! We've added a unique community-driven voting
            feature that brings a social twist to your NFT journey. Vote on
            wallets across categories like 'degen,' 'whale,' and 'diamond
            hands,' and join the conversation about your favorite wallets'
            standing within the community. We firmly believe that NFTs are a
            potent tool for digital ownership and self-expression, and we're
            here to assist you in navigating the ever-expanding non-fungible
            world.
          </AboutParagraph>
          <AboutParagraph>
            Whether you're an experienced collector or just beginning your NFT
            adventure, NFTimeline is your ultimate destination for exploring,
            comprehending, and engaging with NFTs across the Ethereum Ecosystem.
          </AboutParagraph>
        </AboutContent>
      </AboutContainer>
    </Container>
  );
};

export default About;
