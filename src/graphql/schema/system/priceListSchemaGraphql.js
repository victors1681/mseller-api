const { gql } = require("apollo-server");

const priceListSchemaGraphql = gql`
  enum Type {
    percentage
    amount
  }

  input PriceListInput {
    id: String
    name: String
    status: Boolean
    type: Type
    percentage: Float
  }

  type PriceList {
    id: String
    name: String
    status: Boolean
    type: Type
    percentage: Float
  }
`;

module.exports = priceListSchemaGraphql;
