/** @format */

import React from "react";
import styled from "styled-components";

import { device } from "config/media";
import { Layout, TextExpandList } from "components/common";
import faqQuestions from "constants/faqQuestions";
import Header from "components/common/Layout/Header/Header";
import { useRouter } from "next/router";

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background: ${({ theme }) => theme.coloredTheme.background};
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 30px 100px;
  
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.primaryLight};
  margin: 80px 0 100px;

  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.mobileL} {
    font-size: 8vw;
  }
`;

function FAQ() {
  const router = useRouter();

  const onBack = () => router.push("/");

  return (
    <Page>
      <Header onBack={onBack} />
      <Wrapper>
        <Title>F.A.Q.</Title>
        <TextExpandList data={faqQuestions} />
      </Wrapper>
    </Page>
  );
}

export default FAQ;
