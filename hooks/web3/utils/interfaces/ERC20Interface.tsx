/** @format */

import { newContract } from "./genericInterfaces";
import ContractABIs from "../../bin/ABIs/ContractABIObject";
import { connectToTokenContractInterface } from "../../types/interfacingInterfaces";

const ContractABI = ContractABIs.ERC20;
/**
 *
 * @param {string} ContractAddress
 * @param {object} proproviderOrSignervider - Can be provider (for read-only) or signer (read/write)
 * @returns {object} contract instance for interaction
 */
const connectToERC20Contract = async ({
  ContractAddress,
  providerOrSigner,
}: connectToTokenContractInterface) => {
  if (!providerOrSigner || !ContractAddress) {
    console.log("Missing components");
    return;
  }
  const activeContract = await newContract({
    ContractAddress,
    ContractABI,
    providerOrSigner,
  });
  return activeContract;
};

const getBalance = async (ContractAddress, walletAddress) =>
  await ContractAddress.balanceOf(walletAddress);

const transferFundsFrom = async (ContractAddress, from, to, amount) =>
  await ContractAddress.transferFrom(from, to, amount);

const transferFunds = async (ContractAddress, to, amount) =>
  await ContractAddress.transfer(to, amount);

const setAllowance = async (ContractAddress, to, amount) =>
  await ContractAddress.approve(to, amount);

const getTotalSupply = async (ContractAddress) =>
  await ContractAddress.totalSupply();

const getMaxSupply = async (ContractAddress) =>
  await ContractAddress.MAX_SUPPLY();

export {
  connectToERC20Contract,
  getBalance,
  transferFundsFrom,
  transferFunds,
  getTotalSupply,
  getMaxSupply,
  setAllowance,
};
