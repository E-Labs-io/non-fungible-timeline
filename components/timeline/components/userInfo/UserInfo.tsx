/** @format */

import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import useNFTimelineProvider from "hooks/NFTimelineProvider";
import { useWeb3Provider } from "hooks/web3";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserStats from "./components/stats/UserStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import FilterOptions from "./components/FilterOptions";
import UsersVotingArea from "./components/voting/UsersVotingArea";
import { device } from "constants/media";
import StateSkeleton from "components/common/SkeletonLoader";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import { votingCategoriesType, votingCategoryList } from "types/votingTypes";
import WalletsVotingArea from "./components/voting/UsersVotingArea";
import { getWalletsVotingData } from "hooks/NFTimelineProvider/api/getWalletsVotingData";
import { WalletsVotes } from "hooks/NFTimelineProvider/types/VotingTypes";
import { Modal } from "components/common";
import VotingModal from "./components/voting/VotingModal";


const Container = styled.div`
  background-color: #86848447;
  margin: auto;
  transition: all 0.3s linear;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: auto;
  align-items: center;
  justify-content: center;
  padding: 5px;
  padding-top: 10px;
  row-gap: 20px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
`;

const AddressContainer = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const AddressLabel = styled.a`
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 2rem;

  height: 100%;
  width: 100%;
  color: white;
  :hover {
    color: #ff49f0;
  }
`;
const WalletInfo = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const InteractionArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  columns: 2;
  column-gap: 10px;
`;
const FilterArea = styled.div`
  width: 100%;
  height: 100%;
  border-right: 2px, solid, white;

  display: flex;
  padding-right: 30px;
  flex-direction: column;
  justify-content: right;
  align-items: center;
  text-align: center;
  @media ${device.tablet} {
    justify-content: space-evenly;
    padding-right: 0px;
  }
