const { ApolloError } = require("apollo-server");
const UserSchema = require("../../../../models/admin/User");
const { documentName } = require("../../../../models/admin/User");

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
    messages: async (_, __, { sources: { Message } }) => {
      console.log(
        "UserSchema.documentNameUserSchema.documentName",
        documentName
      );
      const message = await Message.find().populate({
        model: UserSchema,
        path: "Users",
        select: "firstName",
        localField: "from",
        foreignField: "_id"
      });

      //   const test = await UserSchema.find({
      //     _id: {
      //       $in: ["5cf9db0f18c3244797dd4fb8", "5dfff5f9c50aec7a8635a802"]
      //     }
      //   });

      const data = message.map(d => ({ ...d._doc, _id: d.id }));
      console.log("message", data);
      return data;
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
