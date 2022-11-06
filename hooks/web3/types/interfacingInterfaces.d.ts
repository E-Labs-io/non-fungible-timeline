/** @format */

import { ethers } from "ethers";
import { ProviderOrSignerType } from "./helperTypes";

export interface connectToContractInterface {
  ContractAddress: string;
  ContractABI: any;
  providerOrSigner: ProviderOrSignerType;
}

export interface connectToTokenContractInterface {
  ContractAddress: string;
  providerOrSigner: ProviderOrSignerType;
}
