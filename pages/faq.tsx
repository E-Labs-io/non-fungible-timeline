/** @format */

import React from "react";
import styled from "styled-components";

import { device } from "constants/media";
import { Layout, TextExpandList } from "components/common";
import faqQuestions from "constants/faqQuestions";
import About from "components/faq/About";

const Wrapper = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;

  align-items: center;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 40px;
  font-weight: 500;
  text-align: center;
  color: ${({ theme }) => theme.singleTheme.color};
  margin: auto;
  @media ${device.tablet} {
    font-size: 32px;
  }

  @media ${device.mobileL} {
    font-size: 24px;
  }
`;

function FAQ() {
  return (
    <Layout>
      <About />
      <Wrapper>
        <Title>F.A.Q.</Title>
        <TextExpandList data={faqQuestions} />
      </Wrapper>
    </Layout>
  );
}

export default FAQ;
