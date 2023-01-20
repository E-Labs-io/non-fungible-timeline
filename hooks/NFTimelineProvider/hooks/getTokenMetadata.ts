/** @format */

const getTokenMetadata = async (
  network: string,
  contractAddress: string,
  tokenId: string
) => {
  const baseURL = `https://nftimeline.herokuapp.com/getSingleTokenData/${network}/${contractAddress}/${tokenId}`;
  const returnedData = await fetch(baseURL)
    .then((result) => result.json())
    .then((history) => {
      return history;
    });
  console.log(returnedData);
  return returnedData;
};

export default getTokenMetadata;
