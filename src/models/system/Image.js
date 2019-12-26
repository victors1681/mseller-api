const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  link: String,
  location: String
});

module.exports.ImageSchema = ImageSchema;
