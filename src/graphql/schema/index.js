const { gql } = require("apollo-server");
const adminSchema = require("./admin-schema");
const systemSchema = require("./system-schema");
module.exports = gql`
  ${adminSchema}
  ${systemSchema}

  type Query {
    business: [Business!]
    roles: [Role!]
    plans: [Plan!]
    users(limit: Int, id: ID, email: String): [User!]
    user(id: ID): User
    clients(limit: Int, sellerCode: String, name: String): [Client]
    client(code: String): Client
    products(limit: Int, code: String): [Product!]
    product(code: String): Product
    invoices: [Invoice!]
    orders: [Orders!]
    getMaxDocument: maxDocument!
    ncf(sellerCode: String): [Ncf!]
    userSellers(sellerCode: String, name: String): [User!]

    taxes: [Tax]!
    tax(id: String): Tax

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
    login(email: String!, password: String!): User!

    addClient(client: ClientInput): Client
    addClients(clients: [ClientInput]): String!
    addProducts(products: [ProductInput]): String!
    uploadProductImage(file: Upload!): File!

    addProduct(product: ProductInput): String
    updateProduct(product: ProductInput): String

    addOrders(orders: [OrderInput]): String!

    addNcf(ncf: NcfInput): String!
    addInvoices(invoices: [InvoiceInput]): String!

    addTax(tax: TaxInput): String!
    updateTax(tax: TaxInput): String
    removeTax(id: String): String

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
