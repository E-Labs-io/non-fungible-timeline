/** @format */

import React, { useEffect, useState, createContext } from "react";

import { ethers } from "ethers";
import connectWeb3Modal from "../components/web3Modal";
import Web3Modal from "web3modal";

function ListenToProvider(
  providerInterface: any,
  onChangeCallBack?: (action?: string) => void
) {
  // Subscribe to accounts change
  providerInterface.on("accountsChanged", (accounts: string[]) => {
    console.log("accountsChanged", accounts);
    onChangeCallBack("accountsChanged");
  });

  // Subscribe to chainId change
  providerInterface.on("chainChanged", (chainId: number) => {
    console.log("chainChanged", chainId);
    onChangeCallBack("chainChanged");
  });

  // Subscribe to provider connection
  providerInterface.on("connect", (info: { chainId: number }) => {
    console.log("connect", info);
    onChangeCallBack("connect");
  });

  // Subscribe to provider disconnection
  providerInterface.on(
    "disconnect",
    (error: { code: number; message: string }) => {
      console.log("disconnect", error);
      onChangeCallBack("disconnect");
    }
  );
}

export default ListenToProvider;
