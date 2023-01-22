/** @format */

import compileHistoryIntoDays from "helpers/dataSorting/compileHistoryIntoDays";
import sortUsersHistory from "helpers/dataSorting/sortUsersHistory";
import getUsersHistory from "helpers/getters/getUsersHistory";
import { getTImelineDataReturn } from "../types/ProviderTypes";

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
}: searchUsersHistoryProps): Promise<getTImelineDataReturn | false> => {
  hasErrorCallback(false);

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
  console.log(
    "No token check - IN: ",
    inBoundTransfers.length,
    " OUT: ",
    outBound.length
  );
  if (outBound.length === 0 && inBoundTransfers.length === 0) {
    console.log(
      "No tokens"
    );
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
