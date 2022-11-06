/** @format */

import supportedChains from "../bin/supportedChains";
import { IChainData } from "../types/web3ModalTypes";

export const networkName = (network: number) =>
  networkIndex("chain_id", network)?.network;

export const networkFullName = (network: number) =>
  networkIndex("chain_id", network)?.name;

export const networkId = (network: string) =>
  networkIndex("network", network)?.chain_id;

export function networkIndex(
  searchTerm: "chain_id" | "network" | "name",
  query: string | number
) {
  var result: IChainData;

  for (let i = 0; i < supportedChains.length; i++) {
    if (supportedChains[i][searchTerm] === query) {
      result = supportedChains[i];
      return result;
    }
  }
}
