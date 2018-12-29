const { buildSchema } = require("graphql");
const adminSchema = require("./admin-schema");
const systemSchema = require("./system-schema");
module.exports = buildSchema(`

type Subscription {
    userAdded: User!
}

${adminSchema}
${systemSchema}

type RootQuery {
    business: [Business!]
    roles: [Role!]
    plans: [Plan!]
    users: [User!]
    clients: [Client!]
    products: [Product!]
    invoices: [Invoice!]
}

type RootMutation {
    createBusiness(businessInput: BusinessInput): Business!
    createRole(name: String, group: String): Role!
    createPlan(plantInput: PlanInput): Plan!
    register(userInput: UserInput): User!
    login(userInput: UserInput): String!

    addClients(clients: [ClientInput]): String!
}

schema {
    query: RootQuery 
    mutation: RootMutation
    subscription: Subscription
}
`);
