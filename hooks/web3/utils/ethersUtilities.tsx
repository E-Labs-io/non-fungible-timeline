/** @format */

// Returns amount in ETH from WEI

import { BigNumber, ethers } from "ethers";

const isEthereumAddress = (address: string) => ethers.utils.isAddress(address);
const notZeroAddress = (address: string) =>
  address === "0x0000000000000000000000000000000000000000" ? false : true;
const weiToEth = (wei: number) => ethers.utils.formatEther(wei);
const fromBigNumber = (bigNumber: BigNumber) => Number(bigNumber._hex);
const chianNumberToHex = (chainId: number) => `0x${chainId.toString(16)}`;

export {
  chianNumberToHex,
  isEthereumAddress,
  weiToEth,
  fromBigNumber,
  notZeroAddress,
};
