/**
 * checkURL
 *
 * @format
 * @notice - Checks wether URL is http or ipfs.  If ipfs changes to http
 * @param {string} url
 * @returns phrased URL
 */

function checkIfIPFSUrl(url: string) {
  if (url.includes("ipfs://")) {
    var prefix = "https://ipfs.io/ipfs/";
    var uri = url.substring(7);
    return `${prefix}${uri}`;
  } else {
    return url;
  }
}

export { checkIfIPFSUrl };
