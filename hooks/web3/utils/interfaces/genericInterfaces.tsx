/** @format */

import { ethers } from "ethers";
import { connectToContractInterface } from "../../types/interfacingInterfaces";

/**
 *
 * @param {string} ContractAddress
 * @param {any} ContractABI
 * @param {object} proproviderOrSignervider - Can be provider (for read-only) or signer (read/write)
 * @returns {object} contract instance for interaction
 */
const connectToContract = async ({
  ContractAddress,
  ContractABI,
  providerOrSigner,
}: connectToContractInterface) => {
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

const newContract = async ({
  ContractAddress,
  ContractABI,
  providerOrSigner,
}: connectToContractInterface) =>
  new ethers.Contract(ContractAddress, ContractABI, providerOrSigner);

const getTokenName = async (ContractAddress) => await ContractAddress.name();

const getTokenTicker = async (ContractAddress) =>
  await ContractAddress.symbol();

export {
  newContract,
  connectToContract,
  getTokenName,
  getTokenTicker as GenericContractInterfacing,
};
