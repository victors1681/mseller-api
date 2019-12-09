const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  description: String
});

const documentName = "Categories";

module.exports.CategorySchema = CategorySchema;
module.exports.DocumentName = documentName;
