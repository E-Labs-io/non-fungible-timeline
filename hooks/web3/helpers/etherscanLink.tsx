/** @format */

import React from "react";
import { networkName } from "../utils/chainIdandName";
import { buildNetworkScanLinkInterface } from "../types/helperInterfaces";

export const etherscanPrefix = {
  eth: "https://etherscan.io",
  rinkeby: "https://rinkeby.etherscan.io",
  kovan: "https://kovan.etherscan.io",
  goerli: "https://goerli.etherscan.io",
  polygon: "https://polygonscan.com/",
};

const buildNetworkScanLink = ({
  network,
  address,
  tokenId,
  block,
  txHash,
}: buildNetworkScanLinkInterface) => {
  if (!network) network = "eth";

  if (typeof network === "number") network = networkName(network);

  if (address && tokenId)
    return `${etherscanPrefix[network]}/token/${address}?a=${tokenId}`;

  if (block) return `${etherscanPrefix[network]}/block/${block}`;

  if (txHash) return `${etherscanPrefix[network]}/tx/${txHash}`;

  if (address && !tokenId)
    return `${etherscanPrefix[network]}/address/${address}`;

  return etherscanPrefix[network];
};

/**
 *
 * @notice - wraps the address in a link for etherscan
 * @param {string} address
 * @param {number} network
 * @returns Div of address with link
 */
function etherScanSearch(
  display: string,
  scanData: buildNetworkScanLinkInterface
) {
  const scanProps: buildNetworkScanLinkInterface = {
    network: scanData?.network,
    address: scanData?.address,
    tokenId: scanData?.tokenId,
    block: scanData?.block,
    txHash: scanData?.txHash,
  };
  const link = buildNetworkScanLink(scanProps);
  if (!link) {
    return (
      <div className="etherscanlink">
        <a
          style={{ display: "table-cell" }}
          href={link}
          target="_blank"
          rel="noreferrer"
        >
          {display}
        </a>
      </div>
    );
  } else {
    <div>
      <h5>{scanProps?.address} </h5>
    </div>;
  }
}

export { etherScanSearch, buildNetworkScanLink };
