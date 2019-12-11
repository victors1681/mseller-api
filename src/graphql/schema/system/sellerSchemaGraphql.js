const { gql } = require("apollo-server");

const sellerSchemaGraphql = gql`
  input SellerInput {
    id: String!
    name: String
    identification: String
    observation: String
    email: String
    classification: String
    status: Boolean
  }

  type Seller {
    id: String!
    name: String
    identification: String
    observation: String
    email: String
    classification: String
    status: Boolean
  }
`;

module.exports = sellerSchemaGraphql;
