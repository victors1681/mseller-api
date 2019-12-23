const { gql } = require("apollo-server");

const chatSchemaGraphql = gql`
  enum ChatType {
    DIRECT
    GROUP
  }

  enum ChatStatus {
    ATTENTION
    TYPING
    NORMAL
  }

  input ChatInput {
    from: ID!
    to: ID!
    image: String
    type: ChatType
    name: String
    lastMessage: String
    status: ChatStatus
  }

  type Chat {
    from: ID!
    to: ID!
    image: String
    type: ChatType
    name: String
    lastMessage: String
    status: ChatStatus
  }
`;

module.exports = chatSchemaGraphql;
