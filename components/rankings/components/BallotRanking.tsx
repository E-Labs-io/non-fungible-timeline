/** @format */

import { Loader } from "components/common";
import { ethers } from "ethers";
import useNFTimelineProvider, {
  getAllRankingData,
  searchUsersHistory,
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider";
import LoadingNotice from "hooks/NFTimelineProvider/components/SearchAndConnectArea/loadingNotice";
import { useWeb3Provider, Address } from "hooks/web3";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingStates } from "types/stateTypes";
import getSortedBallotRankings from "./helpers/sortRankings";
import RankCard from "./RankCard";
import RankingTable from "./RankingTable";

interface BallotRankingProps {
  maxRankings?: number;
  handelStateChange: (state) => void;
  loadingState?: LoadingStates;
}

function BallotRanking({
  maxRankings,
  handelStateChange,
  loadingState,
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
              connectToGivenProvider("alchemy", "mainnet").then((prov) => {
                setProvider(prov);
                setReady(true);
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
                  connectToGivenProvider("alchemy", "mainnet").then((prov) => {
                    setProvider(prov);
                    setReady(true);
                  });
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
      const usersTimeline = await searchUsersHistory({
        address: address,
        loadingStateCallback: stateChangeHandler,
        hasErrorCallback: () => {},
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
        {ready && loadingState === 0 && (
          <RankingTable
            handelAddressSelect={handelAddressSelect}
            ballotIds={ballotIds}
            ballotRankings={ballotRankings}
            maxRankings={maxRankings}
          />
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-width: 70vw;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  font-size: 2rem;
  display: flex;
  justify-content: left;
  text-align: left;
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
  overflow: hidden;
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
