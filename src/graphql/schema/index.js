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
    users(limit: Int): [User!]
    clients(limit: Int, sellerCode: String): [Client]
    products(limit: Int): [Product!]
    invoices: [Invoice!]
    orders: [Orders!]
    getMaxDocument: maxDocument!
    ncf(sellerCode: String): [Ncf!]
    userSellers(sellerCode: String, name: String): [User!]
  }

  type Mutation {
    createBusiness(businessInput: BusinessInput): Business!
    createRole(name: String, group: String): Role!
    createPlan(plantInput: PlanInput): Plan!
    register(userInput: UserInput): User!
    login(email: String!, password: String!): String!

    addClients(clients: [ClientInput]): String!
    addProducts(products: [ProductInput]): String!

    addOrders(orders: [OrderInput]): String!

    addNcf(ncf: NcfInput): String!
    addInvoices(invoices: [InvoiceInput]): String!
  }
`;
