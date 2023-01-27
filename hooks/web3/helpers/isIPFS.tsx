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
    let prefix;
    prefix = "https://ipfs.io/";
    var newUri = url.split("//")[1];
    if (newUri.split("/")[0] !== "ipfs") {
      prefix = prefix + "ipfs/";
    }
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
