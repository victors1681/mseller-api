const mongoose = require("mongoose");
const dbSelector = require("../../graphql/resolvers/utils/dbSelector");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  barCode: String,
  name: {
    type: String,
    required: true
  },
  classification: String,
  lastPurchase: Date,
  price1: {
    type: Number,
    default: 0
  },
  price2: {
    type: Number,
    default: 0
  },
  price3: {
    type: Number,
    default: 0
  },
  price4: {
    type: Number,
    default: 0
  },
  price5: {
    type: Number,
    default: 0
  },
  price6: {
    type: Number,
    default: 0
  },
  price7: {
    type: Number,
    default: 0
  },
  saleUnit: {
    type: String,
    default: ""
  },
  tax: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number
  },
  field1: String,
  field2: String,
  field3: String,
  field4: Number,
  field5: Number,
  field6: Number
});

module.exports = userData => dbSelector("Product", productSchema, userData);
