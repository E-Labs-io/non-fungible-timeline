/** @format */

import compileHistoryIntoDays from "helpers/dataSorting/compileHistoryIntoDays";
import sortUsersHistory from "helpers/dataSorting/sortUsersHistory";
import getUsersHistory from "helpers/getters/getUsersHistory";
import Address from "hooks/web3/helpers/Address";
import { getTImelineDataReturn } from "../types/ProviderTypes";

interface searchUsersHistoryProps {
  address: Address;
  loadingStateCallback: (state) => void;
  hasErrorCallback: (flag: boolean) => void;
}
const searchUsersHistory = async ({
  address,
  loadingStateCallback,
  hasErrorCallback,
}: searchUsersHistoryProps): Promise<getTImelineDataReturn | false> => {
  hasErrorCallback(false);

  var searchAddress = address.getAddress();

  if (searchAddress === null) {
    hasErrorCallback(true);
    loadingStateCallback(0);
    return false;
  }
  loadingStateCallback(2);

  const inBoundTransfers = await getUsersHistory({
    to: searchAddress,
  });
  loadingStateCallback(3);

  const outBound = await getUsersHistory({ from: searchAddress });
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
