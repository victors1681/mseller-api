const { gql } = require("apollo-server");

const DocumentSchemaGraphql = gql`
  enum DocumentType {
    order
    invoice
    quote
  }

  enum DocumentStatus {
    pending
    cancelled
    integrated
    blocked
    partiallyIntegrated
    error
  }

  type maxDocument {
    document: String
    invoice: String
  }

  type Item {
    code: String!
    name: String
    description: String
    tax: [Tax]
    price: Float
    quantity: Float
  }

  type Document {
    documentId: String!
    date: Date
    dueDate: Date
    observations: String
    annotation: String
    termsConditions: String
    documentType: DocumentType
    client: Client!
    retentions: [Retention]
    currency: Currency!
    seller: Seller!
    priceList: PriceList
    total: Float!
    totalTax: Float!
    totalPaid: Float
    balance: Float
    NCF: String
    status: DocumentStatus
    orderNumber: String
    items: [Item]
  }

  input ItemInput {
    code: String!
    name: String
    description: String
    tax: [TaxInput]
    price: Float
    quantity: Float
  }

  input DocumentInput {
    documentId: String!
    date: Date
    dueDate: Date
    observations: String
    annotation: String
    termsConditions: String
    documentType: DocumentType
    client: ClientInput!
    retentions: [RetentionInput]
    currency: CurrencyInput!
    seller: SellerInput!
    priceList: PriceListInput
    total: Float!
    totalTax: Float!
    totalPaid: Float
    balance: Float
    NCF: String
    status: DocumentStatus
    orderNumber: String
    items: [ItemInput]
  }
`;

module.exports = DocumentSchemaGraphql;
