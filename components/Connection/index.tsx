/** @format */
import { useWeb3Provider } from "../../hooks/web3";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchAndConnectArea from "hooks/NFTimelineProvider/components/SearchAndConnectArea";
import { isAddress } from "ethers/lib/utils";
import searchUsersHistory from "hooks/NFTimelineProvider/helpers/searchAddressHistory";
import { useNFTimelineProvider } from "hooks/NFTimelineProvider";
import { useRouter } from "next/router";
import { addressSplitHistory } from "hooks/NFTimelineProvider/types/ProviderTypes";

const ConnectionContainer = styled.div`
  height: 50%;
  width: 100%;
`;

function Connection({}) {
  const { getTimelineData, setActiveTimelineData, setActiveAddress } =
    useNFTimelineProvider();
  const { walletAddress, userProvider, useEnsResolver } = useWeb3Provider();
  const [EnsResolver, setEnsResolver] = useState<any>();
  const [usersAddress, setUsersAddress] = useState<string>();
  const [otherAddress, setOtherAddress] = useState<boolean>(false);
  const [ensError, setEnsError] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6>(
    0
  );

  const router = useRouter();

  useEffect(() => {
    //  Get ENS Resolver
    if (!EnsResolver) {
      useEnsResolver("mainnet").then((resolver) => setEnsResolver(resolver));
    }
    //  Check if connected to user provider
    //  Set search address to attached address
    if (!connected && userProvider) {
      setUsersAddress(walletAddress);
      setEnsError(false);
      setConnected(true);
    }
    //  If no connection or given, reset
    if (!!walletAddress && usersAddress !== walletAddress && !otherAddress) {
      setLoadingState(0);
    }
  });

  const handleInputChange = (input) => {
    setUsersAddress(input.target.value);
    setEnsError(false);
  };

  const handelSearchUsersHistory = async () => {
    setLoadingState(1);
    const isLocal: addressSplitHistory | false = getTimelineData(usersAddress);
    if (!isLocal) {
      const usersTimeline = await searchUsersHistory({
        addressOrEns: usersAddress,
        loadingStateCallback: setLoadingState,
        hasErrorCallback: setEnsError,
        ensResolver: EnsResolver,
      });

      if (usersTimeline) {
        setActiveTimelineData(usersTimeline);
        setActiveAddress(usersTimeline.searchAddress);
        router.push("/timeline");
      } else {
        setLoadingState(0);
      }
    } else {
      setActiveTimelineData(isLocal);
      setActiveAddress(isLocal.searchAddress);
      router.push("/timeline");
    }
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
        handleInputChange={handleInputChange}
        searchUsersHistory={handelSearchUsersHistory}
        handleIsDisabled={handleIsDisabled}
        loadingState={loadingState}
        usersAddress={usersAddress}
        ensError={ensError}
      />
    </ConnectionContainer>
  );
}

export default Connection;
