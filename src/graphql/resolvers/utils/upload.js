const shortid = require("shortid");
const fs = require("fs");
const path = require("path");
const { getUser } = require("../utils");
const { Storage } = require("@google-cloud/storage");
const { project_id } = require("../../../mseller-google-storage-key.json");
const get = require("lodash/get");
const googleStorage = new Storage({
  keyFilename: path.join(__dirname, "../../../mseller-google-storage-key.json"),
  projectId: project_id
});

const getStorageLocation = userEmail => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const datePath = `/${currentYear}/${currentMonth}`;

  const userBasePath = `users/${userEmail}`;

  return {
    userProfile: {
      path: `${userBasePath}/profile`,
      permission: {
        public: true,
        readable: true
      }
    },
    chat: {
      path: `${userBasePath}/chat/${datePath}`,
      permission: {
        public: true,
        readable: true
      }
    },
    collection: {
      path: `${userBasePath}/collection/${datePath}`,
      permission: {
        public: false,
        readable: true
      }
    },
    products: {
      path: `products`,
      permission: {
        public: true,
        readable: true
      }
    }
  };
};

/**
 *
 * @param {Promise} file stream data promise
 * @param {String} location this locate the path where the file will be storage
 * @param {String} userId user id
 * @param {Object} User user Database model
 */
const uploadContent = async (file, location, userId, User) => {
  const { createReadStream, mimetype } = await file;

  const userInfo = await getUser(userId, User);
  const bucketName = get(userInfo, "business.bucketName");
  const userEmail = get(userInfo, "email");
  const storageLocation = getStorageLocation(userEmail)[location] || null;

  if (!storageLocation) {
    console.log("Invalid Store location to upload a file:", location);
    return null;
  }
  const bucket = googleStorage.bucket(bucketName);
  const fileExtension = mimetype && mimetype.split("/")[1];
  const fileName = `${shortid()}.${fileExtension}`;
  const baseUrlEndPoint = bucket.storage.apiEndpoint;
  const resourceLink = `${baseUrlEndPoint}/${bucketName}/${storageLocation.path}/${fileName}`;
  const fileLocation = `${storageLocation.path}/${fileName}`;

  const stream = createReadStream();
  const urlData = await new Promise((resolve, reject) => {
    stream.pipe(
      bucket
        .file(`${fileLocation}`)
        .createWriteStream({
          metadata: {
            contentType: mimetype
          },
          gzip: true,
          ...storageLocation.permission
        })
        .on("error", error => {
          console.log("Error++++", error);
          reject(error);
        })
        .on("finish", () => {
          console.log("finisheddddd");
          resolve({
            link: `https://${resourceLink}`,
            location: fileLocation
          });
        })
    );
  });

  return urlData;
};

module.exports = uploadContent;
