const { Storage } = require("@google-cloud/storage");
const { format } = require("util");
const path = require("path");

const {
  storageConfigurationFile,
  bucketName,
  storageApi,
} = require("./storageConfiguration.json");

const storageConfigurationFilePath = path.join(
  __dirname,
  storageConfigurationFile
);

const storage = new Storage({
  keyFilename: storageConfigurationFilePath,
});

const bucket = storage.bucket(bucketName);

const UPLOAD_ERROR = "UPLOAD_ERROR";
const tempStorageFolder = "temp";

/** All new images are stored to temp folder in storage
 * and separated from original images that shouldn't be deleted
 */

const uploadImageToStorage = (file, newFileName) =>
  new Promise((resolve, reject) => {
    let fileUpload = bucket.file(`${tempStorageFolder}/${newFileName}`);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on("error", (error) => {
      console.log("File upload failed ", fileName, error);
      reject(UPLOAD_ERROR);
    });

    blobStream.on("finish", () => {
      const publicAccessUrl = format(
        `${storageApi}/${bucket.name}/${fileUpload.name}`
      );
      resolve(publicAccessUrl);
    });

    blobStream.end(file.buffer);
  });

exports.deleteImage = async (fileName) => {
  if (!fileName) {
    return false;
  }

  try {
    let file = bucket.file(`${tempStorageFolder}/${fileName}`);
    let fileExistsRes = await file.exists();

    if (fileExistsRes[0]) {
      console.log("Deleting image", fileName);
      await file.delete();
      return true;
    }

    return false;
  } catch (error) {
    console.log("Image deletion failed ", fileName, error);
    return false;
  }
};

exports.deleteImages = async (fileNames) => {
  for (const fileName of fileNames) {
    await this.deleteImage(fileName);
  }
};

exports.storeImage = uploadImageToStorage;
