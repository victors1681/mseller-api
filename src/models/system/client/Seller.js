const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  status: {
    type: Boolean,
    default: true
  },
  identification: {
    type: String,
    default: ""
  },
  observations: {
    type: String,
    default: ""
  }
});

const documentName = "Seller";
module.exports.SellerSchema = SellerSchema;
module.exports.DocumentName = documentName;
