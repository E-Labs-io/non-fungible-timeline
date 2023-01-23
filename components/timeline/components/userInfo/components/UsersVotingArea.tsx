/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 10px;
  flex-direction: column;
  display: flex;
`;

const ConnectionArea = styled.div`
  width: 100%;
  min-height: 4rem;
  transition: all 0.3s linear;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  column-gap: 30px;
  border-radius: 10px;
  box-shadow: inset 0px 0px 15px 2px #cfcfcfad;
`;

interface UsersVotingAreaProps {}

function UsersVotingArea({}: UsersVotingAreaProps) {
  return (
    <Container>
      <ConnectionArea>dasfdadfadfd</ConnectionArea>
    </Container>
  );
}

export default UsersVotingArea;