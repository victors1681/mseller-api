const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RetentionSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },

  percentage: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    default: "FUENTE"
  },
  status: {
    type: Boolean,
    default: true
  }
});

const DocumentName = "Retentions";
module.exports.RetentionSchema = RetentionSchema;
module.exports.DocumentName = DocumentName;
