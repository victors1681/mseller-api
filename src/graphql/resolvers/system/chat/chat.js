const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
var ObjectId = require("mongoose").Types.ObjectId;
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
    usersChat: async (
      _,
      __,
      { sources: { User, Chat }, userData: { userId } }
    ) => {
      const myOpenChats = await Chat.find({
        $or: [{ from: userId }, { to: userId }]
      });
      const idsToExclude = myOpenChats.map(chat =>
        chat.from.toString() === userId ? chat.to : chat.from
      );
      idsToExclude.push(userId); //exclude current user
      const users = await User.find({ _id: { $nin: idsToExclude } });

      return users;
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
        const chatCreated = await Chat.create(chat);

        return chatCreated._id;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    changeChatStatus: async (_, { chatId, status }, { sources: { Chat } }) => {
      try {
        const chatCreated = await Chat.updateOne(
          { _id: ObjectId(chatId) },
          { $set: { lastMessageStatus: status ? status : "READ" } }
        );
        return "Status updated";
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
