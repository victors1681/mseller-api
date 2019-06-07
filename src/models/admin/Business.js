const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const businessSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  },
  manager: String,
  plan: {
    type: Schema.Types.ObjectId,
    ref: "Plan"
  },
  dbName: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    default: "A"
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Business", businessSchema);
