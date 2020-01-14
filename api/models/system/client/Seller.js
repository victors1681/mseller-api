const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,

  identification: {
    type: String
  },
  email: {
    type: String
  },
  observations: {
    type: String
  },
  classification: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  fromSync: {
    type: Boolean,
    default: false
  }
});

const documentName = "Sellers";
module.exports.SellerSchema = SellerSchema;
module.exports.DocumentName = documentName;
