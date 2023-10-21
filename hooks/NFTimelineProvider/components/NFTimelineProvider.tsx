/** @format */

import Address from "hooks/web3/helpers/Address";
import { SingleNFTDataType } from "hooks/web3/types/nftTypes";
import React, { useEffect, useState, createContext } from "react";
import { ApiError } from "types/genericTypes";
import { getAllRankingData } from "../api/getRankingData";
import postVote from "../api/postVote";
import getTokenMetadata from "../hooks/getTokenMetadata";
import getVerifiedContractList from "../hooks/getVerifiedContracts";
import { NFTimelineProviderContextType, Votes } from "../types";
import { timelineFilterStore, timelineFilterTypes } from "../types/FilterTypes";
import {
  addressCollection,
  addressSplitHistory,
  StoredMetadataType,
} from "../types/ProviderTypes";
import { AllBallotRankingData, Ranks } from "../types/RankingTypes";
import { VerifiedContractData } from "../types/verifiedContractsTypes";
import AddressBook from "hooks/web3/helpers/AddressManager";
import { addNewSpy, deleteFromSpyList, getUsersSpyList } from "../api/spyList";
import { useWeb3Provider } from "hooks/web3";
import { deleteVote } from "../api/deleteVote";
import { checkIfWalletVoted } from "../api/getWalletsVotingData";
import { ActiveChainIndex, NetworkKeys } from "hooks/web3/types/Chains";
import { availableChains } from "hooks/web3/constants/avalabuleChains";

export const NFTimelineProviderContext = createContext(
  {} as NFTimelineProviderContextType
);

//let storedMetadata: StoredMetadataType = { ethereum: {} };

