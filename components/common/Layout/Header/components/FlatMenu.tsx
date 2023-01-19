/** @format */

import React, { useContext, useState } from "react";
import Link from "next/link";
import styled, { useTheme } from "styled-components";
import { Button, Toast, ToastCall } from "components/common";
import { useWeb3Provider } from "hooks/web3";
import "react-toastify/dist/ReactToastify.css";
import Burger from "./Burger";
import Web3ConnectButton from "hooks/web3/components/ConnectButton";
import { theme } from "styles/theme";
import ToastTransaction from "components/common/Toast/components/ChainTransactionToast";

const StyledFlatMenu = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`;

const MenuItem = styled.a`
  font-size: 14px;
  text-transform: uppercase;
  padding: 2rem 0;
  font-weight: bold;
  letter-spacing: 0.5rem;
  color: ${({ theme }) => theme.offWhite};
  text-decoration: none;
  transition: color 0.3s linear;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.5rem;
    text-align: center;
  }
  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`;

interface ButtonContainerProps {
  isOpen?: boolean;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
  z-index: 3;
`;

interface FlatMenuProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  ariaControls: string;
}

function FlatMenu({ open, setOpen, ariaControls }: FlatMenuProps) {
  const theme = useTheme();
  const [shouldShowWarning, setShouldShowWarning] = useState(false);
  const [toastItem, setToastItem] = useState<any>();
  const { walletAddress } = useWeb3Provider();

  const handleShowWarningMessage = (shouldShow: boolean) => {
    if (shouldShow) {
      const warningToast = ToastCall({
        action: "error",
        autoClose: 10000,
        children: (
          <ToastTransaction
            title="Do not connect a wallet with your valuable NFTs."
            messages={["This is always best practice"]}
          />
        ),
      });
    } else {
      toastItem ? ToastCall({ action: "dismiss", toastItem: toastItem }) : null;
    }
  };
  return (
    <StyledFlatMenu>
      <ButtonContainer isOpen={open}>
        <Web3ConnectButton
          fontSize={theme.fontSizes.small}
          backgroundColor={theme.offWhite}
          color={theme.primaryDark}
          showAddressIcon
          showWarningMessage={handleShowWarningMessage}
        />
      </ButtonContainer>
      <Burger open={open} setOpen={setOpen} aria-controls={ariaControls} />
      <Toast
        position="bottom-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
      />
    </StyledFlatMenu>
  );
}

export default FlatMenu;
