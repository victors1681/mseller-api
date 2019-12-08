const { gql } = require("apollo-server");

const ClientSchemaGraphql = gql`
  type Address {
    address: String
    city: String
    state: String
    country: String
    zipCode: String
  }

  type Seller {
    code: String!
    name: String!
    status: Boolean
    identification: String
    observations: String
  }

  type Financial {
    balance: Float
    creditLimit: Float
  }

  type InternalContact {
    code: String
    name: String
    email: String
    phone: String
    mobile: String
    sendNotification: Boolean
    status: Boolean
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
    internalContact: InternalContact
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

  input SellerInput {
    code: String!
    name: String!
    status: Boolean
    identification: String
    observations: String
  }

  input FinancialInput {
    balance: Float
    creditLimit: Float
  }

  input InternalContactInput {
    code: String
    name: String
    email: String
    phone: String
    mobile: String
    sendNotification: Boolean
    status: Boolean
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
    internalContact: InternalContactInput
    location: LocationInput
    status: Boolean
    priceList: PriceListInput
    fromSync: Boolean
    customField: [CustomFieldInput]
  }
`;

module.exports = ClientSchemaGraphql;
