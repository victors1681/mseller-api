const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ImageSchema } = require("../system/Image");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    position: String,
    phone: {
      type: String
    },
    sellerCode: {
      type: String,
      default: "0"
    },
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business"
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "Roles"
      }
    ],
    defaultColor: String,
    mode: {
      type: String,
      required: true,
      enum: ["M", "D", "S"],
      default: "M" //M mobil //D desktop //S sync Mode
    },
    status: {
      type: Boolean,
      default: true
    },
    lang: {
      type: String,
      default: "en"
    },
    isLockedOut: {
      type: Boolean,
      default: false
    },
    failedPassword: {
      type: Number,
      default: 0
    },
    avatar: String,
    publicStatus: {
      type: String,
      default: "OFFLINE"
    },
    failedPasswordDate: Date
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const documentName = "Users";

//module.exports = mongoose.model(documentName, userSchema);
module.exports.UserModel = db => db.model(documentName, userSchema);

module.exports.UserSchema = userSchema;
module.exports.DocumentName = documentName;
