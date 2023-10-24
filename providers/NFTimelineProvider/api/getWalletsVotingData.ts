/** @format */

export const getWalletsVotingData = async (walletAddress: string) => {
  const url = `${process.env.NEXT_PUBLIC_NFT_SERVER}/getVotesForWallet/${walletAddress}`;
  const result = await fetch(url)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => console.log(error));
  return result;
};

export const checkIfWalletVoted = async (
  ballotId: string,
  voterAddress: string,
  votedForAddress: string
): Promise<boolean> => {
  const url = `${process.env.NEXT_PUBLIC_NFT_SERVER}/getVoteCheck/${ballotId}/${voterAddress}/${votedForAddress}`;
  const result = await fetch(url).then((res) => {
    if (res.status === 200)
      return res
        .json()
        .then((data) => data)
        .catch((error) => console.log(error));
    else return false;
  });

  return result;
};
