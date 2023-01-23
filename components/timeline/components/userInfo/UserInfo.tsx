/** @format */

import { Loader } from "components/common";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { useWeb3Provider } from "hooks/web3";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserStats from "./components/UserStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import {
  countTokens,
  countTransactions,
  getFirstAndLastTransactions,
} from "./helpers/sortUserStats";
import FilterOptions from "./components/FilterOptions";
import UsersVotingArea from "./components/UsersVotingArea";
import { device } from "constants/media";

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
const DisplayAddress = styled.a`
  justify-content: center;
  display: flex;
  font-size: 2.5rem;
  text-align: center;

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
  handleOpenModal: (selected: "first" | "last") => void;
}

function UserInformation({ handleOpenModal }: UserInformationProps) {
  const { useEnsResolver } = useWeb3Provider();
  const { activeTimeline, activeAddress } = useNFTimelineProvider();

  //  Checks
  const [ready, setReady] = useState<boolean>(false);
  const [addressCheck, setAddressCheck] = useState<{
    started: boolean;
    finished: boolean;
  }>({ started: false, finished: false });
  const [statsCheck, setStatsCheck] = useState<{
    started: boolean;
    finished: boolean;
  }>({ started: false, finished: false });
  //    ENS & Address States
  const [ensResolver, setEnsResolver] = useState<any>(undefined);
  const [hasENS, setHasENS] = useState<boolean | undefined>(undefined);
  const [ensAddress, setEnsAddress] = useState<string>();
  const [walletAddress, setWalletAddress] = useState<string>();
  //    Stats States
  const [firstAndLast, setFirstAndLast] = useState<{
    first: string;
    last: string;
  }>(undefined);
  const [totalTokens, setTotals] = useState<{
    totalIn: number;
    totalOut: number;
  }>(undefined);
  const [totalTX, setTotalTX] = useState<number>(0);
  //  History
  const [sortedInHistory, setSortedInHistory] =
    useState<compileHistoryIntoDaysReturn>();
  const [sortedOutHistory, setSortedOutHistory] =
    useState<compileHistoryIntoDaysReturn>();

  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [isVotingOpen, setVotingOpen] = useState(false);

  useEffect(() => {
    //  Get the ENS resolver
    if (!ensResolver)
      useEnsResolver("mainnet").then((resolver) => setEnsResolver(resolver));
    //  Set the active timeline data
    if (activeTimeline && !sortedInHistory && !sortedOutHistory) {
      setSortedInHistory(activeTimeline.inByDate);
      setSortedOutHistory(activeTimeline.outByDate);
    }
    //  Check ENS
    if (!ready && !addressCheck.started && activeAddress && ensResolver) {
      setAddressCheck({ started: true, finished: false });
      const isEns = ensResolver.isENS(activeAddress);
      if (isEns) {
        setHasENS(true);
        setEnsAddress(activeAddress);
        ensResolver.addressFromEns(activeAddress).then((address) => {
          setWalletAddress(address);
          setAddressCheck({ started: true, finished: true });
        });
      } else {
        setWalletAddress(activeAddress);
        ensResolver.ensFromAddress(activeAddress).then((ens) => {
          if (ens) {
            setHasENS(true);
            setEnsAddress(ens);
            setAddressCheck({ started: true, finished: true });
          }
        });
      }
    }
    //  Start building starts
    if (!ready && !statsCheck.started && sortedInHistory && sortedOutHistory) {
      setStatsCheck({ started: true, finished: false });
      //  Build the stats data
      const dates = getFirstAndLastTransactions(
        sortedInHistory,
        sortedOutHistory
      );
      const totals = countTokens(sortedInHistory, sortedOutHistory);
      const totalTXs = countTransactions(sortedInHistory, sortedOutHistory);
      setFirstAndLast(dates);
      setTotals(totals);
      setTotalTX(totalTXs);

      setStatsCheck({ started: true, finished: true });
    }
    //  I fall finished set ready
    if (statsCheck.finished && addressCheck.finished && !ready) setReady(true);
  });

  if (ready)
    return (
      <Container extension={isFiltersOpen}>
        <DisplayAddress
          href={buildNetworkScanLink({
            network: "eth",
            address: walletAddress,
          })}
          target="blank"
        >
          {hasENS ? ensAddress : walletAddress}
        </DisplayAddress>
        <VotingArea>
          <VoteLabel
            onClick={() => setVotingOpen(isVotingOpen ? false : true)}
            isOpen={isVotingOpen}
          >
            <FontAwesomeIcon icon={isVotingOpen ? faAngleDown : faAngleRight} />
            VOTE
          </VoteLabel>
          {isVotingOpen && <UsersVotingArea />}
        </VotingArea>
        <WalletInfo>
          <UserStats
            handleOpenModal={handleOpenModal}
            firstAndLast={firstAndLast}
            totals={totalTokens}
            totalTX={totalTX}
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
      </Container>
    );
  else
    return (
      <Container>
        <Loader />
      </Container>
    );
}

export default UserInformation;
