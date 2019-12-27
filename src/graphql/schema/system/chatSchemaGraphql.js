const { gql } = require("apollo-server");

const chatSchemaGraphql = gql`
  enum LastMessageStatus {
    UNREAD
    READ
  }

  input LastMessageInput {
    userId: ID
    text: String
    status: LastMessageStatus
    date: Date
  }

  type LastMessage {
    userId: ID
    text: String
    status: LastMessageStatus
    date: Date
  }

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
    lastMessage: LastMessageInput
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
    lastMessage: LastMessage
    status: ChatStatus
    createAd: Date
  }
`;

module.exports = chatSchemaGraphql;
