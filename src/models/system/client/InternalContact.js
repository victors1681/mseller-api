const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InternalContact = new Schema({
  code: {
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
  status: {
    type: Boolean,
    default: true
  }
});

const documentName = "Seller";
module.exports.InternalContact = InternalContact;
module.exports.DocumentName = documentName;
