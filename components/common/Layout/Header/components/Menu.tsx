/** @format */

import React, { useContext } from "react";
import Link from "next/link";
import styled from "styled-components";

import { ExtraStyleProps } from "types/genericTypes";
import { device, laptop, tablet } from "constants/media";
import useWindowSize from "hooks/window/useWindowSize";

import { ConnectButton } from "hooks/web3";

/**
 *   transform: ${({ open }) => (open ? "translateY(55px)" : "translateY(0)")};
 *
 * ${({ open }) => (open ? 1 : 0)};
 */

const StyledMenu = styled.nav<ExtraStyleProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background: white;
  z-index: -1;
  transform: ${({ open }) => (open ? "translateY(50px)" : "translateY(0px)")};
  height: 55px;
  width: 100vw;
  text-align: center;
  padding: 10px;
  position: fixed;

  right: 0;
  opacity: ${({ open }) => (open ? "100%" : "0%")};
  transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out,
    z-index 0.3s ease-in-out;
  column-gap: 200px;
  @media ${device.laptop} {
    transform: ${({ open }) => (open ? "translateY(50px)" : "translateY(0px)")};
    height: ${({ open, height }) =>
      open ? (height ? height : "100vh") : "0px"};
    top: 55;
    left: 0;
    overflow: hidden;
    flex-direction: column;
    z-index: 5;
  }
  a {
    font-size: 2rem;
    text-transform: uppercase;

    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transition: color 0.3s linear;
    @media ${device.mobileL} {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      opacity: 0.7;
      color: #f50cbb;
    }
  }
`;

const MenuContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%;

  @media ${device.laptop} {
    display: flex;
    height: 80vh;
    flex-direction: column;

    row-gap: 10px;
    align-items: center;
  }
`;
const MadeByContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding-bottom: 5%;
`;

const MadeByText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  position: absolute;

  right: 20px;
  color: ${({ theme }) => theme.primaryDark};

  a {
    margin-left: 3px;
    font-size: medium;
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

const ConnectContainer = styled.div`
  align-items: center;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

interface MenuProps {
  showSmallMenu?: boolean;
  menuItems?: { label?: string; link?: string }[];
  open: boolean;
  [x: string]: any;
}

function Menu({ showSmallMenu, menuItems, open, ...props }: MenuProps) {
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;
  const { width, height } = useWindowSize();

  const renderMenuItems = () =>
    menuItems?.map(({ label, link }) => (
      <Link href={link} passHref key={label} tabIndex={tabIndex}>
        {label}
      </Link>
    ));

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props} height={null}>
      <MenuContentContainer>
        {renderMenuItems()}
        {width < tablet && (
          <ConnectContainer>
            <ConnectButton onClick={() => (open = false)} />
          </ConnectContainer>
        )}
        {width < laptop && (
          <MadeByContainer>
            <MadeByText>
              made by{" "}
              <a href="https://twitter.com/e_labs_io" target={"blank"}>
                E_LABS
              </a>
            </MadeByText>
          </MadeByContainer>
        )}
      </MenuContentContainer>
    </StyledMenu>
  );
}

export default Menu;
