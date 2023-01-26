/**
 * checkURL
 *
 * @format
 * @notice - Checks wether URL is http or ipfs.  If ipfs changes to http
 * @param {string} url
 * @returns phrased URL
 */

function checkIfIPFSUrl(url: string) {
  console.log(url);
  if (url.includes("ipfs://")) {
    let prefix;
    prefix = "https://ipfs.io/";
    var newUri = url.split("//")[1];
    console.log("Return IPFS: ", `${prefix}${newUri}`);
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
