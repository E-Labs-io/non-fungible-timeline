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
    var newUri = url.substring(7);
    return `${prefix}${newUri}`;
  } else if (url.includes("ipfs.infura.io")) {
    var prefix = "https://ipfs.io/ipfs/";
    var newUrl = url.split("/").pop();
    return `${prefix}${newUrl}`;
  } else {
    return url;
  }
}

export { checkIfIPFSUrl };
