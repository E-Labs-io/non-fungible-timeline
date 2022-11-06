/** @format */

import { ethers } from "ethers";
import allAvailableWalletProviders from "../bin/providers";
import { weiToEth } from "./ethersUtilities";
import connectWeb3Modal, { web3Modal } from "../components/web3Modal";
//import { networkName } from "droplabmods/scripts/web3/helpers/common/parseNetworkID";
import Web3Modal from "web3modal";
/**
 *
 * @notice  -   Trys to connect to given provider & get data
 * @returns {object} {provider: object, address: string, singer: object, network: number}
 */

async function web3Connection(chainId?: number) {
  const web3ModalInstance: Web3Modal = web3Modal(
    allAvailableWalletProviders(chainId, false),
    networkName(chainId ? chainId : 4),
    false
  );

  const providerInstance = await connectWeb3Modal(web3ModalInstance);

  const provider = getSpecificProvider(providerInstance);
  // await provider.send("eth_requestAccounts", []);
  // Check connection to provider worked
  if (!provider) {
    console.log("🔴 Failed to connect to Provider");
    return false;
  }

  // Get Signer
  // Get addresses
  // Get network
  // Get wallet balance
  const signer = getSigner(provider);
  const address = await getAddresses(provider);
  const network = await getNetwork(provider);
  const balance = await getBalance(provider, address[0]);
  return {
    provider: provider,
    providerInterface: providerInstance,
    address: address,
    signer: signer,
    network: network,
    balance: Number(weiToEth(balance)),
    web3ModalInstance: web3ModalInstance,
  };
}

const getSpecificProvider = (providerInstance) =>
  new ethers.providers.Web3Provider(providerInstance);

/* const getBrowserProvider = () =>
  new ethers.providers.Web3Provider(window.ethereum); */

const getNetwork = async (provider) => await provider.getNetwork();

const getSigner = (provider) => provider.getSigner();

const getAddresses = async (provider) => await provider.listAccounts();

const getBalance = async (provider, address) =>
  await provider.getBalance(address);

const signMessage = async (signer, message) =>
  await signer.signMessage(message);

export {
  web3Connection,
  getSpecificProvider,
  //getBrowserProvider,
  getNetwork,
  getSigner,
  getAddresses,
  getBalance,
  signMessage,
};

function networkName(network: number) {
  if (network) {
    if (network === 1) {
      return "mainnet";
    } else if (network === 6284) {
      return "goerli";
    } else if (network === 3) {
      return "ropsten";
    } else if (network === 4) {
      return "rinkeby";
    } else if (network === 42) {
      return "kovan";
    } else {
      return "Unknown Network";
    }
  } else {
    return "mainnet";
  }
}
