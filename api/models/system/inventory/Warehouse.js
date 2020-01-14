const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WarehouseSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  observations: String,
  isDefault: Boolean,
  address: String,
  status: Boolean,
  initialQuantity: Number,
  availableQuantity: Number
});

const documentName = "Warehouse";
module.exports.WarehouseSchema = WarehouseSchema;
module.exports.DocumentName = documentName;
