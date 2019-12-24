const { gql } = require("apollo-server");

const messageSchemaGraphql = gql`
  enum MessageType {
    TEXT
    MEDIA
  }

  enum StatusMessage {
    SENT
    RECEIVED
    READ
    DELETE
  }

  input MessageInput {
    from: ID!
    to: ID!
    type: MessageType
    chatId: ID
    text: String
    image: String
    video: String
    location: String
    createdAt: Date
    readDate: Date
    receivedDate: Date
    status: StatusMessage
  }

  type Message {
    _id: ID
    user: User
    from: ID!
    to: ID!
    type: MessageType
    text: String
    image: String
    video: String
    location: String
    createdAt: Date
    readDate: Date
    receivedDate: Date
    status: StatusMessage
  }
`;

module.exports = messageSchemaGraphql;
