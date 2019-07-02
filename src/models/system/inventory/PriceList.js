const mongoose = require("mongoose");
const dbSelector = require("../../../graphql/resolvers/utils/dbSelector");

const Schema = mongoose.Schema;

const PriceListSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  status: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ["percentage", "amount"]
  },
  percentage: Number
});
const documentName = "PriceList";
module.exports = userData =>
  dbSelector(documentName, PriceListSchema, userData);
module.exports.PriceListSchema = PriceListSchema;
module.exports.DocumentName = documentName;
