const { gql } = require("apollo-server");

const retentionsSchemaGraphql = gql`
  input RetentionInput {
    id: String
    name: String
    percentage: Float
    description: String
    type: String
    status: Boolean
  }

  type Retention {
    id: String
    name: String
    percentage: Float
    description: String
    type: String
    status: Boolean
  }
`;

module.exports = retentionsSchemaGraphql;
