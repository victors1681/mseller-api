const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Subscription {
    userAdded: User!
}

type Business { 
    _id: ID
    name: String!
    country: String!
    address: String!
    phone: String!
    plan: Plan!
    Status: String!
    creator: User!
}

input BusinessInput {
    name: String!
    country: String!
    address: String!
    phone: String!
    plan: String!
    Status: String!
    creator: String!
}

type Role {
    _id:ID,
    name: String!
    group: String!
}

type Plan {
    _id: ID
    name: String!
    price: Float!
    userMobile: Int!
    userDesktop: Int!
}

input PlanInput {
    name: String!
    price: Float!
    userMobile: Int!
    userDesktop: Int!
}


type User {
    _id: ID!
    email: String!
    password: String
    name: String!
    sellCode: String!
    business: Business!
    roles: [Role!]!
    mode: String!
    status: String!
}


input UserInput {

    email: String!
    password: String
    name: String!
    sellCode: String!
    business: String!
    roles: [String!]
    mode: String!
    status: String!
}






type RootQuery {
    business: [Business!]
    roles: [Role!]
    plans: [Plan!]
    users: [User!]
}

type RootMutation {
    createBusiness(businessInput: BusinessInput): Business!
    createRole(name: String, group: String): Role!
    createPlan(plantInput: PlanInput): Plan!
    register(userInput: UserInput): User!
    login(userInput: UserInput): String!
}

schema {
    query: RootQuery 
    mutation: RootMutation
    subscription: Subscription
}
`);
