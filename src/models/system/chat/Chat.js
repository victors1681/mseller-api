const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema(
  {
    name: String,

    from: {
      type: Schema.Types.ObjectId
    },
    to: {
      type: Schema.Types.ObjectId
    },
    type: {
      type: String,
      default: "DIRECT"
    },
    image: {
      type: String
    },
    lastMessageUserId: {
      type: String
    },
    lastMessage: {
      type: String
    },
    lastMessageStatus: {
      type: String,
      default: "UNREAD"
    },
    status: {
      type: String,
      default: "NORMAL"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

const addVirtualToChat = ({ User }) => {
  ChatSchema.virtual("fromUser", {
    ref: User,
    localField: "from",
    foreignField: "_id",
    justOne: true
  });

  ChatSchema.virtual("toUser", {
    ref: User,
    localField: "to",
    foreignField: "_id",
    justOne: true
  });
};

module.exports.addVirtualToChat = addVirtualToChat;

const documentName = "Chats";
module.exports.ChatSchema = ChatSchema;
module.exports.DocumentName = documentName;
