const { ApolloError } = require("apollo-server");
const UserSchema = require("../../../../models/admin/User");
const { documentName } = require("../../../../models/admin/User");
var assert = require("assert");

const messagesSubKeys = {
  NEW_MESSAGE_ADDED: "NEW_MESSAGE_ADDED"
};
module.exports.messagesSubKeys = messagesSubKeys;
module.exports.resolver = {
  Subscription: {
    newMessageAdded: {
      subscribe: (obj, arg, { pubsub }) =>
        pubsub.asyncIterator([messagesSubKeys.NEW_MESSAGE_ADDED])
    }
  },
  Query: {
    messages: async (_, __, { sources: { Message, User } }) => {
      const messages = await Message.find()
        .populate("fromUser")
        .populate("toUser");

      return messages.map(d => ({ ...d._doc, _id: d.id }));
    },
    message: async (_, { id }, { sources: { Message } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const message = await Message.findOne({ id });
        return {
          ...message._doc,
          _id: message.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addMessage: async (_, { message }, { sources: { Message }, pubsub }) => {
      try {
        await Message.create(message);
        pubsub.publish(messagesSubKeys.NEW_MESSAGE_ADDED, {
          newMessageAdded: message
        });

        return "message Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateMessage: async (_, { message }, { sources: { Message } }) => {
      try {
        const isExist = await Message.findOne({ id: message.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = message;
        await Message.updateOne({ id }, message);
        return "message Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeMessage: async (_, { id }, { sources: { Message } }) => {
      try {
        await Message.deleteOne({ id });
        return "message Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
