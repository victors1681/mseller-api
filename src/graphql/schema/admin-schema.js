module.exports = `

type Business { 
    _id: ID
    name: String!
    country: String!
    address: String!
    phone: String!
    plan: Plan!
    dbName: String!
    status: Boolean
    currency: String
    lang: String
    bucketName: String!
    creator: User!
}

input BusinessInput {
    name: String!
    country: String!
    address: String!
    phone: String!
    plan: String!
    dbName: String!
    status: Boolean
    currency: String
    lang: String
    bucketName: String!
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

enum UserMode { 
    M
    D
    S
}

enum PublicStatus {
    ONLINE
    OFFLINE
    AWAY
}
type User {
    _id: ID!
    email: String!
    password: String
    name: String #name only for messages for chat component
    fullName: String
    initials: String
    firstName: String
    lastName: String
    phone: String
    sellerCode: String!
    business: Business!
    roles: [Role!]!
    position: String
    mode: UserMode!
    defaultColor: String
    status: Boolean
    lang: String
    token: String!
    isLockedOut: Boolean
    failedPassword: Int
    failedPasswordDate: Date
    avatar: String
    publicStatus: PublicStatus
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
    position: String
    mode: UserMode!   
    defaultColor: String
    status: Boolean
    lang: String
    isLockedOut: Boolean
    avatar: Upload
    publicStatus: PublicStatus
}


`;
