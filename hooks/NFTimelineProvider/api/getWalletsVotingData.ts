/** @format */

export const getWalletsVotingData = async (walletAddress: string) => {
  console.log(walletAddress);
  const url = `${process.env.NEXT_PUBLIC_NFT_SERVER}/getVotesForWallet/${walletAddress}`;
  const result = await fetch(url)
    .then((responce) => responce.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  console.log("Got voting data: ", result);
  return result;
};
