export const shortenWalletAddress = (walletAddress: string) =>
	walletAddress
		? `${walletAddress.substring(0, 5)}..${walletAddress.substring(
				walletAddress.length - 4
		  )}`
		: "";
