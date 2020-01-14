const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocSequenceSchema = new Schema(
  {
    sellerCode: String,

    nextDocNumber: {
      type: Number,
      default: 1
    },
    documentType: {
      type: String,
      enum: ["order", "invoice", "quote"],
      default: "order"
    },
    prefix: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

DocSequenceSchema.index({ sellerCode: 1, documentType: 1 }, { unique: true });

const documentName = "DocSequences";
module.exports.DocSequenceSchema = DocSequenceSchema;
module.exports.DocumentName = documentName;
