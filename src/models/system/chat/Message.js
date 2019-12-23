const mongoose = require("mongoose");
const { UserModel, UserSchema } = require("../../admin/User");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    from: {
      type: Schema.Types.ObjectId
    },
    to: {
      type: Schema.Types.ObjectId
    },
    chatId: Schema.Types.ObjectId,
    type: {
      type: String,
      default: "TEXT"
    },
    image: {
      type: String
    },
    text: String,
    video: {
      type: String
    },
    location: {
      type: String
    },
    readDate: Date,
    receivedDate: Date,
    status: {
      type: String,
      default: "SENT"
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const addVirtualToMessage = ({ User }) => {
  MessageSchema.virtual("fromUser", {
    ref: User,
    localField: "from",
    foreignField: "_id",
    justOne: true
  });
  MessageSchema.virtual("toUser", {
    ref: User,
    localField: "to",
    foreignField: "_id",
    justOne: true
  });
};
const documentName = "Messages";
module.exports.addVirtualToMessage = addVirtualToMessage;
module.exports.MessageSchema = MessageSchema;
module.exports.DocumentName = documentName;
