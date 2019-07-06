const mongoose = require("mongoose");
const {
  DocumentName: ProductModelName,
  ProductSchema
} = require("./system/inventory/Product");
const {
  TaxSchema,
  DocumentName: TaxesModelName
} = require("./system/inventory/Taxes");
const {
  WarehouseSchema,
  DocumentName: WarehouseModelName
} = require("./system/inventory/Warehouse");
const {
  CategorySchema,
  DocumentName: CategoryModelName
} = require("./system/inventory/Category");
const {
  PriceListSchema,
  DocumentName: PriceListModelName
} = require("./system/inventory/PriceList");

const {
  UnitSchema,
  DocumentName: UnitModelName
} = require("./system/inventory/Unit");

const getMongooseDb = async userData => {
  if (userData) {
    const { dbName } = userData;

    const db = await mongoose.connection.useDb(dbName);

    const Product = await db.model(ProductModelName, ProductSchema);
    const Taxes = await db.model(TaxesModelName, TaxSchema);
    const Warehouse = await db.model(WarehouseModelName, WarehouseSchema);
    const Category = await db.model(CategoryModelName, CategorySchema);
    const PriceList = await db.model(PriceListModelName, PriceListSchema);
    const Unit = await db.model(UnitModelName, UnitSchema);

    return { Product, Taxes, Warehouse, Category, PriceList, Unit };
  }
  return null;
};

module.exports = getMongooseDb;
