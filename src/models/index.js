const mongoose = require("mongoose");
const User = require("./admin/User");
const Roles = require("./admin/Roles");
const Business = require("./admin/Business");

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
  CurrencySchema,
  DocumentName: CurrencyModelName
} = require("./system/Currency");
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

const {
  ClientSchema,
  DocumentName: ClientModelName
} = require("./system/client/Client");
const {
  DocumentSchema,
  DocumentName: DocumentModelName
} = require("./system/Document");
const {
  RetentionSchema,
  DocumentName: RetentionModelName
} = require("./system/Retention");
const {
  InternalContactSchema,
  DocumentName: InternalContactModelName
} = require("./system/client/InternalContact");

const getMongooseDb = async userData => {
  if (userData) {
    const { dbName } = userData;

    const db = await mongoose.connection.useDb(dbName);

    const Product = db.model(ProductModelName, ProductSchema);
    const Taxes = db.model(TaxesModelName, TaxSchema);
    const Warehouse = db.model(WarehouseModelName, WarehouseSchema);
    const Currency = db.model(CurrencyModelName, CurrencySchema);
    const Category = db.model(CategoryModelName, CategorySchema);
    const PriceList = db.model(PriceListModelName, PriceListSchema);
    const Unit = db.model(UnitModelName, UnitSchema);
    const Client = db.model(ClientModelName, ClientSchema);
    const Document = db.model(DocumentModelName, DocumentSchema);
    const Retention = db.model(RetentionModelName, RetentionSchema);
    const InternalContact = db.model(
      InternalContactModelName,
      InternalContactSchema
    );

    return {
      Product,
      Taxes,
      Warehouse,
      Currency,
      Category,
      PriceList,
      Unit,
      User,
      Roles,
      Business,
      Client,
      Document,
      Retention,
      InternalContact
    };
  }
  return null;
};

module.exports = getMongooseDb;
