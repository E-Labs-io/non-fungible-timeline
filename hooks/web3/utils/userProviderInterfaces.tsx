/** @format */

const checkMetamaskIsActive = async () => {
  //    If the interface is Metamask check if it is unlocked
  const isUnlocked = await window?.ethereum?._metamask.isUnlocked();
  if (!isUnlocked) {
    return false;
  }
  //  Check if we have access to the accounts
  const actionsRequest: [] = await window?.ethereum?.request({
    method: "wallet_getPermissions",
  });
  if (actionsRequest?.length > 0) {
    return true;
  }
  return false;
};

const changeNetworkMetamask = async (network: string) => {
  var params = [{ chainId: networkIdHash(network) }];
  const actionsRequest: [] = await window?.ethereum.request({
    method: "wallet_switchEthereumChain",
    params,
  });
  if (actionsRequest?.length > 0) {
    return true;
  }
  return false;
};

export { checkMetamaskIsActive, changeNetworkMetamask };

const networkIdHash = (networkName?: string, networkId?: number) => {
  const NetworksHashes = {
    goerli: "0x5",
    5: "0x5",
    homestead: "0x1",
    1: "0x1",
    mumbai: "0x13881",
    80001: "0x13881",
    polygon: "0x89",
    137: "0x89",
  };

  if (networkName) return NetworksHashes[networkName];
  if (networkId) return NetworksHashes[networkId];
};
