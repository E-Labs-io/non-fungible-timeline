/** @format */

import React, { useEffect, useState, createContext } from "react";

import { ethers } from "ethers";
import connectWeb3Modal from "../components/web3Modal";
import Web3Modal from "web3modal";

function eventListener(
  contractProvider: any,
  event: string,
  keepListening?: boolean,
  callbackFunction?: (returnValues: any) => void
) {
  console.log("🟠 eventListener: Mounted. listening for: ", event);
  contractProvider.on(event, (...returnValues) => {
    console.log("🟠 eventListener: Event Returned with: ", returnValues);
    if (!keepListening) contractProvider.removeAllListeners();
    callbackFunction(returnValues);
  });
}

export default eventListener;
