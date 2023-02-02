/** @format */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { buildNetworkScanLink } from "../helpers/etherscanLink";
import { shortenWalletAddress } from "../helpers/textHelpers";

const WalletLink = styled.a`
  :hover {
    text-decoration: underline;
  }
`;

/** @format */
interface WalletEtherscanLinkProps {
  walletAddress: string;
  network?: string;
  dontShorten?: true;
}
function WalletEtherscanLink({
  walletAddress,
  network,
  dontShorten,
}: WalletEtherscanLinkProps) {
  return (
    <WalletLink
      href={buildNetworkScanLink({ network, address: walletAddress })}
      target="blank"
    >
      {dontShorten ? walletAddress : shortenWalletAddress(walletAddress)}
    </WalletLink>
  );
}

export default WalletEtherscanLink;
