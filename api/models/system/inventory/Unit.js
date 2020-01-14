const mongoose = require("mongoose");
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
module.exports.UnitSchema = UnitSchema;
module.exports.DocumentName = documentName;
