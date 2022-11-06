/** @format */

import { GenericContractInterfacing, newContract } from "./genericInterfaces";
import ContractABIs from "../../bin/ABIs/ContractABIObject";
import { connectToTokenContractInterface } from "../../types/interfacingInterfaces";

const ContractABI = ContractABIs.ERC721;
/**
 *
 * @param {string} ContractAddress
 * @param {object} proproviderOrSignervider - Can be provider (for read-only) or signer (read/write)
 * @returns {object} contract instance for interaction
 */
const connectToERC721Contract = async ({
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

const getBalance = async (ContractInstance, address) =>
  await ContractInstance.balanceOf(address);

const getOwnerOf = async (ContractInstance, tokenId) =>
  await ContractInstance.ownerOf(tokenId);

const getTotalSupply = async (ContractInstance) =>
  await ContractInstance.totalSupply();

const getTokenURI = async (ContractInstance, tokenId) =>
  await ContractInstance.tokenURI(tokenId);

export {
  connectToERC721Contract,
  getBalance,
  getOwnerOf,
  getTotalSupply,
  getTokenURI,
};
