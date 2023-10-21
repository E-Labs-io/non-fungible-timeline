/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Modal } from "../../../../components/common";
import { ConnectButton, useWeb3Provider } from "../../../web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import LoadingNotice from "./loadingNotice";
import FilterOptions from "components/timeline/components/userInfo/components/FilterOptions";
import useNFTimelineProvider from "hooks/NFTimelineProvider/hooks/useNFTimelineProvider";
import OpenSpyListButton from "components/spyList/OpenSpyListButton";
import SpyListModal from "components/spyList/spyListModal";
import ChainSelector from "hooks/web3/components/ChainSelector";

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ConnectionArea = styled.div`
  background-color: ${({ theme }) => theme.coloredTheme.transparentBG};
  border-radius: 20px;
  border-width: 1px;
  border-style: none;
  border-color: white;
  display: flex;
  flex-direction: column;
  width: 50vw;
  min-height: fit-content;
  align-items: center;
  justify-content: center;
  padding: 5px;
  row-gap: 5px;
  box-shadow: ${({ theme }) => theme.shadow.innerShadow};
`;

const Input = styled.input`
  width: ${({ width }) => (width ? width : "80%")};
  height: ${({ height }) => (height ? height : "40px")};
  margin-top: 10px;
  padding: 12px 15px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ffffff75;
  font-size: 1rem;
`;

const EnsWarning = styled.div`
  color: #a10202;
  font-size: large;
`;

const FilterArea = styled.div`
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const FilterLabel = styled.div`
  align-items: center;
  justify-content: center;
  padding: 5px;
  text-align: center;
`;

interface ConnectionAreaProps {
  handleInputChange: (input: any) => void;
  searchUsersHistory: () => void;
  handleIsDisabled: Function;
  loadingState: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  searchAddress: string;
  ensError: boolean;
  badAddressError: boolean;
}
function SearchAndConnectArea({
  handleInputChange,
  searchUsersHistory,
  handleIsDisabled,
  loadingState,
  searchAddress,
  ensError,
  badAddressError,
}: ConnectionAreaProps) {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const { getSpyList, spyList, onSelectedChainChange, selectedChains } =
    useNFTimelineProvider();
  const { userProvider, walletAddress } = useWeb3Provider();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (walletAddress && !spyList) getSpyList(walletAddress);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loadingState = 1;
    searchUsersHistory();
  };
  return (
    <Wrapper>
      <ConnectionArea>
        {loadingState === 0 && (
          <>
            <br />
            <ConnectButton />
            Or
            {userProvider && (
              <OpenSpyListButton handleClick={() => setIsOpen(true)} />
            )}
            <Input
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Wallet Address or ENS"
            />
            <ChainSelector
              availableChains={[
                "ETH_MAINNET",
                "MATIC_MAINNET",
                "ARB_MAINNET",
                "OPT_MAINNET",
              ]}
              onSelectedChain={onSelectedChainChange}
              activeChainStream={selectedChains}
              notForProvider
            />
            {ensError && (
              <EnsWarning>*ENS not recognised, please try another</EnsWarning>
            )}
            {badAddressError && (
              <EnsWarning>
                *Must be a baby wallet, we cant find any history for that
                address
              </EnsWarning>
            )}
            <Button
              onClick={handleSubmit}
              disabled={handleIsDisabled(searchAddress)}
            >
              Search
            </Button>
            <FilterArea>
              <FilterLabel
                onClick={() => setFiltersOpen(isFiltersOpen ? false : true)}
              >
                Filters
                <FontAwesomeIcon
                  icon={isFiltersOpen ? faAngleDown : faAngleUp}
                />
              </FilterLabel>
              {isFiltersOpen && <FilterOptions />}
            </FilterArea>
          </>
        )}
        <LoadingNotice loadingState={loadingState} />
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          title="Your Spy List"
        >
          <SpyListModal
            handleInputChange={handleInputChange}
            searchUsersHistory={searchUsersHistory}
            handleCloseModal={setIsOpen}
          />
        </Modal>
      </ConnectionArea>
    </Wrapper>
  );
}

export default SearchAndConnectArea;
