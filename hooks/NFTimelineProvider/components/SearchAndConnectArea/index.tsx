/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../../../components/common";
import { ConnectButton, useWeb3Provider } from "../../../web3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import LoadingNotice from "./loadingNotice";
import FilterOptions from "components/timeline/components/userInfo/components/FilterOptions";

const PreLoadLayout = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  display: flex;
  column-gap: 30px;
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
  min-height: 20vh;
  align-items: center;
  justify-content: center;
  padding: 5px;
  row-gap: 20px;
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
  const handleSubmit = (e) => {
    e.preventDefault();
    loadingState = 1;
    searchUsersHistory();
  };
  return (
    <PreLoadLayout>
      <ConnectionArea>
        {loadingState === 0 && (
          <>
            <br />
            <ConnectButton />
            Or
            <Input
              onChange={handleInputChange}
              placeholder="Wallet Address or ENS"
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
      </ConnectionArea>
    </PreLoadLayout>
  );
}

export default SearchAndConnectArea;
