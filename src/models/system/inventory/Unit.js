const mongoose = require("mongoose");
const dbSelector = require("../../../graphql/resolvers/utils/dbSelector");

const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  shortName: String
});

const documentName = "Unit";
module.exports = userData => dbSelector(documentName, UnitSchema, userData);

module.exports.UnitSchema = UnitSchema;
module.exports.DocumentName = documentName;
