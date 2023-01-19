/** @format */

import { Loader } from "components/common";
import { compileHistoryIntoDaysReturn } from "helpers/dataSorting/compileHistoryIntoDays";
import { buildNetworkScanLink } from "hooks/web3/helpers/etherscanLink";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UserStats from "./components/UserStats";
import {
  countTokens,
  countTransactions,
  getFirstAndLastTransactions,
} from "./helpers/sortUserStats";

const Container = styled.div`
  background-color: #86848447;
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  width: 80%;
  min-height: 20vh;
  align-items: center;
  justify-content: center;
  padding: 5px;
  row-gap: 20px;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
`;
const DisplayAddress = styled.a`
  justify-content: center;
  display: flex;
  font-size: 40px;
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

  justify-content: space-evenly;
  align-items: center;
`;
const VotingArea = styled.div`
  width: 100%;
  height: 100%;
  border-left: 2px, solid, white;

  display: flex;

  justify-content: space-evenly;
  align-items: center;
`;

interface UserInformationProps {
  providedAddress: string;
  ensResolver;
  sortedInHistory: compileHistoryIntoDaysReturn;
  sortedOutHistory: compileHistoryIntoDaysReturn;
  handleOpenModal: (selected: "first" | "last") => void;
}

function UserInformation({
  providedAddress,
  ensResolver,
  sortedInHistory,
  sortedOutHistory,
  handleOpenModal,
}: UserInformationProps) {
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

  useEffect(() => {
    if (!ready && !addressCheck.started) {
      setAddressCheck({ started: true, finished: false });
      const isEns = ensResolver.isENS(providedAddress);
      if (isEns) {
        setHasENS(true);
        setEnsAddress(providedAddress);
        ensResolver.addressFromEns(providedAddress).then((address) => {
          setWalletAddress(address);
          setAddressCheck({ started: true, finished: true });
        });
      } else {
        setWalletAddress(providedAddress);
        ensResolver.ensFromAddress(providedAddress).then((ens) => {
          if (ens) {
            setHasENS(true);
            setEnsAddress(ens);
            setAddressCheck({ started: true, finished: true });
          }
        });
      }
    }
    if (!ready && !statsCheck.started) {
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
    if (statsCheck.finished && addressCheck.finished && !ready) setReady(true);
  });

  if (ready)
    return (
      <Container>
        <DisplayAddress
          href={buildNetworkScanLink({
            network: "eth",
            address: walletAddress,
          })}
          target="blank"
        >
          {hasENS ? ensAddress : walletAddress}
        </DisplayAddress>
        <WalletInfo>
          <UserStats
            handleOpenModal={handleOpenModal}
            firstAndLast={firstAndLast}
            totals={totalTokens}
            totalTX={totalTX}
          />
        </WalletInfo>
        <InteractionArea>
          <FilterArea>Search Filters</FilterArea>
          <VotingArea>Voting Options</VotingArea>
        </InteractionArea>
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
