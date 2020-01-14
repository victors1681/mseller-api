const { gql } = require("apollo-server");

const priceListSchemaGraphql = gql`
  input TaxInput {
    id: String
    name: String
    percentage: Float
    description: String
    deductible: Boolean
    status: Boolean
  }

  type Tax {
    id: String
    name: String
    percentage: Float
    description: String
    deductible: Boolean
    status: Boolean
  }
`;

module.exports = priceListSchemaGraphql;
