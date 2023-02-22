/** @format */

import { Loader } from "components/common";
import { ethers } from "ethers";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { getAllRankingData } from "hooks/NFTimelineProvider/api/getRankingData";
import searchUsersHistory from "hooks/NFTimelineProvider/helpers/searchAddressHistory";
import {
  AllBallotRankingData,
  Ranks,
  VoteRankData,
} from "hooks/NFTimelineProvider/types/RankingTypes";
import { useWeb3Provider } from "hooks/web3";
import Address from "hooks/web3/helpers/Address";
import { shortenWalletAddress } from "hooks/web3/helpers/textHelpers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getSortedBallotRankings from "./helpers/sortRankings";
import RankCard from "./RankCard";

interface BallotRankingProps {
  maxRankings?: number;
}

function BallotRanking({ maxRankings }: BallotRankingProps) {
  const { connectToGivenProvider, userProvider } = useWeb3Provider();
  const {
    getAllRankings,
    allBallotRankings,
    getTimelineData,
    setActiveTimelineData,
    setActiveAddress,
    addNewTimelineData,
  } = useNFTimelineProvider();
  const [loadingTimeline, setLoadingTimeline] = useState(false);
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
            console.log("connecting to provider: Ballot Ranking");
            if (userProvider) {
              console.log("connected to user provider: Ballot Ranking");
              setProvider(userProvider);
              setReady(true);
            } else {
              connectToGivenProvider("alchemy", "mainnet").then((prov) => {
                console.log("connected to provider: Ballot Ranking");
                setProvider(prov);
                setReady(true);
              });
            }
          } else
            getAllRankings().then((data: AllBallotRankingData) => {
              console.log("got ranking data: Ballot Ranking");
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
                console.log("connecting to provider: Ballot Ranking");
                if (userProvider) {
                  console.log("connected to user provider: Ballot Ranking");
                  setProvider(userProvider);
                  setReady(true);
                } else {
                  connectToGivenProvider("alchemy", "mainnet").then((prov) => {
                    console.log("connected to provider: Ballot Ranking");
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

  const handelAddressSelect = async (address: Address) => {
    console.log(address);
    setLoadingTimeline(true);
    const check = getTimelineData(address.getAddress());
    setActiveTimelineData(null);
    setActiveAddress(null);
    console.log(check);
    if (!check) {
      console.log("Getting Timeline data from API");
      //addNewTimelineData(searchedAddress.getAddress(), usersTimeline);
      // Logic to search for the data though API

      const usersTimeline = await searchUsersHistory({
        address: address,
        loadingStateCallback: () => {},
        hasErrorCallback: () => {},
      });

      if (usersTimeline) {
        setActiveTimelineData(usersTimeline);
        setActiveAddress(address);
        addNewTimelineData(address.getAddress(), usersTimeline);
        router.push("/timeline");
      }
      setLoadingTimeline(false);
    } else {
      // Logic to display the stored data
      setActiveTimelineData(check);
      setActiveAddress(address);
      router.push("/timeline");
    }
  };

  return (
    <Wrapper>
      <Title>Rankings</Title>
      <Container>
        {loadingTimeline && (
          <LoadingOver>
            <Loader />
          </LoadingOver>
        )}
        {ready &&
          !loadingTimeline &&
          ballotIds.map((id, keyA) => (
            <Ballot key={keyA} count={ballotIds.length}>
              <BallotId>{id}</BallotId>
              {ready &&
                ballotRankings[id]
                  .slice(0, maxRankings)
                  .map((rank, index) => (
                    <RankCard
                      key={rank.walletAddress}
                      rank={{ ...rank, rank: index + 1 }}
                      percentOfVotes={rank.shareOfVotes}
                      totalVotes={ranking[id].totalVotes}
                      provider={provider}
                      handelAddressSelect={handelAddressSelect}
                    />
                  ))}
            </Ballot>
          ))}
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
`;



const Container = styled.div`
  justify-content: center;
  align-items: top;
  padding: 20px;
  width: 100%;
  border: 1px solid #ddd;
  background-color: #ffffff38;
  border-radius: 10px;
  display: flex;
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
`;

const Ballot = styled.div`
  text-align: center;
  padding: 3px;
  width: ${({ count }) => 100 / count + "%"};
`;

const BallotId = styled.h2`
  font-size: 1.5rem;
  :hover {
    color: #00dbde;
    cursor: pointer;
  }
`;
const LoadingOver = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f8ff9c;
  position: absolute;
  overflow: clip;
  display: contents;
`;

export default BallotRanking;
