const { ApolloError } = require("apollo-server");
const shortId = require("shortid");

module.exports.resolver = {
  Query: {
    geoLocations: async (_, __, { sources: { GeoLocation } }) => {
      const geoLocation = await GeoLocation.find({ status: true });
      return geoLocation.map(d => ({ ...d._doc, _id: d.id }));
    },
    geoLocation: async (_, { id }, { sources: { GeoLocation } }) => {
      try {
        if (!id) return { error: `invalid user id: ${id}` };
        const geoLocation = await GeoLocation.findOne({ id });
        return {
          ...geoLocation._doc,
          _id: geoLocation.id
        };
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  },
  Mutation: {
    addGeoLocation: async (
      _,
      { geoLocation },
      { sources: { GeoLocation } }
    ) => {
      try {
        if (!geoLocation.id) {
          geoLocation.id = shortId();
        }

        await GeoLocation.create(geoLocation);
        return "geoLocation Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    addGeoLocations: async (
      _,
      { geoLocation },
      { sources: { GeoLocation } }
    ) => {
      try {
        await GeoLocation.remove();
        await GeoLocation.insertMany(geoLocation);
        return "GeoLocations inserted!";
      } catch (err) {
        console.log("Error inserting geoLocation", err);
        throw new ApolloError("Error inserting geoLocation", 417);
      }
    },
    updateGeoLocation: async (
      _,
      { geoLocation },
      { sources: { GeoLocation } }
    ) => {
      try {
        const isExist = await GeoLocation.findOne({ id: geoLocation.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = geoLocation;
        await GeoLocation.updateOne({ id }, geoLocation);
        return "geoLocation Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeGeoLocation: async (_, { id }, { sources: { GeoLocation } }) => {
      try {
        await GeoLocation.deleteOne({ id });
        return "geoLocation Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
