/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../../../components/common";
import { ConnectButton, useWeb3Provider } from "../../../web3";
import LoadingNotice from "./loadingNotice";

const PreLoadLayout = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;

  display: flex;
  column-gap: 30px;
`;

const ConnectionArea = styled.div`
  background-color: #86848447;
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
  box-shadow: inset 0px 0px 15px 2px rgba(207, 207, 207, 0.682);
`;

const Input = styled.input`
  width: ${({ width }) => (width ? width : "500px")};
  height: ${({ height }) => (height ? height : "50px")};
  margin-top: 10px;
  padding: 12px 15px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  background-color: #ffffff75;
`;

const EnsWarning = styled.div`
  color: #a10202;
  font-size: large;
`;

interface ConnectionAreaProps {
  handleInputChange: (input: any) => void;
  searchUsersHistory: () => void;
  handleIsDisabled: Function;
  loadingState: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  usersAddress: string;
  ensError: boolean;
}
function SearchAndConnectArea({
  handleInputChange,
  searchUsersHistory,
  handleIsDisabled,
  loadingState,
  usersAddress,
  ensError,
}: ConnectionAreaProps) {
  const handleSubmit = () => {
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
            <Button
              onClick={handleSubmit}
              disabled={handleIsDisabled(usersAddress)}
            >
              Search
            </Button>
          </>
        )}
        <LoadingNotice loadingState={loadingState} />
      </ConnectionArea>
    </PreLoadLayout>
  );
}

export default SearchAndConnectArea;
