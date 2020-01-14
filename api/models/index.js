const Roles = require("./admin/Roles");

const { DocumentName: UserModelName, UserSchema } = require("./admin/User");
const {
  DocumentName: BusinessModelName,
  BusinessSchema
} = require("./admin/Business");
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
const {
  GeoLocationSchema,
  DocumentName: GeoLocationModelName
} = require("./system/client/GeoLocation");
const {
  SellerSchema,
  DocumentName: SellerModelName
} = require("./system/client/Seller");
const {
  ChatSchema,
  DocumentName: ChatModelName,
  addVirtualToChat
} = require("./system/chat/Chat");
const {
  MessageSchema,
  DocumentName: MessageModelName,
  addVirtualToMessage
} = require("./system/chat/Message");
const {
  DocSequenceSchema,
  DocumentName: DocSequenceModelName
} = require("./system/DocSequence");

const getMongooseModels = ({ masterDb, ClientDB }) => {
  const User = masterDb.model(UserModelName, UserSchema);
  const Business = masterDb.model(BusinessModelName, BusinessSchema);

  const Product = ClientDB.model(ProductModelName, ProductSchema);
  const Taxes = ClientDB.model(TaxesModelName, TaxSchema);
  const Warehouse = ClientDB.model(WarehouseModelName, WarehouseSchema);
  const Currency = ClientDB.model(CurrencyModelName, CurrencySchema);
  const Category = ClientDB.model(CategoryModelName, CategorySchema);
  const PriceList = ClientDB.model(PriceListModelName, PriceListSchema);
  const Unit = ClientDB.model(UnitModelName, UnitSchema);
  const Client = ClientDB.model(ClientModelName, ClientSchema);
  const Document = ClientDB.model(DocumentModelName, DocumentSchema);
  const Retention = ClientDB.model(RetentionModelName, RetentionSchema);
  const InternalContact = ClientDB.model(
    InternalContactModelName,
    InternalContactSchema
  );
  const GeoLocation = ClientDB.model(GeoLocationModelName, GeoLocationSchema);
  const Seller = ClientDB.model(SellerModelName, SellerSchema);
  const Chat = ClientDB.model(ChatModelName, ChatSchema);

  const Message = ClientDB.model(MessageModelName, MessageSchema);
  const DocSequence = ClientDB.model(DocSequenceModelName, DocSequenceSchema);

  //Virtual that need to access to the Primary database.
  addVirtualToMessage({ User });
  addVirtualToChat({ User });

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
    InternalContact,
    GeoLocation,
    Seller,
    Chat,
    Message,
    DocSequence
  };
};

module.exports = getMongooseModels;
