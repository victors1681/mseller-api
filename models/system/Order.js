const mongoose = require("mongoose");
const dbSelector = require("../../graphql/resolvers/utils/dbSelector");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  documentId: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    default: "O" // O orders //I invoices
  },
  client: {
    code: String,
    name: String,
    address: String,
    email: String,
    phone: String,
    classification: String,
    field1: String,
    field2: Number
  },
  sellerCode: {
    type: String,
    required: true
  },
  sellerName: String,

  created: Date, //from mobile
  modified: Date,
  received: {
    type: Date,
    default: Date.now
  },

  NCF: String,
  status: {
    type: String,
    default: "P" //P-Pending //C-Cancelled //I-Integrated //B-Blocked //PI-Partially Integrated //E-error
  },
  orderNumber: String,
  paymentTerm: String,
  total: {
    total: Number,
    discount: Number,
    discountPercentage: Number,
    tax: Number,
    taxAmount: Number,
    subTotal: Number
  },

  note: String,
  internalInfo: {
    note: String,
    node2: String,
    integrationDate: Date
  },
  integrationInfo: {
    document: String,
    date: Date
  },
  log: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
      },
      name: String,
      date: {
        type: Date,
        default: Date.now
      },
      description: String
    }
  ],

  items: [
    {
      code: String,
      product: {
        name: String,
        price: String,
        stock: Number,
        saleUnit: String
      },
      quantity: Number,
      price: Number,
      status: String,
      tax: Number,
      discount: Number,
      discountPercentage: Number
    }
  ]
});

orderSchema.index(
  { documentId: 1, sellerCode: 1, documentType: 1 },
  { unique: true }
);

module.exports = userData => dbSelector("Orders", orderSchema, userData);
