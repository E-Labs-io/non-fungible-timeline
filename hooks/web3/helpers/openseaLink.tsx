/** @format */
interface buildOpenSeaLinkProps {
  address: string;
  tokenId?: string;
  network?: string;
  testNet?: boolean;
}

const buildOpenSeaLink = ({
  address,
  tokenId,
  network,
  testNet,
}: buildOpenSeaLinkProps) => {
  if (network) {
    if (address && tokenId)
      return `https://${
        testNet && "testnets."
      }opensea.io/assets/${network}/${address}/${tokenId}`;
    if (address && !tokenId)
      return `https://${testNet && "testnets."}opensea.io/${address}`;
  } else {
    if (address && tokenId)
      return `https://opensea.io/assets/${address}/${tokenId}`;
    if (address && !tokenId) return `https://opensea.io/${address}`;
  }
};

export default buildOpenSeaLink;
