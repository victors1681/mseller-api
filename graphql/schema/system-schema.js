module.exports = `

type Client {
    code: String!
    name: String!
    address: String!
    phone: String!
    sellCode: String!
    sellManName: String!
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
    sellCode: String!
    sellManName: String
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
    sellCode: String!
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

`;