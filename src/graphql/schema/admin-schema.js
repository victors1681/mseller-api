module.exports = `

type Business { 
    _id: ID
    name: String!
    country: String!
    address: String!
    phone: String!
    plan: Plan!
    dbName: String!
    status: String!
    currency: String
    lang: String
    creator: User!
}

input BusinessInput {
    name: String!
    country: String!
    address: String!
    phone: String!
    plan: String!
    dbName: String!
    status: String
    currency: String
    lang: String
    creator: String
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
    userMobile: Int
    userDesktop: Int
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
    firstName: String
    lastName: String
    phone: String
    sellerCode: String!
    business: Business!
    roles: [Role!]!
    mode: String!
    status: Boolean!
    lang: String
    token: String!
    isLockedOut: Boolean
    failedPassword: Int
    failedPasswordDate: Date
}


input UserInput {
    _id: ID
    email: String!
    password: String
    firstName: String!
    lastName: String!
    phone: String
    sellerCode: String
    business: String!
    roles: [String!]
    mode: String!   
    status: Boolean
    lang: String
    isLockedOut: Boolean
}


`;
