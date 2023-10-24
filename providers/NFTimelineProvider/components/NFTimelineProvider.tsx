/** @format */

import {
  Address,
  AddressBook,
  ActiveChainIndex,
  NetworkKeys,
  useWeb3Provider,
  SingleNFTDataType,
  NetworkNameToChainID,
} from "e-labs_web3provider";
import React, { useEffect, useState, createContext } from "react";
import { ApiError } from "types/genericTypes";
import { getAllRankingData } from "../api/getRankingData";
import postVote from "../api/postVote";
import getTokenMetadata from "../hooks/getTokenMetadata";
import getVerifiedContractList from "../hooks/getVerifiedContracts";
import { NFTimelineProviderContextType } from "../types";
import { timelineFilterStore } from "../types/FilterTypes";
import {
  addressCollection,
  addressSplitHistory,
  addTimelineFilter,
  checkIfAddressVoted,
  getTokenMetadataType,
  removeAllTimelineFilters,
  removeTimelineFilter,
  removeVote,
  StoredMetadataType,
  submitVote,
} from "../types/ProviderTypes";
import { AllBallotRankingData, Ranks } from "../types/RankingTypes";
import { VerifiedContractData } from "../types/verifiedContractsTypes";
import { addNewSpy, deleteFromSpyList, getUsersSpyList } from "../api/spyList";
import { deleteVote } from "../api/deleteVote";
import { checkIfWalletVoted } from "../api/getWalletsVotingData";
import { availableChains } from "../../../constants/chains";

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

  const getMetadata: getTokenMetadataType = async (
    contractAddress: string,
    tokenId: string,
    chain: NetworkKeys
  ) => {
    let metadata: SingleNFTDataType;

    if (
      !!storedMetadata[chain] &&
      !!storedMetadata[chain][contractAddress] &&
      !!storedMetadata[chain][contractAddress][tokenId]
    ) {
      //  If the metadata is stored locally
      metadata = storedMetadata[chain][contractAddress][tokenId];
    } else {
      //  If not local get from API
      metadata = await getTokenMetadata(
        NetworkNameToChainID[chain].ticker,
        contractAddress,
        tokenId
      );
      setStoredMetadata({
        ...storedMetadata,
        [chain]: { [contractAddress]: { [tokenId]: metadata } },
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
  const addTimelineFilter: addTimelineFilter = (filterOptions) => {
    let i: boolean | number = false;

    if (filterOptions.filterType === "chain") {
      const filter = timelineFilters;
      filter[0] = filterOptions.optionA;
      setTimelineFilters(filter);
      console.log("new filters : ", filter);
    } else {
      if (timelineFilters.length > 0) {
        timelineFilters.forEach((filter, index) => {
          if (filter.filterType === filterOptions.filterType) {
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
    }
  };

  const removeAllTimelineFilters: removeAllTimelineFilters = () => {
    setTimelineFilters([{ filterType: "chain", optionA: availableChains }]);
    setSelectedChains(availableChains);
  };

  const removeTimelineFilter: removeTimelineFilter = (filterType) => {
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

  const submitVote: submitVote = async (ballotId, voteData) =>
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
  const removeVote: removeVote = async (
    ballotId,
    voterAddress,
    votedForAddress
  ) =>
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

  const checkIfAddressVoted: checkIfAddressVoted = async (
    ballotId,
    voterAddress,
    votedForAddress
  ) =>
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
