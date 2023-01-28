/** @format */

const getMediaFormat = (theURL) => {
  const extension = theURL.split(".").pop();
  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "gif"
  ) {
    return "image";
  } else if (extension === "mp4") {
    return "video";
  } else if (extension === "wav" || extension === "mp3") {
    return "audio";
  } else return "image";
};

export default getMediaFormat;
