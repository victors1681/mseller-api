const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  manager: String,
  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plan"
  },
  dbName: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  currency: {
    type: String,
    default: "USD"
  },
  lang: {
    type: String,
    default: "en"
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
const documentName = "Business";
module.exports.BusinessSchema = businessSchema;
module.exports.DocumentName = documentName;

//module.exports = mongoose.model("Business", businessSchema);
