const { gql } = require("apollo-server");

const priceListSchemaGraphql = gql`
  input PriceListInput {
    id: String
    name: String
    status: Boolean
    type: String
    percentage: Float
  }

  type PriceList {
    id: String
    name: String
    status: Boolean
    type: String
    percentage: Float
  }
`;

module.exports = priceListSchemaGraphql;
