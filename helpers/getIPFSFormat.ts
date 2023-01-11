/** @format */

import { create } from "ipfs-http-client";

const ipfs = create({
  host: "ipfs.io/ipfs",
  protocol: "https",
});

const getIPFSFormat = async (url) => {
  console.log("Incoming URL : ", url);

  let objectUrl;
  let mediaType;

  var fileHash = url.split("/").pop();
  console.log("Hash : ", fileHash);

  try {
    const buffer: any = await ipfs.cat(fileHash);
    const uint8Array = new Uint8Array(buffer);
    const magicNumbers = {
      jpeg: [0xff, 0xd8, 0xff],
      gif: [0x47, 0x49, 0x46],
      png: [0x89, 0x50, 0x4e, 0x47],
      mp4: [0x00, 0x00, 0x00, 0x18],
      mp3: [0x49, 0x44, 0x33],
      wav: [0x52, 0x49, 0x46, 0x46],
      ogg: [0x4f, 0x67, 0x67, 0x53],
    };

    for (let key in magicNumbers) {
      let match = true;
      for (let i = 0; i < magicNumbers[key].length; i++) {
        if (magicNumbers[key][i] !== uint8Array[i]) {
          match = false;
          break;
        }
      }

      if (match) {
        mediaType = key;
        break;
      }
    }
    console.log("check format: ", mediaType);
    //create a blob from the array buffer
    const blob = new Blob([uint8Array], {
      type: `${mediaType === "mp4" ? "video" : "audio"}/${mediaType}`,
    });
    //then create object url from the blob
    objectUrl = URL.createObjectURL(blob);
  } catch (err) {
    console.log("Error getting media", err);
  }
  console.log("Out putting of IPFS formatter: ", objectUrl, mediaType);
  return { objectUrl, mediaType };
};

export default getIPFSFormat;