`;
const FilterLabel = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px;
  display: flex;

  color: ${({ isOpen }) => (isOpen ? "#49c2ff" : "white")};

  padding-right: 30px;
  padding-bottom: 10px;

  justify-content: right;
  align-items: center;
  text-align: center;
  @media ${device.tablet} {
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
  }

  :hover {
    color: #ff47e6;
    cursor: pointer;
  }
`;
const VotingArea = styled.div`
  width: 100%;
  height: 100%;
  border-left: 2px, solid, white;

  display: flex;
  flex-direction: column;

  justify-content: space-evenly;
  align-items: center;
`;
const VoteLabel = styled.div`
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

interface UserInformationProps {
  handleOpenModalForFirstAndLast: (selected: "first" | "last") => void;
  handelOpenModalForActiveDate: (date: string, direction: "in" | "out") => void;
}

function UserInformation({
  handleOpenModalForFirstAndLast,
  handelOpenModalForActiveDate,
}: UserInformationProps) {
  const { localProvider } = useWeb3Provider();
  const { activeTimeline, activeAddress } = useNFTimelineProvider();

  //  Checks
  const [ready, setReady] = useState<boolean>(false);
  const [addressCheck, setAddressCheck] = useState<{
    started: boolean;
    finished: boolean;
  }>({ started: false, finished: false });
  //    ENS & Address States

  const [hasENS, setHasENS] = useState<boolean | undefined>(undefined);
  const [ensAddress, setEnsAddress] = useState<string>();
  const [walletAddress, setWalletAddress] = useState<string>();
  //  History
  const [sortedInHistory, setSortedInHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [sortedOutHistory, setSortedOutHistory] =
    useState<compileHistoryIntoDaysReturn>();
  //  Voting Headline
  const [walletsVotingStats, setWalletsVotingStats] = useState<WalletsVotes>();

  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isVotingOpen, setVotingOpen] = useState(false);
  const [votingModalOpen, setVotingModalOpen] = useState(false);
  const [voteCategory, setVoteCategory] = useState<votingCategoriesType>();
  const [selectedCategory, setSelectedCategory] =
    useState<votingCategoryList>();

  useEffect(() => {
    //  Check ENS
    if (!addressCheck.started && activeAddress) {
      console.log("Address Check: ", activeAddress);
      setAddressCheck({ started: true, finished: false });
      if (activeAddress.isReady()) {
        if (activeAddress.hasEns()) {
          console.log("is ens");
          setHasENS(true);
          setEnsAddress(activeAddress.getEns());
          setWalletAddress(activeAddress.getAddress());
          setAddressCheck({ started: true, finished: true });
          setReady(true);
        } else {
          console.log("is not ens");
          setWalletAddress(activeAddress.getAddress());
          setHasENS(false);
          setAddressCheck({ started: true, finished: true });
          setReady(true);
        }
      } else
        activeAddress.on("ready", () => {
          if (activeAddress.hasEns()) {
            console.log("is ens");
            setHasENS(true);
            setEnsAddress(activeAddress.getEns());
            setWalletAddress(activeAddress.getAddress());
            setAddressCheck({ started: true, finished: true });
            setReady(true);
          } else {
            console.log("is not ens");
            setWalletAddress(activeAddress.getAddress());
            setHasENS(false);
            setAddressCheck({ started: true, finished: true });
            setReady(true);
          }
        });
    }

    //  Set the active timeline data
    if (activeTimeline && !sortedInHistory && !sortedOutHistory) {
      setSortedInHistory(activeTimeline.inByDate);
      setSortedOutHistory(activeTimeline.outByDate);
      if (!!!walletsVotingStats) {
        getWalletsVotingData(activeAddress.getAddress()).then((result) => {
          setWalletsVotingStats(result);
        });
      }
    }
  });

  const handleOpenModalFromVote = (
    selected: votingCategoriesType,
    category: votingCategoryList
  ) => {
    setVoteCategory(selected);
    setSelectedCategory(category);
    setVotingModalOpen(true);
  };

  const handleCloseModalFromVote = () => {
    getWalletsVotingData(activeAddress.getAddress()).then((result) => {
      setWalletsVotingStats(result);
    });
    setVotingModalOpen(false);
  };

  return (
    <Container>
      <AddressContainer ready={addressCheck.finished}>
        {!addressCheck.finished && (
          <StateSkeleton
            colorA="#3298ce"
            colorB="#a82da4"
            height="50px"
            width="400px"
            border="1px solid white"
          />
        )}
        {addressCheck.finished && (
          <AddressLabel
            href={buildNetworkScanLink({
              network: "eth",
              address: walletAddress,
            })}
            target="blank"
          >
            {hasENS ? ensAddress : shortenWalletAddress(walletAddress)}
          </AddressLabel>
        )}
      </AddressContainer>
      {
        <VotingArea>
          <VoteLabel
            onClick={() => setVotingOpen(isVotingOpen ? false : true)}
            isOpen={isVotingOpen}
          >
            <FontAwesomeIcon icon={isVotingOpen ? faAngleDown : faAngleRight} />
            VOTE
          </VoteLabel>
          {isVotingOpen && (
            <WalletsVotingArea
              handleOpenModalVoting={handleOpenModalFromVote}
              walletVotingStats={walletsVotingStats && walletsVotingStats}
            />
          )}
        </VotingArea>
      }
      <WalletInfo>
        <UserStats
          handleOpenModalForFirstAndLast={handleOpenModalForFirstAndLast}
          handelOpenModalForActiveDate={handelOpenModalForActiveDate}
          sortedInHistory={sortedInHistory}
          sortedOutHistory={sortedOutHistory}
        />
      </WalletInfo>
      <InteractionArea>
        <FilterArea>
          <FilterLabel
            onClick={() => setFiltersOpen(isFiltersOpen ? false : true)}
            isOpen={isFiltersOpen}
          >
            <FontAwesomeIcon
              icon={isFiltersOpen ? faAngleDown : faAngleRight}
            />
            FILTERS
          </FilterLabel>
        </FilterArea>
      </InteractionArea>
      {isFiltersOpen && <FilterOptions />}
      <Modal
        title={"user modal"}
        isOpen={votingModalOpen}
        onRequestClose={handleCloseModalFromVote}
      >
        <VotingModal categoryType={voteCategory} category={selectedCategory} />
      </Modal>
    </Container>
  );
}

export default UserInformation;
