/** @format */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 40%;
`;

const Container = styled.div`
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 5px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  padding: 10px;
  font-size: large;
`;

interface IntroductionProps {}
const Introduction = ({}: IntroductionProps) => {
  return (
    <Wrapper>
      <Container></Container>
    </Wrapper>
  );
};

export default Introduction;
