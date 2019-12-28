const { gql } = require("apollo-server");
const adminSchema = require("./admin-schema");
const systemSchema = require("./system-schema");
const clientSchemaGraphql = require("./system/clientSchemaGraphql");
const priceListSchemaGraphql = require("./system/priceListSchemaGraphql");
const productSchemaGraphql = require("./system/productSchemaGraphql");
const documentSchemaGraphql = require("./system/documentSchemaGraphql");
const taxSchemaGraphql = require("./system/taxSchemaGraphql");
const sellerSchemaGraphql = require("./system/sellerSchemaGraphql");
const currencySchemaGraphql = require("./system/currencySchemaGraphql");
const retentionsSchemaGraphql = require("./system/retentionsSchemaGraphql");
const internalContactSchemaGraphql = require("./system/internalContactSchemaGraphql");
const geoLocationSchemaGraphql = require("./system/geoLocationSchemaGraphql");
const chatSchemaGraphql = require("./system/chatSchemaGraphql");
const messageSchemaGraphql = require("./system/messageSchemaGraphql");

module.exports = gql`
  scalar Date
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Image {
    link: String
    location: String
  }

  ${adminSchema}
  ${systemSchema}
  ${priceListSchemaGraphql}
  ${sellerSchemaGraphql}
  ${taxSchemaGraphql}
  ${clientSchemaGraphql}
  ${productSchemaGraphql}
  ${currencySchemaGraphql}
  ${internalContactSchemaGraphql}
  ${retentionsSchemaGraphql}
  ${documentSchemaGraphql}
  ${geoLocationSchemaGraphql}
  ${chatSchemaGraphql}
  ${messageSchemaGraphql}

  type Subscription {
    newMessageAdded(userId: ID!, listenForUserId: ID!): Message
  }

  type Query {
    business: [Business!]
    roles: [Role!]
    plans: [Plan!]
    users(limit: Int, id: ID, email: String): [User!]
    user(id: ID): User
    currentUser: User
    userSellers(sellerCode: String, name: String): [User!]

    clients(limit: Int, sellerCode: String, name: String): [Client]
    client(code: String): Client
    products(limit: Int, code: String, description: String): [Product!]
    product(code: String): Product
    invoices: [Invoice!]
    documents(
      clientName: String
      documentId: String
      dateFrom: Date
      dateEnd: Date
    ): [Document!]
    getMaxDocument: maxDocument!
    ncf(sellerCode: String): [Ncf!]

    taxes: [Tax]!
    tax(id: String): Tax

    currencies: [Currency]
    currency(id: String): Currency

    internalContacts: [InternalContact]
    internalContact(id: String): InternalContact

    geoLocations: [GeoLocation]
    geoLocation(id: String): GeoLocation

    sellers: [Seller]
    seller(id: String): Seller

    chats: [Chat]
    usersChat: [User]
    chat(id: String): Chat
    messages(chatId: ID!, limit: Int): [Message]!
    message(id: ID): Message

    retentions: [Retention]
    retention(id: String): Retention

    priceListAll: [PriceList]
    priceList: PriceList
    units: [Unit]
    categories: [Category]

    warehouseAll: [Warehouse]
    warehouse: Warehouse
  }

  type Mutation {
    createBusiness(businessInput: BusinessInput): Business!
    createRole(name: String, group: String): Role!
    createPlan(plantInput: PlanInput): Plan!
    register(userInput: UserInput): User!
    updateUser(userInput: UserInput): String
    uploadUserAvatar(file: Upload!, userId: ID): String

    login(email: String!, password: String!): User!

    addClient(client: ClientInput): Client
    addClients(clients: [ClientInput]): String!
    addProducts(products: [ProductInput]): String!
    uploadProductImage(file: Upload!): File!

    addProduct(product: ProductInput): String
    updateProduct(product: ProductInput): String

    addDocuments(documents: [DocumentInput]): String!
    addDocument(document: DocumentInput): String!

    addNcf(ncf: NcfInput): String!
    addInvoices(invoices: [InvoiceInput]): String!

    addTax(tax: TaxInput): String!
    updateTax(tax: TaxInput): String
    removeTax(id: String): String

    addInternalContact(internalContact: InternalContactInput): String!
    addInternalContacts(internalContact: [InternalContactInput]): String!
    updateInternalContact(internalContact: InternalContactInput): String
    removeInternalContact(id: String): String

    addGeoLocation(geoLocation: GeoLocationInput): String!
    addGeoLocations(geoLocation: [GeoLocationInput]): String!
    updateGeoLocation(geoLocation: GeoLocationInput): String
    removeGeoLocation(id: String): String

    addSeller(seller: SellerInput): String!
    addSellers(sellers: [SellerInput]): String!
    updateSeller(seller: SellerInput): String
    removeSeller(id: String): String

    createChat(chat: ChatInput): ID!
    changeChatStatus(chatId: ID, status: String): String
    updateChat(chat: ChatInput): String
    removeChat(id: String): String

    addMessage(message: MessageInput): String!
    uploadMessageContent(file: Upload!): String
    updateMessage(message: MessageInput): String
    removeMessage(id: String): String

    addCurrency(currency: CurrencyInput): String!
    updateCurrency(currency: CurrencyInput): String
    removeCurrency(id: String): String

    addRetention(currency: RetentionInput): String!
    updateRetention(currency: RetentionInput): String
    removeRetention(id: String): String

    addPriceList(priceList: PriceListInput): String
    updatePriceList(priceList: PriceListInput): String
    removePriceList(id: String): String

    addWarehouse(warehouse: WarehouseInput): String
    updateWarehouse(warehouse: WarehouseInput): String
    removeWarehouse(id: String): String

    addUnit(unit: UnitInput): String
    updateUnit(unit: UnitInput): String
    removeUnit(id: String): String

    addCategory(category: CategoryInput): String
    updateCategory(category: CategoryInput): String
    removeCategory(id: String): String
  }
`;
