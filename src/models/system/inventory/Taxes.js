const mongoose = require("mongoose");
const dbSelector = require("../../../graphql/resolvers/utils/dbSelector");

const Schema = mongoose.Schema;

const TaxSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  percentage: {
    type: Number,
    default: 0
  },
  description: String,
  deductible: {
    type: Boolean,
    default: true
  },
  status: {
    type: Boolean,
    default: true
  }
});

const documentName = "Taxes";
module.exports = userData => dbSelector(documentName, TaxSchema, userData);

module.exports.TaxSchema = TaxSchema;
module.exports.DocumentName = documentName;
