/** @format */

import { Loader } from "components/common";
import { ethers } from "ethers";
import useNFTimelineProvider, {
  getAllRankingData,
  searchUsersHistory,
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "providers/NFTimelineProvider";
import LoadingNotice from "providers/NFTimelineProvider/components/SearchAndConnectArea/loadingNotice";
import { useWeb3Provider, Address } from "e-labs_web3provider";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingStates } from "types/stateTypes";
import getSortedBallotRankings from "../helpers/sortRankings";
import RankCard from "./RankCard";
import RankingTable from "./RankingTable";
import { availableChains } from "e-labs_web3provider";
import RankingBallotTable from "./RankingBalletTable";

interface BallotRankingProps {
  maxRankings?: number;
  handelStateChange: (state) => void;
  loadingState?: LoadingStates;
  individualBallots?: true;
}

function BallotRanking({
  maxRankings,
  handelStateChange,
  loadingState,
  individualBallots,
}: BallotRankingProps) {
  const { connectToGivenProvider, userProvider } = useWeb3Provider();
  const {
    getAllRankings,
    allBallotRankings,
    getTimelineData,
    setActiveTimelineData,
    setActiveAddress,
    addNewTimelineData,
  } = useNFTimelineProvider();

  const [ranking, setRanking] = useState<AllBallotRankingData>();
  const [provider, setProvider] = useState<ethers.providers.Provider>();
  const [ballotIds, setBallotIds] = useState<string[]>([]);
  const [ballotRankings, setBallotRankings] = useState<{
    [ballotId: string]: VoteRankData[];
  }>();

  const router = useRouter();

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!ready) {
      if (!ranking) {
        if (!!allBallotRankings) {
          setRanking(allBallotRankings);
          const ids = Object.keys(allBallotRankings);
          const ranks = {};
          const sorted = getSortedBallotRankings(allBallotRankings);
          ids.forEach((id) => {
            ranks[id] = sorted[id].rankings;
          });
          setBallotIds(ids);
          setBallotRankings(ranks);
          if (!!!provider) {
            if (userProvider) {
              setProvider(userProvider);
              setReady(true);
            } else {
              connectToGivenProvider("alchemy", "ETH_MAINNET").then((prov) => {
                if (prov) {
                  setProvider(prov);
                  setReady(true);
                } else setReady(false);
              });
            }
          } else
            getAllRankings().then((data: AllBallotRankingData) => {
              setRanking(data);
              const ids = Object.keys(data);
              const ranks = {};
              const sorted = getSortedBallotRankings(data);
              ids.forEach((id) => {
                ranks[id] = sorted[id].rankings;
              });
              setBallotIds(ids);
              setBallotRankings(ranks);
              if (!!!provider) {
                if (userProvider) {
                  setProvider(userProvider);
                  setReady(true);
                } else {
                  connectToGivenProvider("alchemy", "ETH_MAINNET").then(
                    (prov) => {
                      if (prov) {
                        setProvider(prov);
                        setReady(true);
                      } else setReady(false);
                    }
                  );
                }
              }
            });
        }
      }
    }
    if (ready && allBallotRankings !== ranking) {
      setRanking(allBallotRankings);
      const ids = Object.keys(allBallotRankings);
      const ranks = {};
      const sorted = getSortedBallotRankings(allBallotRankings);
      ids.forEach((id) => {
        ranks[id] = sorted[id].rankings;
      });
      setBallotIds(ids);
      setBallotRankings(ranks);
    }
  }, [ready, allBallotRankings, provider, userProvider]);

  const stateChangeHandler = (state: LoadingStates) => {
    handelStateChange(state);
  };

  const handelAddressSelect = async (address: Address) => {
    stateChangeHandler(1);

    const check = getTimelineData(address.getAddress());
    setActiveTimelineData(null);
    setActiveAddress(null);
    if (!check) {
      // Logic to search for the data though API
      const chains = [];
      Object.keys(availableChains).forEach((key) => {
        if (availableChains[key]) chains.push(key);
      });
      const usersTimeline = await searchUsersHistory({
        address: address,
        loadingStateCallback: stateChangeHandler,
        hasErrorCallback: () => {},
        chains,
      });

      if (usersTimeline) {
        setActiveTimelineData(usersTimeline);
        setActiveAddress(address);
        addNewTimelineData(address.getAddress(), usersTimeline);
        router.push("/timeline");
      }
    } else {
      // Logic to display the stored data
      setActiveTimelineData(check);
      setActiveAddress(address);
      router.push("/timeline");
    }
  };

  const handelGoToRankingPage = () => router.push("/ranking");
  return (
    <Wrapper>
      <Title onClick={handelGoToRankingPage}>Rankings</Title>
      <Container>
        {loadingState > 0 && (
          <LoadingOver>
            <LoadingNotice loadingState={loadingState} />
          </LoadingOver>
        )}
        {ready && loadingState === 0 && !individualBallots && (
          <RankingTable
            handelAddressSelect={handelAddressSelect}
            ballotIds={ballotIds}
            ballotRankings={ballotRankings}
            maxRankings={maxRankings}
          />
        )}
        {ready &&
          loadingState === 0 &&
          individualBallots &&
          ballotIds.map((id) => (
            <RankingBallotTable
              handelAddressSelect={handelAddressSelect}
              ballotId={id}
              ballotRankings={ballotRankings[id]}
              maxRankings={maxRankings ?? ballotRankings[id].length}
            />
          ))}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-width: 95vw;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
`;

const Title = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  padding-left: 10%;
  :hover {
    cursor: pointer;
    color: #00dbde;
  }
`;

const Container = styled.div`
  justify-content: center;
  align-items: top;
  padding: 20px;
  width: 100%;
  height: fit-content;
  border: 1px none #ddd;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 10px;
`;

const LoadingOver = styled.div`
  width: 70vw;
  min-height: 200px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
  background-color: #a3a3a352;
  position: relative;
`;

export default BallotRanking;
