/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  votingCategoryList,
  votingWalletsStatsReturn,
} from "types/votingTypes";
import initialVotingState from "constants/votingInit";
import { Votes } from "hooks/NFTimelineProvider/types";

const CategoryContainer = styled.div`
  min-width: 50px;
  border-radius: 10px;
  border-color: #ffffff;
  border-width: 1px;
  border-style: solid;
  // box-shadow: 0px 0px 15px 2px #cfcfcfad;
  padding: 5px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  :hover {
    color: #49c2ff;
    border-color: #49c2ff;
  }
`;

const CategoryName = styled.div`
  font-size: auto;
`;

const CategoryVoteCount = styled.div`
  font-size: auto;
`;

interface VotingCategoryBoxProps {
  category: votingCategoryList;
  walletVotingStats: Votes[];
  handleOpenModalVoting: (
    selected: string,
    category: votingCategoryList
  ) => void;
}

function VotingCategoryBox({
  category,
  walletVotingStats,
  handleOpenModalVoting,
}: VotingCategoryBoxProps) {
  const [usersVotingStats, setUSersVotingStats] = useState();

  return (
    <CategoryContainer
      onClick={() => handleOpenModalVoting(category.name, category)}
    >
      <CategoryName>{category.label}</CategoryName>
      <CategoryVoteCount>{walletVotingStats?.length}</CategoryVoteCount>
    </CategoryContainer>
  );
}

export default VotingCategoryBox;
