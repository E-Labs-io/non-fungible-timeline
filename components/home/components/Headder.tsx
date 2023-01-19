/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faCircleLeft,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useWeb3Provider } from "hooks/web3";

const HeaderContainer = styled.div`
  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.282);
  height: 100%;
  display: flex;
  flex-direction: grid;
  grid-column: 3;
  justify-content: center;
  align-items: center;
`;

const MainText = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  width: 100%;
`;
const PageTitle = styled.text`
  justify-content: center;
  align-items: center;
  display: flex;

  color: white;

  font-size: 30px;
  text-align: center;
  font-family: "Kanit", sans-serif;
`;

const BackButton = styled.div`
  align-items: left;
  padding-left: 20px;
  color: #f7f7f7;
  width: 100%;
  :hover {
    scale: 1.05;
    color: #d80e9f;
  }
`;

const MenuArea = styled.div`
  width: 100%;
`;

interface HeaderProps {
  searchAddress: string;
  onReset: Function;
  onBack: Function;
}

function Header({ searchAddress, onReset, onBack }: HeaderProps) {
  const handleBack = () => onBack();
  return (
    <HeaderContainer>
      <BackButton>
        <FontAwesomeIcon onClick={handleBack} size="2xl" icon={faAnglesLeft} />
      </BackButton>
      <MainText>
        <br />
        <PageTitle>NON-FUNGIBLE TIMELINE</PageTitle>
      </MainText>
      <MenuArea></MenuArea>
    </HeaderContainer>
  );
}

export default Header;

/* 

  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

*/
