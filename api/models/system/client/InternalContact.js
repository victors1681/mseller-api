const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternalContactSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,

  email: {
    type: String
  },
  phone: {
    type: String
  },
  mobile: {
    type: String
  },
  sendNotifications: {
    type: Boolean,
    default: false
  },
  identification: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  }
});

const documentName = "InternalContacts";
module.exports.InternalContactSchema = InternalContactSchema;
module.exports.DocumentName = documentName;
