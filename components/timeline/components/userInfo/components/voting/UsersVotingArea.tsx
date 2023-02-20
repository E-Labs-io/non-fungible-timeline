/** @format */

import initialVotingState from "constants/votingInit";
import { WalletsVotes } from "hooks/NFTimelineProvider/types/VotingTypes";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { votingCategoryList } from "types/votingTypes";
import VotingCategoryBox from "./VotingCategoryBox";

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
  justify-content: space-around;
  padding: 10px;
  column-gap: 30px;
  border-radius: 10px;
  box-shadow: inset 0px 0px 10px 1px #cfcfcfad;
`;

interface WalletsVotingAreaProps {
  handleOpenModalVoting: (
    selected: string,
    category: votingCategoryList
  ) => void;
  walletVotingStats?: WalletsVotes;
}

function WalletsVotingArea({
  handleOpenModalVoting,
  walletVotingStats,
}: WalletsVotingAreaProps) {
  return (
    <Container>
      <ConnectionArea>
        {initialVotingState.categories.map((category, key) => (
          <VotingCategoryBox
            key={key}
            category={category}
            walletVotingStats={
              walletVotingStats && walletVotingStats[category.name]
            }
            handleOpenModalVoting={handleOpenModalVoting}
          />
        ))}
      </ConnectionArea>
    </Container>
  );
}

export default WalletsVotingArea;
