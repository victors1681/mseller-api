const { gql } = require("apollo-server");

const docSequenceSchemaGraphql = gql`
  input DocSequenceInput {
    sellerCode: String!
    nextDocNumber: Int
    documentType: String
    prefix: String!
    description: String
    status: Boolean
  }

  type DocSequence {
    sellerCode: String!
    nextDocNumber: Int!
    sequenceGenerated: String!
    documentType: String!
    prefix: String!
    description: String
    status: Boolean
  }
`;

module.exports = docSequenceSchemaGraphql;
