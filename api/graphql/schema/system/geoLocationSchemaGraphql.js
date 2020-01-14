const { gql } = require("apollo-server");

const geoLocationSchemaGraphql = gql`
  input GeoLocationInput {
    clientCode: String!
    internalContactId: String
    date: Date
    location: LocationInput!
  }

  input LocationInput {
    type: LocationType
    coordinates: [Float]
  }

  enum LocationType {
    Point
    Polygon
  }

  type Location {
    type: LocationType
    coordinates: [Float]
  }

  type GeoLocation {
    clientCode: String!
    internalContactId: String
    date: Date
    location: Location
  }
`;

module.exports = geoLocationSchemaGraphql;