const NFTimelineProvider = ({ children }) => {
  const { userProvider, walletAddress, userSigner, userSignMessage } =
    useWeb3Provider();
  const [verifiedContractList, setVerifiedContractList] =
    useState<VerifiedContractData[]>();
  const [storedMetadata, setStoredMetadata] = useState<StoredMetadataType>({
    ETH_MAINNET: {},
    MATIC_MAINNET: {},
    OPT_MAINNET: {},
    ARB_MAINNET: {},
  });
  const [selectedChains, setSelectedChains] =
    useState<ActiveChainIndex>(availableChains);
  const [timelineData, setTimelineData] = useState<addressCollection>({});
  const [activeTimeline, setActiveTimeline] = useState<addressSplitHistory>();
  const [activeAddress, setActiveAddress] = useState<Address>();
  const [timelineFilters, setTimelineFilters] = useState<timelineFilterStore[]>(
    [{ filterType: "chain", optionA: availableChains }]
  );

  const [initalRankingLoad, setInitalRankingLoad] = useState<boolean>(false);
  const [allBallotRankings, setAllBallotRankings] =
    useState<AllBallotRankingData>();

  useEffect(() => {
    if (!!!verifiedContractList) {
      //  Get verified contract data from API
      getVerifiedContractList().then((list) => setVerifiedContractList(list));
    }
  }, [verifiedContractList]);

  useEffect(() => {
    if (!allBallotRankings && !initalRankingLoad) {
      setInitalRankingLoad(true);
      updateRankingData().then(() => setInitalRankingLoad(false));
    }
  }, [allBallotRankings]);

  /**
   *  Metadata Management
   */

  const getMetadata = async (
    network: string,
    contractAddress: string,
    tokenId: string
  ): Promise<SingleNFTDataType> => {
    let metadata: SingleNFTDataType;

    if (
      !!storedMetadata.ETH_MAINNET &&
      !!storedMetadata.ETH_MAINNET[contractAddress] &&
      !!storedMetadata.ETH_MAINNET[contractAddress][tokenId]
    ) {
      //  If the metadata is stored locally
      metadata = storedMetadata.ETH_MAINNET[contractAddress][tokenId];
    } else {
      //  If not local get from API
      metadata = await getTokenMetadata(network, contractAddress, tokenId);
      const update = {
        ...storedMetadata,
        ethereum: { [contractAddress]: { [tokenId]: metadata } },
      };
      setStoredMetadata({
        ...storedMetadata,
        ETH_MAINNET: { [contractAddress]: { [tokenId]: metadata } },
      });
    }
    return metadata;
  };
  /**
   * Timeline Management
   */

  const setActiveTimelineData = (timelineData: addressSplitHistory) =>
    setActiveTimeline(timelineData);

  const getTimelineData = (address: string): addressSplitHistory | false =>
    !!timelineData[address] ? timelineData[address] : false;

  const addNewTimelineData = (address: string, timeline: addressSplitHistory) =>
    setTimelineData({ ...timelineData, [address]: timeline });

  /**
   * Timeline Filter Management
   */
  const addTimelineFilter = (filterOptions: timelineFilterStore) => {
    let i = null;
    if (timelineFilters.length > 0) {
      timelineFilters.forEach((filter, index) => {
        if (filter.filterType === filterOptions.filterType) {
          console.log("Filter Indext Chance : ", i);
          i = index;
        }
      });
    }

    if (i) {
      let newFilters = timelineFilters;
      newFilters[i] = filterOptions;
      setTimelineFilters(newFilters);
    } else {
      setTimelineFilters([...timelineFilters, filterOptions]);
    }
  };

  const removeAllTimelineFilters = () => {
    setTimelineFilters([{ filterType: "chain", optionA: availableChains }]);
    setSelectedChains(availableChains);
  };

  const removeTimelineFilter = (filterType: timelineFilterTypes) => {
    if (timelineFilters) {
      const newFilters: timelineFilterStore[] = [];
      timelineFilters.forEach((filter) => {
        if (filter.filterType !== filterType) newFilters.push(filter);
      });
      setTimelineFilters(newFilters);
    }
  };

  /**
   * Chain Selection
   */

  const onSelectedChainChange = (
    action: "add" | "remove",
    chain: NetworkKeys
  ) => {
    console.log("NFTimeline Provider : chain selected : ", action, chain);
    const preStorage = selectedChains;
    setSelectedChains({
      ...preStorage,
      [chain]: action === "add" ? true : false,
    });
  };

  /**
   * Verified Contract Management
   */
  const checkIfValidContract = (
    contractAddress: string
  ): false | VerifiedContractData => {
    let isVerified: false | VerifiedContractData = false;
    if (verifiedContractList.length > 0) {
      verifiedContractList.forEach((contractItem) => {
        contractItem.contracts.forEach((address) => {
          if (address.toLowerCase() === contractAddress)
            isVerified = contractItem;
        });
      });
    }
    return isVerified;
  };
  /**
   * Ranking Management
   */
  const updateRankingData = async () => {
    getAllRankingData().then((result: AllBallotRankingData | ApiError) => {
      if (result?.status) {
        console.log("Get ranking data error: ", result);
      } else {
        console.log("Got ranking data: ", result);
        setAllBallotRankings(result as AllBallotRankingData);
      }
    });
  };
  const getAllRankings = async (): Promise<AllBallotRankingData> => {
    if (!!allBallotRankings) return allBallotRankings;
    else return updateRankingData().then(() => allBallotRankings);
  };
  const getBallotRankings = (ballotId: string): Ranks =>
    allBallotRankings[ballotId];

  const submitVote = async (
    ballotId: string,
    voteData: Votes
  ): Promise<number> =>
    userSignMessage(
      userSigner,
      `NFTimeline: Giving ${activeAddress} a vote for ${ballotId}`
    ).then((result) =>
      result
        ? postVote(ballotId, voteData).then(async (result: number) => {
            if (result === 5) {
              await updateRankingData();
              return 5;
            } else return result;
          })
        : false
    );
  const removeVote = async (
    ballotId: string,
    voterAddress: string,
    votedForAddress: string
  ): Promise<boolean> =>
    checkIfAddressVoted(ballotId, voterAddress, votedForAddress).then(
      (result) =>
        result
          ? deleteVote(ballotId, voterAddress, votedForAddress).then(
              (result) => {
                if (result) {
                  updateRankingData();
                  return result;
                } else return result;
              }
            )
          : false
    );

  const checkIfAddressVoted = async (
    ballotId: string,
    voterAddress: string,
    votedForAddress: string
  ): Promise<boolean> =>
    checkIfWalletVoted(ballotId, voterAddress, votedForAddress).then(
      (result) => result
    );

  /**
   *  Spy List
   */
  const [spyList, setSpyList] = useState<AddressBook>();

  useEffect(() => {
    if (walletAddress && !spyList) getSpyList(walletAddress);
  });
  const getSpyList = async (usersAddress: string): Promise<AddressBook> => {
    console.log("getting spy list");
    setSpyList(null);
    const spyAddressBook = new AddressBook(userProvider, {
      addressOrEns: usersAddress,
    });
    return await getUsersSpyList(usersAddress).then((spyList) => {
      if (spyList) {
        Object.keys(spyList).forEach((index) => {
          spyAddressBook.addAddress(spyList[index]);
        });
      }
      setSpyList(spyAddressBook);
      console.log(spyAddressBook);
      return spyAddressBook;
    });
  };

  const addToSpyList = async (
    usersAddress: string,
    spyAddress: string
  ): Promise<boolean> =>
    spyList.addressExists(spyAddress)
      ? false
      : addNewSpy(usersAddress, spyAddress).then((result) => {
          if (result) {
            spyList.addAddress(spyAddress);
            return postVote("insider", {
              voter: usersAddress,
              votedFor: spyAddress,
              timestamp: new Date(),
            }).then(() => {
              return getSpyList(usersAddress).then((result) => {
                updateRankingData();
                return true;
              });
            });
          } else return false;
        });

  const removeFromSpyList = async (
    usersAddress: string,
    spyAddress: string
  ): Promise<false | AddressBook> =>
    spyList.addressExists(spyAddress)
      ? await deleteFromSpyList(usersAddress, spyAddress).then((result) => {
          if (result) {
            deleteVote("insider", usersAddress, spyAddress).then(() =>
              updateRankingData()
            );
            console.log("deleted address from list");
            return getSpyList(usersAddress).then((newList) => newList);
          } else return false;
        })
      : false;

  return (
    <NFTimelineProviderContext.Provider
      value={{
        getTokenMetadata: getMetadata,
        getTimelineData,
        setActiveTimelineData,
        setActiveAddress,
        addNewTimelineData,
        addTimelineFilter,
        removeAllTimelineFilters,
        removeTimelineFilter,
        checkIfValidContract,
        checkIfAddressVoted,
        submitVote,
        getAllRankings,
        getBallotRankings,
        getSpyList,
        addToSpyList,
        removeFromSpyList,
        removeVote,
        timelineFilters,
        activeTimeline,
        verifiedContractList,
        activeAddress,
        allBallotRankings,
        spyList,
        selectedChains,
        onSelectedChainChange,
      }}
    >
      {children}
    </NFTimelineProviderContext.Provider>
  );
};

export default NFTimelineProvider;
