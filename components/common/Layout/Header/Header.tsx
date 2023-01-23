/** @format */

import React, { useState, useRef, useContext, useMemo } from "react";
import FocusLock from "react-focus-lock";
import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

import { Burger, Menu } from "./components";
import { useOnClickOutside } from "hooks/component/useOnClickOutside";
import { device } from "constants/media";
import useWindowSize from "hooks/window/useWindowSize";
import FlatMenu from "./components/FlatMenu";
import { UserWeb3Context } from "hooks/web3/userWeb3Provider";
import { ExtraStyleProps } from "types/genericTypes";

const StyledHeader = styled.header`
  position: relative;
  height: 55px;
  display: flex;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 15px;
  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.282);
  background: transparent;
`;

const HeaderLogoContainer = styled.div`
  display: block;

  @media ${device.mobileL} {
    display: none;
  }
`;

const Logo = styled(Image)``;

const LogoContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  &:hover {
    transform: scale(1.1);
  }
`;

const TwitterLogoContainer = styled.a`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  margin: 2px 0 0;
  &:hover {
    transform: scale(1.1);
  }
`;

const RightIconsContainer = styled.div`
  display: inline-grid;
  grid-auto-flow: column;
  column-gap: 30px;
  align-items: center;

  @media ${device.mobileS} {
    column-gap: 5vw;
  }
`;

const LinksContainer = styled.div<ExtraStyleProps>`
  position: absolute;
  top: 6px;
  ${({ showSmallMenu }) =>
    showSmallMenu
      ? css`
          right: 82px;
        `
      : css`
          left: 82px;
        `}

  z-index: 4;
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

  font-size: 40px;
  text-align: center;
  font-family: "Kanit", sans-serif;
`;

const menuItems = [
  { label: "Score Board", link: "/" },
  { label: "F.A.Q.", link: "/faq" },
];

const Header = ({ onBack }) => {
  const [open, setOpen] = useState(false);
  const { width } = useWindowSize();
  const headerRef = useRef();
  const menuId = "main-menu";

  useOnClickOutside(headerRef, () => setOpen(false));

  const { shortWalletAddress } = useContext(UserWeb3Context);

  const showSmallMenu = width < 780;

  const showDarkLogo = true;

  return (
    <StyledHeader ref={headerRef}>
      <HeaderLogoContainer>
        <BackButton>
          <FontAwesomeIcon
            onClick={onBack ? onBack : null}
            size="2xl"
            icon={faAnglesLeft}
          />
        </BackButton>
      </HeaderLogoContainer>
      <div></div>
      <PageTitle>NON-FUNGIBLE TIMELINE</PageTitle>
      {showSmallMenu ? (
        <FocusLock disabled={!open}>
          <div>
            <Menu
              showSmallMenu={showSmallMenu}
              open={open}
              setOpen={setOpen}
              id={menuId}
              menuItems={menuItems}
              walletConnectCallback={() => {}}
            />
          </div>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
        </FocusLock>
      ) : (
        <FocusLock disabled={!open}>
          <div>
            <Menu
              open={open}
              setOpen={setOpen}
              id={menuId}
              menuItems={menuItems}
              walletConnectCallback={() => {}}
            />
          </div>
          <FlatMenu open={open} setOpen={setOpen} ariaControls={menuId} />
        </FocusLock>
      )}
    </StyledHeader>
  );
};

export default Header;
