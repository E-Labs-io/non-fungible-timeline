/** @format */

import fs from "fs";

const saveImage = async (canvas, dir, info, errorCallback) =>
  fs.writeFileSync(
    `${dir.outputs}/images/${info.name}.jpeg`,
    canvas.toBuffer("image/jpeg"),
    function (err) {
      if (err) {
        errorCallback(err);
        throw err;
      }
    }
  );
  
export default saveImage;
