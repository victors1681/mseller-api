const { gql } = require("apollo-server");

const ClientSchemaGraphql = gql`
  type Address {
    address: String
    city: String
    state: String
    country: String
    zipCode: String
  }

  type Financial {
    balance: Float
    creditLimit: Float
  }

  type Client {
    code: String!
    identification: String
    name: String!
    email: String
    phonePrimary: String
    phoneSecondary: String
    fax: String
    mobile: String
    observations: String
    type: [String]
    address: Address
    seller: Seller
    financial: Financial
    internalContacts: [InternalContact]
    geoLocation: GeoLocation
    status: String
    priceList: PriceList
    fromSync: Boolean
    customField: [CustomField]
  }

  input AddressInput {
    address: String
    city: String
    state: String
    country: String
    zipCode: String
  }

  input FinancialInput {
    balance: Float
    creditLimit: Float
  }

  input ClientInput {
    code: String!
    identification: String
    name: String!
    email: String
    phonePrimary: String
    phoneSecondary: String
    fax: String
    mobile: String
    observations: String
    type: [String]
    address: AddressInput
    sellerId: String
    financial: FinancialInput
    internalContacts: [InternalContactShortInput]
    status: String
    priceListId: String
    fromSync: Boolean
    customField: [CustomFieldInput]
  }
`;

module.exports = ClientSchemaGraphql;
