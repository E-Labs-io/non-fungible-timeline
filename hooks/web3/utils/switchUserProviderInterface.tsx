/** @format */

import {
  checkMetamaskIsActive,
  changeNetworkMetamask,
} from "./userProviderInterfaces";

const switchUserProviderInterface = async (
  io: string,
  action: string,
  args?: { [key: string]: any }
) => {
  if (io === "metamask") {
    if (action === "checkActive") return await checkMetamaskIsActive();
    if (action === "changeNetwork")
      return await changeNetworkMetamask(args?.network);
  }
};

export default switchUserProviderInterface;
