const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  mode: {
    type: String,
    required: true,
    default: "M" //M mobil //D desktop //S sync Mode
  },
  status: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("User", userSchema);
