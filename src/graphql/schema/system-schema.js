module.exports = `

type File { 
    filename: String!
    mimetype: String!
    encoding: String!
} 


scalar Date
 

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


input WarehouseInput {
    id: ID
    name: String
    observations: String
    isDefault: Boolean
    address: String
    status: Boolean
    initialQuantity: Float
    availableQuantity: Float
}

type Warehouse {
    id: ID
    name: String
    observations: String
    isDefault: Boolean
    address: String
    status: Boolean
    initialQuantity: Float
    availableQuantity: Float
}


input UnitInput {
    id: ID,
    name: String,
    shortName: String
}


type Unit {
    id: ID,
    name: String,
    shortName: String
}



`;
