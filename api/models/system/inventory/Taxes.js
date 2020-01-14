const mongoose = require("mongoose");

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

const DocumentName = "Taxes";
module.exports.TaxSchema = TaxSchema;
module.exports.DocumentName = DocumentName;
