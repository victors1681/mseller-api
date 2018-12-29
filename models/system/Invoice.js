const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  invoiceNo: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    required: true
  },
  client: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  expirationDate: Date,
  total: {
    type: Number,
    required: true
  },
  pendingBalance: {
    type: Number,
    default: 0
  },
  sellCode: {
    type: String
  },
  paymentTerm: String,
  NCF: String,
  tax: String,
  subTotal: Number,
  discount: Number,
  returnSubtotal: Number,
  returnTax: Number,
  field1: String,
  field2: String,
  field3: String,
  field4: Number,
  field5: Number,
  field6: Number
});

module.exports = mongoose.model("Invoice", invoiceSchema);
