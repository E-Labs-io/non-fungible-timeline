/** @format */

import { ethers } from "ethers";

const getSpecificProvider = (providerInstance) =>
  new ethers.providers.Web3Provider(providerInstance);

const getNetwork = async (provider) => await provider.getNetwork();

const getSigner = (provider) => provider.getSigner();

const getAddresses = async (provider) => await provider.listAccounts();

const getBalance = async (provider, address) =>
  await provider.getBalance(address);

const signMessage = async (signer, message) =>
  await signer.signMessage(message);

export {
  getSpecificProvider,
  getNetwork,
  getSigner,
  getAddresses,
  getBalance,
  signMessage,
};
