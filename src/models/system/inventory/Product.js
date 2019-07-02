const mongoose = require("mongoose");
const dbSelector = require("../../../graphql/resolvers/utils/dbSelector");
const { DocumentName: PriceListDoc } = require("./PriceList");
const { WarehouseSchema } = require("./Warehouse");
const { TaxSchema } = require("./Taxes");
const { CategorySchema } = require("./Category");

const Schema = mongoose.Schema;

const Price = new Schema({
  idPriceList: {
    type: String,
    ref: PriceListDoc
  },
  name: String,
  price: {
    type: Number,
    required: true,
    default: 0
  }
});

const CustomField = new Schema({
  key: String,
  value: String
});

const Inventory = new Schema({
  unit: String,
  availableQuantity: Number,
  unitCost: Number,
  initialQuantity: Number,
  warehouses: [WarehouseSchema]
});

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
  description: String,

  lastPurchase: Date,
  status: {
    type: Boolean,
    default: true
  },
  price: [Price],
  tax: [TaxSchema],
  category: CategorySchema,
  inventory: Inventory,

  customField: [CustomField],

  fromSync: {
    type: Boolean,
    default: false
  },
  images: {
    type: Array
  }
});

module.exports = userData => dbSelector("Product", productSchema, userData);
