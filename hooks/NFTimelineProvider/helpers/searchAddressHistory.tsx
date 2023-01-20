/** @format */

import compileHistoryIntoDays, {
  compileHistoryIntoDaysReturn,
} from "helpers/dataSorting/compileHistoryIntoDays";
import sortUsersHistory from "helpers/dataSorting/sortUsersHistory";
import getUsersHistory from "helpers/getters/getUsersHistory";
import { addressSplitHistory } from "../types/ProviderTypes";

interface searchUsersHistoryProps {
  addressOrEns: string;
  loadingStateCallback: (state) => void;
  hasErrorCallback: (flag: boolean) => void;
  ensResolver;
}
const searchUsersHistory = async ({
  addressOrEns,
  loadingStateCallback,
  hasErrorCallback,
  ensResolver,
}: searchUsersHistoryProps): Promise<addressSplitHistory | false> => {
  hasErrorCallback(false);

  loadingStateCallback(1);
  const isEns = ensResolver.isENS(addressOrEns);
  var searchAddress;

  if (isEns) {
    await ensResolver
      .addressFromEns(addressOrEns)
      .then((address) => (searchAddress = address));
  } else searchAddress = addressOrEns;

  if (searchAddress === null) {
    console.log("ENS isn't real: ");
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

  const sortedDataIn = sortUsersHistory(inBoundTransfers);
  const inByDate = compileHistoryIntoDays(sortedDataIn);
  loadingStateCallback(5);

  const sortedDataOut = sortUsersHistory(outBound);
  const outByDate = compileHistoryIntoDays(sortedDataOut);
  loadingStateCallback(6);

  return { inByDate, outByDate, searchAddress };
};

export default searchUsersHistory;
