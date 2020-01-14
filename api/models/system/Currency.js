const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    default: ""
  },
  exchangeRate: {
    type: Number,
    default: 1
  },
  status: {
    type: Boolean,
    default: true
  }
});

const DocumentName = "Currencies";
module.exports.CurrencySchema = CurrencySchema;
module.exports.DocumentName = DocumentName;
