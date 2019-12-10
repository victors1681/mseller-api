const mongoose = require("mongoose");
const { SellerSchema } = require("./Seller");
const { InternalContact } = require("./InternalContact");
const { PriceListSchema } = require("../inventory/PriceList");
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

module.Address = Address;

const ClientSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  identification: String,
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
    type: String
  },
  fax: {
    type: String
  },
  mobile: {
    type: String
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

  seller: SellerSchema,
  financial: {
    balance: {
      type: Number,
      default: 0
    },
    creditLimit: {
      type: Number,
      default: 0
    }
  },
  InternalContact: InternalContact,
  fromSync: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    default: "A"
  },
  priceList: PriceListSchema,

  location: {
    latitude: String,
    longitude: String
  },
  customField: [CustomField]
});

const documentName = "Clients";
module.exports.ClientSchema = ClientSchema;
module.exports.DocumentName = documentName;