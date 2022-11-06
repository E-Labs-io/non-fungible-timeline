/** @format */

import React, { ReactElement, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { ExtraStyleProps } from "types/genericTypes";
import { renderIcon } from "../helpers/generateAddressIcon";
import useWeb3Provider from "../hooks/useWeb3Provider";
import { buildNetworkScanLink } from "../helpers/etherscanLink";
import handleClickOpenURLInNewTab from "hooks/window/openLinkInNewTab";
import { shortenWalletAddress } from "../helpers/textHelpers";

const Button = styled.button<ExtraStyleProps>`
  width: ${({ width }) => width || "fit-content"};
  height: ${({ height }) => height || "fit-content"};
  cursor: pointer;
  position: relative;
  border-radius: 3px;

  border: ${({ color, theme }) =>
    color ? `4px solid ${color}` : `4px solid ${theme.primaryDark}`};
  border-radius: 8px;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: bold;
  font-size: ${({ fontSize }) => fontSize || "26px"};
  color: ${({ color, theme }) => color || theme.primaryDark};
  background: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.primaryLight};
  box-shadow: ${({ color, theme }) =>
    color ? `0px 2px ${color}` : `0px 2px ${theme.primaryDark}`};
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &:active {
    top: 1px;
    box-shadow: 0px 0px;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }
`;

const AddressIcon = styled.canvas``;

const ButtonText = styled.span`
  padding: ${({ padding }) => (padding ? padding : "5px 12px")};
  @media (max-width: 768px) {
    padding: 12px 32px 11px;
    font-size: 23px;
  }

  @media (max-width: 480px) {
    padding: 10px 22px 8px;
    font-size: 20px;
  }
`;

const ActionListContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  text-align: right;
  width: 100%;
  text-align: center;
  top: 0;
  left: 0;
  transition: top 0.7s, opacity 0.3s ease 0.1s;
  opacity: 0;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.primaryLight};
  background-color: #b0b0b037;
  padding: 15px 10px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
  border-color: black;
  border-width: 1px;
  border-style: solid;
  row-gap: 10px;
`;

const ActionText = styled.a`
  cursor: pointer;
  color: black;
  :hover {
    color: white;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  :hover {
    color: white;
    div {
      top: 32px;
      opacity: 1;
      transition: top 0.7s, opacity 0.5s;
    }
  }
`;
type actionLinkTypes = string | (() => void);
interface Web3ConnectButtonProps {
  color?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  type?: "button" | "submit" | "reset";
  width?: string;
  height?: string;
  onClick?: () => void;
  network?: number;
  children?: ReactElement[] | ReactElement | string;
  actionText?: string[];
  actionLink?: actionLinkTypes[];
  showAddressIcon?: boolean;
  showWarningMessage?: (shouldShow: boolean) => void;
}

function Web3ConnectButton({
  color,
  backgroundColor,
  padding,
  fontSize,
  type = "submit",
  width,
  height,
  network,
  onClick,
  children,
  actionText,
  actionLink,
  showAddressIcon = false,
  showWarningMessage,
}: Web3ConnectButtonProps) {
  const {
    connectToUsersProvider,
    walletAddress,
    auxStorage,
    disconnectProvider,
  } = useWeb3Provider();
  const [addressIconSize, setAddressIconSize] = useState(7);
  const [containerHover, setContainerHover] = useState(false);
  const addressIconRef = useRef(null);
  useEffect(() => {
    if (walletAddress && showAddressIcon) {
      showWarningMessage && showWarningMessage(false);
      renderIcon(
        { seed: walletAddress, size: addressIconSize },
        addressIconRef.current
      );
    }
  }, [walletAddress, addressIconSize]);

  const handleClick = () => {
    walletAddress.length === 42
      ? handleClickOpenURLInNewTab(
          buildNetworkScanLink({
            address: walletAddress,
            network: network ? network : auxStorage?.networkId?.chainId,
          })
        )
      : handleConnectWallet();
  };

  const handleConnectWallet = () => {
    showWarningMessage && showWarningMessage(true);
    connectToUsersProvider(true);
  };

  const handleMouseEnter = () => {
    setContainerHover(true);
  };

  const handleMouseLeave = () => {
    setContainerHover(false);
  };

  const disconnectWallet = () => disconnectProvider();

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!!actionText?.length && !!walletAddress && (
        <ActionListContainer>
          {actionText.map((item, key) => (
            <ActionText
              href={
                typeof actionLink[key] === "string" ? actionLink[key] : null
              }
              onClick={
                typeof actionLink[key] !== "string" ? actionLink[key] : null
              }
              containerHover={containerHover}
            >
              {item}
            </ActionText>
          ))}
          <ActionText onClick={null} href={null}>
            Network: {auxStorage.network.name}
          </ActionText>
          <ActionText onClick={disconnectWallet} href={null}>
            Disconnect
          </ActionText>
        </ActionListContainer>
      )}
      <Button
        color={color}
        backgroundColor={backgroundColor}
        fontSize={fontSize}
        height={height}
        type={type}
        width={width}
        onClick={() => handleClick()}
        containerHover={containerHover}
      >
        {showAddressIcon && (
          <AddressIcon ref={addressIconRef} width="0px" height="0px" />
        )}
        <ButtonText padding={padding}>
          {children || shortenWalletAddress(walletAddress) || "Connect Wallet"}
        </ButtonText>
      </Button>
    </Container>
  );
}

export default Web3ConnectButton;
