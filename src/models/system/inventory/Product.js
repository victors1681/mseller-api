const mongoose = require("mongoose");
const dbSelector = require("../../../graphql/resolvers/utils/dbSelector");
const { DocumentName: PriceListDoc } = require("./PriceList");
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
  warehouses: [{ id: { type: String, unique: false }, initialQuantity: Number }]
});

const ProductSchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    barCode: String,
    name: {
      type: String
    },
    description: String,

    lastPurchase: Date,
    status: {
      type: Boolean,
      default: true
    },
    price: [Price],
    tax: [{ id: { type: String, unique: false } }],
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
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("taxDetail", {
  ref: "Taxes",
  localField: "tax.id",
  foreignField: "id",
  justOne: false
});

ProductSchema.virtual("warehouseDetail", {
  ref: "Warehouse",
  localField: "inventory.warehouses.id",
  foreignField: "id",
  justOne: false
});

ProductSchema.virtual("categoryDetail", {
  ref: "Categories",
  localField: "category.id",
  foreignField: "id",
  justOne: true
});

ProductSchema.virtual("unitDetail", {
  ref: "Unit",
  localField: "inventory.unit",
  foreignField: "id",
  justOne: true
});

ProductSchema.virtual("priceListDetail", {
  ref: "PriceList",
  localField: "price.idPriceList",
  foreignField: "id",
  justOne: false
});

//module.exports = userData => dbSelector(documentName, ProductSchema, userData);

const documentName = "Product";
module.exports.ProductSchema = ProductSchema;
module.exports.DocumentName = documentName;
