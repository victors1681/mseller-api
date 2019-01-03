module.exports = `

input OrderItemProductInput {
    name: String
    price: Float
    stock: Float
    saleUnit: String
}

input OrderItemsInput{
    code: String!
    product: OrderItemProductInput
    quantity: Float
    price: Float!    
    tax: Float
    discount: Float
    discountPercentage: Float
}

type OrderItemProduct {
    name: String
    price: Float
    stock: Float
    saleUnit: String
}

type OrderItems{
    code: String!
    product: OrderItemProduct
    quantity: Float
    price: Float!    
    tax: Float
    discount: Float
    discountPercentage: Float
}

type OrderClient {
    code: String!
    name: String!
    address: String
    email: String
    phone: String
    classification: String
    field1: String
    field2: Float
}

input OrderClientInput {
    code: String!
    name: String!
    address: String
    email: String
    phone: String
    classification: String
    field1: String
    field2: Float
}

type OrderTotal {
    total: Float,
    discount: Float,
    discountPercentage: Float,
    tax: Float,
    taxAmount: Float,
    subTotal: Float
}

input OrderTotalInput {
    total: Float,
    discount: Float,
    discountPercentage: Float,
    tax: Float,
    taxAmount: Float,
    subTotal: Float
}

type OrderInternalInfo {
    note: String
    node2: String
    integrationDate: Date
}

input OrderInternalInfoInput {
    note: String
    node2: String
}


type OrderIntegrationInfo {
    document: String,
    date: Date
}


type OrderLog {
    user: ID
    name: String
    date: Date
    description: String
}
input OrderLogInput {
    user: ID
    name: String
    date: Date
    description: String
}

input OrderInput {
    documentId: String!
    documentType: String!
    client: OrderClientInput!
    sellerCode: String!
    sellerName: String
    NCF: String,
    orderNumber: String,
    paymentTerm: String,
    total: OrderTotalInput!
    note: String
    log: [OrderLogInput]
    items: [OrderItemsInput]! 
}

type Orders {
    documentId: String!
    documentType: String!
    client: OrderClient!
    sellerCode: String!
    sellerName: String
    created: Date,
    modified: Date,
    received: Date,
    NCF: String,
    status: String
    orderNumber: String,
    paymentTerm: String,
    total: OrderTotal
    note: String
    internalInfo: OrderInternalInfo
    integrationInfo: OrderIntegrationInfo
    log: [OrderLog]
    items: [OrderItems]! 
}
`;
