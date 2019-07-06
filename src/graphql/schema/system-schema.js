const orderSchema = require("./order-schema");

module.exports = `

type File { 
    filename: String!
    mimetype: String!
    encoding: String!
} 

type Client {
    code: String!
    name: String!
    address: String
    phone: String
    sellerCode: String
    sellerName: String 
    city: String
    state: String
    country: String
    zipCode: String
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
    fromSync: Boolean
}

input ClientInput{
    code: String!
    name: String!
    address: String
    phone: String
    sellerCode: String
    sellerName: String
    city: String
    state: String
    country: String
    zipCode: String
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
    fromSync: Boolean
}

scalar Date

type Product {
    code: String!
    barCode: String
    name: String!
    description: String
    lastPurchase: Date
    status: Boolean
    price:[Price]  
    tax: [Tax]  
    category: Category
    inventory: Inventory
    customField: [CustomField]
    fromSync: Boolean,
    images: [String]
}

input ProductInput {
    code: String
    barCode: String
    name: String 
    description: String
    lastPurchase: Date
    status: Boolean
    price: [PriceInput] 
    tax: [TaxInput]
    category: CategoryInput
    inventory: InventoryInput
    customField: [CustomFieldInput]
    fromSync: Boolean
    images: [Upload]
}

input CustomFieldInput {
    key: String
    value: String
}

type CustomField {
    key: String
    value: String
}

input PriceInput {
    idPriceList: ID
    name: String
    price: Float!
}

type Price {
    idPriceList: ID
    name: String
    price: Float!
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

input TaxInput {
    id: ID,
    name: String,
    percentage: Float,
    description: String,
    deductible: Boolean
    status: Boolean
}

type Tax {
    id: ID,
    name: String,
    percentage: Float,
    description: String,
    deductible: Boolean
    status: Boolean
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


input PriceListInput {
    id: String
    name: String,
    status: Boolean
    type: String
    percentage: Float
}

type PriceList {
    id: String
    name: String,
    status: Boolean
    type: String
    percentage: Float
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

input CategoryInput {
    id: ID
    name: String
    description: String
}

type Category {
    id: ID
    name: String
    description: String
}

input InventoryInput {
    unit: String,
  availableQuantity: Float,
  unitCost: Float,
  initialQuantity: Float,
  warehouses: [WarehouseInput]
}

type Inventory {
    unit: Unit,
  availableQuantity: Float,
  unitCost: Float,
  initialQuantity: Float,
  warehouses: [Warehouse]
}


${orderSchema}

`;
