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

const ConnectionContainer = styled.div`
  height: 50%;
  width: 100%;
  margin: auto;
`;

function Connection({}) {
  const {
    getTimelineData,
    setActiveTimelineData,
    setActiveAddress,
    addNewTimelineData,
  } = useNFTimelineProvider();
  const { walletAddress, userProvider, localProvider } = useWeb3Provider();

  const [usersAddress, setUsersAddress] = useState<string>();
  const [searchInoput, setSearchInoput] = useState<string>();
  const [ensError, setEnsError] = useState<boolean>(false);
  const [badAddressError, setBadAddressError] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(
    0
  );

  const router = useRouter();

  useEffect(() => {
    //  Check if connected to user provider
    //  Set search address to attached address
    if (!connected && userProvider) {
      setSearchInoput(walletAddress);
      setUsersAddress(walletAddress);
      setEnsError(false);
      setBadAddressError(false);
      setConnected(true);
    }
    //  If no connection or given, reset
    if (!connected && !usersAddress) {
      setLoadingState(0);
    }
  });

  const handleInputChange = (input) => {
    setSearchInoput(input.target.value);
    setEnsError(false);
    setBadAddressError(false);
  };

  const handelSearchUsersHistory = async () => {
    setLoadingState(1);
    const searchedAddress = new Address(searchInoput, localProvider);
    searchedAddress.on("ready", async () => {
      const isLocal: addressSplitHistory | false = getTimelineData(
        searchedAddress.getAddress()
      );
      console.log(isLocal);
      if (!isLocal) {
        const usersTimeline = await searchUsersHistory({
          address: searchedAddress,
          loadingStateCallback: setLoadingState,
          hasErrorCallback: setEnsError,
        });

        if (usersTimeline) {
          setActiveTimelineData(usersTimeline);
          setActiveAddress(searchedAddress);
          addNewTimelineData(searchedAddress.getAddress(), usersTimeline);
          router.push("/timeline");
        } else {
          setBadAddressError(true);
          setLoadingState(0);
        }
      } else {
        setLoadingState(5);
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
        loadingState={loadingState}
        searchAddress={searchInoput}
        ensError={ensError}
      />
    </ConnectionContainer>
  );
}

export default Connection;
