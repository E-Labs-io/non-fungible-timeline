/** @format */

export const getWalletsVotingData = async (walletAddress: string) => {
  const url = `${process.env.NEXT_PUBLIC_NFT_SERVER}/getVotesForWallet/${walletAddress}`;
  const result = await fetch(url)
    .then((responce) => responce.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return result;
};
