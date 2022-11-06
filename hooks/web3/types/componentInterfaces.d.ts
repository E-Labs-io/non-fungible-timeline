/** @format */
/** @format */
import { ethers } from "ethers";
import React, { ReactElement } from "react";
import { moralisKeysType } from "./acceessTokenTypes";
import { TokenGatwayDataType } from "./componentTypes";

export interface Web3ConnectButtonProps {
  color?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  type?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  network?: number;
  children?: ReactElement[] | ReactElement | string;
}

export interface userSignMessageInterface {
  signer: ethers.Signer;
  message: string;
  checkAddress?: string;
}

export interface UserWeb3ProviderInterface {
  children?: any;
  moralisKeys?: moralisKeysType;
  providers?: any;
}

export interface TokenGatewayInterface {
  children?: ReactElement[] | ReactElement | string;
  gatewayData: TokenGatwayDataType;
  noAccessComponent?: any;
}

export interface UserWeb3ProviderContextType {
  walletAddress: string;
  shortWalletAddress: string;
  userProvider: ethers.providers.Provider | null;
  userSigner: ethers.Signer | null;
  auxStorage: { [key: string]: any };
  updateAuxStorage: (param: string, value: any) => void;
  connectToUsersProvider: (userAction: boolean) => void;
}

export interface ButtonInterface {
  color?: string;
  backgroundColor?: string;
  padding?: string;
  fontSize?: string;
  type?: string;
  width?: string;
  height?: string;
  theme?: any;
  onClick?: () => void;
}
