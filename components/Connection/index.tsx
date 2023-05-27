/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { isAddress } from "ethers/lib/utils";
import { useWeb3Provider, Address } from "../../hooks/web3";
import useNFTimelineProvider, {
  searchUsersHistory,
  SearchAndConnectArea,
  addressSplitHistory,
  getTImelineDataReturn,
} from "hooks/NFTimelineProvider";
import { useRouter } from "next/router";
import { LoadingStates } from "types/stateTypes";

const ConnectionContainer = styled.div`
  height: fit-content;
  width: 100%;
  margin: auto;
`;

interface ConnectionProps {
  state: LoadingStates;
  handleStateChange: (state: LoadingStates) => void;
}

function Connection({ state, handleStateChange }: ConnectionProps) {
  const {
    getTimelineData,
    setActiveTimelineData,
    setActiveAddress,
    addNewTimelineData,
  } = useNFTimelineProvider();
  const { walletAddress, userProvider, localProvider } = useWeb3Provider();

  const [usersAddress, setUsersAddress] = useState<string>();
  const [searchInput, setSearchInput] = useState<string>();
  const [ensError, setEnsError] = useState<boolean>(false);
  const [badAddressError, setBadAddressError] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    //  Check if connected to user provider
    //  Set search address to attached address
    if (!connected && userProvider) {
      setSearchInput(walletAddress);
      setUsersAddress(walletAddress);
      setEnsError(false);
      setBadAddressError(false);
      setConnected(true);
    }
    //  If no connection or given, reset
    if (!connected && !usersAddress) {
      stateChangeHandler(0);
    }
  }, [connected, userProvider, walletAddress]);

  const stateChangeHandler = (state: LoadingStates) => {
    handleStateChange(state);
  };

  const handleInputChange = (input: string) => {
    console.log(input);
    setSearchInput(input);
    setEnsError(false);
    setBadAddressError(false);
  };

  const handelSearchUsersHistory = async (address?: string) => {
    stateChangeHandler(1);
    console.log("search for address: ", address ?? searchInput);
    const searchedAddress = new Address(address ?? searchInput, localProvider);
    searchedAddress.on("ready", async () => {
      const isLocal: addressSplitHistory | false = getTimelineData(
        searchedAddress.getAddress()
      );
      if (!isLocal) {
        const usersTimeline = await searchUsersHistory({
          address: searchedAddress,
          loadingStateCallback: stateChangeHandler,
          hasErrorCallback: setEnsError,
        });

        if (usersTimeline) {
          setActiveTimelineData(usersTimeline);
          setActiveAddress(searchedAddress);
          addNewTimelineData(searchedAddress.getAddress(), usersTimeline);
          router.push("/timeline");
        } else {
          setBadAddressError(true);
          stateChangeHandler(0);
        }
      } else {
        stateChangeHandler(5);
        setActiveTimelineData(isLocal);
        setActiveAddress(searchedAddress);
        router.push("/timeline");
      }
    });
  };

  const handleIsDisabled = (input: string): boolean => {
    let result = true;

    if (!!input && input.length > 5) {
      const isEns =
        input.slice(-4) === ".eth" || input.slice(-4) === ".ETH" ? true : false;

      if (isEns) {
        result = false;
      } else {
        result = !isAddress(input);
      }
    }
    return result;
  };

  return (
    <ConnectionContainer>
      <SearchAndConnectArea
        badAddressError={badAddressError}
        searchUsersHistory={handelSearchUsersHistory}
        handleIsDisabled={handleIsDisabled}
        handleInputChange={handleInputChange}
        loadingState={state}
        searchAddress={searchInput}
        ensError={ensError}
      />
    </ConnectionContainer>
  );
}

export default Connection;
