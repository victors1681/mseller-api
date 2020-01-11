const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
    required: true
  },
  coordinates: {
    //longitude comes first in a GeoJSON coordinate array
    type: [Number],
    required: true
  }
});

//Future Implementations
const PolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true
  },
  coordinates: {
    type: [[[Number]]], // Array of arrays of arrays of numbers
    required: true
  }
});

const GeoLocationSchema = new Schema({
  clientCode: {
    type: String,
    required: true
  },
  internalContactId: String,
  date: {
    type: Date
  },
  location: {
    type: PointSchema,
    required: true
  }
});
GeoLocationSchema.index(
  { clientCode: 1, internalContactId: 1 },
  { unique: true }
);

const documentName = "GeoLocations";
module.exports.GeoLocationSchema = GeoLocationSchema;
module.exports.PolygonSchema = PolygonSchema;
module.exports.PointSchema = PointSchema;
module.exports.DocumentName = documentName;
