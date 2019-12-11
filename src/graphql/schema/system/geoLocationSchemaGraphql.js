const { gql } = require("apollo-server");

const geoLocationSchemaGraphql = gql`
  input GeoLocationInput {
    clientCode: String!
    internalContactId: String
    date: Date
    latitude: String
    longitude: String
  }

  type GeoLocation {
    clientCode: String!
    internalContactId: String
    date: Date
    latitude: String
    longitude: String
  }
`;

module.exports = geoLocationSchemaGraphql;
