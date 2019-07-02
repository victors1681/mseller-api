const { ApolloError } = require("apollo-server");
const shortId = require("shortid");
const getUnitSchema = require("../../../../models/system/inventory/Unit");

module.exports.resolver = {
  Query: {
    units: async (_, __, { userData }) => {
      const Unit = await getUnitSchema(userData);

      const unit = await Unit.find();
      return unit.map(d => ({ ...d._doc, _id: d.id }));
    }
  },
  Mutation: {
    addUnit: async (_, { unit }, { userData }) => {
      try {
        if (!unit.id) {
          unit.id = shortId();
        }
        const Unit = await getUnitSchema(userData);

        await Unit.create(unit);
        return "Unit Inserted";
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    updateUnit: async (_, { unit }, { userData }) => {
      try {
        const Unit = await getUnitSchema(userData);
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
    removeUnit: async (_, { id }, { userData }) => {
      try {
        const Unit = await getUnitSchema(userData);

        await Unit.deleteOne({ id });
        return "Unit Removed";
      } catch (err) {
        throw new ApolloError(err);
      }
    }
  }
};
