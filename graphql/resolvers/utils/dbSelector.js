const mongoose = require("mongoose");
const clc = require("cli-color");

const selectDB = (modelName, productSchema, userData, modeValidator) => {
  if (userData) {
    const { dbName, mode } = userData;

    if (!modeValidator || mode === modeValidator) {
      const db = mongoose.connection.useDb(dbName);
      return db.model(modelName, productSchema);
    }

    const error = `ERROR: Only mode: ${modeValidator} doesn;t access to this resource, db: ${
      userData.dbName
    }, email: ${userData.email}`;
    console.log(clc.red(error));
  }
};

module.exports = selectDB;
