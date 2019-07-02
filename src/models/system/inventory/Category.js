const mongoose = require("mongoose");
const dbSelector = require("../../../graphql/resolvers/utils/dbSelector");

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
module.exports = userData => dbSelector(documentName, CategorySchema, userData);

module.exports.CategorySchema = CategorySchema;
module.exports.DocumentName = documentName;
