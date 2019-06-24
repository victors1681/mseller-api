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
  status: {
    type: Boolean,
    default: true
  },
  images: {
    type: Map,
    of: String
  },
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
  field1: {
    type: String,
    default: ""
  },
  field2: {
    type: String,
    default: ""
  },
  field3: {
    type: String,
    default: ""
  },
  field4: {
    type: Number,
    default: 0.0
  },
  field5: {
    type: Number,
    default: 0.0
  },
  field6: {
    type: Number,
    default: 0.0
  },
  fromSync: {
    type: Boolean,
    default: false
  }
});

module.exports = userData => dbSelector("Product", productSchema, userData);
