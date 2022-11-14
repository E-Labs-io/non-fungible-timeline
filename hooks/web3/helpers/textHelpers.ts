/** @format */

export const shortenWalletAddress = (
  walletAddress: string,
  firstAmount?: number
) =>
  walletAddress
    ? `${walletAddress.substring(
        0,
        firstAmount ? firstAmount : 5
      )}..${walletAddress.substring(walletAddress.length - 4)}`
    : "";
