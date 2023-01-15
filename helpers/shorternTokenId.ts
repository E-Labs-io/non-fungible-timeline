/** @format */

const shortenTokenId = (tokenId: string): string =>
  tokenId.slice(0, 2) === "0x"
    ? tokenId.length > 6
      ? `${tokenId.slice(2, 6)}...`
      : `${tokenId.slice(1)}`
    : tokenId.length > 6
    ? `${tokenId.slice(0, 5)}...`
    : `${tokenId}`;

export default shortenTokenId;
