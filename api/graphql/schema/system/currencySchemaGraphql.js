const { gql } = require("apollo-server");

const currencySchemaGraphql = gql`
  input CurrencyInput {
    id: String!
    code: String!
    symbol: String
    exchangeRate: Float
  }

  type Currency {
    id: String!
    code: String!
    symbol: String
    exchangeRate: Float
  }
`;

module.exports = currencySchemaGraphql;
