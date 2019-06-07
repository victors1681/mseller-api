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
  name: {
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
    type: String,
    default: "A" //Active. //S suspend //C Cancel
  }
});

module.exports = mongoose.model("User", userSchema);
