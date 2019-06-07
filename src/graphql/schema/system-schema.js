const orderSchema = require("./order-schema");

module.exports = `

type Client {
    code: String!
    name: String!
    address: String!
    phone: String!
    sellerCode: String
    sellerName: String!
    city: String!
    balance: Float!
    creditLimit: Float!
    status: String!
    RNC: String!
    email: String!
    latitude: String!
    longitude: String!
    field1: String!
    field2: String!
    field3: String!
    field4: Float!
    field5: Float!
    field6: Float!
}

input ClientInput{
    code: String!
    name: String!
    address: String
    phone: String
    sellerCode: String
    sellerName: String
    city: String
    balance: Float
    creditLimit: Float
    status: String
    RNC: String
    email: String
    latitude: String
    longitude: String
    field1: String
    field2: String
    field3: String
    field4: Float
    field5: Float
    field6: Float
}

scalar Date

type Product {
    code: String!
    barCode: String!
    name: String!
    classification: String!
    lastPurchase: Date!
    price1: Float!
    price2: Float!
    price3: Float!
    price4: Float!
    price5: Float!
    price6: Float!
    price7: Float!
    saleUnit: String!
    tax: Float!
    stock: Float
    field1: String!
    field2: String!
    field3: String!
    field4: Float!
    field5: Float!
    field6: Float!
}

input ProductInput {
    code: String
    barCode: String
    name: String 
    classification: String
    lastPurchase: Date
    price1: Float
    price2: Float
    price3: Float
    price4: Float
    price5: Float
    price6: Float
    price7: Float
    saleUnit: String
    tax: Float
    stock: Float
    field1: String
    field2: String
    field3: String
    field4: Float
    field5: Float
    field6: Float
}

type Invoice {
    invoiceNo: String!
    documentType: String!
    client: String!
    date: String!
    expirationDate: String!
    total: Float!
    pendingBalance: Float!
    sellerCode: String!
    paymentTerm: String!
    NCF: String!
    tax: Float
    subTotal: Float
    discount: Float
    returnSubtotal: Float
    returnTax: Float
    field1: String!
    field2: String!
    field3: String!
    field4: Float!
    field5: Float!
    field6: Float!
}

input InvoiceInput {
    invoiceNo: String!
    documentType: String!
    client: String!
    date: String!
    expirationDate: String!
    total: Float!
    pendingBalance: Float!
    sellerCode: String!
    paymentTerm: String!
    NCF: String!
    tax: Float
    subTotal: Float
    discount: Float
    returnSubtotal: Float
    returnTax: Float
    field1: String!
    field2: String!
    field3: String!
    field4: Float!
    field5: Float!
    field6: Float!
}

input NcfInput {
    clientType: String!
    description: String!
    header: String!
    initSequence: Int!
    endSequence: Int!
    currentSequence: Int!
    sellerCode: String!
}

type Ncf {
    clientType: String!
    description: String!
    header: String!
    initSequence: Int!
    endSequence: Int!
    currentSequence: Int!
    sellerCode: String!
}

${orderSchema}


`;
