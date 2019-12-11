const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoLocationSchema = new Schema({
  clientCode: {
    type: String,
    required: true
  },
  internalContactId: String,

  date: {
    type: Date
  },
  latitude: {
    type: String,
    required: true
  },
  longitude: {
    type: String,
    required: true
  }
});
GeoLocationSchema.index(
  { clientCode: 1, internalContactId: 1 },
  { unique: true }
);

const documentName = "GeoLocations";
module.exports.GeoLocationSchema = GeoLocationSchema;
module.exports.DocumentName = documentName;
