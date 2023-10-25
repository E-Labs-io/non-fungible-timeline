/** @format */
import { ethers } from "ethers";
import { NetworkKeys, buildNetworkScanLink } from "e-labs_web3provider";
import React, { useState, useEffect, useContext } from "react";
import styled, { useTheme, keyframes } from "styled-components";

const ToastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 7px;
  width: ${({ width }) => (width ? width : "auto")};
  height: ${({ height }) => (height ? height : "auto")};
`;

const ToastMessage = styled.div``;

const ToastLink = styled.a``;

interface ToastTransactionProps {
  title: string;
  messages?: string[];
  txHash?: string;
  network?: NetworkKeys;
  width?: string;
  height?: string;
}
function ToastTransaction({
  txHash,
  network,
  title,
  messages,
  width,
  height,
}: ToastTransactionProps) {
  return (
    <ToastWrapper width={width} height={height}>
      <ToastMessage>{title}</ToastMessage>
      {txHash && network && (
        <ToastLink
          href={buildNetworkScanLink({
            network,
            txHash,
          })}
          target="_blank"
        >
          View on Etherscan
        </ToastLink>
      )}
      {messages &&
        messages.map((message, key) => (
          <ToastMessage key={key}>{message}</ToastMessage>
        ))}
    </ToastWrapper>
  );
}

export default ToastTransaction;
