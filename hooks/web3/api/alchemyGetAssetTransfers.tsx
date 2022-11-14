/** @format */

const alchemyGetAssetTransfers = async (
  from: string,
  to?: string,
  startingBlock?: string
) => {
  console.log("get asst transfers inputs: ", from, to);
  const options = to
    ? {
        fromBlock: startingBlock ? startingBlock : "0x0",
        fromAddress: from,
        toAddress: to,
        category: ["erc721", "erc1155"],
        withMetadata: true,
      }
    : {
        fromBlock: startingBlock ? startingBlock : "0x0",
        fromAddress: from,
        category: ["erc721", "erc1155"],
        withMetadata: true,
      };

  let data = JSON.stringify({
    jsonrpc: "2.0",
    id: 0,
    method: "alchemy_getAssetTransfers",
    params: [options],
  });

  var requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
  const baseURL = `https://eth-mainnet.alchemyapi.io/v2/qrcPcRle3fW-m9Kq27bW7haAq5LaLIqk`;
  console.log(baseURL);

  const returnedData = await fetch(baseURL, requestOptions)
    .then((result) => result.json())
    .then((history) => {
      console.log(history);
      return history;
    });

  return returnedData;
};

export default alchemyGetAssetTransfers;
