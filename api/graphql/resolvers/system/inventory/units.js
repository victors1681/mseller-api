const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
const getUnitSchema = require("../../../../models/system/inventory/Unit");

module.exports.resolver = {
  Query: {
    units: async (_, __, { sources: { Unit } }) => {
      const unit = await Unit.find();
      return unit.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addUnit: async (_, { unit }, { sources: { Unit } }) => {
      try {
        if (!unit.id) {
          unit.id = shortId();
        }

        await Unit.create(unit);
        return "Unit Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateUnit: async (_, { unit }, { sources: { Unit } }) => {
      try {
        const isExist = await Unit.findOne({ id: unit.id });
        if (isExist) {
          throw new ApolloError("Code already exist.");
        }
        const { id } = unit;
        await Unit.updateOne({ id }, unit);
        return "Unit Updated";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    removeUnit: async (_, { id }, { sources: { Unit } }) => {
      try {
        await Unit.deleteOne({ id });
        return "Unit Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
