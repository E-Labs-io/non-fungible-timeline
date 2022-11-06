/** @format */

import { newContract } from "./genericInterfaces";
import  ContractABIs  from "../../bin/ABIs/ContractABIObject";
import { connectToTokenContractInterface } from "../../types/interfacingInterfaces";

const ContractABI = ContractABIs.ERC1155;

/**
 *
 * @param {string} ContractAddress
 * @param {object} providerOrSigner - Can be provider (for read-only) or signer (read/write)
 * @returns {object} contract instance for interaction
 */
const connectToERC1155Contract = async ({
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

const getBalance = async (ContractInstance, address, tokenId) =>
  await ContractInstance.balanceOf(address, tokenId);

const getOwnerOf = async (ContractInstance, tokenId) =>
  await ContractInstance.ownerOf(tokenId);

const getTotalSupply = async (ContractInstance) =>
  await ContractInstance.totalSupply();

const getTokenURI = async (ContractInstance, tokenId) =>
  await ContractInstance.tokenURI(tokenId);

export {
  connectToERC1155Contract,
  getBalance,
  getOwnerOf,
  getTotalSupply,
  getTokenURI,
};
