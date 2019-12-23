const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    chats: async (_, __, { sources: { Chat } }) => {
      const chat = await Chat.find({ status: true });
      return chat.map(d => ({ ...d._doc, _id: d.id }));
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
