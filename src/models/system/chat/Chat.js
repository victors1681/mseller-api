const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  name: String,

  from: {
    type: Schema.Types.ObjectId
  },
  to: {
    type: Schema.Types.ObjectId
  },
  type: {
    type: [String],
    default: ["DIRECT"]
  },
  image: {
    type: String
  },
  lastMessage: {
    type: String
  },
  status: {
    type: String,
    default: ["NORMAL"]
  }
});

ChatSchema.virtual("fromUser", {
  ref: "User",
  localField: "from",
  foreignField: "_id",
  justOne: true
});

ChatSchema.virtual("toUser", {
  ref: "User",
  localField: "to",
  foreignField: "_id",
  justOne: true
});

const documentName = "Chats";
module.exports.ChatSchema = ChatSchema;
module.exports.DocumentName = documentName;
