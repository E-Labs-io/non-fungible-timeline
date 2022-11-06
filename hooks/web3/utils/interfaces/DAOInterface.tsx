/** @format */

import { ethers } from "ethers";

/**
 *
 * @param {string} GovernanceAddress
 * @param {object} GovernanceABI
 * @param {object} providerOrSigner - Can be provider (for read-only) or signer (read/write)
 * @returns {object} contract instance for interaction
 */
const connectGovenanceContract = async (
  GovernanceContract,
  GovernanceABI,
  providerOrSigner
) => {
  if (!providerOrSigner || !GovernanceContract) {
    console.log("Missing components");
    return;
  }
  const activeContract = await newContract(
    GovernanceContract,
    GovernanceABI,
    providerOrSigner
  );
  return activeContract;
};

const newContract = async (
  GovernanceContract,
  GovernanceABI,
  providerOrSigner
) => new ethers.Contract(GovernanceContract, GovernanceABI, providerOrSigner);

/**
 *  --- Proposals ---
 */

const getProposals = async (GovernanceContract) => null;

/**
 *  --- Vote Interaction ---
 */

const getDelegatedVotes = async (VotesContract, address) =>
  await VotesContract.getVotes(address);

const delegateVotes = async (VotesContract, address, amount) =>
  await VotesContract.delegateVotes(address, amount);

const delegateAll = async (VotesContract, address) =>
  await VotesContract.delegate(address);

export {
  connectGovenanceContract,
  getDelegatedVotes,
  delegateVotes,
  delegateAll,
  getProposals,
};
