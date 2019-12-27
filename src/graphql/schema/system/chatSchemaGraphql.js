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

  enum LastMessageStatus {
    UNREAD
    READ
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
    _id: ID
    name: String
    from: ID!
    fromUser: User
    to: ID!
    toUser: User
    image: String
    type: ChatType
    lastMessageUserId: ID
    lastMessage: String
    lastMessageStatus: LastMessageStatus
    status: ChatStatus
    createAd: Date
  }
`;

module.exports = chatSchemaGraphql;
