/** @format */

const fs = require("fs");
const fsPromises = fs.promises;

const saveJSONToFile = async (data, fileName, directory) => {
  await fsPromises.writeFile(
    `${directory}/${fileName}.json`,
    data,
    function (err) {
      if (err) {
        throw err;
      }
    }
  );
};

const saveTextFile = async (data, fileName, directory) => {
  await fsPromises.writeFile(
    `${directory}/${fileName}.txt`,
    data,
    function (err) {
      if (err) {
        throw err;
      }
    }
  );
};

const saveArrayToText = async (data, fileName, seperator, directory) =>
  await saveTextFile(data.join(seperator), fileName, directory).then(
    () => true
  );

const saveJSONasJSON = async (data, fileName, directory) => {
  var dataAsJSON = JSON.stringify(data);
  await saveJSONToFile(dataAsJSON, fileName, directory).then(() => true);
};

export { saveJSONToFile, saveTextFile, saveArrayToText, saveJSONasJSON };
