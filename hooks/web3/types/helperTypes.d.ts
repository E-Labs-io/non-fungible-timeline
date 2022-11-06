/** @format */

import { ethers } from "ethers";

export type networkDataType = {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: {
    symbol: string;
    name: string;
    decimals: string;
    contractAddress: string;
    balance: string;
  };
};



export type ProviderOrSignerType = ethers.providers.Provider | ethers.Signer;
