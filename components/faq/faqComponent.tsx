/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { device } from "constants/media";
import { TextExpandList } from "components/common";

const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 10px;
`;

const Title = styled.h2`
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

export interface FAQComponentProps {
  faqQuestions: { title: string; content: string }[];
}

const FAQComponent: FC<FAQComponentProps> = ({ faqQuestions }) => {
  return (
    <Container>
      <br />
      <br />
      <Title>F.A.Q.</Title>
      <TextExpandList data={faqQuestions} />
    </Container>
  );
};

export default FAQComponent;
