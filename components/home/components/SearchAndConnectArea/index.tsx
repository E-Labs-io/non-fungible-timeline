/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "../../../common";
import { ConnectButton, useWeb3Provider } from "../../../../hooks/web3";
import LoadingNotice from "./loadingNotice";

const PreLoadLayout = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
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

const PageTitle = styled.div`
  justify-content: center;
  align-items: center;

  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #000000;
  font-family: "Kanit", sans-serif;
  font-size: 70px;
  text-align: center;
`;

interface ConnectionAreaProps {
  handleInputChange;
  searchUsersHistory;
  handleIsDisabled;
  loadingState;
  usersAddress;
}
function SearchAndConnectArea({
  handleInputChange,
  searchUsersHistory,
  handleIsDisabled,
  loadingState,
  usersAddress,
}: ConnectionAreaProps) {
  const { walletAddress, userProvider, connectToGivenProvider } =
    useWeb3Provider();
  return (
    <PreLoadLayout>
      <PageTitle>Non-Fungible Timeline</PageTitle>
      <br />
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
            <Button
              onClick={searchUsersHistory}
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
