/** @format */

import { device, mobileL } from "constants/media";
import initialVotingState from "constants/votingInit";
import { WalletsVotes } from "hooks/NFTimelineProvider/types/VotingTypes";
import useWindowSize from "hooks/window/useWindowSize";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { votingCategoryList } from "types/votingTypes";
import VotingCategoryBox from "./VotingCategoryBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

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
  @media ${device.mobileL} {
    column-gap: 10px;
  }
`;

const DropdownLabel = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;

  color: ${({ isOpen }) => (isOpen ? "#49c2ff" : "white")};

  justify-content: center;
  align-items: center;
  text-align: center;
  :hover {
    color: #ff47e6;
    cursor: pointer;
  }
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
  const { width } = useWindowSize();
  const [reduceSize, setReduceSize] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (width <= mobileL && !reduceSize) {
      setReduceSize(true);
    } else if (reduceSize && width > mobileL) {
      setReduceSize(false);
    }
  }, [width]);

  return reduceSize ? (
    <Container>
      <DropdownLabel
        isOpen={isOpen}
        onClick={() => setIsOpen(isOpen ? false : true)}
      >
        <FontAwesomeIcon icon={isOpen ? faAngleDown : faAngleRight} />
        RANKING
      </DropdownLabel>
      {isOpen && (
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
      )}
    </Container>
  ) : (
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
