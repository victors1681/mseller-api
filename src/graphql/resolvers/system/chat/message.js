const { ApolloError, withFilter } = require("apollo-server");
var assert = require("assert");

const messagesSubKeys = {
  NEW_MESSAGE_ADDED: "NEW_MESSAGE_ADDED"
};
const normalizeMessageResponse = d => ({
  ...d._doc,
  user: {
    _id: (d._doc.user && d._doc.user.id) || "not found",
    avatar: d._doc.user && d._doc.user.avatar,
    name: `${d._doc.user && d._doc.user.firstName} ${d._doc.user &&
      d._doc.user.lastName}`,
    password: null
  },
  _id: d.id
});
/**
 *
 * @param {Object} payload
 * @param {Object} args  { userId, listenForUserId }
 * @param { String } userId //user subscribed  to new event
 * * @param { String } listenForUserId //userId will only listen to this user to publish new message
 */
const messageListenerResponseValidator = (
  payload,
  { userId, listenForUserId }
) => {
  const validation =
    payload.newMessageAdded.to.toString() === userId &&
    payload.newMessageAdded.from.toString() === listenForUserId;
  return validation;
};

module.exports.messagesSubKeys = messagesSubKeys;
module.exports.resolver = {
  Subscription: {
    newMessageAdded: {
      subscribe: withFilter(
        (obj, { userId }, { pubsub }) =>
          pubsub.asyncIterator([messagesSubKeys.NEW_MESSAGE_ADDED]),
        messageListenerResponseValidator
      )
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
