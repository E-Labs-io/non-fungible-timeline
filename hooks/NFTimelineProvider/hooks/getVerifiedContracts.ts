/** @format */

const url = process.env.NEXT_PUBLIC_NFT_SERVER
  ? process.env.NEXT_PUBLIC_NFT_SERVER
  : "http://localhost:3003";

const getVerifiedContractList = async (): Promise<any> => {
  const baseURL = `${url}/getVerifiedContractList`;
  const returnedData = await fetch(baseURL)
    .then((result) => result.json())
    .then((contracts) => {
      return contracts;
    });
  return returnedData;
};

export default getVerifiedContractList;

// "https://nftimeline.herokuapp.com"
//  "http://localhost:3003"
