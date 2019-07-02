const shortid = require("shortid");
const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(
  path.dirname(process.mainModule.filename),
  "uploads"
);

const storeFS = ({ stream, filename, dbName, section }) => {
  const id = shortid.generate();
  const dir = `${UPLOAD_DIR}/${dbName}/${section}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const path = `${dir}/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", error => {
        if (stream.truncated)
          // Delete the truncated file.
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", error => reject(error))
      .on("finish", () => resolve({ id, path }))
  );
};

const processUpload = async (upload, { dbName }, section) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const { path } = await storeFS({ stream, filename, dbName, section });
  return { img: path.split("src/")[1], section }; //file path/name
};

module.exports = processUpload;
