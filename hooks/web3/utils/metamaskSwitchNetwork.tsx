/** @format */

import supportedChains from "../bin/supportedChains";
import { networkId } from "./chainIdandName";
import { chianNumberToHex } from "./ethersUtilities";

const switchMetamaskNetwork = async (network: string) => {
  const requiredNetwork = { chainId: chianNumberToHex(networkId(network)) };

  // Check if MetaMask is installed
  // MetaMask injects the global API into window.ethereum
  if (window.ethereum) {
    try {
      // check if the chain to connect to is installed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [requiredNetwork], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          let newNetowrk = {
            chainId: chianNumberToHex(networkId(network)),
            rpcUrl: supportedChains.forEach((chainData) => {
              if (chainData.network === network) return chainData.rpc_url;
            }),
          };
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [newNetowrk],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};

export default switchMetamaskNetwork;
