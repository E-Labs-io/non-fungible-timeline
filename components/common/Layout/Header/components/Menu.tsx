/** @format */

import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Button } from "components/common";
import UserWeb3Provider, { UserWeb3Context } from "hooks/web3/userWeb3Provider";
import Web3ConnectButton from "hooks/web3/components/ConnectButton";
import { ExtraStyleProps } from "types/genericTypes";
import useWindowSize from "hooks/window/useWindowSize";

const StyledMenu = styled.nav<ExtraStyleProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.offWhite};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: ${({ windowHeight }) =>
    windowHeight ? `${windowHeight}px` : "100vh"};
  text-align: right;
  padding: 32px 32px 32px 42px;
  position: absolute;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 3;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      opacity: 0.7;
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin: 0 0 20px;
  justify-content: center;
`;

const MadeByContainer = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: ${({ theme }) => theme.primaryDark};

  a {
    margin-left: 3px;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    text-transform: uppercase;
    padding: 0 0;
    font-weight: bold;
    letter-spacing: 0.2rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
    &:hover {
      opacity: 0.7;
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;

interface MenuProps {
  showSmallMenu?: boolean;
  menuItems?: { label?: string; link?: string }[];
  open: boolean;
  [x: string]: any;
}

function Menu({ showSmallMenu, menuItems, open, ...props }: MenuProps) {
  const { shortWalletAddress, connectToUsersProvider } =
    useContext(UserWeb3Context);
  const { height: windowHeight } = useWindowSize();
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  const renderMenuItems = () =>
    menuItems?.map(({ label, link }) => (
      <Link href={link} passHref key={label}>
        <a tabIndex={tabIndex}>{label}</a>
      </Link>
    ));

  return (
    <StyledMenu
      windowHeight={windowHeight}
      open={open}
      aria-hidden={!isHidden}
      {...props}
    >
      {showSmallMenu && (
        <ButtonContainer>
          <Web3ConnectButton fontSize="14px" padding="8px 10px" />
        </ButtonContainer>
      )}
      {renderMenuItems()}
      <MadeByContainer>
        Made by <a href="https://nylonblocks.io">Nylon</a>
      </MadeByContainer>
    </StyledMenu>
  );
}

export default Menu;
