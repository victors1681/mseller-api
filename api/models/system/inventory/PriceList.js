const mongoose = require("mongoose");
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
module.exports.PriceListSchema = PriceListSchema;
module.exports.DocumentName = documentName;
