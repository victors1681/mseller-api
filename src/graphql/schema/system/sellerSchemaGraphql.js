const { gql } = require("apollo-server");

const priceListSchemaGraphql = gql`
  type Seller {
    code: String!
    name: String!
    status: Boolean
    identification: String
    observations: String
  }

  input SellerInput {
    code: String!
    name: String!
    status: Boolean
    identification: String
    observations: String
  }
`;

module.exports = priceListSchemaGraphql;
