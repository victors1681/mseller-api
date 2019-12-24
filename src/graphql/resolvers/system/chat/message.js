const { ApolloError } = require("apollo-server");
const UserSchema = require("../../../../models/admin/User");
const { documentName } = require("../../../../models/admin/User");
var assert = require("assert");

const messagesSubKeys = {
  NEW_MESSAGE_ADDED: "NEW_MESSAGE_ADDED"
};
const normalizeMessageResponse = d => ({
  ...d._doc,
  user: {
    _id: d._doc.user.id,
    avatar: d._doc.user.avatar,
    name: `${d._doc.user.firstName} ${d._doc.user.lastName}`,
    password: null
  },
  _id: d.id
});
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
        .sort({ createdAt: -1 })
        .populate("user");
      return messages.map(normalizeMessageResponse);
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
        const inserted = await Message.create(message);

        //find document to publish
        const msg = await Message.findOne({ _id: inserted._doc._id }).populate(
          "user"
        );

        pubsub.publish(messagesSubKeys.NEW_MESSAGE_ADDED, {
          newMessageAdded: normalizeMessageResponse(msg)
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
