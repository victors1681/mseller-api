const mongoose = require("mongoose");
const { ClientSchema } = require("./client/Client");
const Schema = mongoose.Schema;
const { SellerSchema } = require("../system/client/Seller");
const { PriceListSchema } = require("./inventory/PriceList");
const { CurrencySchema } = require("./Currency");
const { RetentionSchema } = require("./Retention");
const { TaxSchema } = require("./inventory/Taxes");

const Item = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  tax: [TaxSchema],
  price: {
    type: Number,
    required: true,
    default: 0
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }
});

const Log = new Schema({
  user: {
    id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String
  },
  name: String,
  date: {
    type: Date,
    default: Date.now
  },
  description: String
});

const documentSchema = new Schema({
  documentId: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  observations: {
    type: String,
    default: ""
  },
  annotation: {
    type: String,
    default: ""
  },
  termsConditions: {
    type: String,
    default: ""
  },

  documentType: {
    type: String,
    enum: ["order", "invoice", "quote"],
    default: "order" // O orders //I invoices
  },
  client: ClientSchema,
  retentions: [RetentionSchema],
  currency: CurrencySchema,
  seller: SellerSchema,
  priceList: PriceListSchema,
  total: {
    type: Number,
    required: true
  },
  totalPaid: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },

  created: Date, //from mobile
  modified: Date,
  received: {
    type: Date,
    default: Date.now
  },

  NCF: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "cancelled", "integrated", "blocked", "partiallyIntegrated", "error"],
    default: "pending" //P-Pending //C-Cancelled //I-Integrated //B-Blocked //PI-Partially Integrated //E-error
  },
  orderNumber: String,

  integrationInfo: {
    document: String,
    date: Date
  },
  logs: [Log],
  items: [Item]
});

documentSchema.index({ documentId: 1 }, { unique: true });

const documentName = "Documents";

module.exports.DocumentSchema = documentSchema;
module.exports.DocumentName = documentName;
