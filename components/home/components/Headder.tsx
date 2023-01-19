/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAnglesLeft,
  faBars,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { useWeb3Provider } from "hooks/web3";
import { Burger } from "components/common/Layout/Header/components";

const HeaderContainer = styled.div`
  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.282);
  height: 50px;
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

  background: #70ffde;
  background: linear-gradient(to bottom right, #70ffde 26%, #fc00ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #0b0b0b;

  font-size: 35px;
  text-align: center;
  font-family: "Kanit", sans-serif;
`;

const BackButton = styled.div`
  align-items: left;
  padding-left: 20px;
  color: #f7f7f7;
  width: 100%;
  :hover {
    transform: scale(1.05);
    color: #d80e9f;
    cursor: pointer;
  }
`;

const MenuArea = styled.div`
  width: 100%;
  align-items: right;
  justify-content: right;
  display: flex;
  padding: 20px;
`;

interface HeaderProps {
  onBack: Function;
}

function Header({ onBack }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleBack = () => onBack();
  return (
    <HeaderContainer>
      <BackButton>
        <FontAwesomeIcon onClick={handleBack} size="2xl" icon={faAnglesLeft} />
      </BackButton>
      <MainText>
        <PageTitle>NON-FUNGIBLE TIMELINE</PageTitle>
      </MainText>
      <MenuArea>
        <Burger open={isMenuOpen} setOpen={setIsMenuOpen} />
      </MenuArea>
    </HeaderContainer>
  );
}

export default Header;

