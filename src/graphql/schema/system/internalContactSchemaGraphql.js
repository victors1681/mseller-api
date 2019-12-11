const { gql } = require("apollo-server");

const internalContactSchemaGraphql = gql`
  input InternalContactInput {
    id: String!
    name: String
    email: String
    phone: String
    mobile: String
    sendNotification: Boolean
    identification: String
    status: Boolean
  }

  input InternalContactShortInput {
    id: String!
  }

  type InternalContact {
    id: String!
    name: String
    email: String
    phone: String
    mobile: String
    sendNotification: Boolean
    identification: String
    status: Boolean
  }
`;

module.exports = internalContactSchemaGraphql;
