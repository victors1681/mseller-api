const mongoose = require("mongoose");
const dbSelector = require("../../graphql/resolvers/utils/dbSelector");
const Schema = mongoose.Schema;

const ncfSchema = new Schema({
  clientType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  header: {
    type: String,
    required: true
  },
  initSequence: Number,
  endSequence: Number,
  currentSequence: Number,
  sellerCode: {
    type: String,
    required: true
  }
});

ncfSchema.index({ clientType: 1, header: 1, sellerCode: 1 }, { unique: true });

module.exports = userData => dbSelector("Ncf", ncfSchema, userData);
