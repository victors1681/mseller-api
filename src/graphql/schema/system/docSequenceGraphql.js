const { gql } = require("apollo-server");

const docSequenceSchemaGraphql = gql`
  input DocSequenceInput {
    sellerCode: String!
    nextDocNumber: String
    documentType: String
    prefix: String!
    description: String
    status: Boolean
  }

  type DocSequence {
    sellerCode: String!
    nextDocNumber: String!
    sequenceGenerated: String!
    documentType: String!
    prefix: String!
    description: String
    status: Boolean
  }
`;

module.exports = docSequenceSchemaGraphql;
