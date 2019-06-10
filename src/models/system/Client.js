const mongoose = require("mongoose");
const dbSelector = require("../../graphql/resolvers/utils/dbSelector");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: ""
  },
  phone: {
    type: String,
    default: ""
  },
  sellerCode: {
    type: String,
    default: 0
  },
  sellerName: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    default: ""
  },
  state: {
    type: String,
    default: ""
  },
  country: {
    type: String,
    default: ""
  },
  zipCode: {
    type: String,
    default: ""
  },
  fromSync: {
    type: Boolean,
    default: false
  },
  balance: {
    type: Number,
    default: 0
  },
  creditLimit: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "A"
  },
  RNC: String,
  email: String,
  latitude: String,
  longitude: String,
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
  }
});

module.exports = userData => dbSelector("Clients", clientSchema, userData);
