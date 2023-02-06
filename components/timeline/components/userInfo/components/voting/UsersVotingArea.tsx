/** @format */

import initialVotingState from "constants/votingInit";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { getWalletsVotingData } from "hooks/NFTimelineProvider/api/getWalletsVotingData";
import { Votes } from "hooks/NFTimelineProvider/types";
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
  justify-content: space-between;
  padding: 10px;
  column-gap: 30px;
  border-radius: 10px;
  box-shadow: inset 0px 0px 15px 2px #cfcfcfad;
`;

interface WalletsVotingAreaProps {
  handleOpenModalVoting: (
    selected: string,
    category: votingCategoryList
  ) => void;
}

function WalletsVotingArea({ handleOpenModalVoting }: WalletsVotingAreaProps) {
  const { activeAddress } = useNFTimelineProvider();
  const [walletsVotingStats, setWalletsVotingStats] = useState<{
    [ballotId: string]: Votes[];
  }>();
  const [usersVotingData, setUserVotingData] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!loading && !!!usersVotingData) {
      setLoading(true);
      getWalletsVotingData(activeAddress).then((result) => {
        setUserVotingData(result);
        setWalletsVotingStats(result);
      });
    }
  });

  return (
    <Container>
      <ConnectionArea>
        {initialVotingState.categories.map((category, key) => (
          <VotingCategoryBox
            category={category}
            walletVotingStats={
              walletsVotingStats && walletsVotingStats[category.name]
            }
            handleOpenModalVoting={handleOpenModalVoting}
          />
        ))}
      </ConnectionArea>
    </Container>
  );
}

export default WalletsVotingArea;
