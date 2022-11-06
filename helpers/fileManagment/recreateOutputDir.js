/** @format */

import fs from "fs";

/**
 * 				recreateOutputsDir()
 * @notice	-	Creates a folder directory & structure
 * @dev		=	Will delete any current directory
 * @param {string} dir
 * @param {array} subFolders
 */
export default function recreateOutputsDir(dir, subFolders) {
  //	Remove current directory is excists
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
  //	Create the master directory
  fs.mkdirSync(dir);

  //	create the sub-directory's
  if (subFolders.length > 0) {
    subFolders.forEach((folder) => {
      fs.mkdirSync(`${dir}/${folder}`);
    });
  }

  return true;
}
