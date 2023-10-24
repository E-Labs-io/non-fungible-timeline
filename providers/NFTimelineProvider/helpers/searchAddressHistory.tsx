/** @format */

import compileHistoryIntoDays from "helpers/dataSorting/compileHistoryIntoDays";
import sortUsersHistory from "helpers/dataSorting/sortUsersHistory";
import getUsersHistory from "helpers/getters/getUsersHistory";
import { getTImelineDataReturn } from "../types/ProviderTypes";
import { NetworkKeys, Address } from "e-labs_web3provider";

interface searchUsersHistoryProps {
  address: Address;
  loadingStateCallback: (state) => void;
  hasErrorCallback: (flag: boolean) => void;
  chains: NetworkKeys[];
}
const searchUsersHistory = async ({
  address,
  loadingStateCallback,
  hasErrorCallback,
  chains,
}: searchUsersHistoryProps): Promise<getTImelineDataReturn | false> => {
  hasErrorCallback(false);

  var searchAddress = address.getAddress();

  if (searchAddress === null) {
    hasErrorCallback(true);
    loadingStateCallback(0);
    return false;
  }
  loadingStateCallback(2);

  let inBoundTransfers = [];
  for (let i = 0; i < chains.length; i++) {
    const chain = chains[i];
    let tempOutbound = await getUsersHistory({
      to: searchAddress,
      chain: chain,
    });
    inBoundTransfers = [...inBoundTransfers, ...tempOutbound];
  }

  loadingStateCallback(3);

  let outBound = [];
  for (let i = 0; i < chains.length; i++) {
    const chain = chains[i];
    let tempOutbound = await getUsersHistory({
      from: searchAddress,
      chain: chain,
    });
    outBound = [...outBound, ...tempOutbound];
  }

  loadingStateCallback(4);
  if (outBound.length === 0 && inBoundTransfers.length === 0) {
    loadingStateCallback(0);
    return false;
  }
  const sortedDataIn = sortUsersHistory(inBoundTransfers);
  const inByDate = compileHistoryIntoDays(sortedDataIn);
  loadingStateCallback(5);

  const sortedDataOut = sortUsersHistory(outBound);
  const outByDate = compileHistoryIntoDays(sortedDataOut);
  loadingStateCallback(6);

  return { inByDate, outByDate, searchAddress };
};

export default searchUsersHistory;
