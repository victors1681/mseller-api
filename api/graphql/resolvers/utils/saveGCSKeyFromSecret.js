const fs = require("fs");

/**
 * In order to load the google key we get the key from the now secret
 * now secrets add gcs_mseller_key "$(cat ./gcs-mseller-key.json| base64)"
 */
const saveGCSKeyFromSecret = () => {
  const gcsKeyFile = Buffer.from(process.env.GCS_MSELLER_KEY, "base64");

  fs.writeFile("/gcs-mseller-key.json", gcsKeyFile, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};

module.exports = saveGCSKeyFromSecret;
