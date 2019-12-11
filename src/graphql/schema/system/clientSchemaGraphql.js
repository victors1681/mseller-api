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

  type Location {
    latitude: String
    longitude: String
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
    location: Location
    status: Boolean
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

  input LocationInput {
    latitude: String
    longitude: String
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
    seller: SellerInput
    financial: FinancialInput
    internalContacts: [InternalContactShortInput]
    location: LocationInput
    status: Boolean
    priceListId: String
    fromSync: Boolean
    customField: [CustomFieldInput]
  }
`;

module.exports = ClientSchemaGraphql;
