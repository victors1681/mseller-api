const mongoose = require("mongoose");
const dbSelector = require("../../graphql/resolvers/utils/dbSelector");
const Schema = mongoose.Schema;

const CustomField = new Schema({
  key: String,
  value: String
});

const Address = new Schema({
  address: {
    type: String,
    default: ""
  },
  city: { type: String, default: "" },
  state: {
    type: String,
    default: ""
  },
  country: { type: String, default: "" },
  zipCode: { type: String, default: "" }
});

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
  email: String,
  phonePrimary: {
    type: String,
    default: ""
  },
  phoneSecondary: {
    type: String,
    default: ""
  },
  fax: {
    type: String,
    default: ""
  },
  mobile: {
    type: String,
    default: ""
  },

  observations: {
    type: String,
    default: ""
  },
  type: {
    type: [String],
    default: ["client"]
  },
  address: Address,

  sellerCode: {
    type: String,
    default: 0
  },
  sellerName: {
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

  latitude: String,
  longitude: String,

  customField: [CustomField]
});

module.exports = userData => dbSelector("Clients", clientSchema, userData);
