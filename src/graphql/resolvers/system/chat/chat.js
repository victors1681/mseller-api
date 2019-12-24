const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

const normalizeChatResponse = d => ({
  ...d._doc,
  fromUser: {
    ...d._doc.fromUser._doc,
    _id: d._doc.fromUser.id,
    name: `${d._doc.fromUser.firstName} ${d._doc.fromUser.lastName}`,
    password: null
  },
  toUser: {
    ...d._doc.toUser._doc,
    _id: d._doc.toUser.id,
    name: `${d._doc.toUser.firstName} ${d._doc.toUser.lastName}`,
    password: null
  },
  _id: d.id
});

module.exports.resolver = {
  Query: {
    chats: async (_, __, { sources: { Chat } }) => {
      const chat = await Chat.find()
        .populate("fromUser")
        .populate("toUser");
      return chat.map(normalizeChatResponse);
    },
    chat: async (_, { id }, { sources: { Chat } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const chat = await Chat.findOne({ id });
        return {
          ...chat._doc,
          _id: chat.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    createChat: async (_, { chat }, { sources: { Chat } }) => {
      try {
        if (!chat.id) {
          chat.id = shortId();
        }

        await Chat.create(chat);
        return "chat Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateChat: async (_, { chat }, { sources: { Chat } }) => {
      try {
        const isExist = await Chat.findOne({ id: chat.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = chat;
        await Chat.updateOne({ id }, chat);
        return "chat Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeChat: async (_, { id }, { sources: { Chat } }) => {
      try {
        await Chat.deleteOne({ id });
        return "chat Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
