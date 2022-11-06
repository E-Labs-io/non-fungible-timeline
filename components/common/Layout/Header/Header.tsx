/** @format */

import React, { useState, useRef, useContext, useMemo } from "react";
import FocusLock from "react-focus-lock";
import styled, { css } from "styled-components";
import Image from "next/image";
import Link from "next/link";

import DegenXChangeLogo from "../../../../public/images/logo.png";
import TwitterLogoWhite from "../../../../public/images/twitter-logo-white.png";
import TwitterLogoBlack from "../../../../public/images/twitter-logo-black.png";
import DiscordLogoWhite from "../../../../public/images/discord-logo-white.png";
import DiscordLogoBlack from "../../../../public/images/discord-logo-black.png";
import OpenseaLogoWhite from "../../../../public/images/opensea-logo-white.png";
import OpenseaLogoBlack from "../../../../public/images/opensea-logo-black.png";
import { Burger, Menu } from "./components";
import { useOnClickOutside } from "hooks/component/useOnClickOutside";
import { device } from "config/media";
import useWindowSize from "hooks/window/useWindowSize";
import FlatMenu from "./components/FlatMenu";
import { UserWeb3Context } from "hooks/web3/userWeb3Provider";
import { ExtraStyleProps } from "types/genericTypes";

const StyledHeader = styled.header`
  position: relative;
  height: 52px;
  background-color: ${({ theme }) => theme.offWhite};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 15px;

  background: ${({ theme, themeType }) => theme.coloredTheme.background};
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

const menuItems = [
  { label: "degenXchange", link: "/" },
  { label: "Draw History", link: "/drawHistory" },
  { label: "F.A.Q.", link: "/faq" },
  { label: "Contact", link: "/contact" },
];

const Header = ({}) => {
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
        <Link href="/" passHref>
          <LogoContainer>
            <Logo
              priority
              src={DegenXChangeLogo}
              width={30}
              height={30}
              alt="degenXchange logo"
            />
          </LogoContainer>
        </Link>
      </HeaderLogoContainer>
      <div></div>
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

      <LinksContainer showSmallMenu={showSmallMenu}>
        <RightIconsContainer>
          {/*
          <LogoContainer href="https://discord.com/app" target="_blank">
            {showDarkLogo ? (
              <Logo src={DiscordLogoBlack} width={30} height={30} />
            ) : (
              <Logo src={DiscordLogoWhite} width={30} height={30} />
            )}
          </LogoContainer>
          */}
          <TwitterLogoContainer
            href="https://twitter.com/degenexchange"
            target="_blank"
          >
            {!open || !showSmallMenu ? (
              <Logo src={TwitterLogoWhite} width={30} height={25} />
            ) : (
              <Logo src={TwitterLogoBlack} width={30} height={25} />
            )}
          </TwitterLogoContainer>
        </RightIconsContainer>
      </LinksContainer>
    </StyledHeader>
  );
};

export default Header;
