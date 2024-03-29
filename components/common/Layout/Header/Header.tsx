/** @format */

import React, { useState, useRef, useContext, useMemo } from "react";
import FocusLock from "react-focus-lock";
import styled, { css } from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

import { Burger, Menu } from "./components";
import { useOnClickOutside } from "hooks/component/useOnClickOutside";
import { device } from "constants/media";
import useWindowSize from "hooks/window/useWindowSize";
import FlatMenu from "./components/FlatMenu";

import { useRouter } from "next/router";
import Image from "next/image";

const StyledHeader = styled.div`
  position: relative;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 5;
  padding: 0 15px;
  box-shadow: 0px 0px 42px 5px rgba(112, 110, 110, 0.282);
`;

const HeaderRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const LogoImageContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const Logo = styled(Image)`
  height: 60px; // adjust this value as needed
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px;
  &:hover {
    transform: scale(1.1);
  }

  @media ${device.tabletS} {
    height: 40px; // adjust this value as needed
  }
`;

const FlatMenuContainer = styled.div`
  width: auto;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const BackButton = styled.div`
  align-items: left;
  padding-left: 20px;
  color: #f7f7f7;
  :hover {
    transform: scale(1.05);
    color: #d80e9f;
    cursor: pointer;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const menuItems = [
  { label: "Home", link: "/" },
  { label: "Rankings", link: "/ranking" },
  { label: "F.A.Q.", link: "/faq" },
];

const Header = ({ onBack, onMenu }) => {
  const [open, setOpen] = useState(false);
  const { width, height } = useWindowSize();
  const router = useRouter();
  const headerRef = useRef();
  const menuId = "main-menu";

  const handleMenu = (flag: boolean) => {
    onMenu(flag);
    setOpen(flag);
  };

  useOnClickOutside(headerRef, () => handleMenu(false));

  const goHome = () => router.push("/");

  const showSmallMenu = width < 780;

  const showDarkLogo = true;

  return (
    <StyledHeader ref={headerRef}>
      <HeaderRow>
        <HeaderSection>
          <BackButton>
            <FontAwesomeIcon
              onClick={onBack ? onBack : null}
              size="2xl"
              icon={faAnglesLeft}
            />
          </BackButton>
        </HeaderSection>
        <HeaderSection>
          <LogoImageContainer>
            <Logo
              onClick={goHome}
              src="/images/logo-short_gradient-01.png"
              width={width ? width * 0.35 : 300}
              height="60"
            />
          </LogoImageContainer>
        </HeaderSection>
        <HeaderSection>
          <FlatMenuContainer>
            {showSmallMenu ? (
              <FocusLock disabled={!open}>
                <div>
                  <Menu
                    showSmallMenu={showSmallMenu}
                    open={open}
                    setOpen={handleMenu}
                    id={menuId}
                    menuItems={menuItems}
                    walletConnectCallback={() => {}}
                  />
                </div>
                <Burger
                  open={open}
                  setOpen={handleMenu}
                  aria-controls={menuId}
                />
              </FocusLock>
            ) : (
              <FocusLock disabled={!open}>
                <div>
                  <Menu
                    open={open}
                    setOpen={handleMenu}
                    id={menuId}
                    menuItems={menuItems}
                    walletConnectCallback={() => {}}
                  />
                </div>
                <FlatMenu
                  open={open}
                  setOpen={handleMenu}
                  ariaControls={menuId}
                />
              </FocusLock>
            )}
          </FlatMenuContainer>
        </HeaderSection>
      </HeaderRow>
    </StyledHeader>
  );
};

export default Header;
