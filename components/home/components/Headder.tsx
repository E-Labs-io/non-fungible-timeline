/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWeb3Provider } from "hooks/web3";

const HeaderContainer = styled.div`
  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.282);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;
const PageTitle = styled.text`
  justify-content: center;
  align-items: center;
  display: flex;

  color: linear-gradient(
    to bottom,
    204deg,
    #00dbde 0%,
    #fc00ff 77%,
    #ffffff 100%
  );

  font-size: 50px;
  text-align: center;
`;

const WalletAddress = styled.div`
  justify-content: center;
  display: flex;
  font-size: 20px;
  text-align: center;
`;

interface HeaderProps {
  searchAddress: string;
  onReset: Function;
}

function Header({ searchAddress, onReset }: HeaderProps) {
  return (
    <HeaderContainer>
      <MainText>
        <br />
        <PageTitle>Non-Fungible Timeline</PageTitle>
        <WalletAddress>{searchAddress}</WalletAddress>
      </MainText>
    </HeaderContainer>
  );
}

export default Header;
