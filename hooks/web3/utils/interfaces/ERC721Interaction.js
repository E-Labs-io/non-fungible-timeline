/** @format */

import { ethers } from "ethers";

/**
 *
 * @param {string} ERC721Address
 * @param {object} ERC721ABI
 * @param {object} proproviderOrSignervider - Can be provider (for read-only) or signer (read/write)
 * @returns {object} contract instance for interaction
 */
const connectContract = async (ERC721Address, ERC721ABI, providerOrSigner) => {
  if (!providerOrSigner || !ERC721Address) {
    console.log("Missing components");
    return;
  }
  const activeContract = await newContract(
    ERC721Address,
    ERC721ABI,
    providerOrSigner
  );
  return activeContract;
};

const newContract = async (ERC721Address, ERC721ABI, providerOrSigner) =>
  new ethers.Contract(ERC721Address, ERC721ABI, providerOrSigner);

const getERCBalance = async (ERC721Contract, address) =>
  await ERC721Contract.balanceOf(address);

const getAllIds = async (ERC721Contract, address) =>
  await ERC721Contract.getAllIds(address);

const getOwnerOf = async (ERC721Contract, tokenId) =>
  await ERC721Contract.ownerOf(tokenId);

const getTotalSupply = async (ERC721Contract) =>
  await ERC721Contract.totalSupply();

const getMaxSupply = async (ERC721Contract) =>
  await ERC721Contract.MAX_SUPPLY();

const mintTokens = async (ERC721Contract, amount) =>
  await ERC721Contract.publicMint(amount);

const getTokenURI = async (ERC721Contract, tokenId) =>
  await ERC721Contract.tokenURI(tokenId);

const getTokenName = async (ERC721Contract) => await ERC721Contract.name();

const getTokenTicker = async (ERC721Contract) => await ERC721Contract.symbol();

export {
  getTokenName,
  connectContract,
  newContract,
  getERCBalance,
  getAllIds,
  getOwnerOf,
  getTotalSupply,
  getMaxSupply,
  mintTokens,
  getTokenURI,
  getTokenTicker,
};
