const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: String,
  price: {
    type: Number,
    required: true
  },
  users: {
    type: Number,
    default: 1
  },
  usersMobile: Number,
  userDesktop: Number
});
module.exports = mongoose.model("Plan", planSchema);
