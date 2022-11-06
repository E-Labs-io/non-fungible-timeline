/** @format */

import { ethers } from "ethers";

const ensResolver = async (provider: ethers.providers.Provider) => {
  const ensFromAddress = async (address: string) =>
    await provider.lookupAddress(address);

  const addressFromEns = async (ensAddress: string) =>
    await provider.resolveName(ensAddress);

  const isENS = (input: string) => (input.slice(-4) === ".ens" ? true : false);

  const switchEnsAndAddress = async (input: string) =>
    isENS(input) ? await addressFromEns(input) : await ensFromAddress(input);

  return { ensFromAddress, addressFromEns, isENS, switchEnsAndAddress };
};

export default ensResolver;
