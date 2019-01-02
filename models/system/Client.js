const mongoose = require("mongoose");
const dbSelector = require("../../graphql/resolvers/utils/dbSelector");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: String,
  phone: String,
  sellCode: {
    type: String
  },
  sellManName: String,
  city: String,
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
  field1: String,
  field2: String,
  field3: String,
  field4: Number,
  field5: Number,
  field6: Number
});

module.exports = userData => dbSelector("Client", clientSchema, userData);
